create table if not exists public.ai_cache (
  id uuid primary key default gen_random_uuid(),
  input_hash text not null unique,
  response_json jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  input jsonb not null,
  source text not null check (source in ('local', 'cache', 'ai', 'fallback')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ai_cache_input_hash_idx on public.ai_cache (input_hash);
create index if not exists ai_usage_logs_source_created_at_idx on public.ai_usage_logs (source, created_at);
create index if not exists ai_usage_logs_user_source_created_at_idx on public.ai_usage_logs (user_id, source, created_at);

alter table public.ai_cache enable row level security;
alter table public.ai_usage_logs enable row level security;

drop policy if exists "Service role manages ai cache" on public.ai_cache;
create policy "Service role manages ai cache" on public.ai_cache
for all using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

drop policy if exists "Service role manages ai usage logs" on public.ai_usage_logs;
create policy "Service role manages ai usage logs" on public.ai_usage_logs
for all using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

drop policy if exists "Users can read own ai usage logs" on public.ai_usage_logs;
create policy "Users can read own ai usage logs" on public.ai_usage_logs
for select using (auth.uid() = user_id);
