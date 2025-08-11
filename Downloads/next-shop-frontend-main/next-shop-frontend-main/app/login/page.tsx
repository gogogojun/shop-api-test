"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showSocialLogin, setShowSocialLogin] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log("Login attempt:", { email, password })
      // 로그인 성공 시 메인으로 이동
      window.location.href = "/"
    }, 1000)
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* 로고 섹션 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">MUST DARK</h1>
            <p className="text-gray-400">어둠 속에서 빛나는 스타일</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-center mb-8">로그인</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 text-sm font-medium">
                  이메일
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-white focus:ring-1 focus:ring-white"
                  placeholder="이메일을 입력하세요"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 text-sm font-medium">
                  비밀번호
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-white focus:ring-1 focus:ring-white pr-12"
                    placeholder="비밀번호를 입력하세요"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-white text-black hover:bg-gray-200 h-12 rounded-lg font-semibold transition-all duration-200"
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>

            <div className="relative my-8">
              <Separator className="bg-gray-700" />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-4 text-gray-400 text-sm">
                또는
              </span>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setShowSocialLogin("kakao")}
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 h-12 rounded-lg font-semibold transition-all duration-200"
              >
                카카오로 로그인
              </Button>
              <Button
                onClick={() => setShowSocialLogin("naver")}
                className="w-full bg-green-500 text-white hover:bg-green-600 h-12 rounded-lg font-semibold transition-all duration-200"
              >
                네이버로 로그인
              </Button>
              <Button
                onClick={() => setShowSocialLogin("google")}
                className="w-full bg-white text-black hover:bg-gray-200 h-12 rounded-lg font-semibold transition-all duration-200"
              >
                구글로 로그인
              </Button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-4">
                계정이 없으신가요?
              </p>
              <Link href="/signup">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-white hover:bg-white hover:text-black bg-transparent h-12 rounded-lg font-semibold transition-all duration-200"
                >
                  회원가입하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* 비밀번호 찾기 팝업 */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">비밀번호 찾기</h3>
            <p className="text-gray-400 mb-6">가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.</p>
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              className="bg-gray-800 border-gray-700 text-white mb-4"
            />
            <div className="flex space-x-3">
              <Button onClick={() => setShowForgotPassword(false)} variant="outline" className="flex-1 border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                취소
              </Button>
              <Button className="flex-1 bg-white text-black hover:bg-gray-200">
                전송
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 소셜 로그인 팝업 */}
      {showSocialLogin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-6">{showSocialLogin} 로그인</h3>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder={`${showSocialLogin} 이메일`}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                type="password"
                placeholder="비밀번호"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="w-full bg-white text-black hover:bg-gray-200">
                로그인
              </Button>
              <Button
                onClick={() => setShowSocialLogin(null)}
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
              >
                취소
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
