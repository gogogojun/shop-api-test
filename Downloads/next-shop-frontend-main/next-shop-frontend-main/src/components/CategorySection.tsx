import React from 'react'
import { Link } from 'react-router-dom'

const categories = [
  {
    name: "상의",
    href: "/category/tops",
    image: "/black-shirt-fashion.png",
    description: "세련된 상의 컬렉션",
  },
  {
    name: "하의",
    href: "/category/bottoms",
    image: "/black-pants-fashion.png",
    description: "스타일리시한 하의",
  },
  {
    name: "액세서리",
    href: "/category/accessories",
    image: "/placeholder.svg?height=400&width=300",
    description: "포인트 액세서리",
  },
  {
    name: "모자",
    href: "/category/hats",
    image: "/black-hat-fashion.png",
    description: "트렌디한 모자",
  },
  {
    name: "신발",
    href: "/category/shoes",
    image: "/placeholder.svg?height=400&width=300",
    description: "고급스러운 신발",
  },
]

export function CategorySection() {
  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">카테고리</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative overflow-hidden rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300"
            >
              <div className="aspect-square relative">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="text-lg font-semibold text-white mb-1">{category.name}</h3>
                <p className="text-sm text-gray-300">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
