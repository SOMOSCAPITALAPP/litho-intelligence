alter table public.leads
add column if not exists full_name text,
add column if not exists metadata jsonb not null default '{}'::jsonb,
add column if not exists updated_at timestamptz not null default now();

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();
