'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Award, BadgeCheck, Check, ChevronDown, ChevronRight, Headphones, Heart, IndianRupee, Menu, PackageCheck, Search, ShieldCheck, ShoppingBag, SlidersHorizontal, Sparkles, Star, Truck, X, Zap } from 'lucide-react'
import MeeshoHeader from '@/components/meesho-header'

type Product = { id: number; brand: string; name: string; category: string; price: number; oldPrice: number; rating: number; reviews: number; image: string; tag?: string; energyStars: number; inStock: boolean }
const categories = [
  { name: 'Refrigerators', note: 'A cooler kind of clever', image: 'photo-1571175443880-49e1d25b2bc5' },
  { name: 'Laundry', note: 'A little less laundry day', image: 'photo-1626806787461-102c1bfaaea1' },
  { name: 'Kitchen', note: 'Made for the everyday', image: 'photo-1556911220-e15b29be8c8f' },
  { name: 'Televisions', note: 'Your front-row seat', image: 'photo-1593359677879-a4bb92f829d1' },
  { name: 'Cooling', note: 'Comfort, considered', image: '/category-cooling.png' },
  { name: 'Floor care', note: 'A fresher point of view', image: 'photo-1558317374-067fb5f30001' },
  { name: 'Dishwashers', note: 'More time for everything', image: 'photo-1620626011761-996317b8d101' },
  { name: 'Small appliances', note: 'Small things, better', image: 'photo-1550583724-b2692b85b150' },
  { name: 'Water purifiers', note: 'A cleaner kind of clear', image: 'photo-1584622650111-993a426fbf0a' },
  { name: 'Microwaves', note: 'A fresh take on fast', image: 'photo-1585659722983-3a675dabf23d' },
]
const photo = (id: string, width = 900) => id.startsWith('/') ? id : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
const categoryPhoto = (image: string, width: number) => image.startsWith('/') ? image : photo(image, width)
const FALLBACK_PRODUCTS: Product[] = [
  ['Samsung', 'Bespoke 4-Door Flex Refrigerator', 'Refrigerators', 129990, 159990, '/products/fridge-samsung.jpg', 'Bestseller'],
  ['LG', 'AI Direct Drive Front Load Washer', 'Laundry', 54990, 69990, '/products/washer-lg.jpg', 'Top rated'],
  ['Dyson', 'V15 Detect Absolute Cordless Vacuum', 'Floor care', 62900, 71900, '/products/vacuum-dyson.jpg', 'Editor’s pick'],
  ['Bosch', 'Series 6 Built-in Dishwasher', 'Dishwashers', 67990, 82990, '/products/dishwasher-bosch.jpg', 'Quiet favourite'],
  ['Sony', 'BRAVIA 3 4K Ultra HD Smart TV', 'Televisions', 74990, 99990, '/products/tv-sony.jpg', 'Bestseller'],
  ['Voltas', 'Adjustable Inverter Split AC', 'Cooling', 42990, 55990, '/products/ac-voltas.jpg', 'Summer essential'],
  ['Philips', 'Barista Brew Espresso Machine', 'Kitchen', 21995, 27995, '/products/espresso-philips.jpg', 'New arrival'],
  ['Whirlpool', 'IntelliFresh Double Door Fridge', 'Refrigerators', 38990, 48990, '/products/fridge-whirlpool.jpg'],
  ['Haier', '8kg Inverter Front Load Washer', 'Laundry', 35990, 44990, '/products/washer-haier.jpg'],
  ['Samsung', 'Neo QLED 4K Smart TV, 55”', 'Televisions', 119990, 149990, '/products/tv-samsung.jpg'],
  ['Philips', 'Airfryer & Multi-Cooker XXL', 'Kitchen', 14995, 18995, '/products/airfryer-philips.jpg', 'Staff pick'],
  ['Bosch', 'Series 4 Front Load Washer', 'Laundry', 46990, 58990, '/products/washer-bosch.jpg'],
  ['LG', 'Convertible 6-in-1 Split AC', 'Cooling', 51990, 64990, '/products/ac-lg.jpg'],
  ['Dyson', 'Purifier Cool Gen1 Tower', 'Small appliances', 39900, 49900, '/products/purifier-dyson.jpg'],
  ['Panasonic', '2-in-1 UV Water Purifier', 'Water purifiers', 18990, 24990, '/products/water-panasonic.jpg'],
  ['Samsung', 'Bespoke Counter Refrigerator', 'Refrigerators', 49990, 62990, '/products/fridge-samsung-bespoke.jpg'],
  ['Philips', 'Daily Collection Pop-up Toaster', 'Kitchen', 3490, 4490, '/products/toaster-philips.jpg'],
  ['Whirlpool', 'Magicook Pro Convection Microwave', 'Microwaves', 12990, 16990, '/products/microwave-whirlpool.jpg'],
  ['Bosch', 'Series 8 Fully Integrated Dishwasher', 'Dishwashers', 89990, 109990, '/products/dishwasher-bosch-s8.jpg'],
  ['Preethi', 'Power Blender & Mixer Grinder', 'Kitchen', 6995, 8995, '/products/blender-preethi.jpg'],
  ['Morphy Richards', 'Electric Glass Kettle, 1.7L', 'Small appliances', 2490, 3290, '/products/kettle-morphy.jpg'],
  ['Voltas', 'Pure Air Inverter AC', 'Cooling', 36990, 47990, '/products/ac-voltas-pure.jpg'],
  ['Dyson', 'V8 Slim Fluffy Cordless Vacuum', 'Floor care', 34900, 41900, '/products/vacuum-dyson-v8.jpg'],
  ['Philips', 'EasySpeed Steam Iron 2000W', 'Small appliances', 2290, 2990, '/products/iron-philips.jpg'],
  ['Panasonic', 'Convection Microwave Oven, 27L', 'Microwaves', 15490, 19990, '/products/microwave-panasonic.jpg'],
  ['DeLonghi', 'Magnifica S Automatic Espresso', 'Kitchen', 54990, 68990, '/products/espresso-delonghi.jpg'],
  ['LG', 'PuriCare Tankless Water Purifier', 'Water purifiers', 24990, 31990, '/products/water-lg.jpg'],
  ['Bosch', 'Series 6 Bagless Vacuum Cleaner', 'Floor care', 17990, 22990, '/products/vacuum-bosch.jpg'],
  ['Prestige', 'Induction Cooktop & Kettle Combo', 'Kitchen', 4990, 6990, '/products/induction-prestige.jpg'],
  ['Philips', '800 Series Air Purifier', 'Small appliances', 16995, 21995, '/products/purifier-philips.jpg'],
].map((p, i) => ({ id: i + 1, brand: p[0] as string, name: p[1] as string, category: p[2] as string, price: p[3] as number, oldPrice: p[4] as number, rating: +(4.2 + (i % 8) * .1).toFixed(1), reviews: 48 + (i * 137) % 950, image: p[5] as string, tag: p[6] as string | undefined, energyStars: 3 + (i % 3), inStock: i % 8 !== 0 }))
const brands = ['SAMSUNG', 'LG', 'BOSCH', 'WHIRLPOOL', 'HAIER', 'PHILIPS', 'Dyson', 'SONY', 'Panasonic', 'VOLTAS']
const money = (n: number) => `₹${n.toLocaleString('en-IN')}`

type Props = { cart: Record<number, number>; setCart: (value: Record<number, number>) => void; wishlist: number[]; setWishlist: (value: number[]) => void }

function Header({ cartCount, page, navigate, query, setQuery, setCartOpen, setMenuOpen, menuOpen, productList = FALLBACK_PRODUCTS }: { cartCount: number; page: string; navigate: (p: string) => void; query: string; setQuery: (q: string) => void; setCartOpen: (v: boolean) => void; setMenuOpen: (v: boolean) => void; menuOpen: boolean; productList?: Product[] }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const suggestions = productList.filter(p => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(query.toLowerCase())).slice(0, 4)
  return <>
    <div className="announcement"><span>Thoughtful living, delivered. <b>Complimentary delivery on orders over ₹10,000</b></span><span className="announcement-right">Easy returns <i>·</i> Secure checkout <i>·</i> Made for India</span></div>
    <header className="site-header"><div className="nav-row">
      <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}><Menu /></button>
      <button className="wordmark" onClick={() => navigate('home')} aria-label="RajaRani home">RajaRani</button>
      <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">{['Home', 'Shop', 'Categories', 'Deals', 'Brands'].map((item, i) => <button key={item} className={(page === ['home', 'shop', 'categories', 'deals', 'brands'][i] ? 'active' : '')} onClick={() => { navigate(['home', 'shop', 'categories', 'deals', 'brands'][i]); setMenuOpen(false) }}>{item}</button>)}</nav>
      <div className="nav-actions"><label className="search-box"><Search size={17} /><input value={query} onFocus={() => setSearchOpen(true)} onChange={e => { setQuery(e.target.value); setSearchOpen(true) }} onKeyDown={e => e.key === 'Enter' && (navigate('shop'), setSearchOpen(false))} placeholder="Find something good" aria-label="Search products" /><kbd>⌘ K</kbd></label><button className="icon-button heart-nav" aria-label="Wishlist" onClick={() => navigate('wishlist')}><Heart size={20} /></button><button className="icon-button account-nav" aria-label="Account" onClick={() => window.dispatchEvent(new CustomEvent('rajarani-toast', { detail: 'Your RajaRani account is coming soon.' }))}><span className="account-glyph">↗</span></button><button className="bag-button" aria-label={`Shopping bag, ${cartCount} items`} onClick={() => setCartOpen(true)}><ShoppingBag size={19} /><span className="bag-label">Bag</span><span className="bag-count">{cartCount}</span></button></div>
    </div>{searchOpen && query && <div className="search-suggestions"><div className="suggestion-heading">{suggestions.length ? 'PRODUCTS YOU MIGHT LOVE' : 'NO MATCHES YET'}</div>{suggestions.map(p => <button key={p.id} onClick={() => { navigate(`product-${p.id}`); setSearchOpen(false) }}><span>{p.name}</span><small>{p.brand} · {p.category}</small></button>)}<button className="all-results" onClick={() => { navigate('shop'); setSearchOpen(false) }}>See all results for “{query}” <ArrowRight size={15} /></button></div>}</header>
  </>
}

function ProductCard({ product, wishlist, toggleWish, addCart, buyNow, open }: { product: Product; wishlist: number[]; toggleWish: (id: number) => void; addCart: (id: number) => void; buyNow?: (id: number) => void; open: (id: number) => void }) {
  const discount = Math.round((1 - product.price / product.oldPrice) * 100)
  return <article className="product-card">
    <div className="product-image" onClick={() => open(product.id)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && open(product.id)}>
      <Image src={photo(product.image, 700)} alt={product.name} fill sizes="(max-width: 650px) 80vw, (max-width: 1100px) 40vw, 25vw" />
      <span className="discount-tag">-{discount}%</span>
      {product.tag && <span className="product-tag">{product.tag}</span>}
      <button aria-label={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'} className={`wish-button ${wishlist.includes(product.id) ? 'wished' : ''}`} onClick={e => { e.stopPropagation(); toggleWish(product.id) }}>
        <Heart size={18} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
      </button>
      <button className="quick-view" onClick={e => { e.stopPropagation(); open(product.id) }}>Quick view <ArrowUpRight size={14} /></button>
    </div>
    <div className="product-copy">
      <div className="product-brand">{product.brand}</div>
      <button className="product-name" onClick={() => open(product.id)}>{product.name}</button>
      <div className="rating-line">
        <span className="stars"><Star size={12} fill="currentColor" /> {product.rating}</span>
        <span>({product.reviews} reviews)</span>
      </div>
      <div className="price-row">
        <strong>{money(product.price)}</strong>
        <del>{money(product.oldPrice)}</del>
      </div>
      <div className="product-card-actions">
        <button className="btn-add-cart" onClick={(e) => { e.stopPropagation(); addCart(product.id) }}>
          <ShoppingBag size={14} /> Add to Cart
        </button>
        <button className="btn-buy-now" onClick={(e) => { e.stopPropagation(); buyNow ? buyNow(product.id) : (addCart(product.id)) }}>
          <Zap size={14} /> Buy Now
        </button>
      </div>
    </div>
  </article>
}
function FilterSidebar({ filter, setFilter, priceCap, setPriceCap, minRating, setMinRating, availableOnly, setAvailableOnly, energyOnly, setEnergyOnly, categorySearch, setCategorySearch, clearFilters }: { filter: string; setFilter: (value: string) => void; priceCap: number; setPriceCap: (value: number) => void; minRating: number; setMinRating: (value: number) => void; availableOnly: boolean; setAvailableOnly: (value: boolean) => void; energyOnly: boolean; setEnergyOnly: (value: boolean) => void; categorySearch: string; setCategorySearch: (value: string) => void; clearFilters: () => void }) {
  const categoryNames = ['Refrigerators', 'Laundry', 'Cooling', 'Televisions', 'Kitchen', 'Floor care', 'Dishwashers', 'Small appliances', 'Water purifiers', 'Microwaves']
  const brandNames = ['Samsung', 'LG', 'Bosch', 'Whirlpool', 'Haier', 'Philips', 'Dyson', 'Sony', 'Panasonic', 'Voltas']
  return <aside className="filter-sidebar"><div className="filter-sidebar-head"><div><strong>FILTERS</strong><small>30 thoughtful finds</small></div><button onClick={clearFilters}>Clear all</button></div><details className="filter-group" open><summary>Category <ChevronDown size={13} /></summary><label className="filter-search"><Search size={13} /><input value={categorySearch} onChange={event => setCategorySearch(event.target.value)} placeholder="Search category" /></label><div className="filter-options">{categoryNames.filter(name => name.toLowerCase().includes(categorySearch.toLowerCase())).map(name => <label key={name}><input type="checkbox" checked={filter === name} onChange={event => setFilter(event.target.checked ? name : 'All')} /><span>{name}</span></label>)}</div></details><details className="filter-group" open><summary>Brand <ChevronDown size={13} /></summary><div className="filter-options">{brandNames.map(name => <label key={name}><input type="checkbox" checked={filter === name} onChange={event => setFilter(event.target.checked ? name : 'All')} /><span>{name}</span></label>)}</div></details><details className="filter-group" open><summary>Price <ChevronDown size={13} /></summary><select className="sidebar-select" value={priceCap} onChange={event => setPriceCap(Number(event.target.value))} aria-label="Maximum price"><option value={200000}>All prices</option><option value={100000}>Under ₹1,00,000</option><option value={50000}>Under ₹50,000</option><option value={25000}>Under ₹25,000</option></select></details><details className="filter-group" open><summary>Customer rating <ChevronDown size={13} /></summary><div className="filter-options">{[4, 3, 0].map(value => <label key={value}><input type="radio" name="rating" checked={minRating === value} onChange={() => setMinRating(value)} /><span>{value === 0 ? 'All ratings' : `${value}+ stars`}</span></label>)}</div></details><details className="filter-group"><summary>Availability <ChevronDown size={13} /></summary><label className="filter-check"><input type="checkbox" checked={availableOnly} onChange={event => setAvailableOnly(event.target.checked)} /><span>In stock only</span></label></details><details className="filter-group"><summary>Energy efficiency <ChevronDown size={13} /></summary><label className="filter-check"><input type="checkbox" checked={energyOnly} onChange={event => setEnergyOnly(event.target.checked)} /><span>5-star rated only</span></label></details></aside>
}
function SectionHeading({ eyebrow, title, link, onClick }: { eyebrow: string; title: string; link?: string; onClick?: () => void }) { return <div className="section-heading"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2></div>{link && <button className="text-link" onClick={onClick}>{link} <ArrowRight size={16} /></button>}</div> }
function Footer({ navigate, content }: { navigate: (p: string) => void; content?: Record<string, string> }) {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <button
            className="footer-logo inline-flex items-center select-none group bg-transparent border-0 p-0 text-left cursor-pointer"
            onClick={() => navigate('home')}
            aria-label="RajaRani home"
          >
            <span
              className="text-[26px] font-black tracking-tight text-[#881353] group-hover:text-[#a8226d] transition-colors"
              style={{ fontFamily: 'var(--font-serif, "Cinzel", "Playfair Display", Georgia, serif)', letterSpacing: '0.04em' }}
            >
              {content?.header_brand_first || 'Raja'}
            </span>
            <span
              className="text-[26px] font-black tracking-tight text-[#c2185b] group-hover:text-[#e91e63] transition-colors"
              style={{ fontFamily: 'var(--font-serif, "Cinzel", "Playfair Display", Georgia, serif)', letterSpacing: '0.04em' }}
            >
              {content?.header_brand_second || 'Rani'}
            </span>
          </button>
          <p style={{ whiteSpace: 'pre-line' }}>{content?.footer_desc || 'Better living starts here.\nThoughtfully chosen for the way you live.'}</p>
          <div className="social-row"><a href="#instagram" aria-label="Instagram">ig</a><a href="#pinterest" aria-label="Pinterest">p</a><a href="#youtube" aria-label="YouTube">yt</a></div>
        </div>
        <div className="footer-col"><strong>Explore</strong>{['Shop all', 'Categories', 'Our brands', 'Today’s edit'].map((x, i) => <button key={x} onClick={() => navigate(['shop', 'categories', 'brands', 'deals'][i])}>{x}</button>)}</div>
        <div className="footer-col"><strong>We’re here</strong><a href={`mailto:${content?.contact_email || 'hello@rajarani.in'}`}>Contact us</a><button onClick={() => window.dispatchEvent(new CustomEvent('rajarani-toast', { detail: 'Our delivery guide: complimentary delivery over ₹10,000.' }))}>Delivery & returns</button><button onClick={() => window.dispatchEvent(new CustomEvent('rajarani-toast', { detail: 'Every product comes with manufacturer warranty.' }))}>Warranty & care</button></div>
        <div className="footer-note"><div className="eyebrow">{content?.footer_note_title || 'A BETTER KIND OF HOME'}</div><p>{content?.footer_note_body || 'Good design should make everyday feel a little more extraordinary.'}</p><span>Built with care, in India. © RajaRani 2025</span></div>
      </div>
      <div className="footer-bottom"><span>{content?.footer_copyright || '© 2025 RajaRani Living Pvt. Ltd.'}</span><span>{content?.footer_subline || 'Thoughtfully selected. Fairly priced. Delivered with care.'}</span><span>Made for India <span className="india-dot">●</span></span></div>
    </footer>
  )
}

export default function Storefront({ cart, setCart, wishlist, setWishlist }: Props) {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [cmsCategories, setCmsCategories] = useState(categories)
  const [content, setContent] = useState<Record<string, string>>({
    hero_title: 'Upgrade your\neveryday living.',
    hero_subtitle: 'Thoughtfully selected premium electronics and home appliances for the modern Indian home.',
    hero_button_text: 'Explore collection',
    hero_image: '/rajarani-hero.jpg',
    trust_1: 'Considered delivery, on us',
    trust_2: 'Easy 7-day returns',
    trust_3: 'Genuine, guaranteed',
    trust_4: 'Real people, here to help',
    cat_eyebrow: 'A PLACE FOR EVERYTHING',
    cat_title: 'Find your kind of better.',
    cat_link_text: 'Explore all categories',
    catalog_eyebrow: 'THOUGHTFULLY CHOSEN FOR HOME',
    catalog_title: 'Products for you.',
    catalog_subtitle: 'Appliances that make everyday feel a little easier.',
    editorial_pill: 'THE RajaRani LIVING EXPERIENCE',
    editorial_badge_count: '4,820+ Indian homes styled',
    editorial_title: 'Elevate every corner of your daily sanctuary.',
    editorial_desc: 'Appliances engineered for effortless convenience, wrapped in timeless aesthetics. Less noise, zero clutter — only what truly enriches your home life.',
    editorial_stamp_top: '100% GENUINE',
    editorial_stamp_bottom: 'QUALITY GUARANTEE',
    editorial_image: 'photo-1556911220-e15b29be8c8f',
    promo_badge: 'LIMITED SEASON HIGHLIGHT',
    promo_title: 'Pure living,\nsilently refined.',
    promo_desc: 'Discover our certified quiet collection. Thoughtful kitchen & cooling essentials built to fit seamless into modern Indian homes.',
    promo_btn_text: 'Explore curated edit',
    promo_tag: 'Up to 35% off curated range',
    promo_image: '/rajarani-hero.jpg',
    announcement_bar: 'Special Inaugural Offer: Complimentary Express Delivery across India on orders above ₹10,000',
    footer_desc: 'Better living starts here.\nThoughtfully chosen for the way you live.',
    footer_note_title: 'A BETTER KIND OF HOME',
    footer_note_body: 'Good design should make everyday feel a little more extraordinary.',
    footer_copyright: '© 2025 RajaRani Living Pvt. Ltd.',
    footer_subline: 'Thoughtfully selected. Fairly priced. Delivered with care.'
  })

  useEffect(() => {
    async function loadDynamicStoreData() {
      try {
        const [prodRes, contentRes, catRes] = await Promise.all([
          fetch('/api/products').then(r => r.json()).catch(() => null),
          fetch('/api/content').then(r => r.json()).catch(() => null),
          fetch('/api/categories').then(r => r.json()).catch(() => null)
        ])

        if (prodRes?.success && Array.isArray(prodRes.products) && prodRes.products.length > 0) {
          setProducts(prodRes.products)
        }
        if (contentRes?.success && contentRes.content) {
          setContent(prev => ({ ...prev, ...contentRes.content }))
        }
        if (catRes?.success && Array.isArray(catRes.categories) && catRes.categories.length > 0) {
          setCmsCategories(catRes.categories)
        }
      } catch (err) {
        console.error('Failed to fetch dynamic data from MySQL, using fallback', err)
      } finally {
        setLoadingProducts(false)
      }
    }
    loadDynamicStoreData()
  }, [])

  const [page, setPage] = useState('home'), [query, setQuery] = useState(''), [cartOpen, setCartOpen] = useState(false), [menuOpen, setMenuOpen] = useState(false), [sort, setSort] = useState('Featured'), [filter, setFilter] = useState('All'), [priceCap, setPriceCap] = useState(200000), [minRating, setMinRating] = useState(0), [availableOnly, setAvailableOnly] = useState(false), [energyOnly, setEnergyOnly] = useState(false), [categorySearch, setCategorySearch] = useState(''), [toast, setToast] = useState(''), [detailId, setDetailId] = useState<number | null>(null), [checkoutDone, setCheckoutDone] = useState(false), [email, setEmail] = useState(''), [subscribed, setSubscribed] = useState(false), [pin, setPin] = useState(''), [pinMessage, setPinMessage] = useState('')
  useEffect(() => {
    const showToast = (event: Event) => { const message = (event as CustomEvent<string>).detail; setToast(message); window.setTimeout(() => setToast(''), 2600) }
    window.addEventListener('rajarani-toast', showToast)
    return () => window.removeEventListener('rajarani-toast', showToast)
  }, [])
  const navigate = (p: string) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2600) }
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const toggleWish = (id: number) => { const next = wishlist.includes(id) ? wishlist.filter(x => x !== id) : [...wishlist, id]; setWishlist(next); notify(next.includes(id) ? 'Saved to your wishlist' : 'Removed from your wishlist') }
  const addCart = (id: number) => { setCart({ ...cart, [id]: (cart[id] || 0) + 1 }); notify('Added to your bag') }
  const buyNow = (id: number) => { setCart({ ...cart, [id]: (cart[id] || 0) + 1 }); navigate('checkout') }
  const shown = useMemo(() => { let list = products.filter(p => (filter === 'All' || p.category === filter || p.brand === filter) && (!query || `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(query.toLowerCase())) && p.price <= priceCap && p.rating >= minRating && (!availableOnly || p.inStock) && (!energyOnly || p.energyStars === 5) && (page !== 'deals' || p.oldPrice > p.price * 1.2)); if (page === 'wishlist') list = list.filter(p => wishlist.includes(p.id)); if (page.startsWith('product-')) return list; if (sort === 'Price: Low to high') list.sort((a, b) => a.price - b.price); if (sort === 'Price: High to low') list.sort((a, b) => b.price - a.price); if (sort === 'Top rated') list.sort((a, b) => b.rating - a.rating); return list }, [filter, query, page, wishlist, sort, priceCap, minRating, availableOnly, energyOnly])
  const activeProduct = products.find(p => p.id === detailId) || (page.startsWith('product-') ? products.find(p => p.id === Number(page.split('-')[1])) : undefined)
  const subtotal = Object.entries(cart).reduce((sum, [id, count]) => sum + (products.find(p => p.id === Number(id))?.price || 0) * count, 0)
  const openProduct = (id: number) => { setDetailId(id); setPage(`product-${id}`); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const listProducts = page === 'shop' || page === 'deals' || page === 'wishlist' || page === 'brands' || page === 'categories'
  return <div className="app-shell" onKeyDown={e => { if (e.key === 'Escape') { setCartOpen(false); setDetailId(null); setMenuOpen(false) } if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); document.querySelector<HTMLInputElement>('input[placeholder*="Search"]')?.focus() } }}>
    <MeeshoHeader
      cartCount={cartCount}
      onSearch={(q) => {
        setQuery(q)
        navigate('shop')
      }}
      onSelectCategory={(cat, subCat, item) => {
        if (cat === 'home') {
          navigate('home')
          return
        }
        if (cat === 'All Electronics' && !subCat && !item) {
          setFilter('All')
          setQuery('')
          navigate('shop')
          return
        }
        if (item && item !== 'View All') {
          setQuery(item)
          navigate('shop')
        } else if (subCat) {
          setQuery(subCat)
          navigate('shop')
        } else {
          setFilter(cat)
          navigate('shop')
        }
      }}
      onOpenCart={() => setCartOpen(true)}
      onOpenProfile={() => notify('Account: Log in / Sign up coming soon')}
    />
    {page === 'home' && <>
      <main><section className="hero"><Image src={categoryPhoto(content.hero_image, 1800)} alt="RajaRani premium electronics and home living" fill priority sizes="100vw" /><div className="hero-shade" /><div className="hero-content"><h1 style={{ whiteSpace: 'pre-line' }}>{content.hero_title}</h1><p>{content.hero_subtitle}</p><div className="hero-actions"><button className="button-dark" onClick={() => navigate('shop')}>{content.hero_button_text} <ArrowRight size={16} /></button></div></div></section>
        <section className="trust-strip"><span><Truck /> {content.trust_1}</span><i /><span><PackageCheck /> {content.trust_2}</span><i /><span><ShieldCheck /> {content.trust_3}</span><i /><span><Headphones /> {content.trust_4}</span></section>
        <section className="content-section category-section"><SectionHeading eyebrow={content.cat_eyebrow} title={content.cat_title} link={content.cat_link_text} onClick={() => navigate('categories')} /><div className="category-rail">{cmsCategories.map((c, i) => <button className="category-rail-item" key={c.name} onClick={() => { setFilter(c.name === 'Laundry' ? 'Laundry' : c.name === 'Floor care' ? 'Floor care' : c.name === 'Kitchen' ? 'Kitchen' : c.name === 'Cooling' ? 'Cooling' : c.name === 'Televisions' ? 'Televisions' : c.name); navigate('shop') }}><span className={`category-rail-image tone-${i % 5}`}><Image src={categoryPhoto(c.image, 420)} alt="" fill sizes="(max-width: 700px) 40vw, 14vw" /></span><strong>{c.name}</strong></button>)}</div></section>
        <section className="content-section home-catalog-section"><div className="home-catalog-heading"><div><div className="eyebrow">{content.catalog_eyebrow}</div><h2>{content.catalog_title}</h2><p>{content.catalog_subtitle}</p></div><button className="text-link" onClick={() => navigate('shop')}>Open full shop <ArrowRight size={16} /></button></div><div className="catalog-layout"><FilterSidebar filter={filter} setFilter={setFilter} priceCap={priceCap} setPriceCap={setPriceCap} minRating={minRating} setMinRating={setMinRating} availableOnly={availableOnly} setAvailableOnly={setAvailableOnly} energyOnly={energyOnly} setEnergyOnly={setEnergyOnly} categorySearch={categorySearch} setCategorySearch={setCategorySearch} clearFilters={() => { setFilter('All'); setPriceCap(200000); setMinRating(0); setAvailableOnly(false); setEnergyOnly(false); setCategorySearch('') }} /><section className="catalog-products"><div className="catalog-toolbar"><span>{shown.length} products <small>· selected for your home</small></span><label className="sort-select"><span>Sort by:</span><select value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort products">{['Featured', 'Price: Low to high', 'Price: High to low', 'Top rated'].map(option => <option key={option}>{option}</option>)}</select><ChevronDown size={13} /></label></div><div className="product-grid listing-grid catalog-grid">{shown.map(product => <ProductCard key={product.id} product={product} wishlist={wishlist} toggleWish={toggleWish} addCart={addCart} buyNow={buyNow} open={openProduct} />)}</div>{shown.length === 0 && <div className="empty-state"><Search size={30} /><h2>No good finds just yet.</h2><p>Try widening your filters to see more of the collection.</p><button className="button-dark" onClick={() => { setFilter('All'); setPriceCap(200000); setMinRating(0); setAvailableOnly(false); setEnergyOnly(false) }}>Clear filters <ArrowRight size={16} /></button></div>}</section></div></section>
        <section className="editorial-banner">
          <div className="editorial-image">
            <Image src={categoryPhoto(content.editorial_image, 1400)} alt="Warm, naturally lit kitchen" fill sizes="100vw" />
            <div className="editorial-image-overlay" />

            {/* Floating Live Badge */}
            <div className="editorial-floating-pill">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block mr-1.5" />
              <span className="text-xs font-semibold text-slate-800">{content.editorial_badge_count}</span>
            </div>
          </div>

          <div className="editorial-copy">
            <div className="editorial-pill-tag">
              <Sparkles size={12} className="text-[#c2185b]" />
              <span>{content.editorial_pill}</span>
            </div>

            <h2>
              {content.editorial_title}
            </h2>

            <p>
              {content.editorial_desc}
            </p>

            {/* Micro-Features highlight grid */}
            <div className="editorial-features-grid">
              <div className="editorial-feature-item">
                <div className="feature-icon-box">
                  <ShieldCheck size={17} />
                </div>
                <div>
                  <strong>100% Genuine Brands</strong>
                  <p>Direct from Samsung, LG, Bosch & Voltas.</p>
                </div>
              </div>

              <div className="editorial-feature-item">
                <div className="feature-icon-box">
                  <Award size={17} />
                </div>
                <div>
                  <strong>Complimentary Setup</strong>
                  <p>Free doorstep installation on major electronics.</p>
                </div>
              </div>
            </div>

            <div className="editorial-actions-row">
              <button className="button-dark" onClick={() => navigate('shop')}>
                Explore The Edit <ArrowRight size={16} />
              </button>
              <button className="button-quiet" onClick={() => { setFilter('Kitchen'); navigate('shop') }}>
                Kitchen Collection <span>↗</span>
              </button>
            </div>
          </div>

          {/* Luxury Seal Badge */}
          <div className="editorial-stamp">
            <ShieldCheck size={18} className="text-amber-300" />
            <span>{content.editorial_stamp_top}</span>
            <small>{content.editorial_stamp_bottom}</small>
          </div>
        </section>
        <section className="newsletter"><div className="newsletter-copy"><div className="eyebrow">A LITTLE GOOD IN YOUR INBOX</div><h2>Notes for a better home.</h2><p>Thoughtful finds, new arrivals and the occasional little surprise. Never the noise.</p></div><form className="newsletter-form" onSubmit={e => { e.preventDefault(); if (email.includes('@')) { setSubscribed(true); setEmail('') } else notify('Please enter a valid email address.') }}><label htmlFor="newsletter-email" className="sr-only">Email address</label><input id="newsletter-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required /><button type="submit">{subscribed ? 'You’re on the list' : 'Count me in'} <ArrowRight size={16} /></button><small>{subscribed ? 'Welcome to the good list.' : 'No spam, ever. Just the good stuff.'}</small></form></section></main>
    </>}
    {listProducts && <main className="listing-page"><div className="breadcrumb"><button onClick={() => navigate('home')}>Home</button><ChevronRight size={13} /><span>{page === 'wishlist' ? 'Wishlist' : page === 'deals' ? 'The good deals' : page === 'brands' ? 'Our brands' : page === 'categories' ? 'All categories' : 'Shop all'}</span></div>        {(page === 'shop' || page === 'deals') && (
      <div className="shop-promo-card">
        {/* Left Brand Feature */}
        <div className="shop-promo-feature">
          <span className="shop-promo-kicker">{content.promo_badge}</span>
          <h2 className="shop-promo-headline" style={{ whiteSpace: 'pre-line' }}>{content.promo_title}</h2>
          <p className="text-xs text-white/80 mt-1 max-w-[420px]">{content.promo_desc}</p>
        </div>

        {/* Right Quick Filter Hub */}
        <div className="shop-promo-filter-hub">
          <div className="filter-hub-header">
            <span className="hub-eyebrow">QUICK EXPLORE</span>
            <span className="hub-caption">Curated shortcuts for your home</span>
          </div>
          <div className="filter-hub-chips">
            <button
              onClick={() => { setFilter('All'); setSort('Featured') }}
              className="filter-pill-btn active-pill"
            >
              <Sparkles size={12} />
              <span>Trending now</span>
            </button>
            <button
              onClick={() => { setFilter('All'); setPriceCap(25000) }}
              className="filter-pill-btn"
            >
              <IndianRupee size={12} />
              <span>Under ₹25,000</span>
            </button>
            <button
              onClick={() => { setFilter('All'); setSort('Top rated') }}
              className="filter-pill-btn"
            >
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span>Top rated</span>
            </button>
            <button
              onClick={() => { setFilter('Kitchen') }}
              className="filter-pill-btn"
            >
              <span>Kitchen essentials</span>
            </button>
            <button
              onClick={() => { setFilter('Refrigerators') }}
              className="filter-pill-btn"
            >
              <span>Refrigerators</span>
            </button>
            <button
              onClick={() => { setFilter('Cooling') }}
              className="filter-pill-btn"
            >
              <span>Cooling & ACs</span>
            </button>
          </div>
        </div>
      </div>
    )}<div className="listing-intro"><div><div className="eyebrow">{page === 'deals' ? 'A LITTLE SOMETHING GOOD' : page === 'wishlist' ? 'YOUR PERSONAL EDIT' : 'THE RAJARANI COLLECTION'}</div><h1>{page === 'wishlist' ? 'Your saved things.' : page === 'deals' ? 'Good things, better prices.' : page === 'brands' ? 'Meet the makers.' : page === 'categories' ? 'A place for everything.' : 'Products for you.'}</h1><p>{page === 'wishlist' ? 'All the pieces you’ve had your eye on.' : page === 'deals' ? 'A few thoughtful finds, at a little less.' : page === 'brands' ? 'Thoughtful design from the names you know and trust.' : 'Beautifully considered appliances for every corner of home.'}</p></div><span className="result-count">{shown.length} pieces</span></div>
      {page === 'categories' && <div className="category-grid listing-categories">{cmsCategories.map((c, i) => <button className={`category-card cat-${i % 6}`} key={c.name} onClick={() => { setFilter(c.name === 'Laundry' ? 'Laundry' : c.name === 'Floor care' ? 'Floor care' : c.name); navigate('shop') }}><Image src={categoryPhoto(c.image, 800)} alt="" fill sizes="33vw" /><span className="category-shade" /><span className="category-info"><small>{c.note}</small><strong>{c.name}</strong></span><span className="category-arrow"><ArrowUpRight size={17} /></span></button>)}</div>}
      {page === 'brands' && <div className="brand-directory">{brands.map((b, i) => <button key={b} onClick={() => { setFilter(b === 'SAMSUNG' ? 'Samsung' : b[0] + b.slice(1).toLowerCase()); setPage('shop') }}><span>{b}</span><small>Explore collection <ArrowUpRight size={14} /></small></button>)}</div>}
      {(page === 'shop' || page === 'deals') ? <div className="catalog-layout"><FilterSidebar filter={filter} setFilter={setFilter} priceCap={priceCap} setPriceCap={setPriceCap} minRating={minRating} setMinRating={setMinRating} availableOnly={availableOnly} setAvailableOnly={setAvailableOnly} energyOnly={energyOnly} setEnergyOnly={setEnergyOnly} categorySearch={categorySearch} setCategorySearch={setCategorySearch} clearFilters={() => { setFilter('All'); setPriceCap(200000); setMinRating(0); setAvailableOnly(false); setEnergyOnly(false); setCategorySearch('') }} /><section className="catalog-products"><div className="catalog-toolbar"><span>{shown.length} products <small>· sorted for your home</small></span><label className="sort-select"><span>Sort by:</span><select value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort products">{['Featured', 'Price: Low to high', 'Price: High to low', 'Top rated'].map(option => <option key={option}>{option}</option>)}</select><ChevronDown size={13} /></label></div><div className="product-grid listing-grid catalog-grid">{shown.map(product => <ProductCard key={product.id} product={product} wishlist={wishlist} toggleWish={toggleWish} addCart={addCart} buyNow={buyNow} open={openProduct} />)}</div>{shown.length === 0 && <div className="empty-state"><Search size={30} /><h2>No good finds just yet.</h2><p>Try widening your filters to see more of the collection.</p><button className="button-dark" onClick={() => { setFilter('All'); setPriceCap(200000); setMinRating(0); setAvailableOnly(false); setEnergyOnly(false) }}>Clear filters <ArrowRight size={16} /></button></div>}</section></div> : page !== 'categories' && page !== 'brands' && <><div className="filter-bar"><div className="filter-scroll"><button className={`filter-chip ${filter === 'All' ? 'selected' : ''}`} onClick={() => setFilter('All')}>Everything</button>{['Refrigerators', 'Laundry', 'Cooling', 'Televisions', 'Kitchen', 'Floor care', 'Dishwashers', 'Water purifiers', 'Microwaves'].map(category => <button key={category} className={`filter-chip ${filter === category ? 'selected' : ''}`} onClick={() => setFilter(filter === category ? 'All' : category)}>{category}</button>)}</div><label className="sort-select"><SlidersHorizontal size={15} /><select value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort products">{['Featured', 'Price: Low to high', 'Price: High to low', 'Top rated'].map(option => <option key={option}>{option}</option>)}</select><ChevronDown size={14} /></label></div>{page === 'wishlist' && shown.length === 0 ? <div className="empty-state"><Heart size={32} /><h2>A little room for the good things.</h2><p>Save the pieces you love, and they’ll be waiting right here.</p><button className="button-dark" onClick={() => navigate('shop')}>Find something lovely <ArrowRight size={16} /></button></div> : <div className="product-grid listing-grid">{shown.map(product => <ProductCard key={product.id} product={product} wishlist={wishlist} toggleWish={toggleWish} addCart={addCart} buyNow={buyNow} open={openProduct} />)}</div>}</>}
    </main>}
    {activeProduct && (page.startsWith('product-') || detailId !== null) && <main className="detail-page"><div className="breadcrumb"><button onClick={() => navigate('home')}>Home</button><ChevronRight size={13} /><button onClick={() => navigate('shop')}>Shop</button><ChevronRight size={13} /><span>{activeProduct.brand}</span></div><div className="detail-layout"><div className="detail-photo"><Image src={photo(activeProduct.image, 1300)} alt={activeProduct.name} fill sizes="(max-width: 780px) 100vw, 55vw" /><span className="product-tag detail-tag">{activeProduct.tag || 'Thoughtfully chosen'}</span><button className="wish-button detail-wish" aria-label="Add to wishlist" onClick={() => toggleWish(activeProduct.id)}><Heart fill={wishlist.includes(activeProduct.id) ? 'currentColor' : 'none'} /></button></div><div className="detail-info"><div className="eyebrow">{activeProduct.brand.toUpperCase()} &nbsp;·&nbsp; RAJARANI EDITION</div><h1>{activeProduct.name}</h1><div className="rating-line"><span className="stars"><Star size={14} fill="currentColor" /> {activeProduct.rating}</span><span> {activeProduct.reviews} thoughtful reviews</span></div><div className="detail-price"><strong>{money(activeProduct.price)}</strong><del>{money(activeProduct.oldPrice)}</del><span>{Math.round((1 - activeProduct.price / activeProduct.oldPrice) * 100)}% off</span></div><p className="detail-description">Designed to make the everyday feel a little easier. Thoughtful performance meets considered design, with the quality you can feel for years to come.</p><div className="detail-perks"><span><Check /> Genuine product</span><span><Check /> Manufacturer warranty</span><span><Check /> Free delivery over ₹10,000</span></div><div className="detail-cta"><button className="button-dark" onClick={() => addCart(activeProduct.id)}>Add to bag <ArrowRight size={16} /></button><button className="button-outline" onClick={() => { addCart(activeProduct.id); navigate('checkout') }}>Buy now</button></div><form className="pin-form" onSubmit={e => { e.preventDefault(); setPinMessage(/^\d{6}$/.test(pin) ? 'Lovely. We deliver to your PIN code.' : 'Please enter a valid 6-digit PIN code.') }}><label htmlFor="pin">Check delivery to your home</label><div><input id="pin" value={pin} maxLength={6} inputMode="numeric" placeholder="Enter PIN code" onChange={e => setPin(e.target.value.replace(/\D/g, ''))} /><button>Check</button></div>{pinMessage && <small>{pinMessage}</small>}</form><div className="detail-accordion"><details open><summary>Made for everyday <ChevronDown size={16} /></summary><p>Carefully selected for lasting performance, intuitive use and a design that feels right at home.</p></details><details><summary>Specifications <ChevronDown size={16} /></summary><p>Model: {activeProduct.brand} {activeProduct.id} &nbsp;·&nbsp; Energy rating: 5 star &nbsp;·&nbsp; Warranty: 2 years comprehensive</p></details><details><summary>Delivery & warranty <ChevronDown size={16} /></summary><p>Free doorstep delivery on orders over ₹10,000. Includes manufacturer warranty and 7-day easy returns.</p></details></div></div></div><section className="content-section"><SectionHeading eyebrow="A GOOD MATCH" title="Make yourself at home." link="Shop all" onClick={() => navigate('shop')} /><div className="product-grid">{products.filter(p => p.id !== activeProduct.id).slice(0, 4).map(p => <ProductCard key={p.id} product={p} wishlist={wishlist} toggleWish={toggleWish} addCart={addCart} buyNow={buyNow} open={openProduct} />)}</div></section></main>}
    {page === 'cart' && <main className="cart-page"><div className="breadcrumb"><button onClick={() => navigate('home')}>Home</button><ChevronRight size={13} /><span>Your bag</span></div><h1>Your good things.</h1>{cartCount === 0 ? <div className="empty-state"><ShoppingBag size={35} /><h2>Your bag’s taking a little breather.</h2><p>It’s a good time to find something that makes home feel better.</p><button className="button-dark" onClick={() => navigate('shop')}>Explore the collection <ArrowRight size={16} /></button></div> : <div className="cart-layout"><div className="cart-items">{Object.entries(cart).map(([id, count]) => { const p = products.find(x => x.id === Number(id)); if (!p) return null; return <div className="cart-item" key={id}><div className="cart-thumb"><Image src={photo(p.image, 300)} alt={p.name} fill sizes="120px" /></div><div className="cart-item-copy"><small>{p.brand}</small><strong>{p.name}</strong><span>{money(p.price)}</span><div className="quantity"><button onClick={() => setCart({ ...cart, [p.id]: Math.max(0, count - 1) })}>−</button><span>{count}</span><button onClick={() => setCart({ ...cart, [p.id]: count + 1 })}>+</button></div></div><button className="remove-item" onClick={() => { const next = { ...cart }; delete next[p.id]; setCart(next) }} aria-label="Remove item"><X size={17} /></button></div> })}</div><aside className="order-card"><div className="eyebrow">A LITTLE SUMMARY</div><h2>Your order</h2><div className="order-line"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="order-line"><span>Delivery</span><span>{subtotal > 10000 ? 'On us' : money(499)}</span></div><div className="order-line"><span>Estimated savings</span><span className="saving">−{money(Object.entries(cart).reduce((s, [id, n]) => { const p = products.find(x => x.id === Number(id)); return s + ((p?.oldPrice || 0) - (p?.price || 0)) * n }, 0))}</span></div><div className="order-total"><strong>Total</strong><strong>{money(subtotal + (subtotal > 10000 ? 0 : 499))}</strong></div><button className="button-dark full-button" onClick={() => navigate('checkout')}>Continue to checkout <ArrowRight size={16} /></button><button className="continue-link" onClick={() => navigate('shop')}><ArrowLeft size={15} /> Keep exploring</button><p className="secure-note"><ShieldCheck size={15} /> A safe, secure checkout</p></aside></div>}</main>}
    {page === 'checkout' && <main className="checkout-page"><div className="breadcrumb"><button onClick={() => navigate('cart')}>Your bag</button><ChevronRight size={13} /><span>Checkout</span></div>{checkoutDone ? <div className="success-state"><span className="success-check"><Check /></span><div className="eyebrow">A VERY GOOD CHOICE</div><h1>Your home just got<br /><em>a little happier.</em></h1><p>Thank you for choosing RajaRani. Your order is confirmed for this little demo.</p><button className="button-dark" onClick={() => { setCart({}); navigate('home'); setCheckoutDone(false) }}>Back to the good stuff <ArrowRight size={16} /></button></div> : <><div className="checkout-head"><div className="eyebrow">THE FINAL LITTLE STEP</div><h1>Make it yours.</h1><p>All the good things are almost home.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={async (e) => {
      e.preventDefault();
      try {
        const target = e.currentTarget;
        const inputs = target.querySelectorAll('input');
        const customer = `${inputs[0]?.value || ''} ${inputs[1]?.value || ''}`.trim() || 'Customer';
        const email = inputs[2]?.value || 'guest@example.com';
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer,
            email,
            total: subtotal + (subtotal > 10000 ? 0 : 499),
            items: cartCount,
            status: 'Processing',
            payment: 'Paid'
          })
        });
        notify('Order placed successfully!');
      } catch (err) {
        console.error('Order creation error:', err);
      }
      setCheckoutDone(true);
    }}><h2>Where should we bring it?</h2><div className="form-two"><label>First name<input required placeholder="First name" /></label><label>Last name<input required placeholder="Last name" /></label></div><label>Email address<input type="email" required placeholder="you@example.com" /></label><label>Phone number<input type="tel" required pattern="[0-9+() -]{10,}" placeholder="+91 98765 43210" /></label><label>Street address<input required placeholder="Flat, house number and street" /></label><div className="form-two"><label>City<input required placeholder="City" /></label><label>PIN code<input required pattern="[0-9]{6}" maxLength={6} placeholder="6-digit PIN code" /></label></div><h2 className="payment-heading">How would you like to pay?</h2><label className="payment-choice"><input type="radio" name="payment" defaultChecked /><span><strong>Pay on delivery</strong><small>Cash or UPI, when it arrives</small></span><span className="payment-mark">COD</span></label><label className="payment-choice"><input type="radio" name="payment" /><span><strong>UPI / cards</strong><small>Simulated payment for this demo</small></span><span className="payment-mark">UPI</span></label><button className="button-dark full-button">Place your order <ArrowRight size={16} /></button><p className="checkout-disclaimer">Demo checkout only. No payment will be collected.</p></form><aside className="order-card checkout-summary"><div className="eyebrow">YOUR GOOD THINGS</div><h2>Order summary</h2>{Object.entries(cart).map(([id, n]) => { const p = products.find(x => x.id === Number(id)); return p ? <div className="checkout-item" key={id}><div className="checkout-thumb"><Image src={photo(p.image, 180)} alt="" fill sizes="64px" /></div><span>{p.name}<small>Qty {n}</small></span><strong>{money(p.price * n)}</strong></div> : null })}<div className="order-line"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="order-line"><span>Delivery</span><span>{subtotal > 10000 ? 'On us' : money(499)}</span></div><div className="order-total"><strong>Total</strong><strong>{money(subtotal + (subtotal > 10000 ? 0 : 499))}</strong></div></aside></div></>}</main>}
    <Footer navigate={navigate} content={content} />
    {cartOpen && <><button className="drawer-scrim" aria-label="Close bag" onClick={() => setCartOpen(false)} /><aside className="cart-drawer" aria-label="Your shopping bag"><div className="drawer-head"><div><div className="eyebrow">THE GOOD STUFF</div><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-button" aria-label="Close" onClick={() => setCartOpen(false)}><X /></button></div>{cartCount === 0 ? <div className="drawer-empty"><ShoppingBag /><h3>Room for something lovely.</h3><p>Your bag is ready when you are.</p><button className="button-dark" onClick={() => { setCartOpen(false); navigate('shop') }}>Explore the collection <ArrowRight size={16} /></button></div> : <><div className="drawer-items">{Object.entries(cart).map(([id, count]) => { const p = products.find(x => x.id === Number(id)); return p ? <div className="drawer-item" key={id}><div className="drawer-thumb"><Image src={photo(p.image, 200)} alt="" fill sizes="90px" /></div><div><small>{p.brand}</small><strong>{p.name}</strong><span>{money(p.price)}</span><div className="quantity"><button onClick={() => setCart({ ...cart, [p.id]: Math.max(0, count - 1) })}>−</button><span>{count}</span><button onClick={() => setCart({ ...cart, [p.id]: count + 1 })}>+</button><button className="drawer-remove" onClick={() => { const n = { ...cart }; delete n[p.id]; setCart(n) }}>Remove</button></div></div></div> : null })}</div><div className="drawer-bottom"><div className="order-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><small>{subtotal > 10000 ? 'Your delivery is on us.' : 'Complimentary delivery on orders over ₹10,000.'}</small><button className="button-dark full-button" onClick={() => { setCartOpen(false); navigate('cart') }}>View bag & checkout <ArrowRight size={16} /></button></div></>}</aside></>}
    {detailId !== null && <button className="detail-close" onClick={() => { setDetailId(null); navigate('shop') }} aria-label="Close product preview"><X size={20} /></button>}
    {toast && <div className="toast" role="status"><Check size={16} />{toast}</div>}
  </div>
}
