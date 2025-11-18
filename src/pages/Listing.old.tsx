import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productsData from '../data/products.json'
import ProductCard from '../components/ProductCard'
import FilterPanel from '../components/FilterPanel'

export default function Listing(){
  const location = useLocation()
  const navigate = useNavigate()

  // initialize filters from URL query params
  function parseFromQuery(){
    const q = new URLSearchParams(location.search)
    const category = q.get('category') || 'all'
    const min = Number(q.get('min') || 0)
    const max = Number(q.get('max') || 999999)
    const tags = q.get('tags') ? q.get('tags')!.split(',').filter(Boolean) : []
    const sort = q.get('sort') || 'default'
    const search = q.get('search') || ''
    const badge = q.get('badge') || ''
    return {category,min,max,tags,sort,search,badge}
  }

  const [filters, setFilters] = useState(()=> parseFromQuery())
  const [visibleCount, setVisibleCount] = useState(6)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const products = useMemo(()=>{
    let list = (productsData as any[]).filter(p=>{
      // Check both category and parentCategory
      if(filters.category !== 'all') {
        const matchesCategory = p.category === filters.category
        const matchesParentCategory = p.parentCategory === filters.category
        if(!matchesCategory && !matchesParentCategory) return false
      }
      if(p.price < filters.min) return false
      if(p.price > filters.max) return false
      if(filters.tags && filters.tags.length>0){
        const has = (p.tags||[]).some((t:string)=> filters.tags.includes(t))
        if(!has) return false
      }
      if(filters.search){
        if(!(p.title||'').toLowerCase().includes((filters.search||'').toLowerCase())) return false
      }
      // Badge filtering (for "Günün Fırsatı" etc)
      if((filters as any).badge){
        if(p.badge !== (filters as any).badge) return false
      }
      return true
    })

    // sorting
    if(filters.sort === 'price_asc') list = list.sort((a,b)=>a.price-b.price)
    else if(filters.sort === 'price_desc') list = list.sort((a,b)=>b.price-a.price)
    else if(filters.sort === 'newest') list = list.sort((a,b)=> (b.createdAt || 0) - (a.createdAt || 0))

    return list
  },[filters])

  // sync filters -> url
  useEffect(()=>{
    const q = new URLSearchParams()
    if(filters.category && filters.category !== 'all') q.set('category', filters.category)
    if(filters.min) q.set('min', String(filters.min))
    if(filters.max && filters.max < 999999) q.set('max', String(filters.max))
    if(filters.tags && filters.tags.length) q.set('tags', filters.tags.join(','))
    if(filters.sort && filters.sort !== 'default') q.set('sort', filters.sort)
    if((filters as any).search) q.set('search', (filters as any).search)
    if((filters as any).badge) q.set('badge', (filters as any).badge)
    navigate({ pathname: '/ilanlar', search: `?${q.toString()}` }, { replace: true })
  },[filters, navigate])

  // when location.search changes (back/forward), update filters
  useEffect(()=>{
    const parsed = parseFromQuery()
    setFilters(parsed)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location.search])

  const visible = products.slice(0, visibleCount)
  
  const modalRef = useRef<HTMLDivElement | null>(null)

  // focus trap for mobile filters
  useEffect(()=>{
    if(!showMobileFilters) return
    const root = modalRef.current
    if(!root) return

    const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    const nodeList = root.querySelectorAll(focusableSelector)
    const nodes: HTMLElement[] = Array.prototype.slice.call(nodeList)
    const first = nodes[0]
    const last = nodes[nodes.length-1]

    function onKey(e: any){
      if(e.key === 'Escape'){
        setShowMobileFilters(false)
      } else if(e.key === 'Tab'){
        if(nodes.length === 0) {
          e.preventDefault()
          return
        }
        if(e.shiftKey){
          if(document.activeElement === first){
            e.preventDefault()
            last && last.focus()
          }
        } else {
          if(document.activeElement === last){
            e.preventDefault()
            first && first.focus()
          }
        }
      }
    }

    // focus the first element
    // lock body scroll while modal open
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    setTimeout(()=> first && first.focus(), 50)
    document.addEventListener('keydown', onKey)
    return ()=>{
      document.removeEventListener('keydown', onKey)
      // restore body scroll
      document.body.style.overflow = prev
    }
  },[showMobileFilters])

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>İlanlar</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{products.length} ilan bulundu</p>
        </div>

        <div className="flex gap-6" aria-hidden={showMobileFilters}>
          {/* Mobile filter button */}
          <div className="lg:hidden mb-4 w-full">
            <button 
              onClick={()=>setShowMobileFilters(true)} 
              aria-expanded={showMobileFilters} 
              aria-controls="mobile-filter-dialog" 
              className="w-full px-4 py-3 border rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              style={{ 
                background: 'var(--surface)', 
                borderColor: 'var(--border)', 
                color: 'var(--text)' 
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtrele ve Sırala
            </button>
          </div>

          <aside className="w-80 hidden lg:block flex-shrink-0">
            <div className="sticky top-6">
              <FilterPanel onChange={(f:any)=>setFilters(f)} initial={filters} />
            </div>
          </aside>
          
          <div className="flex-1 min-w-0">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((p, i)=> (
                <div key={p.id} className="staggered-item" style={{ ['--i' as any]: i }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>

            {visible.length===0 && (
              <div className="mt-12 text-center">
                <div className="inline-flex flex-col items-center gap-4 p-8 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <svg className="w-16 h-16" style={{ color: 'var(--muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-lg mb-1" style={{ color: 'var(--text)' }}>Sonuç bulunamadı</p>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>Filtreleri değiştirmeyi deneyin</p>
                  </div>
                </div>
              </div>
            )}

            {visibleCount < products.length && (
              <div className="mt-8 text-center">
                <button 
                  onClick={()=>setVisibleCount(c=>c+6)} 
                  className="px-6 py-3 border rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-95 inline-flex items-center gap-2"
                  style={{ 
                    background: 'var(--surface)', 
                    borderColor: 'var(--border)', 
                    color: 'var(--text)' 
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Daha Fazla Yükle
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/50 overlay-backdrop flex items-end lg:hidden z-50 animate-in fade-in duration-200" role="presentation" onClick={()=>setShowMobileFilters(false)}>
          <div
            id="mobile-filter-dialog"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Filtreler"
            className="w-full max-h-[90vh] overflow-auto rounded-t-2xl animate-in slide-in-from-bottom duration-300"
            style={{ background: 'var(--surface)' }}
            onClick={(e)=>e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 px-5 py-4 border-b flex items-center justify-between" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <h3 className="font-bold text-lg" style={{ color: 'var(--text)' }}>Filtreler</h3>
              <button 
                aria-label="Filtreleri kapat" 
                onClick={()=>setShowMobileFilters(false)} 
                className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
                style={{ color: 'var(--text)' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <FilterPanel onChange={(f:any)=>{setFilters(f); setShowMobileFilters(false)}} initial={filters} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
