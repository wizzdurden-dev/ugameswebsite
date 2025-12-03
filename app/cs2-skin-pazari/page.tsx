'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import PriceChart from '../components/PriceChart'
import Icon from '../components/Icon'

interface SkinItem {
  id: number
  name: string
  image: string
  buffPrice: number
  change24h: number
  change7d: number
  change30d: number
  change60d: number
  count: number
  marketCap: number
  priceHistory: number[]
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'covert'
  weapon: string
}

export default function CS2SkinMarket() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedWeapon, setSelectedWeapon] = useState('all')
  const [selectedCollection, setSelectedCollection] = useState('all')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000000)
  const [liquidityFilter, setLiquidityFilter] = useState(0)
  const [sortBy, setSortBy] = useState<'name' | 'buffPrice' | 'change24h' | 'change7d' | 'change30d' | 'marketCap'>('marketCap')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showOwned, setShowOwned] = useState(false)

  // Mock data - gerçek uygulamada API'den gelecek
  const [skins] = useState<SkinItem[]>([
    {
      id: 1,
      name: 'M4A1-S | Hot Rod (Factory New)',
      image: '/images/skins/m4a1s-hotrod.png',
      buffPrice: 3175.76,
      change24h: -2.08,
      change7d: 3.50,
      change30d: -17.27,
      change60d: 5.98,
      count: 12189,
      marketCap: 37311991.68,
      priceHistory: generatePriceHistory(3175.76, 30),
      rarity: 'covert',
      weapon: 'M4A1-S'
    },
    {
      id: 2,
      name: 'Butterfly Knife | Fade (Factory New)',
      image: '/images/skins/butterfly-fade.png',
      buffPrice: 3231.83,
      change24h: -5.93,
      change7d: 55.14,
      change30d: -31.49,
      change60d: -31.82,
      count: 11155,
      marketCap: 35228940.15,
      priceHistory: generatePriceHistory(3231.83, 30),
      rarity: 'covert',
      weapon: 'Knife'
    },
    {
      id: 3,
      name: 'AK-47 | Fire Serpent (Minimal Wear)',
      image: '/images/skins/ak47-fireserpent.png',
      buffPrice: 2845.92,
      change24h: 1.23,
      change7d: -4.56,
      change30d: 8.91,
      change60d: 12.34,
      count: 8432,
      marketCap: 23986754.44,
      priceHistory: generatePriceHistory(2845.92, 30),
      rarity: 'covert',
      weapon: 'AK-47'
    },
    {
      id: 4,
      name: 'AWP | Dragon Lore (Factory New)',
      image: '/images/skins/awp-dragonlore.png',
      buffPrice: 8950.45,
      change24h: 3.12,
      change7d: 15.67,
      change30d: 22.34,
      change60d: 18.90,
      count: 3421,
      marketCap: 30619189.45,
      priceHistory: generatePriceHistory(8950.45, 30),
      rarity: 'covert',
      weapon: 'AWP'
    },
    {
      id: 5,
      name: 'Karambit | Doppler Phase 2 (Factory New)',
      image: '/images/skins/karambit-doppler.png',
      buffPrice: 1567.23,
      change24h: -1.45,
      change7d: 6.78,
      change30d: -3.21,
      change60d: 9.12,
      count: 15678,
      marketCap: 24567891.34,
      priceHistory: generatePriceHistory(1567.23, 30),
      rarity: 'covert',
      weapon: 'Knife'
    }
  ])

  const [marketStats] = useState({
    totalMarketCap: 5146471334.61,
    change24h: 1.05,
    allTimeHigh: 6057593023.86,
    athChange: -15.04,
    change7d: 29.53,
    change30d: -3.95,
    change90d: 8.38
  })

  // Filtreleme
  const filteredSkins = skins.filter(skin => {
    const matchesSearch = skin.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesWeapon = selectedWeapon === 'all' || skin.weapon === selectedWeapon
    const matchesPrice = skin.buffPrice >= minPrice && skin.buffPrice <= maxPrice
    return matchesSearch && matchesWeapon && matchesPrice
  })

  // Sıralama
  const sortedSkins = [...filteredSkins].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1
    if (sortBy === 'name') return order * a.name.localeCompare(b.name)
    return order * (a[sortBy] - b[sortBy])
  })

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('tr-TR').format(num)
  }

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'covert': return 'from-red-500 to-pink-500'
      case 'legendary': return 'from-purple-500 to-pink-500'
      case 'epic': return 'from-blue-500 to-cyan-500'
      case 'rare': return 'from-green-500 to-emerald-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="min-h-screen pb-12" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Header Stats */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4 text-sm">
            <Link href="/" className="hover:underline transition-colors" style={{ color: 'var(--muted)' }}>Ana Sayfa</Link>
            <span style={{ color: 'var(--muted)' }}>/</span>
            <Link href="/ilanlar" className="hover:underline transition-colors" style={{ color: 'var(--muted)' }}>İlanlar</Link>
            <span style={{ color: 'var(--muted)' }}>/</span>
            <Link href="/ilanlar?category=cs2" className="hover:underline transition-colors" style={{ color: 'var(--muted)' }}>CS2</Link>
            <span style={{ color: 'var(--muted)' }}>/</span>
            <span className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
              <Icon name="gun" className="w-4 h-4" />
              Skin Pazarı
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            CS2 Skin Market
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Gerçek zamanlı CS2 skin fiyatları ve piyasa verileri
          </p>
        </div>

        {/* Market Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Toplam Piyasa Değeri</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {formatPrice(marketStats.totalMarketCap)}
            </div>
            <div className="text-sm mt-1">
              <span style={{ color: marketStats.change24h > 0 ? '#10b981' : '#ef4444' }}>
                {marketStats.change24h > 0 ? '+' : ''}{marketStats.change24h.toFixed(2)}%
              </span>
              <span className="ml-1 text-xs" style={{ color: 'var(--muted)' }}>24s</span>
            </div>
          </div>

          <div className="p-4 rounded-lg border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Tüm Zamanların Zirvesi</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {formatPrice(marketStats.allTimeHigh)}
            </div>
            <div className="text-sm mt-1">
              <span style={{ color: marketStats.athChange > 0 ? '#10b981' : '#ef4444' }}>
                {marketStats.athChange.toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="p-4 rounded-lg border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="text-xs mb-1" style={{ color: 'var(--muted)' }}>7 Günlük Değişim</div>
            <div className="text-2xl font-bold" style={{ color: marketStats.change7d > 0 ? '#10b981' : '#ef4444' }}>
              {marketStats.change7d > 0 ? '+' : ''}{marketStats.change7d.toFixed(2)}%
            </div>
          </div>

          <div className="p-4 rounded-lg border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="text-xs mb-1" style={{ color: 'var(--muted)' }}>30 Günlük Değişim</div>
            <div className="text-2xl font-bold" style={{ color: marketStats.change30d > 0 ? '#10b981' : '#ef4444' }}>
              {marketStats.change30d > 0 ? '+' : ''}{marketStats.change30d.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="mb-6 p-6 rounded-lg border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <PriceChart 
            data={generateMarketHistory(marketStats.totalMarketCap, 90)}
            height={400}
          />
        </div>

        {/* Filters */}
        <div className="rounded-xl overflow-hidden border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          {/* Filter Header */}
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)', background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <h3 className="font-bold text-lg" style={{ color: 'var(--text)' }}>Arama ve Filtreler</h3>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedWeapon('all')
                  setSelectedCollection('all')
                  setMinPrice(0)
                  setMaxPrice(1000000)
                  setLiquidityFilter(0)
                  setShowOwned(false)
                }}
                className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-all hover:scale-105"
                style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
              >
                Sıfırla
              </button>
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Search */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  <Icon name="search" className="w-4 h-4" />
                  Skin Ara
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Skin adı yazın..."
                    className="w-full px-4 py-2.5 pl-10 rounded-lg border transition-all focus:ring-2 focus:ring-offset-1"
                    style={{ 
                      background: 'var(--bg)', 
                      borderColor: 'var(--border)', 
                      color: 'var(--text)',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                  <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
                </div>
              </div>

              {/* Weapon Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  <Icon name="gun" className="w-4 h-4" />
                  Silah Türü
                </label>
                <div className="relative">
                  <select
                    value={selectedWeapon}
                    onChange={(e) => setSelectedWeapon(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2.5 appearance-none cursor-pointer transition-all focus:ring-2 focus:ring-offset-1 font-medium"
                    style={{ 
                      background: 'var(--bg)', 
                      borderColor: 'var(--border)', 
                      color: 'var(--text)',
                      outline: 'none',
                      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  >
                    <option value="all">Tüm Silahlar</option>
                    <option value="AK-47">AK-47</option>
                    <option value="M4A1-S">M4A1-S</option>
                    <option value="M4A4">M4A4</option>
                    <option value="AWP">AWP</option>
                    <option value="Desert Eagle">Desert Eagle</option>
                    <option value="USP-S">USP-S</option>
                    <option value="Glock-18">Glock-18</option>
                    <option value="Knife">Bıçaklar</option>
                    <option value="Gloves">Eldivenler</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Collection Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  <Icon name="shop" className="w-4 h-4" />
                  Koleksiyon
                </label>
                <div className="relative">
                  <select
                    value={selectedCollection}
                    onChange={(e) => setSelectedCollection(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2.5 appearance-none cursor-pointer transition-all focus:ring-2 focus:ring-offset-1 font-medium"
                    style={{ 
                      background: 'var(--bg)', 
                      borderColor: 'var(--border)', 
                      color: 'var(--text)',
                      outline: 'none',
                      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  >
                    <option value="all">Tüm Koleksiyonlar</option>
                    <option value="operation">Operation Collections</option>
                    <option value="ancient">Ancient Collection</option>
                    <option value="nuke">Nuke Collection</option>
                    <option value="mirage">Mirage Collection</option>
                    <option value="inferno">Inferno Collection</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Min Price */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Min Fiyat ($)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-sm font-medium" style={{ color: 'var(--muted)' }}>$</span>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 pl-7 rounded-lg border transition-all focus:ring-2 focus:ring-offset-1"
                    style={{ 
                      background: 'var(--bg)', 
                      borderColor: 'var(--border)', 
                      color: 'var(--text)',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Max Price */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Max Fiyat ($)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-sm font-medium" style={{ color: 'var(--muted)' }}>$</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 pl-7 rounded-lg border transition-all focus:ring-2 focus:ring-offset-1"
                    style={{ 
                      background: 'var(--bg)', 
                      borderColor: 'var(--border)', 
                      color: 'var(--text)',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                    placeholder="1000000"
                  />
                </div>
              </div>

              {/* Liquidity Slider */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  <Icon name="zap" className="w-4 h-4" />
                  Likidite (%)
                </label>
                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={liquidityFilter}
                    onChange={(e) => setLiquidityFilter(Number(e.target.value))}
                    className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${liquidityFilter}%, var(--border) ${liquidityFilter}%, var(--border) 100%)`
                    }}
                  />
                  <div className="w-14 text-center font-bold text-sm px-2 py-1 rounded" style={{ background: 'var(--bg)', color: 'var(--accent)' }}>
                    {liquidityFilter}%
                  </div>
                </div>
              </div>
            </div>

            {/* Owned Checkbox */}
            <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={showOwned}
                    onChange={(e) => setShowOwned(e.target.checked)}
                    className="w-5 h-5 rounded border-2 appearance-none cursor-pointer transition-all checked:bg-gradient-to-br checked:from-blue-500 checked:to-cyan-500"
                    style={{ 
                      borderColor: showOwned ? 'transparent' : 'var(--border)'
                    }}
                  />
                  {showOwned && (
                    <svg className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="user" className="w-4 h-4 transition-colors" style={{ color: showOwned ? 'var(--accent)' : 'var(--muted)' }} />
                  <span className="text-sm font-medium transition-colors" style={{ color: showOwned ? 'var(--text)' : 'var(--muted)' }}>
                    Sadece Sahip Olduklarım
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Skins Table */}
        <div className="rounded-lg border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
                  <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: 'var(--muted)' }}>#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: 'var(--muted)' }}>Görsel</th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-semibold cursor-pointer hover:opacity-70"
                    style={{ color: 'var(--muted)' }}
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Ad
                      {sortBy === 'name' && (
                        <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-right text-xs font-semibold cursor-pointer hover:opacity-70"
                    style={{ color: 'var(--muted)' }}
                    onClick={() => handleSort('buffPrice')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Buff Fiyat
                      {sortBy === 'buffPrice' && (
                        <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-right text-xs font-semibold cursor-pointer hover:opacity-70"
                    style={{ color: 'var(--muted)' }}
                    onClick={() => handleSort('change24h')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      24s
                      {sortBy === 'change24h' && (
                        <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-right text-xs font-semibold cursor-pointer hover:opacity-70"
                    style={{ color: 'var(--muted)' }}
                    onClick={() => handleSort('change7d')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      7g
                      {sortBy === 'change7d' && (
                        <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-right text-xs font-semibold cursor-pointer hover:opacity-70"
                    style={{ color: 'var(--muted)' }}
                    onClick={() => handleSort('change30d')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      30g
                      {sortBy === 'change30d' && (
                        <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold" style={{ color: 'var(--muted)' }}>60g</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold" style={{ color: 'var(--muted)' }}>Adet</th>
                  <th 
                    className="px-4 py-3 text-right text-xs font-semibold cursor-pointer hover:opacity-70"
                    style={{ color: 'var(--muted)' }}
                    onClick={() => handleSort('marketCap')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Piyasa Değeri
                      {sortBy === 'marketCap' && (
                        <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: 'var(--muted)' }}>Son 30g</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: 'var(--muted)' }}>Tahmin</th>
                </tr>
              </thead>
              <tbody>
                {sortedSkins.map((skin, index) => (
                  <tr 
                    key={skin.id}
                    className="border-b transition-colors hover:opacity-80 cursor-pointer"
                    style={{ borderColor: 'var(--border)' }}
                    onClick={() => {/* Navigate to skin detail */}}
                  >
                    <td className="px-4 py-4 text-sm" style={{ color: 'var(--muted)' }}>{index + 1}</td>
                    <td className="px-4 py-4">
                      <div className="w-16 h-16 rounded border flex items-center justify-center relative overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(skin.rarity)} opacity-20`} />
                        <Icon name="gun" className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-sm" style={{ color: 'var(--text)' }}>{skin.name}</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{skin.weapon}</div>
                    </td>
                    <td className="px-4 py-4 text-right font-semibold" style={{ color: 'var(--text)' }}>
                      {formatPrice(skin.buffPrice)}
                    </td>
                    <td className="px-4 py-4 text-right font-medium" style={{ color: skin.change24h > 0 ? '#10b981' : '#ef4444' }}>
                      {skin.change24h > 0 ? '+' : ''}{skin.change24h.toFixed(2)}%
                    </td>
                    <td className="px-4 py-4 text-right font-medium" style={{ color: skin.change7d > 0 ? '#10b981' : '#ef4444' }}>
                      {skin.change7d > 0 ? '+' : ''}{skin.change7d.toFixed(2)}%
                    </td>
                    <td className="px-4 py-4 text-right font-medium" style={{ color: skin.change30d > 0 ? '#10b981' : '#ef4444' }}>
                      {skin.change30d > 0 ? '+' : ''}{skin.change30d.toFixed(2)}%
                    </td>
                    <td className="px-4 py-4 text-right font-medium" style={{ color: skin.change60d > 0 ? '#10b981' : '#ef4444' }}>
                      {skin.change60d > 0 ? '+' : ''}{skin.change60d.toFixed(2)}%
                    </td>
                    <td className="px-4 py-4 text-right text-sm" style={{ color: 'var(--muted)' }}>
                      {formatNumber(skin.count)}
                    </td>
                    <td className="px-4 py-4 text-right font-medium text-sm" style={{ color: 'var(--text)' }}>
                      {formatPrice(skin.marketCap)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="w-24 h-10">
                        <MiniChart data={skin.priceHistory} positive={skin.change30d > 0} />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${
                        skin.change30d > 5 ? 'bg-green-500 text-white' : 
                        skin.change30d < -5 ? 'bg-red-500 text-white' : 
                        'bg-yellow-500 text-white'
                      }`}>
                        {Math.round(50 + skin.change30d)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mini chart component
function MiniChart({ data, positive }: { data: number[], positive: boolean }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#10b981' : '#ef4444'}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

// Helper functions
function generatePriceHistory(basePrice: number, days: number): number[] {
  const history: number[] = []
  let price = basePrice * 0.9
  
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * (basePrice * 0.05)
    price = Math.max(price + change, basePrice * 0.7)
    history.push(price)
  }
  
  return history
}

function generateMarketHistory(baseValue: number, days: number): Array<{ date: string, value: number }> {
  const history: Array<{ date: string, value: number }> = []
  let value = baseValue * 0.85
  const today = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const change = (Math.random() - 0.45) * (baseValue * 0.02)
    value = Math.max(value + change, baseValue * 0.7)
    history.push({
      date: date.toLocaleDateString('tr-TR'),
      value: value
    })
  }
  
  return history
}
