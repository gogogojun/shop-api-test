import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface RecentProduct {
  id: number
  name: string
  price: number
  image: string
}

export function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([])

  useEffect(() => {
    // 로컬 스토리지에서 최근 본 상품 정보 가져오기
    const getRecentlyViewed = () => {
      const recentData = localStorage.getItem('recentlyViewed')
      if (recentData) {
        try {
          return JSON.parse(recentData).slice(0, 3)
        } catch (error) {
          console.error('Error parsing recently viewed data:', error)
          return []
        }
      }
      return []
    }

    // 예시 데이터 (실제로는 로컬 스토리지에서 가져옴)
    const mockRecentProducts = [
      {
        id: 1,
        name: "미니멀 블랙 티셔츠",
        price: 45000,
        image: "/black-minimal-tshirt.png",
      },
      {
        id: 2,
        name: "다크 슬림 진",
        price: 89000,
        image: "/dark-slim-jeans.png",
      },
      {
        id: 3,
        name: "레더 크로스백",
        price: 120000,
        image: "/black-leather-crossbag.png",
      },
    ]

    setRecentProducts(mockRecentProducts)
  }, [])

  if (recentProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">최근 본 상품</h2>

        <div className="flex space-x-6 overflow-x-auto pb-4">
          {recentProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="flex-shrink-0 group">
              <div className="w-32 h-32 relative rounded-lg overflow-hidden bg-gray-900 group-hover:bg-gray-800 transition-colors">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-3 w-32">
                <h3 className="text-white text-sm font-medium truncate group-hover:text-gray-300 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm">{product.price.toLocaleString()}원</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
