# uGames - Dijital Ürün Platformu

Modern, responsive frontend for a digital product marketplace built with React, TypeScript, and Tailwind CSS. Frontend-only — all data is client-side mock JSON.

## ✨ Features

- **Dark Theme by Default**: Toggle between dark/light themes (localStorage persisted)
- **Responsive Design**: Mobile-first with hamburger menu, mobile filter modal, touch-friendly controls
- **Client-side Filtering & Sorting**: Category, price range, tags, and sort by newest/price
- **Product Gallery**: Image carousel with keyboard navigation (ArrowLeft/Right) and accessible thumbnails
- **Banner Carousel**: Auto-advance hero (5s intervals), pause-on-hover/focus, keyboard navigation, progress bar
- **Accessibility**: ARIA labels, focus management, screen-reader announcements, keyboard-friendly
- **Animations**: Staggered list entrance, skeleton loaders, micro-interactions (hover/focus states)
- **Tests**: Vitest + Testing Library (all tests passing)

## 🚀 Quick Start

**Prerequisites**: Node.js 18+ and npm

```bash
# Clone or navigate to the project
cd /Users/saidtuzcu/Desktop/project

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Available Scripts

```bash
npm run dev          # Start Vite dev server (HMR enabled)
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run typecheck    # TypeScript type checking (no emit)
npm test             # Run Vitest tests
npm run test:watch   # Run tests in watch mode
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── BannerCarousel.tsx    # Hero carousel (auto-advance, keyboard nav)
│   ├── ProductCard.tsx        # Product tile (image skeleton, favorite toggle)
│   ├── FilterPanel.tsx        # Filters (price, category, tags, sort)
│   ├── SellerCard.tsx         # Seller info card
│   ├── Header.tsx             # Top nav with theme toggle
│   ├── Footer.tsx             # Footer links & social placeholders
│   └── MobileNav.tsx          # Mobile drawer menu
├── pages/
│   ├── Home.tsx               # Landing: banners, vitrins, categories
│   ├── Listing.tsx            # Product list with filters & URL query sync
│   └── ProductDetail.tsx      # Gallery, seller card, similar products
├── data/
│   └── products.json          # Mock product dataset (12 items)
├── __tests__/
│   ├── Listing.test.tsx       # Filter interaction tests
│   └── Navigation.test.tsx    # Routing tests
├── App.tsx                    # Route definitions
├── main.tsx                   # App entry + theme initialization
└── index.css                  # Tailwind + custom CSS (animations, theme vars)
```

## 🎨 Design & Theming

- **CSS Variables**: Theme-aware colors (light/dark) via `--bg`, `--surface`, `--text`, `--accent`, `--muted`
- **Typography**: Inter font, responsive heading scales
- **Animations**: Fade-in, slide-up, staggered entrance, skeleton shimmer, pop (heart), carousel progress
- **Components**: All interactive elements use theme variables so they adapt to light/dark automatically

### Theme Toggle

Theme selection is saved in `localStorage` and defaults to **dark mode**. Users can toggle via the sun/moon icon in the header.

## 🧪 Testing

Tests use **Vitest** + **React Testing Library** + **jsdom** environment:

- `src/__tests__/Listing.test.tsx`: Tests filter interactions (tag selection, apply button)
- `src/__tests__/Navigation.test.tsx`: Tests routing (product click navigation)

Run tests:
```bash
npm test
```

All tests pass ✅ (2 test files, 2 tests).

## ♿ Accessibility

- ARIA roles, labels, and live regions for screen readers
- Keyboard navigation: carousel (ArrowLeft/Right), product gallery thumbnails (ArrowLeft/Right), modal (Escape to close)
- Focus management: modal focus-trap, body-scroll lock, `focus-visible` styles for keyboard users
- Color contrast and semantic HTML throughout

## 📱 Pages & Routes

- **`/`** (Home): Hero carousel, vitrin (horizontal scroll), new listings grid, category tiles
- **`/ilanlar`** (Listing): Filterable product grid with sidebar filters (desktop) or modal filters (mobile); supports query params (`?category=`, `?tags=`, `?min=`, `?max=`, `?sort=`, `?search=`)
- **`/ilan/:id`** (Product Detail): Image gallery with thumbnails, seller card, similar products

## 🛠️ Tech Stack

- **React 18** (StrictMode)
- **TypeScript 5**
- **Vite 5** (Fast dev + build)
- **Tailwind CSS 3** (Utility-first + custom theme)
- **React Router 6** (Client-side routing)
- **Vitest** (Unit testing)
- **Pa11y** (Accessibility scanning — optional CI step)

## 📄 Build Output

Production build produces optimized static assets in `dist/`:

```bash
npm run build
# dist/
#   index.html
#   assets/
#     index-[hash].css  (~22 KB minified, ~5 KB gzipped)
#     index-[hash].js   (~188 KB minified, ~60 KB gzipped)
```

Serve with any static host (Vercel, Netlify, GitHub Pages, etc.).

## 🚢 Deployment

The project is **frontend-only** and requires no server-side logic. Simply build and deploy the `dist/` folder:

### Vercel / Netlify
```bash
npm run build
# Deploy dist/ folder
```

### GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch or configure in repo settings
```

### Local Preview
```bash
npm run preview
# Opens http://localhost:4173
```

## 📝 Notes

- **No Backend**: All data is from `src/data/products.json`. Filters, sorting, and search are client-side.
- **Mock Images**: Product images use placeholder URLs (update `products.json` for real images).
- **Responsive**: Tested on mobile (iPhone/Android), tablet, and desktop viewports.
- **Future Enhancements**: Add real API integration, user auth, cart/checkout, more product categories.

## 🐛 Known Issues / Limitations

- Pa11y scan interrupted in dev environment (accessibility fixes already applied manually).
- CJS deprecation warnings from Vite (informational, does not affect build).
- Some React Router future-flag warnings (can be opted-in for v7 compatibility).

## 📜 License

This is a demo/portfolio project. Not affiliated with hesap.com.tr.

## 🙏 Acknowledgements

- Design reference: [hesap.com.tr](https://hesap.com.tr)
- Built with modern React best practices and accessibility in mind

---

**Developed with ❤️ as a frontend-only showcase project.**
