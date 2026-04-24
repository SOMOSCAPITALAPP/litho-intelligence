create table if not exists public.native_stones (
  slug text primary key,
  name text not null,
  short_description text not null,
  traditional_uses text[] not null default '{}',
  emotional_keywords text[] not null default '{}',
  intentions text[] not null default '{}',
  physical_wellbeing_keywords text[] not null default '{}',
  chakras text[] not null default '{}',
  colors text[] not null default '{}',
  recommended_forms text[] not null default '{}',
  usage_advice text[] not null default '{}',
  purification text[] not null default '{}',
  recharge text[] not null default '{}',
  positive_combinations text[] not null default '{}',
  avoid_combinations text[] not null default '{}',
  seo_title text not null,
  seo_description text not null,
  amazon_product_slug text,
  disclaimer text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.native_stones enable row level security;

drop policy if exists "Native stone catalog is publicly readable" on public.native_stones;
create policy "Native stone catalog is publicly readable"
on public.native_stones for select
using (true);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists native_stones_set_updated_at on public.native_stones;
create trigger native_stones_set_updated_at
before update on public.native_stones
for each row execute function public.set_updated_at();
