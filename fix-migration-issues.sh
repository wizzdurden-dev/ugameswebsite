#!/bin/bash

# Fix common migration issues in converted pages

cd /Users/saidtuzcu/Documents/Github/ugameswebsite

echo "Fixing ProductDetail dynamic route..."
# Fix ProductDetail - use params prop instead of useParams
sed -i '' 's/import { useParams, Link, useLocation } from '\''react-router-dom'\''/import Link from '\''next\/link'\''/g' app/oyun/\[id\]/page.tsx
sed -i '' 's/import { useParams, Link } from '\''react-router-dom'\''/import Link from '\''next\/link'\''/g' app/oyun/\[id\]/page.tsx

sed -i '' 's/export default function ProductDetail/export default function ProductDetail({ params }: { params: { id: string } })/g' app/oyun/\[id\]/page.tsx

sed -i '' 's/const { id } = useParams()/const { id } = params/g' app/oyun/\[id\]/page.tsx

sed -i '' 's/const pathname = usePathname()/\/\/ Use pathname check\
  const isGamePage = true \/\/ This is game page/g' app/oyun/\[id\]/page.tsx

sed -i '' 's/const searchParams = useSearchParams()//g' app/oyun/\[id\]/page.tsx

sed -i '' 's/const isGamePage = pathname\.startsWith/\/\/ const isGamePage = pathname.startsWith/g' app/oyun/\[id\]/page.tsx


# Fix icon import
sed -i '' 's|from '\''../components/Icon'\''|from '\''@/app/components/Icon'\''|g' app/oyun-ara/page.tsx


# Fix router.push calls
sed -i '' 's/router\.push({ pathname: '\''\/oyun-ara'\'', search: `\?${q\.toString()}` }, { replace: true })/router.replace(`\/oyun-ara?\${q.toString()}`)/g' app/oyun-ara/page.tsx

sed -i '' 's/}, \[filters, navigate\])/}, [filters, router])/g' app/oyun-ara/page.tsx

echo "Copying fixed ProductDetail to ilan route..."
cp app/oyun/\[id\]/page.tsx app/ilan/\[id\]/page.tsx

# Fix ilan route to be for epins (not games)
sed -i '' 's/const isGamePage = true/const isGamePage = false/g' app/ilan/\[id\]/page.tsx

echo "Fixing Checkout dynamic route..."
# Similar fixes for Checkout  
sed -i '' 's/import { useParams, Link } from '\''react-router-dom'\''/import Link from '\''next\/link'\''/g' app/odeme/\[id\]/page.tsx
sed -i '' 's/import { useParams } from '\''react-router-dom'\''/\/\/ params from props/g' app/odeme/\[id\]/page.tsx

sed -i '' 's/export default function Checkout/export default function Checkout({ params }: { params: { id: string } })/g' app/odeme/\[id\]/page.tsx

sed -i '' 's/const { id } = useParams()/const { id } = params/g' app/odeme/\[id\]/page.tsx

echo "All fixes applied!"
