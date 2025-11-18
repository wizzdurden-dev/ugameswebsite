import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Selection() {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 flex flex-col md:flex-row" style={{ background: 'var(--bg)' }}>
      {/* Sol Taraf - Tek Oyunculu Satış */}
      <div
        onClick={() => navigate('/tek-oyunculu')}
        className="flex-1 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:opacity-90 active:opacity-75 relative overflow-hidden group min-h-[50vh] md:min-h-0"
        style={{ 
          background: 'var(--surface)',
          borderRight: '0px solid var(--border)',
          borderBottom: '2px solid var(--border)'
        }}
      >
        {/* Desktop border */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[2px]" style={{ background: 'var(--border)' }} />
        
        {/* Hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 text-center px-4 sm:px-8">
          <div className="mb-4 sm:mb-6">
            <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4" style={{ color: 'var(--text)' }}>
            Tek Oyunculu Satış
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
            Oyun hesapları, karakterler ve özel içerikler
          </p>
          <div className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all group-hover:scale-105 active:scale-95" style={{ 
            background: 'var(--accent)', 
            color: 'var(--bg)' 
          }}>
            <span>Keşfet</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Sağ Taraf - Epin Satış */}
      <div
        onClick={() => navigate('/epin-satis')}
        className="flex-1 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:opacity-90 active:opacity-75 relative overflow-hidden group min-h-[50vh] md:min-h-0"
        style={{ 
          background: 'var(--surface)'
        }}
      >
        {/* Hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 text-center px-4 sm:px-8">
          <div className="mb-4 sm:mb-6">
            <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4" style={{ color: 'var(--text)' }}>
            Epin Satış
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
            Oyun kredileri, dijital kodlar ve epin paketleri
          </p>
          <div className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all group-hover:scale-105 active:scale-95" style={{ 
            background: 'var(--accent)', 
            color: 'var(--bg)' 
          }}>
            <span>Keşfet</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

