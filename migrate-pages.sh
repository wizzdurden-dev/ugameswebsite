#!/bin/bash

# Automated page migration script from Vite to Next.js

echo "Starting page migration..."

# Function to convert a page file
convert_page() {
    local src_file="$1"
    local dest_file="$2"
    
    # Copy the file
    cp "$src_file" "$dest_file"
    
    # Add 'use client' at the top
    sed -i '' '1i\
'\''use client'\''
' "$dest_file"
    
    # Convert React Router imports to Next.js
    sed -i '' 's/import { useLocation, useNavigate, Link } from '\''react-router-dom'\''/import { useRouter, useSearchParams, usePathname } from '\''next\/navigation'\''\
import Link from '\''next\/link'\''/g' "$dest_file"
    
    sed -i '' 's/import { useLocation, Link } from '\''react-router-dom'\''/import { usePathname, useSearchParams } from '\''next\/navigation'\''\
import Link from '\''next\/link'\''/g' "$dest_file"
    
    sed -i '' 's/import { Link } from '\''react-router-dom'\''/import Link from '\''next\/link'\''/g' "$dest_file"
    
    sed -i '' 's/import { useNavigate } from '\''react-router-dom'\''/import { useRouter } from '\''next\/navigation'\''/g' "$dest_file"
    
    # Convert Link to to href
    sed -i '' 's/<Link to=/<Link href=/g' "$dest_file"
    
    # Convert useNavigate to useRouter
    sed -i '' 's/const navigate = useNavigate()/const router = useRouter()/g' "$dest_file"
    sed -i '' 's/navigate(/router.push(/g' "$dest_file"
    
    # Convert useLocation to usePathname/useSearchParams
    sed -i '' 's/const location = useLocation()/const pathname = usePathname()\
  const searchParams = useSearchParams()/g' "$dest_file"
    
    sed -i '' 's/location\.pathname/pathname/g' "$dest_file"
    sed -i '' 's/location\.search/searchParams?.toString() || ""/g' "$dest_file"
    sed -i '' 's/new URLSearchParams(location\.search)/searchParams/g' "$dest_file"
    
    # Fix relative imports (../ to @/ when appropriate)
    sed -i '' "s|from '\.\./data/|from '@/app/data/|g" "$dest_file"
    sed-i '' "s|from '\.\./components/|from '@/app/components/|g" "$dest_file"
    
    echo "Converted: $dest_file"
}

cd /Users/saidtuzcu/Documents/Github/ugameswebsite

# Migrate GameSearch
convert_page "src/pages/GameSearch.tsx" "app/oyun-ara/page.tsx"

# Migrate EpinSales  
convert_page "src/pages/EpinSales.tsx" "app/epin-satis/page.tsx"

# Migrate Listing
convert_page "src/pages/Listing.tsx" "app/ilanlar/page.tsx"

# Migrate Contact
convert_page "src/pages/Contact.tsx" "app/iletisim/page.tsx"

# Migrate Home
convert_page "src/pages/Home.tsx" "app/anasayfa/page.tsx"
cp "app/anasayfa/page.tsx" "app/home/page.tsx"

# Migrate CS2 pages
convert_page "src/pages/CS2SkinMarket.tsx" "app/cs2-skin-pazari/page.tsx"
convert_page "src/pages/CS2Accounts.tsx" "app/cs2-hesap/page.tsx"
convert_page "src/pages/CS2Cases.tsx" "app/cs2-kasa/page.tsx"

# Migrate Legal pages
convert_page "src/pages/legal/About.tsx" "app/hakkimizda/page.tsx"
convert_page "src/pages/legal/PrivacyPolicy.tsx" "app/gizlilik-politikasi/page.tsx"
convert_page "src/pages/legal/TermsOfUse.tsx" "app/kullanim-kosullari/page.tsx"
convert_page "src/pages/legal/ReturnConditions.tsx" "app/iade-kosullari/page.tsx"
convert_page "src/pages/legal/DistanceSalesAgreement.tsx" "app/mesafeli-satis-sozlesmesi/page.tsx"

# Dynamic routes require special handling
convert_page "src/pages/ProductDetail.tsx" "app/oyun/[id]/page.tsx"
cp "app/oyun/[id]/page.tsx" "app/ilan/[id]/page.tsx"

convert_page "src/pages/Checkout.tsx" "app/odeme/[id]/page.tsx"

echo "Migration complete! Total pages migrated: 18"
echo "Note: Dynamic routes may need manual params fixes"
