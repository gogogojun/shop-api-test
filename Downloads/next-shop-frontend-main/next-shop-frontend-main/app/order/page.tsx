"use client"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, Smartphone, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function OrderPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    phone: "",
    address: "",
    detailAddress: "",
    zipCode: "",
    memo: "",
  })

  // 예시 주문 상품
  const orderItems = [
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
  ]

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = totalPrice >= 50000 ? 0 : 3000
  const finalPrice = totalPrice + shippingFee

  const handleOrder = () => {
    console.log("주문 처리:", { deliveryInfo, paymentMethod, orderItems })
    alert("주문이 완료되었습니다!")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">주문/결제</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 주문 정보 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 배송 정보 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">배송 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">받는 분</Label>
                    <Input
                      id="name"
                      value={deliveryInfo.name}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, name: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white mt-2"
                      placeholder="이름을 입력하세요"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">연락처</Label>
                    <Input
                      id="phone"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white mt-2"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-gray-300">우편번호</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="zipCode"
                      value={deliveryInfo.zipCode}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, zipCode: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="우편번호"
                    />
                    <Button className="bg-white text-black hover:bg-gray-200">
                      주소 검색
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="address" className="text-gray-300">주소</Label>
                  <Input
                    id="address"
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                    placeholder="주소를 입력하세요"
                  />
                </div>
                <div>
                  <Label htmlFor="detailAddress" className="text-gray-300">상세 주소</Label>
                  <Input
                    id="detailAddress"
                    value={deliveryInfo.detailAddress}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, detailAddress: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                    placeholder="상세 주소를 입력하세요"
                  />
                </div>
                <div>
                  <Label htmlFor="memo" className="text-gray-300">배송 메모</Label>
                  <Textarea
                    id="memo"
                    value={deliveryInfo.memo}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, memo: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                    placeholder="배송 시 요청사항을 입력하세요"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 결제 방법 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">결제 방법</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-4 border border-gray-700 rounded-lg">
                    <RadioGroupItem value="card" id="card" className="border-gray-600 text-white" />
                    <Label htmlFor="card" className="flex items-center text-white cursor-pointer">
                      <CreditCard className="w-5 h-5 mr-2" />
                      신용카드
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-gray-700 rounded-lg">
                    <RadioGroupItem value="kakaopay" id="kakaopay" className="border-gray-600 text-white" />
                    <Label htmlFor="kakaopay" className="flex items-center text-white cursor-pointer">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      카카오페이
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-gray-700 rounded-lg">
                    <RadioGroupItem value="phone" id="phone" className="border-gray-600 text-white" />
                    <Label htmlFor="phone" className="flex items-center text-white cursor-pointer">
                      <Smartphone className="w-5 h-5 mr-2" />
                      휴대폰 결제
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* 주문 요약 */}
          <div className="space-y-6">
            {/* 주문 상품 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">주문 상품</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">{item.name}</h4>
                      <p className="text-gray-400 text-xs">
                        {item.size} | {item.color} | {item.quantity}개
                      </p>
                      <p className="text-white font-bold text-sm">
                        {(item.price * item.quantity).toLocaleString()}원
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 결제 금액 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">결제 금액</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
                    <span className="text-white">{finalPrice.toLocaleString()}원</span>
                  </div>
                </div>
                <Button onClick={handleOrder} className="w-full bg-white text-black hover:bg-gray-200 mt-6">
                  {finalPrice.toLocaleString()}원 결제하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
