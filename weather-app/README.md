# Nimbus Weather

A premium weather intelligence dashboard built with React 19, Tailwind CSS v4, and Zustand.

## Core Features
- Real-time weather dashboard with dynamic backgrounds based on current conditions
- Multi-day and hourly forecasting
- Temperature trend charts using Recharts
- Quick access to favorite locations with a smart sidebar

## Recently Added Features (SEO & Infrastructure)
- **Client-Side Routing:** Integrated `react-router-dom` to support a multi-page app structure.
- **Dynamic SEO:** Integrated `react-helmet-async` via the `<SEO>` component to handle dynamic meta tags, canonical URLs, and Open Graph information on every route.
- **Secondary Business Navigation:** A new `/for-business` ecosystem with targeted enterprise placeholder routes.
- **Legal & Support Pages:** Dedicated privacy, terms, cookie, and support pages formatted beautifully with `@tailwindcss/typography`.
- **Monetization Hub:** A detailed `/advertising` landing page designed to attract business partnerships.
- **Redesigned Footer:** A detailed, multi-column dashboard footer.

## App Routes

| Route | Description | Component |
|-------|-------------|-----------|
| `/` | The main interactive weather dashboard. | `<Dashboard>` |
| `/for-business` | Landing page for enterprise/business users. | `<BusinessLanding>` |
| `/for-business/warnings` | Severe weather alert system overview. | `<Warnings>` |
| `/for-business/data-suite` | Sensor feeds and data access info. | `<DataSuite>` |
| `/for-business/forensics` | Post-event weather analysis info. | `<Forensics>` |
| `/advertising` | Monetization hub and partnership contact. | `<Advertising>` |
| `/developer-api` | Developer API access info. | `<DeveloperApi>` |
| `/support` | Help center and FAQs. | `<SupportCenter>` |
| `/privacy-policy` | Legal privacy policy. | `<PrivacyPolicy>` |
| `/terms-of-service` | Legal terms of service. | `<TermsOfService>` |
| `/cookie-settings` | Cookie tracking preferences. | `<CookieSettings>` |

## Placeholder TODOs
- **Legal Review:** The copy in `/privacy-policy` and `/terms-of-service` is placeholder and requires official legal review before a public launch.
- **Cookie Consent Integration:** The `/cookie-settings` page requires integration with a real cookie consent manager (e.g., OneTrust, Cookiebot).
- **Business Content:** The pages under `/for-business/*` are currently placeholders pending finalized marketing copy and asset generation.
- **API Destination:** Determine if `/developer-api` stays internal or redirects to an external developer portal.
