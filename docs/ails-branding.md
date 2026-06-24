# AILS Gateway Branding Notes

AILS Gateway is the AILS fork of Sub2API for a unified model gateway. The current customization is intentionally kept in the frontend branding layer so the fork can continue to merge upstream Sub2API updates with low conflict.

## Branding Entry Points

- Default product name and repository links live in `frontend/src/constants/branding.ts`.
- The default logo asset is `frontend/public/ails-logo.svg`.
- Runtime public settings still take priority over compile-time defaults:
  - `site_name`
  - `site_logo`
  - `site_subtitle`
  - `doc_url`
  - `custom_menu_items`

Use admin settings or injected public config for deployment-specific copy and links whenever possible. Reserve source changes for AILS-wide defaults.

## Upstream Sync Policy

- Keep the Go module path and backend package imports aligned with upstream Sub2API unless a full fork split is explicitly planned.
- Avoid changing gateway routing, account scheduling, billing, payment, and auth internals for branding work.
- Keep upstream documentation and links where they describe original Sub2API behavior, payment integration, legal text, or source provenance.
- When merging upstream, expect possible conflicts mainly in:
  - `frontend/src/i18n/locales/zh.ts`
  - `frontend/src/i18n/locales/en.ts`
  - `frontend/src/views/HomeView.vue`
  - `frontend/src/views/admin/SettingsView.vue`
  - layout components that render default site name or logo

## Current Scope

This fork currently changes the default UI identity to AILS Gateway, including page title, default logo, homepage messaging, onboarding copy, admin setting placeholders, and visible default brand fallbacks. Core Sub2API gateway behavior remains unchanged.
