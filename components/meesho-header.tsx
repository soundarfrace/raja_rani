'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, ShoppingCart, User, X, Home, Shield } from 'lucide-react'
import Link from 'next/link'
import { NAV_CATEGORIES, NavCategory } from '@/lib/meesho-navigation'

interface MeeshoHeaderProps {
  cartCount?: number
  onSearch?: (query: string) => void
  onSelectCategory?: (category: string, subCategory?: string, item?: string) => void
  onOpenCart?: () => void
  onOpenProfile?: () => void
}

export default function MeeshoHeader({
  cartCount = 0,
  onSearch,
  onSelectCategory,
  onOpenCart,
  onOpenProfile
}: MeeshoHeaderProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<NavCategory | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileActiveCategory, setMobileActiveCategory] = useState<NavCategory | null>(NAV_CATEGORIES[0]) // default first electronic category
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (cat: NavCategory) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setActiveCategory(cat)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null)
    }, 120)
  }

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchTerm)
    }
  }

  const handleItemClick = (catName: string, subTitle: string, item: string) => {
    setActiveCategory(null)
    setIsMobileMenuOpen(false)
    if (onSelectCategory) {
      onSelectCategory(catName, subTitle, item)
    }
  }

  return (
    <header className="meesho-header-container bg-white w-full border-b border-[#e7e7e7] sticky top-0 z-50 font-sans shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      {/* Top Main Bar */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-7 py-3 flex items-center justify-between gap-4 md:gap-8">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger toggle */}
          <button
            type="button"
            className="md:hidden p-1.5 text-gray-700 hover:text-[#9f2066]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <a
            href="/"
            className="raja-rani-brand flex items-center gap-2 select-none group"
            onClick={(e) => {
              e.preventDefault()
              if (onSelectCategory) onSelectCategory('home')
            }}
          >
            {/* Typography */}
            <div className="flex items-center">
              <span className="text-[22px] md:text-[26px] font-black tracking-tight text-[#881353] group-hover:text-[#a8226d] transition-colors" style={{ fontFamily: 'var(--font-serif, "Cinzel", "Playfair Display", Georgia, serif)', letterSpacing: '0.04em' }}>
                Raja
              </span>
              <span className="text-[22px] md:text-[26px] font-black tracking-tight text-[#c2185b] group-hover:text-[#e91e63] transition-colors" style={{ fontFamily: 'var(--font-serif, "Cinzel", "Playfair Display", Georgia, serif)', letterSpacing: '0.04em' }}>
                Rani
              </span>
            </div>
          </a>
        </div>

        {/* Center: Search Box */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-[580px] relative hidden sm:flex items-center"
        >
          <div className="w-full flex items-center bg-[#fafafa] hover:bg-white border border-[#d6d6d6] hover:border-[#9f2066] focus-within:border-[#9f2066] focus-within:bg-white rounded-[6px] px-3.5 py-2.5 transition-all shadow-sm">
            <Search className="w-4 h-4 text-[#8b8b8b] mr-3 flex-shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Try Smart TV, Split AC, Refrigerator or Model Code"
              className="w-full bg-transparent text-[13px] md:text-[14px] text-gray-800 placeholder-[#9b9b9b] focus:outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="text-gray-400 hover:text-gray-600 ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Right Actions: Home, Profile & Cart */}
        <div className="flex items-center gap-5 md:gap-7 text-[13px] md:text-[14px] font-medium text-gray-700">
          {/* Home */}
          <button
            type="button"
            onClick={() => onSelectCategory?.('home')}
            className="flex flex-col items-center justify-center hover:text-[#9f2066] transition-colors group cursor-pointer"
          >
            <Home className="w-[19px] h-[19px] md:w-[21px] md:h-[21px] text-gray-700 group-hover:text-[#9f2066] stroke-[1.8]" />
            <span className="text-[12px] md:text-[13px] mt-0.5 font-medium">Home</span>
          </button>

          <div className="w-[1px] h-6 bg-gray-200" />

          {/* Admin */}
          <Link
            href="/admin"
            className="flex flex-col items-center justify-center hover:text-[#9f2066] transition-colors group cursor-pointer"
          >
            <Shield className="w-[19px] h-[19px] md:w-[21px] md:h-[21px] text-gray-700 group-hover:text-[#9f2066] stroke-[1.8]" />
            <span className="text-[12px] md:text-[13px] mt-0.5 font-medium">Admin</span>
          </Link>

          <div className="w-[1px] h-6 bg-gray-200" />

          {/* Profile */}
          <button
            type="button"
            onClick={() => onOpenProfile?.()}
            className="flex flex-col items-center justify-center hover:text-[#9f2066] transition-colors group cursor-pointer"
          >
            <User className="w-[19px] h-[19px] md:w-[21px] md:h-[21px] text-gray-700 group-hover:text-[#9f2066] stroke-[1.8]" />
            <span className="text-[12px] md:text-[13px] mt-0.5 font-medium">Profile</span>
          </button>

          <div className="w-[1px] h-6 bg-gray-200" />

          {/* Cart */}
          <button
            type="button"
            onClick={() => onOpenCart?.()}
            className="flex flex-col items-center justify-center hover:text-[#9f2066] transition-colors group relative cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="w-[19px] h-[19px] md:w-[21px] md:h-[21px] text-gray-700 group-hover:text-[#9f2066] stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-[#9f2066] to-[#d4378b] text-white text-[11px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center leading-none shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[12px] md:text-[13px] mt-0.5 font-medium">Cart</span>
          </button>
        </div>
      </div>

      {/* Mobile Search input when screen is small */}
      <div className="sm:hidden px-3.5 pb-2.5">
        <form onSubmit={handleSearchSubmit} className="w-full flex items-center bg-[#f8f8f8] border border-gray-300 rounded-lg px-3 py-2 shadow-xs focus-within:border-[#9f2066] focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search appliances, brands, TVs, ACs..."
            className="w-full bg-transparent text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="text-gray-400 hover:text-gray-600 ml-1 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      </div>

      {/* Category Navigation Bar (Desktop) */}
      <nav
        className="meesho-nav-bar border-t border-[#f0f0f0] bg-white relative hidden md:block"
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
          <ul className="flex items-center justify-between overflow-x-auto scrollbar-none whitespace-nowrap text-[13.5px] font-normal text-[#333333]">
            {NAV_CATEGORIES.map((category) => {
              const isHovered = activeCategory?.id === category.id
              return (
                <li
                  key={category.id}
                  className="relative group py-2.5"
                  onMouseEnter={() => handleMouseEnter(category)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(category.name)
                    }}
                    className={`px-2.5 lg:px-3 py-1 text-[13px] lg:text-[14px] font-medium transition-colors cursor-pointer block border-b-2 ${
                      isHovered
                        ? 'text-[#9f2066] border-[#9f2066]'
                        : 'text-[#333] border-transparent hover:text-[#9f2066]'
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Dropdown Mega Menu (Meesho Authentic Multi-Column Flyout) */}
        {activeCategory && (
          <div
            className="meesho-mega-menu absolute top-full left-0 right-0 w-full bg-white border-t border-b border-[#e7e7e7] shadow-2xl z-40 transition-all duration-150 animate-fadeIn"
            onMouseEnter={() => {
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current)
                closeTimeoutRef.current = null
              }
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[1400px] mx-auto px-8 py-7">
              <div className="grid grid-flow-col auto-cols-max gap-x-12 gap-y-6 max-h-[460px] overflow-x-auto">
                {activeCategory.columns.map((col, idx) => (
                  <div key={idx} className="w-[190px] lg:w-[210px] flex flex-col gap-2">
                    <h3 className="text-[14px] font-bold text-[#9f2066] tracking-tight pb-1 border-b border-[#f3e3ed]">
                      {col.title}
                    </h3>
                    <ul className="flex flex-col gap-1.5 pt-1">
                      {col.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <button
                            type="button"
                            onClick={() => handleItemClick(activeCategory.name, col.title, item)}
                            className="text-[13px] text-[#555555] hover:text-[#111111] hover:font-medium text-left transition-colors cursor-pointer leading-relaxed block w-full truncate py-0.5"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[90px] bg-white z-50 flex overflow-hidden border-t border-gray-200">
          {/* Left Category Column */}
          <div className="w-1/3 bg-[#f7f7f7] border-r border-gray-200 overflow-y-auto">
            {NAV_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setMobileActiveCategory(cat)}
                className={`w-full text-left px-3 py-3 text-[12px] font-medium border-l-4 transition-colors ${
                  mobileActiveCategory?.id === cat.id
                    ? 'border-[#9f2066] bg-white text-[#9f2066] font-bold'
                    : 'border-transparent text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right Subcategory List */}
          <div className="w-2/3 p-4 overflow-y-auto">
            {mobileActiveCategory && (
              <div className="flex flex-col gap-5">
                <h3 className="text-[14px] font-bold text-[#9f2066] border-b pb-2">
                  {mobileActiveCategory.name}
                </h3>
                {mobileActiveCategory.columns.map((col, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <h4 className="text-[13px] font-semibold text-gray-900">{col.title}</h4>
                    <div className="flex flex-col gap-1 pl-2">
                      {col.items.map((item, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleItemClick(mobileActiveCategory.name, col.title, item)}
                          className="text-left text-[12px] text-gray-600 hover:text-[#9f2066] py-1 border-b border-gray-50"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
