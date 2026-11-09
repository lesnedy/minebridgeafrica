<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Architecture rules

- Site shell (SiteHeader, SiteFooter, WhatsAppFab, LangProvider) lives only in `src/routes/__root.tsx` around `<Outlet />`; page routes must not render it again — content routes render `<SimplePage page="…" />` from `src/components/site/SimplePage.tsx`, except `/` which has its own full home layout in `src/routes/index.tsx`.
- All site text goes through the EN/SW dictionary in `src/lib/i18n.tsx`; never hardcode display copy in components. Contact details come from `src/lib/contact.ts` (single source for WhatsApp/phone/email links).
- Gold market reads use a public server function with validated upstream quotes and bounded in-memory caching; TanStack Query controls refreshes, and Tanzania values are spot conversions rather than dealer quotes so data stays honest when sources fail.
- Store uploaded branding through asset pointers; derive the local browser favicon from the same supplied logo to keep company identity consistent.
- Uploaded field media uses a shared bilingual gallery on Home and News & Insights, with CDN asset pointers and reduced-motion-aware rotation; video playback remains user controlled.
- Enquiry email actions use native mail links with an optional Gmail compose alternative, keeping delivery in the visitor's chosen email service rather than claiming website-side sending.
- Public pages declare explicit sitemap eligibility; the router-derived sitemap stays synchronized with routes and omits modification dates without authoritative page-specific timestamps.
- Public content routes own distinct descriptions, social summaries and self-referencing canonical URLs; sample news and directory content must be identified as illustrative rather than evidence of real reporting or verification.
