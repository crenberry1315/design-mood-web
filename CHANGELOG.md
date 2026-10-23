# Changelog

## 0.1.3 — 2026-10-23

- Choose watermark ON/OFF before uploading portfolio or main slideshow photos, then adjust and preview each photo independently before saving. Preserve the setting during reordering and main-photo replacement.
- Display the supplied transparent Design Mood watermark on enabled photos in the main slideshow, portfolio thumbnails, detail views and fitted or 100% fullscreen views. Keep photo files unchanged and existing photos OFF by default.
- Add migration 004 to validate optional boolean watermark flags without modifying existing photo or text records. Model and policy tests cover 23 cases.
- Rename the gallery heading to ‘실제 시공 갤러리’ and remove the satisfaction percentage badge while retaining saved slideshow photos and text.

## 0.1.2 — 2026-10-15

- Edit homepage slideshow photos in the administrator app: add or replace images, arrange 1–10 slides, edit the short title and photo text, and choose frame-fill or whole-photo display.
- Load saved slides on the public homepage without rebuilding it, while retaining the original four photos as the initial configuration and fallback. Limit long captions to fit the photo frame.
- Keep uploads private until saved and restrict changes to approved administrators. Migration 003 protects referenced files, rejects invalid configurations and detects concurrent saves; model and policy tests cover 20 cases.
- Guard menu changes and discarded uploads so failed reloads cannot leave deleted photo paths in the editor.

## 0.1.1 — 2026-10-15

- Use address-free public case titles and remove location input and display. Generalize the existing case title to ‘아파트 인테리어’ and clear its location while preserving all four photos.
- Edit each photo through administrator slide tabs: add a title of up to 200 characters and a separate description of up to 2,000 characters with line breaks. Reordering photos preserves their descriptions.
- Read per-photo details and the overall construction introduction in separate public detail tabs. Click a photo to open the fullscreen viewer, switch between fit and 100% stored-pixel size, and move between photos. Escape closes the viewer and returns focus to its opener.
- Add migration 002 to validate optional photo descriptions while keeping existing photo records compatible. Model and policy tests now cover 15 cases. See the [administrator guide](docs/관리자_사용안내.md).

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
