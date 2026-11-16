'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, ShoppingCart, User, X, Crown, Sparkles } from 'lucide-react'
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
  const [mobileActiveCategory, setMobileActiveCategory] = useState<NavCategory | null>(NAV_CATEGORIES[9]) // default bags & footwear
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
            {/* Elegant Crown / Royal Emblem Badge */}
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#861453] via-[#a8226d] to-[#d4378b] flex items-center justify-center shadow-md shadow-pink-900/20 group-hover:scale-105 transition-transform duration-200">
              <Crown className="w-4 h-4 text-amber-300 stroke-[2.2] drop-shadow-sm" />
              <Sparkles className="w-2.5 h-2.5 text-yellow-100 absolute -top-0.5 -right-0.5 animate-pulse" />
            </div>

            {/* Typography */}
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1">
                <span className="text-[22px] md:text-[26px] font-black tracking-tight text-[#881353] group-hover:text-[#a8226d] transition-colors" style={{ fontFamily: 'var(--font-serif, "Cinzel", "Playfair Display", Georgia, serif)', letterSpacing: '0.04em' }}>
                  RAJA
                </span>
                <span className="text-[17px] md:text-[20px] font-light text-amber-500 font-serif italic mx-0.5">
                  &amp;
                </span>
                <span className="text-[22px] md:text-[26px] font-black tracking-tight text-[#c2185b] group-hover:text-[#e91e63] transition-colors" style={{ fontFamily: 'var(--font-serif, "Cinzel", "Playfair Display", Georgia, serif)', letterSpacing: '0.04em' }}>
                  RANI
                </span>
              </div>
              <span className="text-[8.5px] uppercase tracking-[0.24em] font-semibold text-gray-400 group-hover:text-gray-600 transition-colors">
                Royal Trends · Everyday Prices
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
              placeholder="Try Saree, Kurti or Search by Product Code"
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

        {/* Right Actions: Clean Profile & Cart only */}
        <div className="flex items-center gap-5 md:gap-7 text-[12px] md:text-[13px] font-medium text-gray-700">
          {/* Profile */}
          <button
            type="button"
            onClick={() => onOpenProfile?.()}
            className="flex flex-col items-center justify-center hover:text-[#9f2066] transition-colors group cursor-pointer"
          >
            <User className="w-[19px] h-[19px] md:w-[21px] md:h-[21px] text-gray-700 group-hover:text-[#9f2066] stroke-[1.8]" />
            <span className="text-[11px] md:text-[12px] mt-0.5 font-normal">Profile</span>
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
                <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-[#9f2066] to-[#d4378b] text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center leading-none shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[11px] md:text-[12px] mt-0.5 font-normal">Cart</span>
          </button>
        </div>
      </div>

      {/* Mobile Search input when screen is small */}
      <div className="sm:hidden px-4 pb-2.5">
        <form onSubmit={handleSearchSubmit} className="w-full flex items-center bg-[#f8f8f8] border border-gray-300 rounded px-3 py-1.5">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search on Meesho..."
            className="w-full bg-transparent text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none"
          />
        </form>
      </div>

      {/* Category Navigation Bar (Desktop) */}
      <nav
        className="meesho-nav-bar border-t border-[#f0f0f0] bg-white relative hidden md:block"
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
          <ul className="flex items-center justify-between overflow-x-auto scrollbar-none whitespace-nowrap text-[13px] font-normal text-[#333333]">
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
                    className={`px-2 lg:px-2.5 py-1 text-[12px] lg:text-[13px] font-medium transition-colors cursor-pointer block border-b-2 ${
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
                  <div key={idx} className="w-[180px] lg:w-[200px] flex flex-col gap-2">
                    <h3 className="text-[13px] font-semibold text-[#9f2066] tracking-tight pb-1 border-b border-[#f3e3ed]">
                      {col.title}
                    </h3>
                    <ul className="flex flex-col gap-1.5 pt-1">
                      {col.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <button
                            type="button"
                            onClick={() => handleItemClick(activeCategory.name, col.title, item)}
                            className="text-[12px] text-[#666666] hover:text-[#111111] hover:font-medium text-left transition-colors cursor-pointer leading-relaxed block w-full truncate py-0.5"
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
