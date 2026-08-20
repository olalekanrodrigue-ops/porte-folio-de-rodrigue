-- Schéma public des avis clients pour ASSOGBA.tech
create extension if not exists pgcrypto;

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  company text,
  role text,
  content text not null,
  project text not null,
  consent boolean not null default false,
  client_photo_url text,
  project_photo_urls text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

drop policy if exists "Public can read consented reviews" on public.reviews;
create policy "Public can read consented reviews"
on public.reviews for select
to anon
using (consent = true);

drop policy if exists "Public can submit reviews" on public.reviews;
create policy "Public can submit reviews"
on public.reviews for insert
to anon
with check (char_length(name) between 2 and 120 and char_length(content) between 10 and 2000 and char_length(project) between 2 and 160);

insert into storage.buckets (id, name, public)
values ('review-uploads', 'review-uploads', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can view review uploads" on storage.objects;
create policy "Public can view review uploads"
on storage.objects for select
to anon
using (bucket_id = 'review-uploads');

drop policy if exists "Public can upload review files" on storage.objects;
create policy "Public can upload review files"
on storage.objects for insert
to anon
with check (bucket_id = 'review-uploads' and (storage.extension(name) = 'jpg' or storage.extension(name) = 'jpeg' or storage.extension(name) = 'png' or storage.extension(name) = 'webp'));
