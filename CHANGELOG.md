# Changelog

## 0.1.0 — 2026-10-15

- Manage construction portfolios in a separate administrator app: save drafts, publish cases, edit descriptions, arrange photos and set display order. See the [administrator guide](docs/관리자_사용안내.md).
- Browse published cases by space type, view their photo galleries and request a consultation for a selected case. Empty and unavailable states replace sample portfolio content.
- Accept up to 20 JPEG, PNG or WebP originals per case, each up to 20MB; resize and convert uploads to WebP before storing them in a private Supabase bucket. Photo access uses renewable 600-second signed URLs.
- Restrict editing to approved administrator accounts with database and storage policies; reject stale saves and deletes when another session has changed a case.
- Keep selected gallery photos within the current image count and refresh administrator image URLs while preserving unsaved edits.
- Add separate Netlify administrator builds, administrator security headers and a GitHub Pages workflow using Node.js 24, `npm ci` and automated tests. Connect `admin.designmood.kr` with HTTPS. See [service setup and deployment](docs/portfolio-admin-setup.md) for verified deployment details.

## 0.0.1 — 2026-10-15

- Align construction-area slider marks with their actual values from 15 to 60 pyeong. Allow selecting a value by clicking its mark, with keyboard support and an accessible value description.
- Replace the raster location map with a responsive SVG using consistent building outlines, warm brand colors, and a clear destination marker.
- Verify area, square-metre readout, estimate and consultation preset updates at 320, 390, 768 and 1440px widths.
