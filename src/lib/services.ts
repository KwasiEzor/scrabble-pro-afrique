import { requireSupabase } from './supabase'
import type { Article, Competition, Country, Player } from './data'

interface CountryRelation {
  name: string
  flag?: string | null
}

interface ArticleRow {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[] | null
  author: string
  author_image: string
  published_at: string
  read_time: string
  featured: boolean | null
  countries?: CountryRelation | CountryRelation[] | null
}

interface PlayerRow {
  id: number
  slug: string
  name: string
  image: string
  ranking: number
  rating: number
  titles: string[] | null
  tags: string[] | null
  bio: string
  club: string
  featured: boolean | null
  countries?: CountryRelation | CountryRelation[] | null
}

interface CompetitionResult {
  rank: number
  player: string
  country: string
  score: number
}

interface CompetitionRow {
  id: number
  slug: string
  name: string
  location: string
  start_date: string
  end_date: string
  status: Competition['status']
  image: string
  description: string
  participants: number
  type: string
  tags: string[] | null
  results: CompetitionResult[] | null
  countries?: CountryRelation | CountryRelation[] | null
}

interface CountryRow {
  id: number
  slug: string
  name: string
  code: string
  flag: string
  image: string
  federation: string
  clubs: number
  players: number
  description: string
  tags: string[] | null
}

interface MessageRow {
  id: number
  name: string
  email: string
  subject: string
  content: string
  read: boolean | null
  tag: string | null
  created_at: string
}

export interface Message {
  id: string
  name: string
  email: string
  subject: string
  content: string
  read: boolean
  tag: string
  createdAt: string
}

export interface CountryMutationInput {
  slug: string
  name: string
  code: string
  flag: string
  image: string
  federation: string
  clubs: number
  players: number
  description: string
  tags: string[]
}

export interface PlayerMutationInput {
  slug: string
  name: string
  countryId: number | null
  image: string
  ranking: number
  rating: number
  titles: string[]
  tags: string[]
  bio: string
  club: string
  featured: boolean
}

export interface ArticleMutationInput {
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  countryId: number | null
  author: string
  authorImage: string
  publishedAt: string
  readTime: string
  featured: boolean
}

export interface CompetitionMutationInput {
  slug: string
  name: string
  location: string
  countryId: number | null
  startDate: string
  endDate: string
  status: Competition['status']
  image: string
  description: string
  participants: number
  type: string
  tags: string[]
  results: CompetitionResult[]
}

function unwrapRelation<T>(value?: T | T[] | null) {
  return Array.isArray(value) ? value[0] : value ?? undefined
}

const transformArticle = (row: ArticleRow): Article => {
  const country = unwrapRelation(row.countries)

  return {
    id: row.id.toString(),
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    image: row.image,
    category: row.category,
    tags: row.tags ?? [],
    country: country?.name || 'International',
    author: row.author,
    authorImage: row.author_image,
    date: row.published_at,
    readTime: row.read_time,
    featured: Boolean(row.featured),
  }
}

const transformPlayer = (row: PlayerRow): Player => {
  const country = unwrapRelation(row.countries)

  return {
    id: row.id.toString(),
    slug: row.slug,
    name: row.name,
    country: country?.name || '',
    countryFlag: country?.flag || '🌍',
    image: row.image,
    ranking: row.ranking,
    rating: row.rating,
    titles: row.titles ?? [],
    tags: row.tags ?? [],
    bio: row.bio,
    club: row.club,
    featured: Boolean(row.featured),
  }
}

const transformCompetition = (row: CompetitionRow): Competition => {
  const country = unwrapRelation(row.countries)

  return {
    id: row.id.toString(),
    slug: row.slug,
    name: row.name,
    location: row.location,
    country: country?.name || '',
    startDate: row.start_date,
    endDate: row.end_date,
    status: row.status,
    image: row.image,
    description: row.description,
    participants: row.participants,
    type: row.type,
    tags: row.tags ?? [],
    results: row.results ?? undefined,
  }
}

const transformCountry = (row: CountryRow): Country => ({
  id: row.id.toString(),
  slug: row.slug,
  name: row.name,
  code: row.code,
  flag: row.flag,
  image: row.image,
  federation: row.federation,
  clubs: row.clubs,
  players: row.players,
  description: row.description,
  tags: row.tags ?? [],
})

const transformMessage = (row: MessageRow): Message => ({
  id: row.id.toString(),
  name: row.name,
  email: row.email,
  subject: row.subject,
  content: row.content,
  read: Boolean(row.read),
  tag: row.tag ?? 'general',
  createdAt: row.created_at,
})

export const articleService = {
  async getAll() {
    const { data, error } = await requireSupabase()
      .from('articles')
      .select('*, countries(name)')
      .order('published_at', { ascending: false })

    if (error) throw error
    return (data as ArticleRow[] | null)?.map(transformArticle) ?? []
  },

  async getBySlug(slug: string) {
    const { data, error } = await requireSupabase()
      .from('articles')
      .select('*, countries(name)')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return transformArticle(data as ArticleRow)
  },

  async getFeatured() {
    const { data, error } = await requireSupabase()
      .from('articles')
      .select('*, countries(name)')
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(3)

    if (error) throw error
    return (data as ArticleRow[] | null)?.map(transformArticle) ?? []
  },

  async create(input: ArticleMutationInput) {
    const { data, error } = await requireSupabase()
      .from('articles')
      .insert({
        slug: input.slug,
        title: input.title,
        excerpt: input.excerpt,
        content: input.content,
        image: input.image,
        category: input.category,
        tags: input.tags,
        country_id: input.countryId,
        author: input.author,
        author_image: input.authorImage,
        published_at: input.publishedAt,
        read_time: input.readTime,
        featured: input.featured,
      })
      .select('*, countries(name)')
      .single()

    if (error) throw error
    return transformArticle(data as ArticleRow)
  },

  async update(id: string, input: ArticleMutationInput) {
    const { data, error } = await requireSupabase()
      .from('articles')
      .update({
        slug: input.slug,
        title: input.title,
        excerpt: input.excerpt,
        content: input.content,
        image: input.image,
        category: input.category,
        tags: input.tags,
        country_id: input.countryId,
        author: input.author,
        author_image: input.authorImage,
        published_at: input.publishedAt,
        read_time: input.readTime,
        featured: input.featured,
      })
      .eq('id', Number(id))
      .select('*, countries(name)')
      .single()

    if (error) throw error
    return transformArticle(data as ArticleRow)
  },

  async delete(id: string) {
    const { error } = await requireSupabase().from('articles').delete().eq('id', Number(id))
    if (error) throw error
  },
}

export const playerService = {
  async getAll() {
    const { data, error } = await requireSupabase()
      .from('players')
      .select('*, countries(name, flag)')
      .order('ranking', { ascending: true })

    if (error) throw error
    return (data as PlayerRow[] | null)?.map(transformPlayer) ?? []
  },

  async getBySlug(slug: string) {
    const { data, error } = await requireSupabase()
      .from('players')
      .select('*, countries(name, flag)')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return transformPlayer(data as PlayerRow)
  },

  async create(input: PlayerMutationInput) {
    const { data, error } = await requireSupabase()
      .from('players')
      .insert({
        slug: input.slug,
        name: input.name,
        country_id: input.countryId,
        image: input.image,
        ranking: input.ranking,
        rating: input.rating,
        titles: input.titles,
        tags: input.tags,
        bio: input.bio,
        club: input.club,
        featured: input.featured,
      })
      .select('*, countries(name, flag)')
      .single()

    if (error) throw error
    return transformPlayer(data as PlayerRow)
  },

  async update(id: string, input: PlayerMutationInput) {
    const { data, error } = await requireSupabase()
      .from('players')
      .update({
        slug: input.slug,
        name: input.name,
        country_id: input.countryId,
        image: input.image,
        ranking: input.ranking,
        rating: input.rating,
        titles: input.titles,
        tags: input.tags,
        bio: input.bio,
        club: input.club,
        featured: input.featured,
      })
      .eq('id', Number(id))
      .select('*, countries(name, flag)')
      .single()

    if (error) throw error
    return transformPlayer(data as PlayerRow)
  },

  async delete(id: string) {
    const { error } = await requireSupabase().from('players').delete().eq('id', Number(id))
    if (error) throw error
  },
}

export const competitionService = {
  async getAll() {
    const { data, error } = await requireSupabase()
      .from('competitions')
      .select('*, countries(name)')
      .order('start_date', { ascending: true })

    if (error) throw error
    return (data as CompetitionRow[] | null)?.map(transformCompetition) ?? []
  },

  async getBySlug(slug: string) {
    const { data, error } = await requireSupabase()
      .from('competitions')
      .select('*, countries(name)')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return transformCompetition(data as CompetitionRow)
  },

  async getUpcoming() {
    const { data, error } = await requireSupabase()
      .from('competitions')
      .select('*, countries(name)')
      .neq('status', 'completed')
      .order('start_date', { ascending: true })
      .limit(3)

    if (error) throw error
    return (data as CompetitionRow[] | null)?.map(transformCompetition) ?? []
  },

  async create(input: CompetitionMutationInput) {
    const { data, error } = await requireSupabase()
      .from('competitions')
      .insert({
        slug: input.slug,
        name: input.name,
        location: input.location,
        country_id: input.countryId,
        start_date: input.startDate,
        end_date: input.endDate,
        status: input.status,
        image: input.image,
        description: input.description,
        participants: input.participants,
        type: input.type,
        tags: input.tags,
        results: input.results,
      })
      .select('*, countries(name)')
      .single()

    if (error) throw error
    return transformCompetition(data as CompetitionRow)
  },

  async update(id: string, input: CompetitionMutationInput) {
    const { data, error } = await requireSupabase()
      .from('competitions')
      .update({
        slug: input.slug,
        name: input.name,
        location: input.location,
        country_id: input.countryId,
        start_date: input.startDate,
        end_date: input.endDate,
        status: input.status,
        image: input.image,
        description: input.description,
        participants: input.participants,
        type: input.type,
        tags: input.tags,
        results: input.results,
      })
      .eq('id', Number(id))
      .select('*, countries(name)')
      .single()

    if (error) throw error
    return transformCompetition(data as CompetitionRow)
  },

  async delete(id: string) {
    const { error } = await requireSupabase().from('competitions').delete().eq('id', Number(id))
    if (error) throw error
  },
}

export const countryService = {
  async getAll() {
    const { data, error } = await requireSupabase()
      .from('countries')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return (data as CountryRow[] | null)?.map(transformCountry) ?? []
  },

  async getBySlug(slug: string) {
    const { data, error } = await requireSupabase()
      .from('countries')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return transformCountry(data as CountryRow)
  },

  async create(input: CountryMutationInput) {
    const { data, error } = await requireSupabase().from('countries').insert({
      slug: input.slug,
      name: input.name,
      code: input.code,
      flag: input.flag,
      image: input.image,
      federation: input.federation,
      clubs: input.clubs,
      players: input.players,
      description: input.description,
      tags: input.tags,
    }).select('*').single()

    if (error) throw error
    return transformCountry(data as CountryRow)
  },

  async update(id: string, input: CountryMutationInput) {
    const { data, error } = await requireSupabase().from('countries').update({
      slug: input.slug,
      name: input.name,
      code: input.code,
      flag: input.flag,
      image: input.image,
      federation: input.federation,
      clubs: input.clubs,
      players: input.players,
      description: input.description,
      tags: input.tags,
    }).eq('id', Number(id)).select('*').single()

    if (error) throw error
    return transformCountry(data as CountryRow)
  },

  async delete(id: string) {
    const { error } = await requireSupabase().from('countries').delete().eq('id', Number(id))
    if (error) throw error
  },
}

export const messageService = {
  async getAll() {
    const { data, error } = await requireSupabase()
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as MessageRow[] | null)?.map(transformMessage) ?? []
  },

  async update(id: string, input: { read?: boolean; tag?: string }) {
    const updates: { read?: boolean; tag?: string } = {}

    if (typeof input.read === 'boolean') {
      updates.read = input.read
    }

    if (typeof input.tag === 'string') {
      updates.tag = input.tag
    }

    const { data, error } = await requireSupabase()
      .from('messages')
      .update(updates)
      .eq('id', Number(id))
      .select('*')
      .single()

    if (error) throw error
    return transformMessage(data as MessageRow)
  },

  async delete(id: string) {
    const { error } = await requireSupabase().from('messages').delete().eq('id', Number(id))
    if (error) throw error
  },
}
