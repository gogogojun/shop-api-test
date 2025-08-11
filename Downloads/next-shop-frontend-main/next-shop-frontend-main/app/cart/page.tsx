"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  size: string
  color: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "미니멀 블랙 티셔츠",
      price: 45000,
      quantity: 2,
      image: "/black-minimal-tshirt.png",
      size: "L",
      color: "블랙",
    },
    {
      id: 2,
      name: "다크 슬림 진",
      price: 89000,
      quantity: 1,
      image: "/dark-slim-jeans.png",
      size: "32",
      color: "다크그레이",
    },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = totalPrice >= 50000 ? 0 : 3000

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">장바구니</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">장바구니가 비어있습니다.</p>
            <Button className="bg-white text-black hover:bg-gray-200">쇼핑 계속하기</Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-gray-900 rounded-lg p-6 flex items-center space-x-4">
                  <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      사이즈: {item.size} | 색상: {item.color}
                    </p>
                    <p className="text-white font-bold">{item.price.toLocaleString()}원</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-900 rounded-lg p-6 h-fit">
              <h2 className="text-xl font-bold mb-6">주문 요약</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">상품 금액</span>
                  <span className="text-white">{totalPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">배송비</span>
                  <span className="text-white">{shippingFee === 0 ? "무료" : `${shippingFee.toLocaleString()}원`}</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">총 결제 금액</span>
                    <span className="text-white">{(totalPrice + shippingFee).toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              {totalPrice < 50000 && <p className="text-sm text-gray-400 mb-4">50,000원 이상 구매 시 무료배송</p>}

              <Link href="/order">
                <Button className="w-full bg-white text-black hover:bg-gray-200 mb-3">주문하기</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                  쇼핑 계속하기
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
