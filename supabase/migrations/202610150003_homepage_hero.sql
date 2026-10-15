begin;

create function public.valid_homepage_slides(slides jsonb) returns boolean
language sql immutable set search_path = '' as $$
  select case when jsonb_typeof(slides) <> 'array' then false else
    jsonb_array_length(slides) between 1 and 10 and not exists (
      select 1 from jsonb_array_elements(slides) as slide where
        jsonb_typeof(slide) <> 'object' or
        not (coalesce(slide->>'path','') in ('/hero/store-real-opt.jpg','/hero/hero-site-1-crisp.jpg','/hero/hero-site-2-crisp.jpg','/hero/hero-site-3-opt.jpg')
             or coalesce(slide->>'path','') ~ '^hero/[a-f0-9-]{36}[.]webp$') or
        coalesce(jsonb_typeof(slide->'title'),'null') <> 'string' or
        length(btrim(coalesce(slide->>'title',''))) not between 1 and 200 or
        coalesce(jsonb_typeof(slide->'badge'),'string') <> 'string' or length(coalesce(slide->>'badge','')) > 80 or
        coalesce(slide->>'fit','cover') not in ('cover','contain')
    ) end;
$$;

create table public.homepage_hero (
  id text primary key check (id = 'main'),
  slides jsonb not null check (public.valid_homepage_slides(slides)),
  updated_at timestamptz not null default clock_timestamp()
);
alter table public.homepage_hero enable row level security;
revoke all on public.homepage_hero from anon, authenticated;
grant select on public.homepage_hero to anon, authenticated;
grant update on public.homepage_hero to authenticated;
create policy "Visitors read main slideshow" on public.homepage_hero for select to anon, authenticated using (true);
create policy "Approved admins update main slideshow" on public.homepage_hero for update to authenticated
  using ((select public.is_portfolio_admin())) with check ((select public.is_portfolio_admin()));
create trigger touch_homepage_hero before update on public.homepage_hero
  for each row execute function public.touch_portfolio_project();

insert into public.homepage_hero(id,slides) values ('main','[
  {"path":"/hero/store-real-opt.jpg","badge":"춘천 우두동 매장 실제 모습","title":"실제 장판, 마루, 벽지, 타일 샘플 직접 확인이 가능한 매장","fit":"cover"},
  {"path":"/hero/hero-site-1-crisp.jpg","badge":"모던 미니멀 인테리어","title":"간접조명과 화이트 톤으로 확장감을 극대화한 모던 미니멀 인테리어","fit":"cover"},
  {"path":"/hero/hero-site-2-crisp.jpg","badge":"모던 화이트 주방","title":"600각 포세린 타일과 간접 조명으로 완성한 모던 화이트 주방","fit":"cover"},
  {"path":"/hero/hero-site-3-opt.jpg","badge":"거실 시공 연출","title":"실링팬과 우물천장 간접조명으로 완성한 거실","fit":"cover"}
]');

create policy "Visitors read referenced main photos" on storage.objects for select to anon, authenticated
  using (bucket_id = 'portfolio-images' and exists (
    select 1 from public.homepage_hero where slides @> jsonb_build_array(jsonb_build_object('path',name))));
create policy "Approved admins upload main photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio-images' and public.is_portfolio_admin() and name ~ '^hero/[a-f0-9-]{36}[.]webp$');
alter policy "Only approved admins remove unused photos" on storage.objects
  using (bucket_id = 'portfolio-images' and public.is_portfolio_admin()
    and not exists (select 1 from public.portfolio_projects where images @> jsonb_build_array(jsonb_build_object('path',name)))
    and not exists (select 1 from public.homepage_hero where slides @> jsonb_build_array(jsonb_build_object('path',name))));

commit;
