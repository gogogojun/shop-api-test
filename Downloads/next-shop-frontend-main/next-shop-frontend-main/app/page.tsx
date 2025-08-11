import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"
import { ProductGrid } from "@/components/product-grid"
import { RecentlyViewed } from "@/components/recently-viewed"
import { Footer } from "@/components/footer"

export default function HomePage() {
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
