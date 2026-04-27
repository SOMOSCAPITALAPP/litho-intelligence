create table if not exists public.consultation_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stripe_checkout_session_id text not null,
  is_test boolean not null default false,
  status text not null default 'active' check (status in ('active', 'warning', 'completed', 'expired', 'cancelled')),
  started_at timestamptz not null default now(),
  warning_at timestamptz not null,
  expires_at timestamptz not null,
  ended_at timestamptz,
  last_activity_at timestamptz not null default now(),
  user_message_count integer not null default 0,
  assistant_message_count integer not null default 0,
  token_estimate integer not null default 0,
  summary_json jsonb not null default '{}'::jsonb,
  profile_json jsonb not null default '{}'::jsonb,
  latest_question text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, stripe_checkout_session_id)
);

create table if not exists public.premium_gift_claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  quarter_key text not null,
  stone_slug text,
  created_at timestamptz not null default now(),
  unique (user_id, quarter_key)
);

drop trigger if exists consultation_sessions_set_updated_at on public.consultation_sessions;
create trigger consultation_sessions_set_updated_at
before update on public.consultation_sessions
for each row execute function public.set_updated_at();

alter table public.consultation_sessions enable row level security;
alter table public.premium_gift_claims enable row level security;

create policy "Users can read own consultation sessions"
on public.consultation_sessions
for select
using (auth.uid() = user_id);

create policy "Users can read own premium gift claims"
on public.premium_gift_claims
for select
using (auth.uid() = user_id);
