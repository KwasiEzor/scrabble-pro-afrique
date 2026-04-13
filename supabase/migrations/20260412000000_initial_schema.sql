-- Initial Schema for Scrabble Pro Afrique

-- Enable extensions
create extension if not exists "uuid-ossp";

-- 1. Countries Table
create table public.countries (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null unique,
  code text not null unique,
  flag text not null,
  image text not null,
  federation text not null,
  clubs integer default 0,
  players integer default 0,
  description text,
  tags text[] default '{}',
  created_at timestamptz default now()
);

-- 2. Players Table
create table public.players (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  country_id bigint references public.countries(id) on delete set null,
  image text not null,
  ranking integer default 0,
  rating integer default 0,
  titles text[] default '{}',
  tags text[] default '{}',
  bio text,
  club text,
  featured boolean default false,
  created_at timestamptz default now()
);

-- 3. Articles Table
create table public.articles (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  image text not null,
  category text not null,
  tags text[] default '{}',
  country_id bigint references public.countries(id) on delete set null,
  author text not null,
  author_image text not null,
  published_at timestamptz not null default now(),
  read_time text not null,
  featured boolean default false,
  created_at timestamptz default now()
);

-- 4. Competitions Table
create table public.competitions (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  location text not null,
  country_id bigint references public.countries(id) on delete set null,
  start_date timestamptz not null,
  end_date timestamptz not null,
  status text not null check (status in ('upcoming', 'ongoing', 'completed')),
  image text not null,
  description text not null,
  participants integer default 0,
  type text not null,
  tags text[] default '{}',
  results jsonb default '[]',
  created_at timestamptz default now()
);

-- 5. Messages Table
create table public.messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  subject text not null,
  content text not null,
  read boolean default false,
  tag text,
  created_at timestamptz default now()
);

create table public.submission_rate_limits (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  route text not null,
  window_start timestamptz not null default date_trunc('hour', now()),
  attempts integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint submission_rate_limits_unique_window unique (ip_hash, route, window_start)
);

-- Create indexes for foreign keys and slugs (Performance Best Practice)
create index players_country_id_idx on public.players (country_id);
create index players_slug_idx on public.players (slug);
create index articles_country_id_idx on public.articles (country_id);
create index articles_slug_idx on public.articles (slug);
create index competitions_country_id_idx on public.competitions (country_id);
create index competitions_slug_idx on public.competitions (slug);
create index countries_slug_idx on public.countries (slug);
create index messages_created_at_idx on public.messages (created_at desc);
create index submission_rate_limits_route_window_idx on public.submission_rate_limits (route, window_start desc);

-- Row Level Security (Security Best Practice)

-- Enable RLS on all tables
alter table public.countries enable row level security;
alter table public.players enable row level security;
alter table public.articles enable row level security;
alter table public.competitions enable row level security;
alter table public.messages enable row level security;
alter table public.submission_rate_limits enable row level security;

-- Policies for public access (Read-only)
create policy "Allow public read access for countries" on public.countries for select using (true);
create policy "Allow public read access for players" on public.players for select using (true);
create policy "Allow public read access for articles" on public.articles for select using (true);
create policy "Allow public read access for competitions" on public.competitions for select using (true);

-- Policies for Admin (Full access - requires authentication)
-- Prefer app_metadata.role = 'admin'. Domain-based access is kept as a fallback.
create policy "Allow admin full access for countries" on public.countries for all
  to authenticated
  using (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    or coalesce(auth.jwt() ->> 'email', '') like '%@scrabblepro.africa'
  )
  with check (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    or coalesce(auth.jwt() ->> 'email', '') like '%@scrabblepro.africa'
  );

create policy "Allow admin full access for players" on public.players for all
  to authenticated
  using (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    or coalesce(auth.jwt() ->> 'email', '') like '%@scrabblepro.africa'
  )
  with check (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    or coalesce(auth.jwt() ->> 'email', '') like '%@scrabblepro.africa'
  );

create policy "Allow admin full access for articles" on public.articles for all
  to authenticated
  using (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    or coalesce(auth.jwt() ->> 'email', '') like '%@scrabblepro.africa'
  )
  with check (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    or coalesce(auth.jwt() ->> 'email', '') like '%@scrabblepro.africa'
  );

create policy "Allow admin full access for competitions" on public.competitions for all
  to authenticated
  using (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    or coalesce(auth.jwt() ->> 'email', '') like '%@scrabblepro.africa'
  )
  with check (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    or coalesce(auth.jwt() ->> 'email', '') like '%@scrabblepro.africa'
  );

-- Messages: Admin can read/update. Public writes must go through Edge Functions.
create policy "Allow admin full access for messages" on public.messages for all
  to authenticated
  using (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    or coalesce(auth.jwt() ->> 'email', '') like '%@scrabblepro.africa'
  )
  with check (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    or coalesce(auth.jwt() ->> 'email', '') like '%@scrabblepro.africa'
  );
