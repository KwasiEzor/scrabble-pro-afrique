import {
  articles as staticArticles,
  competitions as staticCompetitions,
  countries as staticCountries,
  players as staticPlayers,
} from './data'
import type { Article, Competition, Country, Player } from './data'
import { articleService, competitionService, countryService, playerService } from './services'

export type SearchResult =
  | (Article & { type: 'article' })
  | (Player & { type: 'player' })
  | (Competition & { type: 'competition' })

export async function loadArticles() {
  try {
    const data = await articleService.getAll()
    return data.length > 0 ? data : staticArticles
  } catch {
    return staticArticles
  }
}

export async function loadArticleBySlug(slug: string) {
  try {
    return await articleService.getBySlug(slug)
  } catch {
    return staticArticles.find((article) => article.slug === slug) ?? null
  }
}

export async function loadPlayers() {
  try {
    const data = await playerService.getAll()
    return data.length > 0 ? data : staticPlayers
  } catch {
    return staticPlayers
  }
}

export async function loadPlayerBySlug(slug: string) {
  try {
    return await playerService.getBySlug(slug)
  } catch {
    return staticPlayers.find((player) => player.slug === slug) ?? null
  }
}

export async function loadCompetitions() {
  try {
    const data = await competitionService.getAll()
    return data.length > 0 ? data : staticCompetitions
  } catch {
    return staticCompetitions
  }
}

export async function loadCompetitionBySlug(slug: string) {
  try {
    return await competitionService.getBySlug(slug)
  } catch {
    return staticCompetitions.find((competition) => competition.slug === slug) ?? null
  }
}

export async function loadUpcomingCompetitions() {
  try {
    const data = await competitionService.getUpcoming()
    return data.length > 0
      ? data
      : staticCompetitions.filter((competition) => competition.status !== 'completed').slice(0, 3)
  } catch {
    return staticCompetitions.filter((competition) => competition.status !== 'completed').slice(0, 3)
  }
}

export async function loadCountries() {
  try {
    const data = await countryService.getAll()
    return data.length > 0 ? data : staticCountries
  } catch {
    return staticCountries
  }
}

export async function loadCountryBySlug(slug: string) {
  try {
    return await countryService.getBySlug(slug)
  } catch {
    return staticCountries.find((country) => country.slug === slug) ?? null
  }
}

export async function loadHomeContent(): Promise<{
  articles: Article[]
  competitions: Competition[]
  players: Player[]
  countries: Country[]
}> {
  const [articles, competitions, players, countries] = await Promise.all([
    loadArticles(),
    loadUpcomingCompetitions(),
    loadPlayers(),
    loadCountries(),
  ])

  return { articles, competitions, players, countries }
}

export async function loadSearchResults(query: string) {
  const q = query.trim().toLowerCase()

  if (!q) {
    return []
  }

  const [articles, players, competitions] = await Promise.all([
    loadArticles(),
    loadPlayers(),
    loadCompetitions(),
  ])

  const results: SearchResult[] = [
    ...articles
      .filter((article) => article.title.toLowerCase().includes(q) || article.category.toLowerCase().includes(q))
      .map((article) => ({ ...article, type: 'article' as const })),
    ...players
      .filter((player) => player.name.toLowerCase().includes(q) || player.country.toLowerCase().includes(q))
      .map((player) => ({ ...player, type: 'player' as const })),
    ...competitions
      .filter((competition) => competition.name.toLowerCase().includes(q) || competition.location.toLowerCase().includes(q))
      .map((competition) => ({ ...competition, type: 'competition' as const })),
  ]

  return results.slice(0, 8)
}

export function getSafeArticleParagraphs(content: string) {
  return content
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<(ul|ol)[^>]*>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li>/gi, '- ')
    .replace(/<\/(ul|ol)>/gi, '\n\n')
    .replace(/<\/(h1|h2|h3|h4|blockquote|div|section|article)>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}
