-- Secure public submissions by routing writes through Edge Functions.

create table if not exists public.submission_rate_limits (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  route text not null,
  window_start timestamptz not null default date_trunc('hour', now()),
  attempts integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint submission_rate_limits_unique_window unique (ip_hash, route, window_start)
);

create index if not exists submission_rate_limits_route_window_idx
  on public.submission_rate_limits (route, window_start desc);

alter table public.submission_rate_limits enable row level security;

drop policy if exists "Allow public to send messages" on public.messages;
