import React from 'react'
import { Header } from '../components/Header'
import { HeroSection } from '../components/HeroSection'
import { CategorySection } from '../components/CategorySection'
import { ProductGrid } from '../components/ProductGrid'
import { RecentlyViewed } from '../components/RecentlyViewed'
import { Footer } from '../components/Footer'

export function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <ProductGrid />
        <RecentlyViewed />
      </main>
      <Footer />
    </div>
  )
}
