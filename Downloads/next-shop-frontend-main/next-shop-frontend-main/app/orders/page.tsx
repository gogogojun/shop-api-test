"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Calendar, Package, Star, RotateCcw, MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface OrderItem {
  id: number
  productId: number
  name: string
  price: number
  quantity: number
  image: string
  size: string
  color: string
  hasReview: boolean
}

interface Order {
  id: string
  date: string
  status: "배송완료" | "배송중" | "주문확인" | "취소"
  totalAmount: number
  items: OrderItem[]
  trackingNumber?: string
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("all")
  const [dateRange, setDateRange] = useState("3months")
  const [selectedTab, setSelectedTab] = useState("all")

  // 예시 주문 데이터
  const [orders] = useState<Order[]>([
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "배송완료",
      totalAmount: 134000,
      items: [
        {
          id: 1,
          productId: 1,
          name: "미니멀 블랙 티셔츠",
          price: 45000,
          quantity: 2,
          image: "/black-minimal-tshirt.png",
          size: "L",
          color: "블랙",
          hasReview: false,
        },
        {
          id: 2,
          productId: 5,
          name: "첼시 부츠",
          price: 89000,
          quantity: 1,
          image: "/black-chelsea-boots.png",
          size: "270",
          color: "블랙",
          hasReview: true,
        },
      ],
      trackingNumber: "1234567890",
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-10",
      status: "배송중",
      totalAmount: 75000,
      items: [
        {
          id: 3,
          productId: 6,
          name: "오버사이즈 후디",
          price: 75000,
          quantity: 1,
          image: "/placeholder.svg?height=400&width=300",
          size: "XL",
          color: "다크그레이",
          hasReview: false,
        },
      ],
      trackingNumber: "0987654321",
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-05",
      status: "주문확인",
      totalAmount: 120000,
      items: [
        {
          id: 4,
          productId: 3,
          name: "레더 크로스백",
          price: 120000,
          quantity: 1,
          image: "/black-leather-crossbag.png",
          size: "FREE",
          color: "블랙",
          hasReview: false,
        },
      ],
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "배송완료":
        return "bg-green-600"
      case "배송중":
        return "bg-blue-600"
      case "주문확인":
        return "bg-yellow-600"
      case "취소":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const filteredOrders = orders.filter(order => {
    if (searchTerm) {
      switch (searchType) {
        case "orderNumber":
          return order.id.toLowerCase().includes(searchTerm.toLowerCase())
        case "productName":
          return order.items.some(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        default:
          return order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 order.items.some(item => 
                   item.name.toLowerCase().includes(searchTerm.toLowerCase())
                 )
      }
    }
    return true
  })

  const handleReorder = (order: Order) => {
    console.log("재주문:", order)
    // 장바구니에 상품 추가 로직
  }

  const handleWriteReview = (item: OrderItem) => {
    console.log("리뷰 작성:", item)
    // 리뷰 작성 페이지로 이동
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">주문 내역</h1>

          {/* 검색 및 필터 */}
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="flex space-x-2">
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">전체</SelectItem>
                        <SelectItem value="orderNumber">주문번호</SelectItem>
                        <SelectItem value="productName">상품명</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </div>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="1month">1개월</SelectItem>
                    <SelectItem value="3months">3개월</SelectItem>
                    <SelectItem value="6months">6개월</SelectItem>
                    <SelectItem value="1year">1년</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-white text-black hover:bg-gray-200">
                  <Search className="w-4 h-4 mr-2" />
                  검색
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 주문 상태별 탭 */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
            <TabsList className="bg-gray-900 border-gray-800">
              <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-black">
                전체
              </TabsTrigger>
              <TabsTrigger value="confirmed" className="data-[state=active]:bg-white data-[state=active]:text-black">
                주문확인
              </TabsTrigger>
              <TabsTrigger value="shipping" className="data-[state=active]:bg-white data-[state=active]:text-black">
                배송중
              </TabsTrigger>
              <TabsTrigger value="delivered" className="data-[state=active]:bg-white data-[state=active]:text-black">
                배송완료
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-6">
              {filteredOrders.length === 0 ? (
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-16 text-center">
                    <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">주문 내역이 없습니다.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <Card key={order.id} className="bg-gray-900 border-gray-800">
                      <CardHeader className="border-b border-gray-800">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white mb-2">주문번호: {order.id}</CardTitle>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {order.date}
                              </span>
                              <Badge className={`${getStatusColor(order.status)} text-white`}>
                                {order.status}
                              </Badge>
                              {order.trackingNumber && (
                                <span>운송장: {order.trackingNumber}</span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-white">
                              {order.totalAmount.toLocaleString()}원
                            </p>
                            <Button
                              onClick={() => handleReorder(order)}
                              variant="outline"
                              size="sm"
                              className="mt-2 border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                            >
                              <RotateCcw className="w-4 h-4 mr-1" />
                              재주문
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                              <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-white font-semibold mb-1">{item.name}</h3>
                                <p className="text-gray-400 text-sm mb-2">
                                  사이즈: {item.size} | 색상: {item.color} | 수량: {item.quantity}개
                                </p>
                                <p className="text-white font-bold">
                                  {(item.price * item.quantity).toLocaleString()}원
                                </p>
                              </div>
                              <div className="flex flex-col space-y-2">
                                {order.status === "배송완료" && !item.hasReview && (
                                  <Button
                                    onClick={() => handleWriteReview(item)}
                                    size="sm"
                                    className="bg-white text-black hover:bg-gray-200"
                                  >
                                    <Star className="w-4 h-4 mr-1" />
                                    리뷰 작성
                                  </Button>
                                )}
                                {item.hasReview && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-gray-600 text-gray-400 bg-transparent"
                                    disabled
                                  >
                                    <MessageSquare className="w-4 h-4 mr-1" />
                                    리뷰 완료
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
