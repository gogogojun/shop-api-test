import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'

const products = [
  {
    id: 1,
    name: "미니멀 블랙 티셔츠",
    price: 45000,
    originalPrice: 55000,
    image: "/black-minimal-tshirt.png",
    category: "상의",
    isNew: true,
  },
  {
    id: 2,
    name: "다크 슬림 진",
    price: 89000,
    image: "/dark-slim-jeans.png",
    category: "하의",
    isNew: false,
  },
  {
    id: 3,
    name: "레더 크로스백",
    price: 120000,
    image: "/black-leather-crossbag.png",
    category: "액세서리",
    isNew: true,
  },
  {
    id: 4,
    name: "베이직 비니",
    price: 25000,
    image: "/black-beanie-hat.png",
    category: "모자",
    isNew: false,
  },
  {
    id: 5,
    name: "첼시 부츠",
    price: 180000,
    originalPrice: 220000,
    image: "/black-chelsea-boots.png",
    category: "신발",
    isNew: false,
  },
  {
    id: 6,
    name: "오버사이즈 후디",
    price: 75000,
    image: "/placeholder.svg?height=400&width=300",
    category: "상의",
    isNew: true,
  },
]

export function ProductGrid() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">인기 상품</h2>
          <Link to="/search" className="text-gray-300 hover:text-white transition-colors">
            전체보기 →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                <Link to={`/product/${product.id}`}>
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
      </div>
    </section>
  )
}
