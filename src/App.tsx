import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Listing from './pages/Listing'
import ProductDetail from './pages/ProductDetail'
import CS2SkinMarket from './pages/CS2SkinMarket'
import CS2Accounts from './pages/CS2Accounts'
import CS2Cases from './pages/CS2Cases'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <Header />
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ilanlar" element={<Listing />} />
          <Route path="/ilan/:id" element={<ProductDetail />} />
          <Route path="/cs2-skin-pazari" element={<CS2SkinMarket />} />
          <Route path="/cs2-hesap" element={<CS2Accounts />} />
          <Route path="/cs2-kasa" element={<CS2Cases />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
