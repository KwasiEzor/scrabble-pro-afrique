import { describe, expect, it } from 'vitest'
import { getSafeArticleParagraphs } from './siteContent'

describe('getSafeArticleParagraphs', () => {
  it('removes scripts and preserves readable paragraphs', () => {
    expect(
      getSafeArticleParagraphs(
        '<p>Bonjour</p><script>alert(1)</script><p>Monde</p><ul><li>Alpha</li><li>Beta</li></ul>',
      ),
    ).toEqual(['Bonjour', 'Monde', '- Alpha\n- Beta'])
  })
})
