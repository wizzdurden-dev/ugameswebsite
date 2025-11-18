import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import ProductCard from '../components/ProductCard'
import products from '../data/products.json'

export default function CS2Accounts() {
  // Mock CS2 account data
  const cs2Products = (products as any[]).filter(p => p.category === 'cs2').slice(0, 12)

  return (
    <div className="min-h-screen pb-12" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/" className="hover:underline transition-colors" style={{ color: 'var(--muted)' }}>Ana Sayfa</Link>
          <span style={{ color: 'var(--muted)' }}>/</span>
          <Link to="/ilanlar" className="hover:underline transition-colors" style={{ color: 'var(--muted)' }}>İlanlar</Link>
          <span style={{ color: 'var(--muted)' }}>/</span>
          <Link to="/ilanlar?category=cs2" className="hover:underline transition-colors" style={{ color: 'var(--muted)' }}>CS2</Link>
          <span style={{ color: 'var(--muted)' }}>/</span>
          <span className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
            <Icon name="user" className="w-4 h-4" />
            Hesap
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            CS2 Hesaplar
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Prime hesaplar ve yüksek seviye CS2 hesapları
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
