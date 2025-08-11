"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  })
  
  // 유효성 검사 상태
  const [validation, setValidation] = useState({
    email: { isValid: false, message: "" },
    nickname: { isValid: false, message: "" },
    password: { isValid: false, message: "" },
    confirmPassword: { isValid: false, message: "" },
  })

  const [showSocialSignup, setShowSocialSignup] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // 실시간 유효성 검사
    switch (field) {
      case 'email':
        validateEmail(value)
        break
      case 'nickname':
        validateNickname(value)
        break
      case 'password':
        validatePassword(value)
        break
      case 'confirmPassword':
        validateConfirmPassword(value)
        break
    }
  }

  const validateEmail = async (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setValidation(prev => ({
        ...prev,
        email: { isValid: false, message: "올바른 이메일 형식이 아닙니다." }
      }))
      return
    }
    
    // 이메일 중복 검사 (실제로는 API 호출)
    setTimeout(() => {
      setValidation(prev => ({
        ...prev,
        email: { isValid: true, message: "사용 가능한 이메일입니다." }
      }))
    }, 500)
  }

  const validateNickname = async (nickname: string) => {
    if (nickname.length < 2) {
      setValidation(prev => ({
        ...prev,
        nickname: { isValid: false, message: "닉네임은 2자 이상이어야 합니다." }
      }))
      return
    }
    
    // 닉네임 중복 검사 (실제로는 API 호출)
    setTimeout(() => {
      setValidation(prev => ({
        ...prev,
        nickname: { isValid: true, message: "사용 가능한 닉네임입니다." }
      }))
    }, 500)
  }

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(password)) {
      setValidation(prev => ({
        ...prev,
        password: { isValid: false, message: "영문, 숫자, 특수문자 포함 8자 이상이어야 합니다." }
      }))
      return
    }
    
    setValidation(prev => ({
      ...prev,
      password: { isValid: true, message: "사용 가능한 비밀번호입니다." }
    }))
  }

  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword !== formData.password) {
      setValidation(prev => ({
        ...prev,
        confirmPassword: { isValid: false, message: "비밀번호가 일치하지 않습니다." }
      }))
      return
    }
    
    setValidation(prev => ({
      ...prev,
      confirmPassword: { isValid: true, message: "비밀번호가 일치합니다." }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreements.terms || !agreements.privacy) {
      alert("필수 약관에 동의해주세요.")
      return
    }
    
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log("Signup attempt:", formData, agreements)
    }, 1000)
  }

  const handleSocialSignup = (provider: string) => {
    console.log(`${provider} signup`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">MUST DARK</h1>
            <p className="text-gray-400">새로운 스타일의 시작</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-center mb-8">회원가입</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 이메일 */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 text-sm font-medium">
                  이메일 *
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-white focus:ring-1 focus:ring-white pr-12"
                    placeholder="이메일을 입력하세요"
                    required
                  />
                  {formData.email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {validation.email.isValid ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {formData.email && (
                  <p className={`text-xs ${validation.email.isValid ? 'text-green-500' : 'text-red-500'}`}>
                    {validation.email.message}
                  </p>
                )}
              </div>

              {/* 닉네임 */}
              <div className="space-y-2">
                <Label htmlFor="nickname" className="text-gray-300 text-sm font-medium">
                  닉네임 *
                </Label>
                <div className="relative">
                  <Input
                    id="nickname"
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-white focus:ring-1 focus:ring-white pr-12"
                    placeholder="닉네임을 입력하세요"
                    required
                  />
                  {formData.nickname && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {validation.nickname.isValid ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {formData.nickname && (
                  <p className={`text-xs ${validation.nickname.isValid ? 'text-green-500' : 'text-red-500'}`}>
                    {validation.nickname.message}
                  </p>
                )}
              </div>

              {/* 비밀번호 */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 text-sm font-medium">
                  비밀번호 *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
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
                {formData.password && (
                  <p className={`text-xs ${validation.password.isValid ? 'text-green-500' : 'text-red-500'}`}>
                    {validation.password.message}
                  </p>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300 text-sm font-medium">
                  비밀번호 확인 *
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-white focus:ring-1 focus:ring-white pr-12"
                    placeholder="비밀번호를 다시 입력하세요"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <p className={`text-xs ${validation.confirmPassword.isValid ? 'text-green-500' : 'text-red-500'}`}>
                    {validation.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* 약관 동의 */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreements.terms}
                    onCheckedChange={(checked) => 
                      setAgreements(prev => ({ ...prev, terms: checked as boolean }))
                    }
                    className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:border-white"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-300">
                    이용약관에 동의합니다 (필수)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={agreements.privacy}
                    onCheckedChange={(checked) => 
                      setAgreements(prev => ({ ...prev, privacy: checked as boolean }))
                    }
                    className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:border-white"
                  />
                  <Label htmlFor="privacy" className="text-sm text-gray-300">
                    개인정보 처리방침에 동의합니다 (필수)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="marketing"
                    checked={agreements.marketing}
                    onCheckedChange={(checked) => 
                      setAgreements(prev => ({ ...prev, marketing: checked as boolean }))
                    }
                    className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:border-white"
                  />
                  <Label htmlFor="marketing" className="text-sm text-gray-300">
                    마케팅 정보 수신에 동의합니다 (선택)
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading || !agreements.terms || !agreements.privacy}
                className="w-full bg-white text-black hover:bg-gray-200 h-12 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? "가입 중..." : "회원가입"}
              </Button>
            </form>

            <div className="relative my-8">
              <Separator className="bg-gray-700" />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-4 text-gray-400 text-sm">
                또는
              </span>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setShowSocialSignup("kakao")}
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 h-12 rounded-lg font-semibold transition-all duration-200"
              >
                카카오로 회원가입
              </Button>
              <Button
                onClick={() => setShowSocialSignup("naver")}
                className="w-full bg-green-500 text-white hover:bg-green-600 h-12 rounded-lg font-semibold transition-all duration-200"
              >
                네이버로 회원가입
              </Button>
              <Button
                onClick={() => setShowSocialSignup("google")}
                className="w-full bg-white text-black hover:bg-gray-200 h-12 rounded-lg font-semibold transition-all duration-200"
              >
                구글로 회원가입
              </Button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-4">
                이미 계정이 있으신가요?
              </p>
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-white hover:bg-white hover:text-black bg-transparent h-12 rounded-lg font-semibold transition-all duration-200"
                >
                  로그인하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {/* 소셜 회원가입 팝업 */}
      {showSocialSignup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-6">{showSocialSignup} 회원가입</h3>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder={`${showSocialSignup} 이메일`}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                type="text"
                placeholder="닉네임"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                type="password"
                placeholder="비밀번호"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <div className="flex items-center space-x-2">
                <Checkbox className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:border-white" />
                <Label className="text-sm text-gray-300">이용약관에 동의합니다</Label>
              </div>
              <Button className="w-full bg-white text-black hover:bg-gray-200">
                회원가입
              </Button>
              <Button
                onClick={() => setShowSocialSignup(null)}
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
