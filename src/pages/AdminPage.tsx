import { useCallback, useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import {
  FileText,
  Globe,
  Loader2,
  LogOut,
  Mail,
  Pencil,
  Plus,
  RefreshCcw,
  Save,
  ShieldAlert,
  Trash2,
  Trophy,
  Users,
} from 'lucide-react'
import SEO from '../components/SEO'
import type { Article, Competition, Country, Player } from '../lib/data'
import {
  articleService,
  competitionService,
  countryService,
  type Message,
  messageService,
  playerService,
} from '../lib/services'
import { loadArticles, loadCompetitions, loadCountries, loadPlayers } from '../lib/siteContent'
import { hasAdminAccess, isSupabaseConfigured, supabase } from '../lib/supabase'

type AdminTab = 'dashboard' | 'articles' | 'competitions' | 'players' | 'countries' | 'messages'

type CountryFormState = {
  slug: string
  name: string
  code: string
  flag: string
  image: string
  federation: string
  clubs: string
  players: string
  description: string
  tags: string
}

type PlayerFormState = {
  slug: string
  name: string
  countryId: string
  image: string
  ranking: string
  rating: string
  titles: string
  tags: string
  bio: string
  club: string
  featured: boolean
}

type ArticleFormState = {
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string
  countryId: string
  author: string
  authorImage: string
  publishedAt: string
  readTime: string
  featured: boolean
}

type CompetitionFormState = {
  slug: string
  name: string
  location: string
  countryId: string
  startDate: string
  endDate: string
  status: Competition['status']
  image: string
  description: string
  participants: string
  type: string
  tags: string
  results: string
}

const tabs: { key: AdminTab; label: string }[] = [
  { key: 'dashboard', label: 'Overview' },
  { key: 'articles', label: 'Articles' },
  { key: 'competitions', label: 'Compétitions' },
  { key: 'players', label: 'Joueurs' },
  { key: 'countries', label: 'Pays' },
  { key: 'messages', label: 'Messages' },
]

function createCountryForm(): CountryFormState {
  return {
    slug: '',
    name: '',
    code: '',
    flag: '🌍',
    image: '',
    federation: '',
    clubs: '0',
    players: '0',
    description: '',
    tags: '',
  }
}

function createPlayerForm(): PlayerFormState {
  return {
    slug: '',
    name: '',
    countryId: '',
    image: '',
    ranking: '0',
    rating: '0',
    titles: '',
    tags: '',
    bio: '',
    club: '',
    featured: false,
  }
}

function createArticleForm(): ArticleFormState {
  return {
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    tags: '',
    countryId: '',
    author: '',
    authorImage: '',
    publishedAt: '',
    readTime: '',
    featured: false,
  }
}

function createCompetitionForm(): CompetitionFormState {
  return {
    slug: '',
    name: '',
    location: '',
    countryId: '',
    startDate: '',
    endDate: '',
    status: 'upcoming',
    image: '',
    description: '',
    participants: '0',
    type: '',
    tags: '',
    results: '[]',
  }
}

function parseDelimitedList(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseInteger(value: string) {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : 0
}

function parseNullableInteger(value: string) {
  const trimmed = value.trim()
  return trimmed ? parseInteger(trimmed) : null
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toDateTimeLocal(value: string) {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  const hours = `${date.getHours()}`.padStart(2, '0')
  const minutes = `${date.getMinutes()}`.padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}`
}

function serializeResults(results?: Competition['results']) {
  return JSON.stringify(results ?? [], null, 2)
}

function parseResults(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return []
  }

  const parsed = JSON.parse(trimmed) as unknown

  if (!Array.isArray(parsed)) {
    throw new Error('Les résultats doivent être un tableau JSON.')
  }

  return parsed.map((item) => {
    if (
      !item ||
      typeof item !== 'object' ||
      typeof item.rank !== 'number' ||
      typeof item.player !== 'string' ||
      typeof item.country !== 'string' ||
      typeof item.score !== 'number'
    ) {
      throw new Error(
        'Chaque résultat doit contenir rank, player, country et score avec les bons types.',
      )
    }

    return item
  })
}

function countryToForm(country: Country): CountryFormState {
  return {
    slug: country.slug,
    name: country.name,
    code: country.code,
    flag: country.flag,
    image: country.image,
    federation: country.federation,
    clubs: country.clubs.toString(),
    players: country.players.toString(),
    description: country.description,
    tags: country.tags.join(', '),
  }
}

function playerToForm(player: Player, countries: Country[]): PlayerFormState {
  return {
    slug: player.slug,
    name: player.name,
    countryId: countries.find((country) => country.name === player.country)?.id ?? '',
    image: player.image,
    ranking: player.ranking.toString(),
    rating: player.rating.toString(),
    titles: player.titles.join(', '),
    tags: player.tags.join(', '),
    bio: player.bio,
    club: player.club,
    featured: player.featured,
  }
}

function articleToForm(article: Article, countries: Country[]): ArticleFormState {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    image: article.image,
    category: article.category,
    tags: article.tags.join(', '),
    countryId: countries.find((country) => country.name === article.country)?.id ?? '',
    author: article.author,
    authorImage: article.authorImage,
    publishedAt: toDateTimeLocal(article.date),
    readTime: article.readTime,
    featured: article.featured,
  }
}

function competitionToForm(competition: Competition, countries: Country[]): CompetitionFormState {
  return {
    slug: competition.slug,
    name: competition.name,
    location: competition.location,
    countryId: countries.find((country) => country.name === competition.country)?.id ?? '',
    startDate: toDateTimeLocal(competition.startDate),
    endDate: toDateTimeLocal(competition.endDate),
    status: competition.status,
    image: competition.image,
    description: competition.description,
    participants: competition.participants.toString(),
    type: competition.type,
    tags: competition.tags.join(', '),
    results: serializeResults(competition.results),
  }
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')
  const [submitting, setSubmitting] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [savingTab, setSavingTab] = useState<AdminTab | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [messageTagDrafts, setMessageTagDrafts] = useState<Record<string, string>>({})

  const [countryEditingId, setCountryEditingId] = useState<string | null>(null)
  const [countryForm, setCountryForm] = useState<CountryFormState>(createCountryForm())
  const [playerEditingId, setPlayerEditingId] = useState<string | null>(null)
  const [playerForm, setPlayerForm] = useState<PlayerFormState>(createPlayerForm())
  const [articleEditingId, setArticleEditingId] = useState<string | null>(null)
  const [articleForm, setArticleForm] = useState<ArticleFormState>(createArticleForm())
  const [competitionEditingId, setCompetitionEditingId] = useState<string | null>(null)
  const [competitionForm, setCompetitionForm] = useState<CompetitionFormState>(createCompetitionForm())

  const isConfigured = isSupabaseConfigured && Boolean(supabase)
  const isAdmin = hasAdminAccess(session?.user)

  const refreshData = useCallback(async () => {
    if (!supabase || !session || !isAdmin) return

    setLoadingData(true)
    setError(null)

    try {
      const [nextArticles, nextCompetitions, nextPlayers, nextCountries, nextMessages] = await Promise.all([
        loadArticles(),
        loadCompetitions(),
        loadPlayers(),
        loadCountries(),
        messageService.getAll().catch(() => []),
      ])

      setArticles(nextArticles)
      setCompetitions(nextCompetitions)
      setPlayers(nextPlayers)
      setCountries(nextCountries)
      setMessages(nextMessages)
      setMessageTagDrafts(
        Object.fromEntries(nextMessages.map((message) => [message.id, message.tag || 'general'])),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Le chargement de l'administration a échoué.")
    } finally {
      setLoadingData(false)
    }
  }, [isAdmin, session])

  useEffect(() => {
    if (!supabase) return

    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) {
        setSession(nextSession)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (session && isAdmin) {
      void refreshData()
    }
  }, [refreshData, session, isAdmin])

  function resetFeedback() {
    setError(null)
    setNotice(null)
  }

  function startNewCountry() {
    resetFeedback()
    setCountryEditingId(null)
    setCountryForm(createCountryForm())
  }

  function startEditCountry(country: Country) {
    resetFeedback()
    setCountryEditingId(country.id)
    setCountryForm(countryToForm(country))
  }

  function startNewPlayer() {
    resetFeedback()
    setPlayerEditingId(null)
    setPlayerForm(createPlayerForm())
  }

  function startEditPlayer(player: Player) {
    resetFeedback()
    setPlayerEditingId(player.id)
    setPlayerForm(playerToForm(player, countries))
  }

  function startNewArticle() {
    resetFeedback()
    setArticleEditingId(null)
    setArticleForm(createArticleForm())
  }

  function startEditArticle(article: Article) {
    resetFeedback()
    setArticleEditingId(article.id)
    setArticleForm(articleToForm(article, countries))
  }

  function startNewCompetition() {
    resetFeedback()
    setCompetitionEditingId(null)
    setCompetitionForm(createCompetitionForm())
  }

  function startEditCompetition(competition: Competition) {
    resetFeedback()
    setCompetitionEditingId(competition.id)
    setCompetitionForm(competitionToForm(competition, countries))
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault()
    if (!supabase) return

    setSubmitting(true)
    setError(null)
    setNotice(null)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
    }

    setSubmitting(false)
  }

  async function handleLogout() {
    if (!supabase) return

    await supabase.auth.signOut()
    setSession(null)
    setArticles([])
    setCompetitions([])
    setPlayers([])
    setCountries([])
    setMessages([])
    setMessageTagDrafts({})
    setNotice(null)
    setError(null)
  }

  async function handleSaveCountry(event: FormEvent) {
    event.preventDefault()
    setSavingTab('countries')
    resetFeedback()

    try {
      const payload = {
        slug: countryForm.slug.trim(),
        name: countryForm.name.trim(),
        code: countryForm.code.trim().toUpperCase(),
        flag: countryForm.flag.trim(),
        image: countryForm.image.trim(),
        federation: countryForm.federation.trim(),
        clubs: parseInteger(countryForm.clubs),
        players: parseInteger(countryForm.players),
        description: countryForm.description.trim(),
        tags: parseDelimitedList(countryForm.tags),
      }

      if (countryEditingId) {
        await countryService.update(countryEditingId, payload)
      } else {
        await countryService.create(payload)
      }

      await refreshData()
      setNotice(countryEditingId ? 'Pays mis à jour.' : 'Pays créé.')
      if (!countryEditingId) {
        startNewCountry()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible d’enregistrer le pays.')
    } finally {
      setSavingTab(null)
    }
  }

  async function handleSavePlayer(event: FormEvent) {
    event.preventDefault()
    setSavingTab('players')
    resetFeedback()

    try {
      const payload = {
        slug: playerForm.slug.trim(),
        name: playerForm.name.trim(),
        countryId: parseNullableInteger(playerForm.countryId),
        image: playerForm.image.trim(),
        ranking: parseInteger(playerForm.ranking),
        rating: parseInteger(playerForm.rating),
        titles: parseDelimitedList(playerForm.titles),
        tags: parseDelimitedList(playerForm.tags),
        bio: playerForm.bio.trim(),
        club: playerForm.club.trim(),
        featured: playerForm.featured,
      }

      if (playerEditingId) {
        await playerService.update(playerEditingId, payload)
      } else {
        await playerService.create(payload)
      }

      await refreshData()
      setNotice(playerEditingId ? 'Joueur mis à jour.' : 'Joueur créé.')
      if (!playerEditingId) {
        startNewPlayer()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible d’enregistrer le joueur.')
    } finally {
      setSavingTab(null)
    }
  }

  async function handleSaveArticle(event: FormEvent) {
    event.preventDefault()
    setSavingTab('articles')
    resetFeedback()

    try {
      const payload = {
        slug: articleForm.slug.trim(),
        title: articleForm.title.trim(),
        excerpt: articleForm.excerpt.trim(),
        content: articleForm.content.trim(),
        image: articleForm.image.trim(),
        category: articleForm.category.trim(),
        tags: parseDelimitedList(articleForm.tags),
        countryId: parseNullableInteger(articleForm.countryId),
        author: articleForm.author.trim(),
        authorImage: articleForm.authorImage.trim(),
        publishedAt: articleForm.publishedAt ? new Date(articleForm.publishedAt).toISOString() : new Date().toISOString(),
        readTime: articleForm.readTime.trim(),
        featured: articleForm.featured,
      }

      if (articleEditingId) {
        await articleService.update(articleEditingId, payload)
      } else {
        await articleService.create(payload)
      }

      await refreshData()
      setNotice(articleEditingId ? 'Article mis à jour.' : 'Article créé.')
      if (!articleEditingId) {
        startNewArticle()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible d’enregistrer l’article.')
    } finally {
      setSavingTab(null)
    }
  }

  async function handleSaveCompetition(event: FormEvent) {
    event.preventDefault()
    setSavingTab('competitions')
    resetFeedback()

    try {
      const payload = {
        slug: competitionForm.slug.trim(),
        name: competitionForm.name.trim(),
        location: competitionForm.location.trim(),
        countryId: parseNullableInteger(competitionForm.countryId),
        startDate: new Date(competitionForm.startDate).toISOString(),
        endDate: new Date(competitionForm.endDate).toISOString(),
        status: competitionForm.status,
        image: competitionForm.image.trim(),
        description: competitionForm.description.trim(),
        participants: parseInteger(competitionForm.participants),
        type: competitionForm.type.trim(),
        tags: parseDelimitedList(competitionForm.tags),
        results: parseResults(competitionForm.results),
      }

      if (competitionEditingId) {
        await competitionService.update(competitionEditingId, payload)
      } else {
        await competitionService.create(payload)
      }

      await refreshData()
      setNotice(competitionEditingId ? 'Compétition mise à jour.' : 'Compétition créée.')
      if (!competitionEditingId) {
        startNewCompetition()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible d’enregistrer la compétition.')
    } finally {
      setSavingTab(null)
    }
  }

  async function handleDeleteCountry(id: string) {
    if (!window.confirm('Supprimer ce pays ?')) return

    setSavingTab('countries')
    resetFeedback()

    try {
      await countryService.delete(id)
      await refreshData()
      if (countryEditingId === id) {
        startNewCountry()
      }
      setNotice('Pays supprimé.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de supprimer ce pays.')
    } finally {
      setSavingTab(null)
    }
  }

  async function handleDeletePlayer(id: string) {
    if (!window.confirm('Supprimer ce joueur ?')) return

    setSavingTab('players')
    resetFeedback()

    try {
      await playerService.delete(id)
      await refreshData()
      if (playerEditingId === id) {
        startNewPlayer()
      }
      setNotice('Joueur supprimé.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de supprimer ce joueur.')
    } finally {
      setSavingTab(null)
    }
  }

  async function handleDeleteArticle(id: string) {
    if (!window.confirm('Supprimer cet article ?')) return

    setSavingTab('articles')
    resetFeedback()

    try {
      await articleService.delete(id)
      await refreshData()
      if (articleEditingId === id) {
        startNewArticle()
      }
      setNotice('Article supprimé.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de supprimer cet article.')
    } finally {
      setSavingTab(null)
    }
  }

  async function handleDeleteCompetition(id: string) {
    if (!window.confirm('Supprimer cette compétition ?')) return

    setSavingTab('competitions')
    resetFeedback()

    try {
      await competitionService.delete(id)
      await refreshData()
      if (competitionEditingId === id) {
        startNewCompetition()
      }
      setNotice('Compétition supprimée.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de supprimer cette compétition.')
    } finally {
      setSavingTab(null)
    }
  }

  async function handleToggleMessageRead(message: Message) {
    setSavingTab('messages')
    resetFeedback()

    try {
      await messageService.update(message.id, { read: !message.read })
      await refreshData()
      setNotice(message.read ? 'Message marqué non lu.' : 'Message marqué lu.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de mettre à jour ce message.')
    } finally {
      setSavingTab(null)
    }
  }

  async function handleSaveMessageTag(messageId: string) {
    setSavingTab('messages')
    resetFeedback()

    try {
      await messageService.update(messageId, {
        tag: messageTagDrafts[messageId]?.trim() || 'general',
      })
      await refreshData()
      setNotice('Tag du message mis à jour.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de mettre à jour le tag.')
    } finally {
      setSavingTab(null)
    }
  }

  async function handleDeleteMessage(messageId: string) {
    if (!window.confirm('Supprimer ce message ?')) return

    setSavingTab('messages')
    resetFeedback()

    try {
      await messageService.delete(messageId)
      await refreshData()
      setNotice('Message supprimé.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de supprimer ce message.')
    } finally {
      setSavingTab(null)
    }
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-bg-primary px-6 py-24 text-text-primary">
        <SEO title="Admin indisponible | Scrabble Pro Afrique" />
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-10">
          <div className="mb-6 flex items-center gap-4">
            <ShieldAlert className="text-gold" size={28} />
            <h1 className="text-2xl font-bold">Administration indisponible</h1>
          </div>
          <p className="leading-relaxed text-text-secondary">
            Les variables Supabase ne sont pas configurées. Ajoutez `VITE_SUPABASE_URL` et
            `VITE_SUPABASE_PUBLISHABLE_KEY` puis redéployez l&apos;application.
          </p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] px-6 py-24 text-white">
        <SEO title="Connexion admin | Scrabble Pro Afrique" />
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl"
        >
          <div className="mb-8">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-light">Admin</p>
            <h1 className="text-3xl font-bold tracking-tight">Connexion sécurisée</h1>
            <p className="mt-3 text-sm text-zinc-400">
              Utilisez un compte Supabase autorisé avec `app_metadata.role = admin` ou une adresse
              `@scrabblepro.africa`.
            </p>
          </div>

          <div className="space-y-5">
            <InputField
              label="Email"
              value={email}
              onChange={setEmail}
              type="email"
              placeholder="admin@scrabblepro.africa"
              required
            />
            <InputField
              label="Mot de passe"
              value={password}
              onChange={setPassword}
              type="password"
              placeholder="Votre mot de passe"
              required
            />
          </div>

          {error ? <Alert tone="error">{error}</Alert> : null}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-zinc-200 disabled:opacity-60"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
            {submitting ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-bg-primary px-6 py-24 text-text-primary">
        <SEO title="Accès refusé | Scrabble Pro Afrique" />
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-10">
          <div className="mb-6 flex items-center gap-4">
            <ShieldAlert className="text-red-400" size={28} />
            <h1 className="text-2xl font-bold">Accès refusé</h1>
          </div>
          <p className="leading-relaxed text-text-secondary">
            Le compte connecté n&apos;a pas les autorisations d&apos;administration nécessaires.
          </p>
          <button
            onClick={() => void handleLogout()}
            className="mt-8 rounded-2xl border border-white/10 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-black"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <SEO title="Admin | Scrabble Pro Afrique" />

      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0b0d11]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-light">
              Admin Console
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight">Scrabble Pro Afrique</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => void refreshData()}
              disabled={loadingData}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white"
            >
              <RefreshCcw size={14} className={loadingData ? 'animate-spin' : ''} />
              Actualiser
            </button>
            <button
              onClick={() => void handleLogout()}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-black"
            >
              <LogOut size={14} />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.2em] transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-black'
                  : 'border border-white/10 bg-white/[0.03] text-text-secondary hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error ? <Alert tone="error">{error}</Alert> : null}
        {notice ? <Alert tone="success">{notice}</Alert> : null}

        {activeTab === 'dashboard' ? (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              <StatCard icon={FileText} label="Articles" value={articles.length.toString()} />
              <StatCard icon={Trophy} label="Compétitions" value={competitions.length.toString()} />
              <StatCard icon={Users} label="Joueurs" value={players.length.toString()} />
              <StatCard icon={Globe} label="Pays" value={countries.length.toString()} />
              <StatCard icon={Mail} label="Messages" value={messages.length.toString()} />
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <Panel title="Derniers articles">
                {articles.slice(0, 5).map((article) => (
                  <SimpleRow
                    key={article.id}
                    title={article.title}
                    subtitle={`${article.category} · ${new Date(article.date).toLocaleDateString('fr-FR')}`}
                  />
                ))}
              </Panel>

              <Panel title="Derniers messages">
                {messages.length > 0 ? (
                  messages.slice(0, 5).map((message) => (
                    <SimpleRow
                      key={message.id}
                      title={message.subject}
                      subtitle={`${message.name} · ${message.email}`}
                    />
                  ))
                ) : (
                  <EmptyState text="Aucun message disponible ou accès RLS non accordé." />
                )}
              </Panel>
            </div>
          </div>
        ) : null}

        {activeTab === 'countries' ? (
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <Panel
              title="Pays enregistrés"
              action={
                <ActionButton onClick={startNewCountry}>
                  <Plus size={14} />
                  Nouveau
                </ActionButton>
              }
            >
              {countries.length > 0 ? (
                countries.map((country) => (
                  <RecordRow
                    key={country.id}
                    title={country.name}
                    subtitle={`${country.code} · ${country.federation}`}
                    meta={`${country.clubs} clubs · ${country.players} joueurs`}
                    onEdit={() => startEditCountry(country)}
                    onDelete={() => void handleDeleteCountry(country.id)}
                    busy={savingTab === 'countries'}
                  />
                ))
              ) : (
                <EmptyState text="Aucun pays disponible." />
              )}
            </Panel>

            <Panel title={countryEditingId ? 'Modifier le pays' : 'Créer un pays'}>
              <form onSubmit={handleSaveCountry} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField label="Nom" value={countryForm.name} onChange={(value) => setCountryForm((current) => ({ ...current, name: value }))} required />
                  <InputWithAction
                    label="Slug"
                    value={countryForm.slug}
                    onChange={(value) => setCountryForm((current) => ({ ...current, slug: value }))}
                    buttonLabel="Générer"
                    onAction={() =>
                      setCountryForm((current) => ({ ...current, slug: toSlug(current.name || current.code) }))
                    }
                    required
                  />
                  <InputField label="Code" value={countryForm.code} onChange={(value) => setCountryForm((current) => ({ ...current, code: value }))} required />
                  <InputField label="Drapeau" value={countryForm.flag} onChange={(value) => setCountryForm((current) => ({ ...current, flag: value }))} required />
                  <InputField label="Image" value={countryForm.image} onChange={(value) => setCountryForm((current) => ({ ...current, image: value }))} required />
                  <InputField label="Fédération" value={countryForm.federation} onChange={(value) => setCountryForm((current) => ({ ...current, federation: value }))} required />
                  <InputField label="Clubs" value={countryForm.clubs} onChange={(value) => setCountryForm((current) => ({ ...current, clubs: value }))} type="number" required />
                  <InputField label="Joueurs" value={countryForm.players} onChange={(value) => setCountryForm((current) => ({ ...current, players: value }))} type="number" required />
                </div>
                <TextAreaField label="Description" value={countryForm.description} onChange={(value) => setCountryForm((current) => ({ ...current, description: value }))} rows={5} required />
                <InputField label="Tags (séparés par des virgules)" value={countryForm.tags} onChange={(value) => setCountryForm((current) => ({ ...current, tags: value }))} />
                <FormActions
                  onReset={startNewCountry}
                  saving={savingTab === 'countries'}
                  submitLabel={countryEditingId ? 'Mettre à jour' : 'Créer'}
                />
              </form>
            </Panel>
          </div>
        ) : null}

        {activeTab === 'players' ? (
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <Panel
              title="Joueurs"
              action={
                <ActionButton onClick={startNewPlayer}>
                  <Plus size={14} />
                  Nouveau
                </ActionButton>
              }
            >
              {players.length > 0 ? (
                players.map((player) => (
                  <RecordRow
                    key={player.id}
                    title={player.name}
                    subtitle={`${player.country || 'Sans pays'} · #${player.ranking}`}
                    meta={`Rating ${player.rating} · ${player.club}`}
                    onEdit={() => startEditPlayer(player)}
                    onDelete={() => void handleDeletePlayer(player.id)}
                    busy={savingTab === 'players'}
                  />
                ))
              ) : (
                <EmptyState text="Aucun joueur disponible." />
              )}
            </Panel>

            <Panel title={playerEditingId ? 'Modifier le joueur' : 'Créer un joueur'}>
              <form onSubmit={handleSavePlayer} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField label="Nom" value={playerForm.name} onChange={(value) => setPlayerForm((current) => ({ ...current, name: value }))} required />
                  <InputWithAction
                    label="Slug"
                    value={playerForm.slug}
                    onChange={(value) => setPlayerForm((current) => ({ ...current, slug: value }))}
                    buttonLabel="Générer"
                    onAction={() => setPlayerForm((current) => ({ ...current, slug: toSlug(current.name) }))}
                    required
                  />
                  <SelectField
                    label="Pays"
                    value={playerForm.countryId}
                    onChange={(value) => setPlayerForm((current) => ({ ...current, countryId: value }))}
                    options={countries.map((country) => ({ value: country.id, label: country.name }))}
                  />
                  <InputField label="Image" value={playerForm.image} onChange={(value) => setPlayerForm((current) => ({ ...current, image: value }))} required />
                  <InputField label="Classement" value={playerForm.ranking} onChange={(value) => setPlayerForm((current) => ({ ...current, ranking: value }))} type="number" required />
                  <InputField label="Rating" value={playerForm.rating} onChange={(value) => setPlayerForm((current) => ({ ...current, rating: value }))} type="number" required />
                  <InputField label="Club" value={playerForm.club} onChange={(value) => setPlayerForm((current) => ({ ...current, club: value }))} required />
                  <InputField label="Titres (virgules)" value={playerForm.titles} onChange={(value) => setPlayerForm((current) => ({ ...current, titles: value }))} />
                  <InputField label="Tags (virgules)" value={playerForm.tags} onChange={(value) => setPlayerForm((current) => ({ ...current, tags: value }))} />
                </div>
                <TextAreaField label="Biographie" value={playerForm.bio} onChange={(value) => setPlayerForm((current) => ({ ...current, bio: value }))} rows={6} required />
                <CheckboxField label="Mettre en avant ce joueur" checked={playerForm.featured} onChange={(value) => setPlayerForm((current) => ({ ...current, featured: value }))} />
                <FormActions
                  onReset={startNewPlayer}
                  saving={savingTab === 'players'}
                  submitLabel={playerEditingId ? 'Mettre à jour' : 'Créer'}
                />
              </form>
            </Panel>
          </div>
        ) : null}

        {activeTab === 'articles' ? (
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <Panel
              title="Articles"
              action={
                <ActionButton onClick={startNewArticle}>
                  <Plus size={14} />
                  Nouveau
                </ActionButton>
              }
            >
              {articles.length > 0 ? (
                articles.map((article) => (
                  <RecordRow
                    key={article.id}
                    title={article.title}
                    subtitle={`${article.category} · ${article.country}`}
                    meta={`${article.author} · ${new Date(article.date).toLocaleDateString('fr-FR')}`}
                    onEdit={() => startEditArticle(article)}
                    onDelete={() => void handleDeleteArticle(article.id)}
                    busy={savingTab === 'articles'}
                  />
                ))
              ) : (
                <EmptyState text="Aucun article disponible." />
              )}
            </Panel>

            <Panel title={articleEditingId ? 'Modifier l’article' : 'Créer un article'}>
              <form onSubmit={handleSaveArticle} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField label="Titre" value={articleForm.title} onChange={(value) => setArticleForm((current) => ({ ...current, title: value }))} required />
                  <InputWithAction
                    label="Slug"
                    value={articleForm.slug}
                    onChange={(value) => setArticleForm((current) => ({ ...current, slug: value }))}
                    buttonLabel="Générer"
                    onAction={() => setArticleForm((current) => ({ ...current, slug: toSlug(current.title) }))}
                    required
                  />
                  <InputField label="Catégorie" value={articleForm.category} onChange={(value) => setArticleForm((current) => ({ ...current, category: value }))} required />
                  <SelectField
                    label="Pays"
                    value={articleForm.countryId}
                    onChange={(value) => setArticleForm((current) => ({ ...current, countryId: value }))}
                    options={countries.map((country) => ({ value: country.id, label: country.name }))}
                  />
                  <InputField label="Image" value={articleForm.image} onChange={(value) => setArticleForm((current) => ({ ...current, image: value }))} required />
                  <InputField label="Auteur" value={articleForm.author} onChange={(value) => setArticleForm((current) => ({ ...current, author: value }))} required />
                  <InputField label="Image auteur" value={articleForm.authorImage} onChange={(value) => setArticleForm((current) => ({ ...current, authorImage: value }))} required />
                  <InputField label="Publication" value={articleForm.publishedAt} onChange={(value) => setArticleForm((current) => ({ ...current, publishedAt: value }))} type="datetime-local" required />
                  <InputField label="Temps de lecture" value={articleForm.readTime} onChange={(value) => setArticleForm((current) => ({ ...current, readTime: value }))} placeholder="5 min" required />
                  <InputField label="Tags (virgules)" value={articleForm.tags} onChange={(value) => setArticleForm((current) => ({ ...current, tags: value }))} />
                </div>
                <TextAreaField label="Extrait" value={articleForm.excerpt} onChange={(value) => setArticleForm((current) => ({ ...current, excerpt: value }))} rows={4} required />
                <TextAreaField label="Contenu" value={articleForm.content} onChange={(value) => setArticleForm((current) => ({ ...current, content: value }))} rows={10} required />
                <CheckboxField label="Mettre en avant cet article" checked={articleForm.featured} onChange={(value) => setArticleForm((current) => ({ ...current, featured: value }))} />
                <FormActions
                  onReset={startNewArticle}
                  saving={savingTab === 'articles'}
                  submitLabel={articleEditingId ? 'Mettre à jour' : 'Créer'}
                />
              </form>
            </Panel>
          </div>
        ) : null}

        {activeTab === 'competitions' ? (
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <Panel
              title="Compétitions"
              action={
                <ActionButton onClick={startNewCompetition}>
                  <Plus size={14} />
                  Nouveau
                </ActionButton>
              }
            >
              {competitions.length > 0 ? (
                competitions.map((competition) => (
                  <RecordRow
                    key={competition.id}
                    title={competition.name}
                    subtitle={`${competition.location} · ${competition.status}`}
                    meta={`${competition.participants} participants`}
                    onEdit={() => startEditCompetition(competition)}
                    onDelete={() => void handleDeleteCompetition(competition.id)}
                    busy={savingTab === 'competitions'}
                  />
                ))
              ) : (
                <EmptyState text="Aucune compétition disponible." />
              )}
            </Panel>

            <Panel title={competitionEditingId ? 'Modifier la compétition' : 'Créer une compétition'}>
              <form onSubmit={handleSaveCompetition} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField label="Nom" value={competitionForm.name} onChange={(value) => setCompetitionForm((current) => ({ ...current, name: value }))} required />
                  <InputWithAction
                    label="Slug"
                    value={competitionForm.slug}
                    onChange={(value) => setCompetitionForm((current) => ({ ...current, slug: value }))}
                    buttonLabel="Générer"
                    onAction={() =>
                      setCompetitionForm((current) => ({ ...current, slug: toSlug(current.name) }))
                    }
                    required
                  />
                  <InputField label="Lieu" value={competitionForm.location} onChange={(value) => setCompetitionForm((current) => ({ ...current, location: value }))} required />
                  <SelectField
                    label="Pays"
                    value={competitionForm.countryId}
                    onChange={(value) => setCompetitionForm((current) => ({ ...current, countryId: value }))}
                    options={countries.map((country) => ({ value: country.id, label: country.name }))}
                  />
                  <InputField label="Début" value={competitionForm.startDate} onChange={(value) => setCompetitionForm((current) => ({ ...current, startDate: value }))} type="datetime-local" required />
                  <InputField label="Fin" value={competitionForm.endDate} onChange={(value) => setCompetitionForm((current) => ({ ...current, endDate: value }))} type="datetime-local" required />
                  <SelectField
                    label="Statut"
                    value={competitionForm.status}
                    onChange={(value) =>
                      setCompetitionForm((current) => ({
                        ...current,
                        status: value as Competition['status'],
                      }))
                    }
                    options={[
                      { value: 'upcoming', label: 'À venir' },
                      { value: 'ongoing', label: 'En cours' },
                      { value: 'completed', label: 'Terminée' },
                    ]}
                    required
                  />
                  <InputField label="Participants" value={competitionForm.participants} onChange={(value) => setCompetitionForm((current) => ({ ...current, participants: value }))} type="number" required />
                  <InputField label="Type" value={competitionForm.type} onChange={(value) => setCompetitionForm((current) => ({ ...current, type: value }))} required />
                  <InputField label="Image" value={competitionForm.image} onChange={(value) => setCompetitionForm((current) => ({ ...current, image: value }))} required />
                  <InputField label="Tags (virgules)" value={competitionForm.tags} onChange={(value) => setCompetitionForm((current) => ({ ...current, tags: value }))} />
                </div>
                <TextAreaField label="Description" value={competitionForm.description} onChange={(value) => setCompetitionForm((current) => ({ ...current, description: value }))} rows={6} required />
                <TextAreaField
                  label="Résultats JSON"
                  value={competitionForm.results}
                  onChange={(value) => setCompetitionForm((current) => ({ ...current, results: value }))}
                  rows={8}
                />
                <FormActions
                  onReset={startNewCompetition}
                  saving={savingTab === 'competitions'}
                  submitLabel={competitionEditingId ? 'Mettre à jour' : 'Créer'}
                />
              </form>
            </Panel>
          </div>
        ) : null}

        {activeTab === 'messages' ? (
          <Panel title="Messages entrants">
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-white">{message.subject}</h3>
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${
                              message.read
                                ? 'bg-emerald/15 text-emerald-light'
                                : 'bg-gold/15 text-gold'
                            }`}
                          >
                            {message.read ? 'Lu' : 'Non lu'}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-text-secondary">
                          {message.name} · {message.email} ·{' '}
                          {new Date(message.createdAt).toLocaleString('fr-FR')}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <ActionButton
                          onClick={() => void handleToggleMessageRead(message)}
                          disabled={savingTab === 'messages'}
                        >
                          {message.read ? 'Marquer non lu' : 'Marquer lu'}
                        </ActionButton>
                        <DangerButton
                          onClick={() => void handleDeleteMessage(message.id)}
                          disabled={savingTab === 'messages'}
                        >
                          <Trash2 size={14} />
                          Supprimer
                        </DangerButton>
                      </div>
                    </div>

                    <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/85">
                      {message.content}
                    </p>

                    <div className="mt-5 flex flex-wrap items-end gap-3">
                      <div className="min-w-[220px] flex-1">
                        <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">
                          Tag
                        </label>
                        <input
                          value={messageTagDrafts[message.id] ?? message.tag}
                          onChange={(event) =>
                            setMessageTagDrafts((current) => ({
                              ...current,
                              [message.id]: event.target.value,
                            }))
                          }
                          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-emerald/40"
                        />
                      </div>
                      <ActionButton
                        onClick={() => void handleSaveMessageTag(message.id)}
                        disabled={savingTab === 'messages'}
                      >
                        <Save size={14} />
                        Enregistrer le tag
                      </ActionButton>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="Aucun message disponible." />
            )}
          </Panel>
        ) : null}
      </main>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FileText
  label: string
  value: string
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04] text-emerald-light">
        <Icon size={20} />
      </div>
      <div className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">{label}</div>
      <div className="mt-3 text-4xl font-bold tracking-tight text-white">{value}</div>
    </div>
  )
}

function Panel({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function Alert({ tone, children }: { tone: 'error' | 'success'; children: ReactNode }) {
  return (
    <div
      className={`mb-8 rounded-2xl px-4 py-3 text-sm ${
        tone === 'error'
          ? 'border border-red-500/20 bg-red-500/10 text-red-300'
          : 'border border-emerald/20 bg-emerald/10 text-emerald-100'
      }`}
    >
      {children}
    </div>
  )
}

function SimpleRow({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-start justify-between border-t border-white/5 py-4 first:border-t-0 first:pt-0 last:pb-0">
      <div>
        <div className="font-semibold text-white">{title}</div>
        <div className="mt-1 text-sm text-text-secondary">{subtitle}</div>
      </div>
    </div>
  )
}

function RecordRow({
  title,
  subtitle,
  meta,
  onEdit,
  onDelete,
  busy,
}: {
  title: string
  subtitle: string
  meta: string
  onEdit: () => void
  onDelete: () => void
  busy?: boolean
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-t border-white/5 py-4 first:border-t-0 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <div className="font-semibold text-white">{title}</div>
        <div className="mt-1 text-sm text-text-secondary">{subtitle}</div>
        <div className="mt-1 text-xs uppercase tracking-[0.16em] text-text-muted">{meta}</div>
      </div>
      <div className="flex gap-2">
        <ActionButton onClick={onEdit} disabled={busy}>
          <Pencil size={14} />
          Modifier
        </ActionButton>
        <DangerButton onClick={onDelete} disabled={busy}>
          <Trash2 size={14} />
          Supprimer
        </DangerButton>
      </div>
    </div>
  )
}

function ActionButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/[0.08] disabled:opacity-60"
    >
      {children}
    </button>
  )
}

function DangerButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-red-200 transition-colors hover:bg-red-500/15 disabled:opacity-60"
    >
      {children}
    </button>
  )
}

function FormActions({
  onReset,
  saving,
  submitLabel,
}: {
  onReset: () => void
  saving: boolean
  submitLabel: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-black disabled:opacity-60"
      >
        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
        {saving ? 'Enregistrement...' : submitLabel}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-2xl border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-text-secondary"
      >
        Réinitialiser
      </button>
    </div>
  )
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">
      {children}
    </label>
  )
}

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-emerald/40"
      />
    </div>
  )
}

function InputWithAction({
  label,
  value,
  onChange,
  buttonLabel,
  onAction,
  required,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  buttonLabel: string
  onAction: () => void
  required?: boolean
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex gap-2">
        <input
          value={value}
          required={required}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-emerald/40"
        />
        <button
          type="button"
          onClick={onAction}
          className="rounded-2xl border border-white/10 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-text-secondary"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

function TextAreaField({
  label,
  value,
  onChange,
  rows,
  required,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  rows: number
  required?: boolean
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        rows={rows}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-emerald/40"
      />
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  required?: boolean
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-emerald/40"
      >
        <option value="">Aucun</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  )
}

function EmptyState({ text }: { text: string }) {
  return <p className="text-sm text-text-secondary">{text}</p>
}
