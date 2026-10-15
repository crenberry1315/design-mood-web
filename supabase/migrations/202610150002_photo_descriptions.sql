begin;

-- Optional per-slide descriptions keep existing photo records compatible.
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
        length(coalesce(image->>'description', '')) > 2000
    ) end;
$$;

commit;
