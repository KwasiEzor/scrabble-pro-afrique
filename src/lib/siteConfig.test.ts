import { describe, expect, it } from 'vitest'
import { normalizeExternalUrl, resolveSocialLinks } from './siteConfig'

describe('siteConfig', () => {
  it('keeps valid external https urls', () => {
    expect(normalizeExternalUrl('https://scrabblepro.africa/social')).toBe('https://scrabblepro.africa/social')
  })

  it('rejects invalid or non-http urls', () => {
    expect(normalizeExternalUrl('javascript:alert(1)')).toBeNull()
    expect(normalizeExternalUrl('ftp://example.com')).toBeNull()
    expect(normalizeExternalUrl('')).toBeNull()
  })

  it('maps env variables into social links', () => {
    expect(
      resolveSocialLinks({
        VITE_SOCIAL_FACEBOOK_URL: 'https://facebook.com/scrabbleproafrique',
        VITE_SOCIAL_TWITTER_URL: 'https://x.com/scrabbleproafrique',
      }),
    ).toEqual({
      facebook: 'https://facebook.com/scrabbleproafrique',
      twitter: 'https://x.com/scrabbleproafrique',
      instagram: null,
      youtube: null,
      github: null,
      linkedin: null,
    })
  })
})
