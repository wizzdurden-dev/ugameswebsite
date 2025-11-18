import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({product}:{product:any}){
  const [fav, setFav] = useState(false)
  const [popping, setPopping] = useState(false)
  const [loaded, setLoaded] = useState(false)

  function handleFav(e: React.MouseEvent){
    e.preventDefault()
    e.stopPropagation()
    setFav(v=>{
      const next = !v
      if(next){
        setPopping(true)
        setTimeout(()=>setPopping(false), 350)
      }
      return next
    })
  }

  return (
    <Link to={`/ilan/${product.id}`} className="block h-full">
      <div className="h-full flex flex-col border rounded-lg overflow-hidden card-shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] slide-up focus-within:scale-[1.02] focus-within:ring-2 focus-within:ring-offset-2" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="relative h-48 flex-shrink-0 overflow-hidden" style={{ background: 'var(--bg)' }}>
          {!loaded && <div className="absolute inset-0 image-skeleton" />}
          <img src={product.image} alt={product.title} onLoad={()=>setLoaded(true)} className={`w-full h-48 object-cover transition-all duration-300 hover:scale-110 ${loaded? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Discount Badge - Top Left */}
          {product.discount && (
            <div className="absolute left-0 top-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-r-md shadow-md">
              %{product.discount}
            </div>
          )}

          {/* Vertical Badge - Left Side */}
          {product.badge && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-bold px-1.5 py-4 rounded-r-md shadow-lg" style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}>
              <div className="whitespace-nowrap tracking-wider">
                {product.badge.toUpperCase()}
              </div>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFav}
            aria-pressed={fav}
            className="absolute right-3 top-3 rounded-full p-1.5 shadow-md transition-transform hover:scale-110"
            title={fav? 'Favorilerden çıkar' : 'Favorilere ekle'}
            style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)' }}
          >
            <svg className={`w-5 h-5 transition-all ${fav? 'text-red-500 scale-110' : 'text-gray-400'} ${popping? 'pop' : ''}`} viewBox="0 0 24 24" fill={fav? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21s-7-4.35-9-7.5C1.5 10.8 4 7 7.5 7c1.9 0 3.5 1.2 4.5 3 1-1.8 2.6-3 4.5-3C20 7 22.5 10.8 21 13.5 19 16.65 12 21 12 21z" />
            </svg>
          </button>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="text-sm mb-1" style={{ color: 'var(--muted)' }}>{product.seller}</div>
          <h3 className="font-medium mt-1 line-clamp-2 min-h-[3rem]" style={{ color: 'var(--text)' }}>{product.title}</h3>
          
          {/* Delivery Badge */}
          {product.deliveryBadge && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-medium">{product.deliveryBadge}</span>
            </div>
          )}

          {/* Price Section */}
          <div className="mt-auto pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
            {product.oldPrice && (
              <div className="text-xs line-through mb-1" style={{ color: 'var(--muted)' }}>{product.oldPrice} TL</div>
            )}
            <div className="font-bold text-xl price-text">{product.price} TL</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
