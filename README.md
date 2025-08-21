# Masjid App (Single-Page Web)

A modern, responsive web app for masjid communities. It shows prayer info, Quran reading, donations, announcements, and more. Built with React + TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Highlights
- Single-page UX under one top bar (no URL routing)
- Smooth animated transitions between sections
- Dark and Light mode support
- Quran reader with full Juz/Surah fetch from `alquran.cloud`
- Donation flow with causes, amounts, and QR placeholder
- Mobile-first, responsive layout and touch-friendly controls

## Tech Stack
- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Framer Motion 11

## Getting Started
```bash
# Install dependencies at repo root
npm install

# Start the web app
cd apps/web
npm run dev

# Build for production
npm run build
```
The dev server runs on `http://localhost:5173` by default.

## Project Structure
```
Masjid-1/
├── apps/
│   └── web/
│       ├── index.html
│       ├── src/
│       │   ├── components/
│       │   │   ├── TopNavBar.tsx
│       │   │   ├── ThemeToggle.tsx
│       │   │   ├── HijriDate.tsx
│       │   │   ├── NextPrayerAlert.tsx
│       │   │   └── HadithOfTheDay.tsx
│       │   ├── pages/
│       │   │   ├── HomePage.tsx
│       │   │   ├── MenuPage.tsx
│       │   │   ├── DonationPage.tsx
│       │   │   ├── QuranIndexPage.tsx
│       │   │   ├── ContactPage.tsx
│       │   │   ├── BlogPage.tsx
│       │   │   ├── LoginPage.tsx
│       │   │   └── SignUpPage.tsx
│       │   ├── ui/WebAppLayout.tsx
│       │   ├── lib/quranApi.ts
│       │   └── index.css
│       ├── tailwind.config.ts
│       ├── vite.config.ts
│       └── package.json
└── package.json
```

## Navigation (Single Page)
- The app uses a state-based navigation stored in `WebAppLayout`.
- `TopNavBar` calls `onSectionChange(section)` to switch views.
- Sections: `home`, `menu`, `donation`, `quran`, `special`, `contact`, `blog`, `login`, `signup`.
- No React Router; all content swaps in place with animations.

## Pages Overview
- Home
  - Prayer times grid
  - Next prayer alert
  - Masjid Entry/Exit dua
  - Jummah card with integrated merits/demerits
  - Announcements with icons (includes Nikkah venue/time)
  - Hijri + Gregorian date display
  - World clock with selectable country/timezone
- Menu
  - Language switcher and Qibla card
  - Events/Programs calendar embed
- Donation
  - Choose cause, select preset/custom amounts
  - Donor info, method (QR/Card/PayPal placeholders)
  - Summary and QR placeholder
- Quran
  - Juz and Surah indexes
  - Selecting Juz/Surah fetches full text via `lib/quranApi.ts`
  - Last read stored in `localStorage`
- Contact, Blog, Login, Sign Up

## Styling and Theme
- All headings are white by default for contrast.
- Surfaces use `bg-white/60` and `dark:bg-black/20` for glassmorphism.
- Blog headings use brand green `#3E5F44` (light) and a lighter green in dark mode.
- World clock time uses `#3E5F44`.

## Quran Data
- API: `https://api.alquran.cloud`
- `fetchJuzText(juz)` and `fetchSurahText(surah)` return `{ name, text }` and are used by `QuranIndexPage`.
- Local storage keys:
  - `quran:lastRead` — tracks last Juz/Surah selection

## Development Tips
- Add new sections: extend `MenuSection` in `WebAppLayout` and create a page component.
- Keep components dark/light friendly by using paired background classes.
- Prefer `motion` components for small interaction animations.

## License
MIT (see repository license if included).
