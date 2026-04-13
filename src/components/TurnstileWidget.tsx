import { useEffect, useRef } from 'react'
import { isTurnstileConfigured, turnstileSiteKey } from '../lib/siteConfig'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          theme?: 'auto' | 'light' | 'dark'
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
        },
      ) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

let turnstileScriptPromise: Promise<void> | null = null

function ensureTurnstileScript() {
  if (typeof window === 'undefined') {
    return Promise.resolve()
  }

  if (window.turnstile) {
    return Promise.resolve()
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise
  }

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-turnstile-script="true"]')

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Turnstile script failed to load.')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.dataset.turnstileScript = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Turnstile script failed to load.'))
    document.head.appendChild(script)
  })

  return turnstileScriptPromise
}

interface TurnstileWidgetProps {
  onTokenChange: (token: string | null) => void
  onError?: (message: string | null) => void
  refreshKey?: number
}

export default function TurnstileWidget({
  onTokenChange,
  onError,
  refreshKey = 0,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!isTurnstileConfigured) {
      onTokenChange(null)
      onError?.("La protection anti-spam n'est pas configurée pour ce formulaire.")
      return
    }

    let isMounted = true

    ensureTurnstileScript()
      .then(() => {
        if (!isMounted || !containerRef.current || !window.turnstile) {
          return
        }

        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current)
          widgetIdRef.current = null
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: turnstileSiteKey,
          theme: 'dark',
          callback: (token) => {
            onTokenChange(token)
            onError?.(null)
          },
          'expired-callback': () => {
            onTokenChange(null)
            onError?.('La vérification a expiré. Veuillez recommencer.')
          },
          'error-callback': () => {
            onTokenChange(null)
            onError?.("La vérification anti-spam a échoué. Rechargez la page puis réessayez.")
          },
        })
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        onTokenChange(null)
        onError?.("Impossible de charger la vérification anti-spam pour le moment.")
      })

    return () => {
      isMounted = false

      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [onError, onTokenChange])

  useEffect(() => {
    if (!widgetIdRef.current || !window.turnstile) {
      return
    }

    window.turnstile.reset(widgetIdRef.current)
    onTokenChange(null)
    onError?.(null)
  }, [onError, onTokenChange, refreshKey])

  if (!isTurnstileConfigured) {
    return (
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
        La protection anti-spam n&apos;est pas encore configurée pour ce formulaire.
      </div>
    )
  }

  return <div ref={containerRef} />
}
