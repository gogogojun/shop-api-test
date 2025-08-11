import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, User, Menu, X, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function Header() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  const categories = [
    { name: "상의", href: "/category/tops", icon: "👕" },
    { name: "하의", href: "/category/bottoms", icon: "👖" },
    { name: "액세서리", href: "/category/accessories", icon: "👜" },
    { name: "모자", href: "/category/hats", icon: "🧢" },
    { name: "신발", href: "/category/shoes", icon: "👟" },
  ]

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('search') as string
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <>
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Hamburger Menu + Logo */}
            <div className="flex items-center space-x-4">
              {/* Hamburger Menu */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCategoryMenuOpen(true)}
                className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Logo */}
              <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
                MUST DARK
              </Link>
            </div>

            {/* Center Section - Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  name="search"
                  type="search"
                  placeholder="상품을 검색하세요..."
                  className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white rounded-full h-10"
                />
              </form>
            </div>

            {/* Right Section - User Menu + Cart + Login */}
            <div className="flex items-center space-x-3">
              {/* User Menu */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <User className="w-5 h-5" />
                </Button>
                {showUserDropdown && (
                  <div className="absolute right-0 top-12 bg-gray-900 border border-gray-700 rounded-lg shadow-lg w-48 py-2 z-50">
                    <Link 
                      to="/orders" 
                      className="flex items-center px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      📦 주문내역
                    </Link>
                    <Link 
                      to="/mypage" 
                      className="flex items-center px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      👤 마이페이지
                    </Link>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800 relative transition-all duration-200">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    3
                  </span>
                </Button>
              </Link>

              {/* Login Button */}
              <Link to="/login">
                <Button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full font-semibold transition-all duration-200">
                  로그인
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800 animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col space-y-4">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    name="search"
                    type="search"
                    placeholder="상품을 검색하세요..."
                    className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 rounded-full"
                  />
                </form>
                <nav className="flex flex-col space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="text-gray-300 hover:text-white py-3 px-2 rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-3">{category.icon}</span>
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Category Sidebar Menu */}
      {isCategoryMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
            onClick={() => setIsCategoryMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-full w-80 bg-gray-900 z-50 animate-in slide-in-from-left duration-300 border-r border-gray-800">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">카테고리</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCategoryMenuOpen(false)}
                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Categories */}
              <nav className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.href}
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="flex items-center justify-between p-4 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 group"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-4">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                ))}
              </nav>

              {/* Bottom Section */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-gray-400 text-sm mb-2">어둠 속에서 빛나는 스타일</p>
                  <p className="text-white font-semibold">MUST DARK</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
