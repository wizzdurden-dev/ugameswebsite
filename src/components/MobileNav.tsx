import React from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function MobileNav({open,onClose}:{open:boolean,onClose:()=>void}){
  if(!open) return null

  const categories = [
    { name: 'Sosyal Medya', path: '/ilanlar?category=sosyal-medya', icon: 'mobile' },
    { name: 'PUBG', path: '/ilanlar?category=pubg', icon: 'gamepad' },
    { name: 'Valorant', path: '/ilanlar?category=valorant', icon: 'target' },
    { name: 'LoL', path: '/ilanlar?category=lol', icon: 'sword' },
    { name: 'CS2', path: '/ilanlar?category=cs2', icon: 'gun' },
    { name: 'İlan Pazarı', path: '/ilan-pazari', icon: 'shop' },
    { name: 'Günün Fırsatları', path: '/ilanlar?badge=Günün Fırsatı', icon: 'fire' },
    { name: 'Çekilişler', path: '/cekilisler', icon: 'gift' }
  ]

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="absolute left-0 top-0 bottom-0 w-3/4 max-w-xs p-4 shadow-lg overflow-auto animate-slide-in" style={{ background: 'var(--surface)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold text-lg" style={{ color: 'var(--text)' }}>uGames</div>
            <button onClick={onClose} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-white/5" style={{ color: 'var(--text)' }}>Kapat</button>
          </div>        <nav className="flex flex-col gap-3 mb-6">
          <Link to="/login" onClick={onClose} className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-white/5" style={{ color: 'var(--text)' }}>Giriş Yap</Link>
          <Link to="/register" onClick={onClose} className="px-4 py-2 rounded text-center transition-colors" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>Kayıt Ol</Link>
        </nav>

        <div className="border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                    <div className="mt-6">
            <div className="text-xs font-semibold mb-2" style={{ color: 'var(--muted)' }}>KATEGORİLER</div>
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                style={{ color: 'var(--text)' }}
              >
                <Icon name={cat.icon} className="w-5 h-5" />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
