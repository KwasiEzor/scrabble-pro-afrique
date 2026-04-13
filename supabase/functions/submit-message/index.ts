import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'jsr:@supabase/supabase-js@2/cors'

type SubmissionPayload = {
  name?: string
  email?: string
  subject?: string
  content?: string
  tag?: string
  website?: string
  captchaToken?: string
}

type TurnstileVerificationResponse = {
  success: boolean
  'error-codes'?: string[]
}

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  })
}

function getClientIp(req: Request) {
  return (
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

async function hashValue(value: string) {
  const encoded = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function normalizeText(value: string | undefined, maxLength: number) {
  return (value ?? '').trim().slice(0, maxLength)
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function verifyTurnstileToken(token: string, ip: string) {
  const secret = Deno.env.get('TURNSTILE_SECRET_KEY')?.trim()

  if (!secret) {
    return { success: false, error: 'TURNSTILE_SECRET_KEY is not configured.' }
  }

  const body = new URLSearchParams()
  body.set('secret', secret)
  body.set('response', token)

  if (ip && ip !== 'unknown') {
    body.set('remoteip', ip)
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!response.ok) {
    return { success: false, error: 'Captcha verification request failed.' }
  }

  const data = (await response.json()) as TurnstileVerificationResponse

  if (!data.success) {
    return {
      success: false,
      error: `Captcha verification failed.${data['error-codes']?.length ? ` ${data['error-codes']?.join(', ')}` : ''}`,
    }
  }

  return { success: true, error: null }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405)
  }

  let payload: SubmissionPayload

  try {
    payload = await req.json()
  } catch {
    return json({ error: 'Invalid JSON payload.' }, 400)
  }

  if ((payload.website ?? '').trim().length > 0) {
    return json({ success: true })
  }

  const name = normalizeText(payload.name, 120)
  const email = normalizeText(payload.email, 160).toLowerCase()
  const subject = normalizeText(payload.subject, 180)
  const content = normalizeText(payload.content, 5000)
  const tag = normalizeText(payload.tag, 80) || 'general'
  const captchaToken = normalizeText(payload.captchaToken, 2048)

  if (!name || !email || !subject || !content) {
    return json({ error: 'Missing required fields.' }, 400)
  }

  if (!captchaToken) {
    return json({ error: 'Missing captcha token.' }, 400)
  }

  if (!isValidEmail(email)) {
    return json({ error: 'Invalid email address.' }, 400)
  }

  if (content.length < 20) {
    return json({ error: 'Message content is too short.' }, 400)
  }

  const clientIp = getClientIp(req)
  const verification = await verifyTurnstileToken(captchaToken, clientIp)

  if (!verification.success) {
    const status = verification.error === 'TURNSTILE_SECRET_KEY is not configured.' ? 503 : 400
    return json({ error: verification.error }, status)
  }

  const ipHash = await hashValue(clientIp)
  const windowStart = new Date()
  windowStart.setMinutes(0, 0, 0)

  const { data: existingRateLimit, error: rateLimitLookupError } = await supabaseAdmin
    .from('submission_rate_limits')
    .select('id, attempts')
    .eq('ip_hash', ipHash)
    .eq('route', 'submit-message')
    .eq('window_start', windowStart.toISOString())
    .maybeSingle()

  if (rateLimitLookupError) {
    return json({ error: 'Unable to verify submission rate limit.' }, 500)
  }

  if ((existingRateLimit?.attempts ?? 0) >= 5) {
    return json({ error: 'Too many submissions. Please try again later.' }, 429)
  }

  if (existingRateLimit) {
    const { error: updateRateLimitError } = await supabaseAdmin
      .from('submission_rate_limits')
      .update({
        attempts: existingRateLimit.attempts + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existingRateLimit.id)

    if (updateRateLimitError) {
      return json({ error: 'Unable to update submission rate limit.' }, 500)
    }
  } else {
    const { error: createRateLimitError } = await supabaseAdmin.from('submission_rate_limits').insert({
      ip_hash: ipHash,
      route: 'submit-message',
      window_start: windowStart.toISOString(),
      attempts: 1,
    })

    if (createRateLimitError) {
      return json({ error: 'Unable to create submission rate limit.' }, 500)
    }
  }

  const { error: insertError } = await supabaseAdmin.from('messages').insert({
    name,
    email,
    subject,
    content,
    tag,
  })

  if (insertError) {
    return json({ error: 'Unable to save submission.' }, 500)
  }

  return json({ success: true }, 201)
})
