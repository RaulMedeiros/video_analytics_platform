# Assets

## Brand marks
- `logo.svg` — square aperture + scan-line glyph. 32×32 viewBox. Uses `currentColor`. Placeholder.
- `logo-lockup.svg` — glyph + "Aperture Analytics" wordmark. Placeholder product name; replace with the real name when it exists.

## Imagery
- `placeholder-frame.svg` — 640×360 sensor-grid motif for empty video tiles, loading states, login backdrops. Uses `currentColor`.

## Iconography (external, not copied)
Icons throughout the system come from **Lucide** loaded at runtime:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
```

Or as ES modules:
```html
<i data-lucide="video"></i>
<i data-lucide="alert-triangle"></i>
```

Do not commit SVG copies of Lucide icons into this folder — keep the CDN as source of truth so updates propagate.

## Notes
All brand marks are placeholders. Replace when a real brand identity is produced.
