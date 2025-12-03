#!/bin/bash

# Script to convert React Router imports to Next.js in components

cd app/components

# Fix ProductCard
sed -i '' '1i\
'\''use client'\''
' ProductCard.tsx
sed -i '' 's/import { Link } from '\''react-router-dom'\''/import Link from '\''next\/link'\''/g' ProductCard.tsx
sed -i '' 's/ to=/ href=/g' ProductCard.tsx

# Fix MobileNav  
sed -i '' '1i\
'\''use client'\''
' MobileNav.tsx
sed -i '' 's/import { Link } from '\''react-router-dom'\''/import Link from '\''next\/link'\''/g' MobileNav.tsx
sed -i '' 's/ to=/ href=/g' MobileNav.tsx

# Fix Footer (doesn't need state, so doesn't need 'use client')
sed -i '' 's/import { Link } from '\''react-router-dom'\''/import Link from '\''next\/link'\''/g' Footer.tsx
sed -i '' 's/ to=/ href=/g' Footer.tsx

# Fix BannerCarousel
sed -i '' '1i\
'\''use client'\''
' BannerCarousel.tsx
sed -i '' 's/import { Link } from '\''react-router-dom'\''/import Link from '\''next\/link'\''/g' BannerCarousel.tsx 2>/dev/null || true
sed -i '' 's/ to=/ href=/g' BannerCarousel.tsx 2>/dev/null || true

# Fix FilterPanel
sed -i '' '1i\
'\''use client'\''
' FilterPanel.tsx
sed -i '' 's/import { Link } from '\''react-router-dom'\''/import Link from '\''next\/link'\''/g' FilterPanel.tsx 2>/dev/null || true
sed -i '' 's/ to=/ href=/g' FilterPanel.tsx 2>/dev/null || true

echo "Component conversion complete!"
