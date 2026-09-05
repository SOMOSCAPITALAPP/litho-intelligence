create extension if not exists "pgcrypto";

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  full_name text,
  plan text not null default 'free' check (plan in ('free', 'premium', 'elite')),
  stripe_customer_id text,
  newsletter_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text,
  source text,
  consent boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_users(id) on delete set null,
  event_name text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  stone_slug text not null,
  created_at timestamptz not null default now(),
  unique (user_id, stone_slug)
);

create table if not exists recommendation_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_users(id) on delete set null,
  user_input jsonb not null,
  result jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists usage_limits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  date date not null,
  recommendations_count integer not null default 0,
  combinations_count integer not null default 0,
  unique (user_id, date)
);

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists app_users_set_updated_at on app_users;
create trigger app_users_set_updated_at
before update on app_users
for each row execute function set_updated_at();

drop trigger if exists leads_set_updated_at on leads;
create trigger leads_set_updated_at
before update on leads
for each row execute function set_updated_at();

create index if not exists events_event_name_created_at_idx on events (event_name, created_at desc);
create index if not exists leads_source_created_at_idx on leads (source, created_at desc);
create index if not exists leads_metadata_gin_idx on leads using gin (metadata);
