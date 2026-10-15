import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

const db = new PGlite();
const admin = "11111111-1111-4111-8111-111111111111";
const outsider = "22222222-2222-4222-8222-222222222222";
const published = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const draft = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const photo = "cccccccc-cccc-4ccc-8ccc-cccccccccccc.webp";
const publishedPath = `projects/${published}/${photo}`;
const draftPath = `projects/${draft}/${photo}`;

before(async () => {
  // Emulate Supabase-owned auth/storage schemas; the application migration runs unchanged.
  await db.exec(`
    create role anon; create role authenticated;
    create schema auth; create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
    grant usage on schema public,auth to anon,authenticated;
    grant execute on function auth.uid() to anon,authenticated;
    create schema storage;
    create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
    create table storage.objects(id uuid default gen_random_uuid(),bucket_id text,name text);
    alter table storage.objects enable row level security;
    grant usage on schema storage to anon,authenticated;
    grant select,insert,update,delete on storage.objects to anon,authenticated;
  `);
  await db.exec(
    await readFile(
      new URL(
        "../supabase/migrations/202610150001_portfolio.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  await db.query("insert into auth.users values ($1),($2)", [admin, outsider]);
  await db.query("insert into public.portfolio_admins values ($1)", [admin]);
  for (const [id, status, path] of [
    [published, "published", publishedPath],
    [draft, "draft", draftPath],
  ]) {
    await db.query(
      "insert into public.portfolio_projects(id,title,category,status,images) values($1,$2,'apartment',$3,$4::jsonb)",
      [id, status, status, JSON.stringify([{ path, caption: "거실" }])],
    );
    await db.query(
      "insert into storage.objects(bucket_id,name) values('portfolio-images',$1)",
      [path],
    );
  }
});
after(() => db.close());

async function asRole(role, id, callback) {
  await db.exec(`set role ${role}`);
  await db.query("select set_config('request.jwt.claim.sub',$1,false)", [
    id || "",
  ]);
  try {
    return await callback();
  } finally {
    await db.exec("reset role");
  }
}

test("anonymous visitors see published projects and never drafts", () =>
  asRole("anon", null, async () => {
    const { rows } = await db.query("select id from public.portfolio_projects");
    assert.deepEqual(
      rows.map((row) => row.id),
      [published],
    );
    assert.equal(
      (await db.query("select public.is_portfolio_admin() as allowed")).rows[0]
        .allowed,
      false,
    );
  }));
test("anonymous project writes are rejected", () =>
  asRole("anon", null, async () => {
    await assert.rejects(
      db.query(
        "insert into public.portfolio_projects(id,title,category) values(gen_random_uuid(),'bad','house')",
      ),
      /permission denied/,
    );
  }));
test("an ordinary authenticated account cannot self-promote", () =>
  asRole("authenticated", outsider, async () => {
    await assert.rejects(
      db.query("insert into public.portfolio_admins values($1)", [outsider]),
      /permission denied/,
    );
    assert.equal(
      (await db.query("select public.is_portfolio_admin() as allowed")).rows[0]
        .allowed,
      false,
    );
    assert.equal(
      (await db.query("select * from public.portfolio_admins")).rows.length,
      0,
    );
  }));
test("ordinary accounts cannot insert, update or delete portfolio records", () =>
  asRole("authenticated", outsider, async () => {
    await assert.rejects(
      db.query(
        "insert into public.portfolio_projects(id,title,category) values(gen_random_uuid(),'bad','house')",
      ),
      /row-level security/,
    );
    assert.equal(
      (
        await db.query(
          "update public.portfolio_projects set title='bad' returning id",
        )
      ).rows.length,
      0,
    );
    assert.equal(
      (await db.query("delete from public.portfolio_projects returning id"))
        .rows.length,
      0,
    );
  }));
test("approved admin can see drafts and update a record", () =>
  asRole("authenticated", admin, async () => {
    assert.equal(
      (await db.query("select * from public.portfolio_projects")).rows.length,
      2,
    );
    assert.equal(
      (await db.query("select public.is_portfolio_admin() as allowed")).rows[0]
        .allowed,
      true,
    );
    const before = (
      await db.query(
        "select updated_at::text from public.portfolio_projects where id=$1",
        [draft],
      )
    ).rows[0].updated_at;
    const saved = (
      await db.query(
        "update public.portfolio_projects set title='수정된 현장' where id=$1 returning updated_at::text",
        [draft],
      )
    ).rows[0].updated_at;
    assert.notEqual(String(before), String(saved));
    assert.equal(
      (
        await db.query(
          "update public.portfolio_projects set title=$1 where id=$2 and updated_at=$3 returning id",
          ["stale", draft, before],
        )
      ).rows.length,
      0,
    );
  }));
test("published records require an image and images must belong to their project", () =>
  asRole("authenticated", admin, async () => {
    await assert.rejects(
      db.query(
        "insert into public.portfolio_projects(id,title,category,status) values(gen_random_uuid(),'empty','house','published')",
      ),
      /check constraint/,
    );
    await assert.rejects(
      db.query("update public.portfolio_projects set images=$1 where id=$2", [
        JSON.stringify([{ path: publishedPath }]),
        draft,
      ]),
      /check constraint/,
    );
    await assert.rejects(
      db.query("update public.portfolio_projects set images='{}' where id=$1", [
        draft,
      ]),
      /check constraint/,
    );
  }));
test("anonymous and non-admin users can only read published image paths", async () => {
  for (const [role, id] of [
    ["anon", null],
    ["authenticated", outsider],
  ]) {
    await asRole(role, id, async () => {
      assert.deepEqual(
        (await db.query("select name from storage.objects")).rows.map(
          (row) => row.name,
        ),
        [publishedPath],
      );
      await assert.rejects(
        db.query(
          "insert into storage.objects(bucket_id,name) values('portfolio-images',$1)",
          [draftPath],
        ),
        /row-level security/,
      );
      assert.equal(
        (await db.query("delete from storage.objects returning name")).rows
          .length,
        0,
      );
    });
  }
});
test("admin uploads are limited to valid paths in the portfolio bucket", () =>
  asRole("authenticated", admin, async () => {
    const unused = `projects/${draft}/dddddddd-dddd-4ddd-8ddd-dddddddddddd.webp`;
    await assert.rejects(
      db.query(
        "insert into storage.objects(bucket_id,name) values('other',$1)",
        [unused],
      ),
      /row-level security/,
    );
    await assert.rejects(
      db.query(
        "insert into storage.objects(bucket_id,name) values('portfolio-images','malicious.svg')",
      ),
      /row-level security/,
    );
    await db.query(
      "insert into storage.objects(bucket_id,name) values('portfolio-images',$1)",
      [unused],
    );
    assert.equal(
      (
        await db.query(
          "delete from storage.objects where name=$1 returning name",
          [unused],
        )
      ).rows.length,
      1,
    );
  }));
test("admin cannot overwrite or delete images still referenced by a project", () =>
  asRole("authenticated", admin, async () => {
    assert.equal(
      (
        await db.query(
          "update storage.objects set name='bad' where name=$1 returning name",
          [publishedPath],
        )
      ).rows.length,
      0,
    );
    assert.equal(
      (
        await db.query(
          "delete from storage.objects where name=$1 returning name",
          [publishedPath],
        )
      ).rows.length,
      0,
    );
  }));
test("removing membership revokes existing-session write and draft permissions", async () => {
  await db.query("delete from public.portfolio_admins where user_id=$1", [
    admin,
  ]);
  await asRole("authenticated", admin, async () => {
    assert.equal(
      (await db.query("select public.is_portfolio_admin() as allowed")).rows[0]
        .allowed,
      false,
    );
    assert.equal(
      (
        await db.query("select * from public.portfolio_projects where id=$1", [
          draft,
        ])
      ).rows.length,
      0,
    );
    await assert.rejects(
      db.query(
        "insert into public.portfolio_projects(id,title,category) values(gen_random_uuid(),'revoked','house')",
      ),
      /row-level security/,
    );
  });
});
