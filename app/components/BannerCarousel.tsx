'use client'
import React, { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

export default function BannerCarousel(){
  const banners = [
    {
      id:1, 
      title:'VP İndirimleri Başladı!', 
      subtitle:'Valorant, PUBG ve League of Legends için özel fiyatlar', 
      color:'from-blue-500 via-cyan-600 to-teal-600',
      icon: 'gamepad',
      image: '/images/banners/valorantbg1.png'
    },
    {
      id:2, 
      title:'Günün Fırsatları', 
      subtitle:'%50\'ye varan indirimlerle sınırlı süreli kampanyalar', 
      color:'from-orange-400 via-red-500 to-pink-500',
      icon: 'fire',
      image: '/images/banners/gununfbg1.jpg' // Görseli buraya ekleyebilirsiniz
    },
    {
      id:3, 
      title:'Premium Hesaplar', 
      subtitle:'Yüksek seviyeli hesaplar ve özel içerikler', 
      color:'from-emerald-500 via-teal-500 to-cyan-600',
      icon: 'crown',
      image: '/images/banners/csbg1.png' // Görseli buraya ekleyebilirsiniz
    }
  ]

  const [index, setIndex] = useState(0)
  const [announce, setAnnounce] = useState('')
  const [isPaused, setIsPaused] = useState(false)
  const mounted = useRef(false)
  const timerRef = useRef<number | null>(null)
  const intervalMs = 5000

  useEffect(()=>{
    mounted.current = true
    startAuto()
    return () => { mounted.current = false; stopAuto() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    const b = banners[index]
    setAnnounce(`${index+1} / ${banners.length}: ${b.title}`)
  },[index])

  function startAuto(){
    stopAuto()
    // don't start if paused
    if(isPaused) return
    timerRef.current = window.setInterval(()=>{
      setIndex(i => (i + 1) % banners.length)
    }, intervalMs)
  }

  function stopAuto(){
    if(timerRef.current){ window.clearInterval(timerRef.current); timerRef.current = null }
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xl">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Ana banner"
        aria-describedby={`carousel-slide-${index}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if((e as React.KeyboardEvent).key === 'ArrowLeft'){
            setIndex(i => (i - 1 + banners.length) % banners.length)
            startAuto()
          } else if((e as React.KeyboardEvent).key === 'ArrowRight'){
            setIndex(i => (i + 1) % banners.length)
            startAuto()
          }
        }}
        onMouseEnter={() => { setIsPaused(true); stopAuto() }}
        onMouseLeave={() => { setIsPaused(false); startAuto() }}
        onFocus={() => { setIsPaused(true); stopAuto() }}
        onBlur={() => { setIsPaused(false); startAuto() }}
        className="relative w-full h-64 sm:h-80 lg:h-96"
      >
        {banners.map((b, i) => (
          <div
            key={b.id}
            id={`carousel-slide-${i}`}
            aria-hidden={index !== i}
            className={`absolute inset-0 bg-gradient-to-br ${b.color} transition-all duration-700 ${index===i? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}>
            
            {/* Background image - görsel eklenirse gösterilir */}
            {b.image && (
              <div className="absolute inset-0">
                <img 
                  src={b.image} 
                  alt={b.title}
                  className="w-full h-full object-cover opacity-30"
                  onError={(e) => {
                    // Görsel yüklenemezse gizle
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )}
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center">
              <div className="max-w-3xl">
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl leading-tight mb-4">
                  {b.title}
                </h3>
                
                <p className="text-base sm:text-lg md:text-xl text-white/95 drop-shadow-lg mb-8 max-w-2xl">
                  {b.subtitle}
                </p>
                
                <div className="flex gap-4 flex-wrap">
                  <button
                    className="bg-white hover:bg-white/90 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-2xl hover:shadow-white/20 inline-flex items-center gap-2"
                    aria-label={`İncele: ${b.title}`}
                  >
                    <span>Hemen Keşfet</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                  
                  <button
                    className="border-2 border-white/40 hover:border-white/60 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 hover:bg-white/10"
                    aria-label="Daha fazla bilgi"
                  >
                    Daha Fazla
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={() => { setIndex(i => (i - 1 + banners.length) % banners.length); startAuto() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all hover:scale-110 shadow-lg"
          aria-label="Önceki slayt"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => { setIndex(i => (i + 1) % banners.length); startAuto() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all hover:scale-110 shadow-lg"
          aria-label="Sonraki slayt"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* indicators */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex gap-2 z-20">
          {banners.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i+1}`}
              aria-controls={`carousel-slide-${i}`}
              aria-current={index===i}
              onClick={() => { setIndex(i); startAuto() }}
              onFocus={() => { setIsPaused(true); stopAuto() }}
              onBlur={() => { setIsPaused(false); startAuto() }}
              className="group p-0 flex items-center justify-center"
            >
              <span className={`block rounded-full transition-all ${index===i? 'w-12 h-3 bg-white' : 'w-3 h-3 bg-white/50 hover:bg-white/70'}`} />
            </button>
          ))}
        </div>

        {/* progress bar */}
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-black/20 z-10">
          <div 
            key={index + (isPaused? '-p' : '')} 
            className="h-full bg-white/60 transition-all" 
            style={{ 
              width: '0%',
              animation: isPaused ? 'none' : `grow ${intervalMs}ms linear forwards`
            }} 
          />
        </div>

        {/* screen reader announcement for slide changes */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">{announce}</div>
      </div>
    </div>
  )
}
