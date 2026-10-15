import { writeFile, rm, copyFile } from "node:fs/promises";
// Netlify Drop deploys prebuilt files, so include headers in the artifact as well.
await writeFile(
  new URL("../dist-admin/_headers", import.meta.url),
  `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: same-origin
  X-Robots-Tag: noindex, nofollow
  Cache-Control: no-store
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' blob: https://*.supabase.co https://designmood.kr; connect-src 'self' https://*.supabase.co; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'
`,
);
await rm(new URL("../dist-admin/CNAME", import.meta.url), { force: true });
await copyFile(
  new URL("../public/logo-brown.png", import.meta.url),
  new URL("../dist-admin/logo-brown.png", import.meta.url),
);
await copyFile(
  new URL("../favicon.svg", import.meta.url),
  new URL("../dist-admin/favicon.svg", import.meta.url),
);
