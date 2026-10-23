begin;

-- Missing watermark flags preserve the existing display (OFF).
create or replace function public.valid_portfolio_images(images jsonb, project_id uuid) returns boolean
language sql immutable set search_path = '' as $$
  select case when jsonb_typeof(images) <> 'array' then false else
    jsonb_array_length(images) <= 20 and not exists (
      select 1 from jsonb_array_elements(images) as image where
        jsonb_typeof(image) <> 'object' or
        coalesce(image->>'path', '') !~ ('^projects/' || project_id::text || '/[a-f0-9-]+[.]webp$') or
        coalesce(jsonb_typeof(image->'caption'), 'string') <> 'string' or
        length(coalesce(image->>'caption', '')) > 200 or
        coalesce(jsonb_typeof(image->'description'), 'string') <> 'string' or
        length(coalesce(image->>'description', '')) > 2000 or
        coalesce(jsonb_typeof(image->'watermark'), 'boolean') <> 'boolean'
    ) end;
$$;

create or replace function public.valid_homepage_slides(slides jsonb) returns boolean
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
        coalesce(slide->>'fit','cover') not in ('cover','contain') or
        coalesce(jsonb_typeof(slide->'watermark'), 'boolean') <> 'boolean'
    ) end;
$$;

commit;
