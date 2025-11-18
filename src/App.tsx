import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Selection from './pages/Selection'
import Home from './pages/Home'
import Listing from './pages/Listing'
import ProductDetail from './pages/ProductDetail'
import CS2SkinMarket from './pages/CS2SkinMarket'
import CS2Accounts from './pages/CS2Accounts'
import CS2Cases from './pages/CS2Cases'
import EpinSales from './pages/EpinSales'
import SinglePlayerSales from './pages/SinglePlayerSales'
import GameSearch from './pages/GameSearch'
import Header from './components/Header'
import Footer from './components/Footer'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <Header />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default function App(){
  return (
    <Routes>
      {/* Selection page - full screen, no header/footer */}
      <Route path="/" element={<Selection />} />
      
      {/* Other pages - with header and footer */}
      <Route path="/home" element={<Layout><Home /></Layout>} />
      <Route path="/anasayfa" element={<Layout><Home /></Layout>} />
      <Route path="/ilanlar" element={<Layout><Listing /></Layout>} />
      <Route path="/ilan/:id" element={<Layout><ProductDetail /></Layout>} />
      <Route path="/oyun/:id" element={<Layout><ProductDetail /></Layout>} />
      <Route path="/cs2-skin-pazari" element={<Layout><CS2SkinMarket /></Layout>} />
      <Route path="/cs2-hesap" element={<Layout><CS2Accounts /></Layout>} />
      <Route path="/cs2-kasa" element={<Layout><CS2Cases /></Layout>} />
      <Route path="/epin-satis" element={<Layout><EpinSales /></Layout>} />
      <Route path="/tek-oyunculu" element={<Layout><SinglePlayerSales /></Layout>} />
      <Route path="/oyun-ara" element={<Layout><GameSearch /></Layout>} />
    </Routes>
  )
}
