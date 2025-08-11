"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Heart, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const allProducts = [
  { id: 1, name: "미니멀 블랙 티셔츠", price: 45000, originalPrice: 55000, image: "/black-minimal-tshirt.png", category: "상의", isNew: true },
  { id: 2, name: "다크 슬림 진", price: 89000, image: "/dark-slim-jeans.png", category: "하의", isNew: false },
  { id: 3, name: "레더 크로스백", price: 120000, image: "/black-leather-crossbag.png", category: "액세서리", isNew: true },
  { id: 4, name: "베이직 비니", price: 25000, image: "/black-beanie-hat.png", category: "모자", isNew: false },
  { id: 5, name: "첼시 부츠", price: 180000, originalPrice: 220000, image: "/black-chelsea-boots.png", category: "신발", isNew: false },
  { id: 6, name: "오버사이즈 후디", price: 75000, image: "/placeholder.svg?height=400&width=300", category: "상의", isNew: true },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState(query)
  const [sortBy, setSortBy] = useState('latest')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return b.id - a.id // latest
    }
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* 검색 헤더 */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="상품을 검색하세요..."
                  className="pl-12 bg-gray-900 border-gray-700 text-white h-12 rounded-full"
                />
              </div>
              <Button type="submit" className="bg-white text-black hover:bg-gray-200 px-8 rounded-full">
                검색
              </Button>
            </form>

            {query && (
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">
                  '{query}' 검색 결과
                </h1>
                <p className="text-gray-400">총 {sortedProducts.length}개의 상품을 찾았습니다.</p>
              </div>
            )}
          </div>

          {/* 필터 및 정렬 */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32 bg-gray-900 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="상의">상의</SelectItem>
                  <SelectItem value="하의">하의</SelectItem>
                  <SelectItem value="액세서리">액세서리</SelectItem>
                  <SelectItem value="모자">모자</SelectItem>
                  <SelectItem value="신발">신발</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 bg-gray-900 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="price-low">가격 낮은순</SelectItem>
                <SelectItem value="price-high">가격 높은순</SelectItem>
                <SelectItem value="name">이름순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 검색 결과 */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h2>
              <p className="text-gray-400 mb-6">다른 검색어로 시도해보세요.</p>
              <Button className="bg-white text-black hover:bg-gray-200">
                <Link href="/">홈으로 돌아가기</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-white text-black text-xs font-semibold px-2 py-1 rounded">
                        NEW
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        SALE
                      </span>
                    )}

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-3">
                        <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          장바구니
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-gray-400 text-sm mb-1">{product.category}</p>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-white font-semibold mb-2 hover:text-gray-300 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold">{product.price.toLocaleString()}원</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through text-sm">
                          {product.originalPrice.toLocaleString()}원
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
