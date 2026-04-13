import { supabase } from './supabase';
import type { Article, Player, Competition, Country } from './data';

// --- Transformers ---

const transformArticle = (a: any): Article => ({
  id: a.id.toString(),
  slug: a.slug,
  title: a.title,
  excerpt: a.excerpt,
  content: a.content,
  image: a.image,
  category: a.category,
  tags: a.tags,
  country: a.countries?.name || 'International',
  author: a.author,
  authorImage: a.author_image,
  date: a.published_at,
  readTime: a.read_time,
  featured: a.featured
});

const transformPlayer = (p: any): Player => ({
  id: p.id.toString(),
  slug: p.slug,
  name: p.name,
  country: p.countries?.name || '',
  countryFlag: p.countries?.flag || '🌍',
  image: p.image,
  ranking: p.ranking,
  rating: p.rating,
  titles: p.titles,
  tags: p.tags,
  bio: p.bio,
  club: p.club,
  featured: p.featured
});

const transformCompetition = (c: any): Competition => ({
  id: c.id.toString(),
  slug: c.slug,
  name: c.name,
  location: c.location,
  country: c.countries?.name || '',
  startDate: c.start_date,
  endDate: c.end_date,
  status: c.status,
  image: c.image,
  description: c.description,
  participants: c.participants,
  type: c.type,
  tags: c.tags,
  results: c.results
});

const transformCountry = (c: any): Country => ({
  id: c.id.toString(),
  slug: c.slug,
  name: c.name,
  code: c.code,
  flag: c.flag,
  image: c.image,
  federation: c.federation,
  clubs: c.clubs,
  players: c.players,
  description: c.description,
  tags: c.tags
});

// --- Services ---

export const articleService = {
  async getAll() {
    const { data, error } = await supabase
      .from('articles')
      .select('*, countries(name)')
      .order('published_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(transformArticle);
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('articles')
      .select('*, countries(name)')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return transformArticle(data);
  },

  async getFeatured() {
    const { data, error } = await supabase
      .from('articles')
      .select('*, countries(name)')
      .eq('featured', true)
      .limit(3);
    if (error) throw error;
    return (data || []).map(transformArticle);
  }
};

export const playerService = {
  async getAll() {
    const { data, error } = await supabase
      .from('players')
      .select('*, countries(name, flag)')
      .order('ranking', { ascending: true });
    if (error) throw error;
    return (data || []).map(transformPlayer);
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('players')
      .select('*, countries(name, flag)')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return transformPlayer(data);
  }
};

export const competitionService = {
  async getAll() {
    const { data, error } = await supabase
      .from('competitions')
      .select('*, countries(name)')
      .order('start_date', { ascending: true });
    if (error) throw error;
    return (data || []).map(transformCompetition);
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('competitions')
      .select('*, countries(name)')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return transformCompetition(data);
  },

  async getUpcoming() {
    const { data, error } = await supabase
      .from('competitions')
      .select('*, countries(name)')
      .neq('status', 'completed')
      .order('start_date', { ascending: true })
      .limit(3);
    if (error) throw error;
    return (data || []).map(transformCompetition);
  }
};

export const countryService = {
  async getAll() {
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .order('name', { ascending: true });
    if (error) throw error;
    return (data || []).map(transformCountry);
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return transformCountry(data);
  }
};

export const messageService = {
  async send(message: { name: string; email: string; subject: string; content: string; tag?: string }) {
    const { data, error } = await supabase
      .from('messages')
      .insert([message]);
    if (error) throw error;
    return data;
  }
};
