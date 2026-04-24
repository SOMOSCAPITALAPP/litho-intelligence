create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  plan text not null default 'free' check (plan in ('free', 'premium', 'elite')),
  stripe_customer_id text,
  newsletter_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stripe_subscription_id text unique,
  stripe_customer_id text,
  plan text not null default 'premium',
  status text not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.usage_limits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  recommendations_count integer not null default 0,
  combinations_count integer not null default 0,
  unique (user_id, date)
);

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stone_slug text not null,
  created_at timestamptz not null default now(),
  unique (user_id, stone_slug)
);

create table if not exists public.recommendation_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  user_input jsonb not null,
  result jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  file_slug text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  consent boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  event_name text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at
before update on public.subscriptions
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, plan, newsletter_opt_in)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', null),
    'free',
    coalesce((new.raw_user_meta_data->>'newsletter_opt_in')::boolean, false)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.increment_usage_limit(p_user_id uuid, p_date date, p_feature text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.usage_limits (user_id, date, recommendations_count, combinations_count)
  values (
    p_user_id,
    p_date,
    case when p_feature = 'recommendations' then 1 else 0 end,
    case when p_feature = 'combinations' then 1 else 0 end
  )
  on conflict (user_id, date)
  do update set
    recommendations_count = public.usage_limits.recommendations_count + case when p_feature = 'recommendations' then 1 else 0 end,
    combinations_count = public.usage_limits.combinations_count + case when p_feature = 'combinations' then 1 else 0 end;
end;
$$;

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.usage_limits enable row level security;
alter table public.favorites enable row level security;
alter table public.recommendation_history enable row level security;
alter table public.downloads enable row level security;
alter table public.leads enable row level security;
alter table public.events enable row level security;

create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users can read own subscriptions" on public.subscriptions for select using (auth.uid() = user_id);
create policy "Users can read own usage" on public.usage_limits for select using (auth.uid() = user_id);

create policy "Users manage own favorites" on public.favorites for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users read own recommendation history" on public.recommendation_history for select using (auth.uid() = user_id);
create policy "Users insert own recommendation history" on public.recommendation_history for insert with check (auth.uid() = user_id);
create policy "Users read own downloads" on public.downloads for select using (auth.uid() = user_id);
create policy "Users insert own downloads" on public.downloads for insert with check (auth.uid() = user_id);

create policy "Anyone can subscribe to newsletter" on public.leads for insert with check (true);
create policy "Users can insert own events" on public.events for insert with check (auth.uid() = user_id or user_id is null);
