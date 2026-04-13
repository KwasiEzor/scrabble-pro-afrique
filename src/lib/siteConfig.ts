function normalizeExternalUrl(value?: string | null) {
  const trimmed = value?.trim()

  if (!trimmed) {
    return null
  }

  if (!/^https?:\/\//i.test(trimmed)) {
    return null
  }

  try {
    return new URL(trimmed).toString()
  } catch {
    return null
  }
}

export function resolveSocialLinks(env: Record<string, string | undefined>) {
  return {
    facebook: normalizeExternalUrl(env.VITE_SOCIAL_FACEBOOK_URL),
    twitter: normalizeExternalUrl(env.VITE_SOCIAL_TWITTER_URL),
    instagram: normalizeExternalUrl(env.VITE_SOCIAL_INSTAGRAM_URL),
    youtube: normalizeExternalUrl(env.VITE_SOCIAL_YOUTUBE_URL),
    github: normalizeExternalUrl(env.VITE_SOCIAL_GITHUB_URL),
    linkedin: normalizeExternalUrl(env.VITE_SOCIAL_LINKEDIN_URL),
  }
}

export const socialLinks = resolveSocialLinks(import.meta.env)

export const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() ?? ''
export const isTurnstileConfigured = Boolean(turnstileSiteKey)

export { normalizeExternalUrl }
