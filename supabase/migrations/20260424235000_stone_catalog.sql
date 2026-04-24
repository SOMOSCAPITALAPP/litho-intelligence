create table if not exists public.stones (
  id text primary key,
  name text not null,
  category text not null,
  description text not null,
  origins text[] not null default '{}',
  colors text[] not null default '{}',
  chakra text[] not null default '{}',
  elements text[] not null default '{}',
  emotions text[] not null default '{}',
  intentions text[] not null default '{}',
  properties text[] not null default '{}',
  usage text[] not null default '{}',
  rituals text[] not null default '{}',
  combinations_positive text[] not null default '{}',
  combinations_negative text[] not null default '{}',
  purification text[] not null default '{}',
  recharge text[] not null default '{}',
  price_range text,
  seo_keywords text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stone_mappings (
  key text primary key,
  stone_ids text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  stone_id text not null references public.stones(id) on delete cascade,
  title text not null,
  brand text not null,
  price numeric(10, 2),
  amazon_url text not null,
  image_url text,
  margin_estimate numeric(5, 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stone_scores (
  stone_id text primary key references public.stones(id) on delete cascade,
  scores jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.stones enable row level security;
alter table public.stone_mappings enable row level security;
alter table public.products enable row level security;
alter table public.stone_scores enable row level security;

drop policy if exists "Stone catalog is publicly readable" on public.stones;
create policy "Stone catalog is publicly readable"
on public.stones for select
using (true);

drop policy if exists "Stone mappings are publicly readable" on public.stone_mappings;
create policy "Stone mappings are publicly readable"
on public.stone_mappings for select
using (true);

drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable"
on public.products for select
using (true);

drop policy if exists "Stone scores are publicly readable" on public.stone_scores;
create policy "Stone scores are publicly readable"
on public.stone_scores for select
using (true);
