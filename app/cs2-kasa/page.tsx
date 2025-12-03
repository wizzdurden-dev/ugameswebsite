'use client'
import React from 'react'
import Link from 'next/link'
import Icon from '../components/Icon'
import ProductCard from '../components/ProductCard'
import products from '@/app/data/products.json'

export default function CS2Cases() {
  // Mock CS2 case data
  const cs2Products = (products as any[]).filter(p => p.category === 'cs2').slice(0, 12)

  return (
    <div className="min-h-screen pb-12" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="hover:underline transition-colors" style={{ color: 'var(--muted)' }}>Ana Sayfa</Link>
          <span style={{ color: 'var(--muted)' }}>/</span>
          <Link href="/ilanlar" className="hover:underline transition-colors" style={{ color: 'var(--muted)' }}>İlanlar</Link>
          <span style={{ color: 'var(--muted)' }}>/</span>
          <Link href="/ilanlar?category=cs2" className="hover:underline transition-colors" style={{ color: 'var(--muted)' }}>CS2</Link>
          <span style={{ color: 'var(--muted)' }}>/</span>
          <span className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
            <Icon name="shop" className="w-4 h-4" />
            Kasa
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            CS2 Kasalar
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            CS2 kasaları ve anahtarları
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cs2Products.map((product, index) => (
            <div key={product.id} className="staggered-item" style={{ ['--i' as any]: index }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
