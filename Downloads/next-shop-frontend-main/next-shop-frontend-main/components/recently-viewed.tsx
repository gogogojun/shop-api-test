"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

interface RecentProduct {
  id: number
  name: string
  price: number
  image: string
}

export function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([])

  useEffect(() => {
    // 쿠키에서 최근 본 상품 정보 가져오기
    const getRecentlyViewed = () => {
      const cookies = document.cookie.split(";")
      const recentCookie = cookies.find((cookie) => cookie.trim().startsWith("recentlyViewed="))

      if (recentCookie) {
        try {
          const recentData = JSON.parse(decodeURIComponent(recentCookie.split("=")[1]))
          return recentData.slice(0, 3) // 최대 3개까지
        } catch (error) {
          console.error("Error parsing recently viewed cookie:", error)
          return []
        }
      }
      return []
    }

    // 예시 데이터 (실제로는 쿠키에서 가져옴)
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
            <Link key={product.id} href={`/product/${product.id}`} className="flex-shrink-0 group">
              <div className="w-32 h-32 relative rounded-lg overflow-hidden bg-gray-900 group-hover:bg-gray-800 transition-colors">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
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
