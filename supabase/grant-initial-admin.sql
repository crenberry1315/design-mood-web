-- Run after creating this user in Supabase Authentication > Users.
-- No email from an editable profile or client-supplied metadata grants access.
insert into public.portfolio_admins (user_id)
select id from auth.users where lower(email) = 'design_mood_2120@naver.com'
on conflict (user_id) do nothing;

select u.email, a.user_id from public.portfolio_admins a
join auth.users u on u.id = a.user_id;
