begin;

create table public.portfolio_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.portfolio_admins enable row level security;
revoke all on public.portfolio_admins from anon, authenticated;
grant select on public.portfolio_admins to authenticated;
create policy "Admins can inspect their own membership" on public.portfolio_admins
  for select to authenticated using (user_id = (select auth.uid()));

create function public.is_portfolio_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.portfolio_admins where user_id = (select auth.uid()));
$$;
revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to anon, authenticated;

create function public.valid_portfolio_images(images jsonb, project_id uuid) returns boolean
language sql immutable set search_path = '' as $$
  select case when jsonb_typeof(images) <> 'array' then false else
    jsonb_array_length(images) <= 20 and not exists (
      select 1 from jsonb_array_elements(images) as image where
        jsonb_typeof(image) <> 'object' or
        coalesce(image->>'path', '') !~ ('^projects/' || project_id::text || '/[a-f0-9-]+[.]webp$') or
        coalesce(jsonb_typeof(image->'caption'), 'string') <> 'string' or
        length(coalesce(image->>'caption', '')) > 200
    ) end;
$$;

create table public.portfolio_projects (
  id uuid primary key,
  title text not null check (length(btrim(title)) between 1 and 100),
  category text not null check (category in ('apartment','house','commercial')),
  location text not null default '' check (length(location) <= 160),
  area integer check (area between 1 and 1000),
  description text not null default '' check (length(description) <= 10000),
  images jsonb not null default '[]' check (public.valid_portfolio_images(images, id)),
  status text not null default 'draft' check (status in ('draft','published')),
  sort_order integer not null default 0 check (sort_order between -100000 and 100000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status <> 'published' or jsonb_array_length(images) > 0)
);
alter table public.portfolio_projects enable row level security;
revoke all on public.portfolio_projects from anon, authenticated;
grant select on public.portfolio_projects to anon, authenticated;
grant insert, update, delete on public.portfolio_projects to authenticated;
create policy "Visitors read published projects" on public.portfolio_projects
  for select to anon, authenticated using (status = 'published');
create policy "Only approved admins edit projects" on public.portfolio_projects
  for all to authenticated using ((select public.is_portfolio_admin())) with check ((select public.is_portfolio_admin()));
create index portfolio_projects_public_order on public.portfolio_projects (status, sort_order, created_at desc);

create function public.touch_portfolio_project() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = clock_timestamp();
  return new;
end;
$$;
create trigger touch_portfolio_project before update on public.portfolio_projects
  for each row execute function public.touch_portfolio_project();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-images', 'portfolio-images', false, 5242880, array['image/webp']);

create function public.portfolio_image_is_published(object_name text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.portfolio_projects
    where status = 'published' and images @> jsonb_build_array(jsonb_build_object('path', object_name)));
$$;
revoke all on function public.portfolio_image_is_published(text) from public;
grant execute on function public.portfolio_image_is_published(text) to anon, authenticated;

create policy "Read published portfolio photos or own admin workspace" on storage.objects
  for select to anon, authenticated using (bucket_id = 'portfolio-images' and
    (public.is_portfolio_admin() or public.portfolio_image_is_published(name)));
create policy "Only approved admins upload portfolio photos" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio-images' and public.is_portfolio_admin()
    and name ~ '^projects/[a-f0-9-]{36}/[a-f0-9-]{36}[.]webp$');
-- Published files cannot be overwritten. New uploads always receive a new path.
create policy "Only approved admins remove unused photos" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio-images' and public.is_portfolio_admin()
    and not exists (select 1 from public.portfolio_projects where images @> jsonb_build_array(jsonb_build_object('path', name))));

commit;
