"use client"

import { useState } from "react"
import Image from "next/image"
import { User, MapPin, Heart, Settings, Package, CreditCard, Bell, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function MyPage() {
  const [userInfo, setUserInfo] = useState({
    name: "홍길동",
    email: "hong@example.com",
    nickname: "mustdark_user",
    phone: "010-1234-5678",
  })

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "집",
      recipient: "홍길동",
      phone: "010-1234-5678",
      address: "서울시 강남구 테헤란로 123",
      detailAddress: "456호",
      zipCode: "12345",
      isDefault: true,
    },
    {
      id: 2,
      name: "회사",
      recipient: "홍길동",
      phone: "010-1234-5678",
      address: "서울시 서초구 서초대로 789",
      detailAddress: "10층",
      zipCode: "67890",
      isDefault: false,
    },
  ])

  const recentOrders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "배송완료",
      totalAmount: 134000,
      items: [
        { name: "미니멀 블랙 티셔츠", image: "/black-minimal-tshirt.png" },
        { name: "첼시 부츠", image: "/black-chelsea-boots.png" },
      ],
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-10",
      status: "배송중",
      totalAmount: 75000,
      items: [
        { name: "오버사이즈 후디", image: "/placeholder.svg?height=400&width=300" },
      ],
    },
  ]

  const wishlistItems = [
    { id: 1, name: "레더 크로스백", price: 120000, image: "/black-leather-crossbag.png" },
    { id: 2, name: "베이직 비니", price: 25000, image: "/black-beanie-hat.png" },
    { id: 3, name: "다크 슬림 진", price: 89000, image: "/dark-slim-jeans.png" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">마이페이지</h1>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* 사이드바 */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-white font-semibold">{userInfo.nickname}</h3>
                    <p className="text-gray-400 text-sm">{userInfo.email}</p>
                  </div>
                  <nav className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                      <User className="w-4 h-4 mr-3" />
                      회원정보 수정
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                      <Package className="w-4 h-4 mr-3" />
                      주문내역
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                      <MapPin className="w-4 h-4 mr-3" />
                      배송지 관리
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                      <Heart className="w-4 h-4 mr-3" />
                      찜한 상품
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                      <CreditCard className="w-4 h-4 mr-3" />
                      결제수단 관리
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                      <Bell className="w-4 h-4 mr-3" />
                      알림 설정
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-800">
                      <LogOut className="w-4 h-4 mr-3" />
                      로그아웃
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="bg-gray-900 border-gray-800">
                  <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:text-black">
                    회원정보
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="data-[state=active]:bg-white data-[state=active]:text-black">
                    주문내역
                  </TabsTrigger>
                  <TabsTrigger value="addresses" className="data-[state=active]:bg-white data-[state=active]:text-black">
                    배송지 관리
                  </TabsTrigger>
                  <TabsTrigger value="wishlist" className="data-[state=active]:bg-white data-[state=active]:text-black">
                    찜한 상품
                  </TabsTrigger>
                </TabsList>

                {/* 회원정보 탭 */}
                <TabsContent value="profile">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">회원정보 수정</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-gray-300">이름</Label>
                          <Input
                            id="name"
                            value={userInfo.name}
                            onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                            className="bg-gray-800 border-gray-700 text-white mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="nickname" className="text-gray-300">닉네임</Label>
                          <Input
                            id="nickname"
                            value={userInfo.nickname}
                            onChange={(e) => setUserInfo({...userInfo, nickname: e.target.value})}
                            className="bg-gray-800 border-gray-700 text-white mt-2"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-300">이메일</Label>
                        <Input
                          id="email"
                          value={userInfo.email}
                          className="bg-gray-800 border-gray-700 text-white mt-2"
                          disabled
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-gray-300">연락처</Label>
                        <Input
                          id="phone"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white mt-2"
                        />
                      </div>
                      <Button className="bg-white text-black hover:bg-gray-200">
                        정보 수정
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* 주문내역 탭 */}
                <TabsContent value="orders">
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <Card key={order.id} className="bg-gray-900 border-gray-800">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-white font-semibold">{order.id}</h3>
                              <p className="text-gray-400 text-sm">{order.date}</p>
                            </div>
                            <div className="text-right">
                              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                {order.status}
                              </span>
                              <p className="text-white font-bold mt-1">
                                {order.totalAmount.toLocaleString()}원
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="w-16 h-16 relative rounded-lg overflow-hidden">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* 배송지 관리 탭 */}
                <TabsContent value="addresses">
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <Card key={address.id} className="bg-gray-900 border-gray-800">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center mb-2">
                                <h3 className="text-white font-semibold mr-2">{address.name}</h3>
                                {address.isDefault && (
                                  <span className="bg-white text-black text-xs px-2 py-1 rounded">
                                    기본 배송지
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-300">{address.recipient} | {address.phone}</p>
                              <p className="text-gray-400 text-sm">
                                ({address.zipCode}) {address.address} {address.detailAddress}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                                수정
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-900 bg-transparent">
                                삭제
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button className="w-full bg-white text-black hover:bg-gray-200">
                      새 배송지 추가
                    </Button>
                  </div>
                </TabsContent>

                {/* 찜한 상품 탭 */}
                <TabsContent value="wishlist">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                      <Card key={item.id} className="bg-gray-900 border-gray-800">
                        <CardContent className="p-4">
                          <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="text-white font-semibold mb-2">{item.name}</h3>
                          <p className="text-white font-bold mb-3">{item.price.toLocaleString()}원</p>
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-white text-black hover:bg-gray-200 flex-1">
                              장바구니
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
