'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
  MoreVertical,
  Trash2,
  Edit,
  Eye,
  LogOut,
  ChevronRight,
  Bell,
  RefreshCw,
  Download,
  IndianRupee,
  Star,
  Check,
  X,
  Upload,
  ImageIcon,
  Tag,
  Truck,
  RotateCcw,
  BarChart3,
  Percent,
  Warehouse,
  Boxes,
  MapPin,
  Calendar,
  MessageSquare,
  ShieldCheck,
  SlidersHorizontal,
  FileSpreadsheet,
  Globe,
  Sliders,
  Type,
  FolderTree,
  Sparkles
} from 'lucide-react'

// Initial Mock Products
const INITIAL_PRODUCTS = [
  { id: 1, brand: 'Samsung', name: 'Bespoke 4-Door Flex Refrigerator', category: 'Refrigerators', price: 129990, stock: 18, sales: 142, status: 'Active', rating: 4.8, image: '/products/fridge-samsung.jpg' },
  { id: 2, brand: 'LG', name: 'AI Direct Drive Front Load Washer', category: 'Laundry', price: 54990, stock: 24, sales: 98, status: 'Active', rating: 4.6, image: '/products/washer-lg.jpg' },
  { id: 3, brand: 'Dyson', name: 'V15 Detect Absolute Cordless Vacuum', category: 'Floor care', price: 62900, stock: 7, sales: 76, status: 'Low Stock', rating: 4.9, image: '/products/vacuum-dyson.jpg' },
  { id: 4, brand: 'Sony', name: 'BRAVIA 3 4K Ultra HD Smart TV', category: 'Televisions', price: 74990, stock: 12, sales: 110, status: 'Active', rating: 4.7, image: '/products/tv-sony.jpg' },
  { id: 5, brand: 'Voltas', name: 'Adjustable Inverter Split AC', category: 'Cooling', price: 42990, stock: 3, sales: 85, status: 'Low Stock', rating: 4.4, image: '/products/ac-voltas.jpg' },
  { id: 6, brand: 'Philips', name: 'Barista Brew Espresso Machine', category: 'Kitchen', price: 21995, stock: 0, sales: 44, status: 'Out of Stock', rating: 4.5, image: '/products/espresso-philips.jpg' },
  { id: 7, brand: 'Whirlpool', name: 'IntelliFresh Inverter Refrigerator', category: 'Refrigerators', price: 38990, stock: 15, sales: 62, status: 'Active', rating: 4.3, image: '/products/fridge-whirlpool.jpg' },
  { id: 8, brand: 'Bosch', name: 'Series 6 Built-in Dishwasher', category: 'Dishwashers', price: 67990, stock: 9, sales: 39, status: 'Active', rating: 4.7, image: '/products/dishwasher-bosch.jpg' }
]

// Initial Mock Orders
const INITIAL_ORDERS = [
  { id: 'ORD-9821', customer: 'Priya Sharma', email: 'priya.s@example.com', date: '2026-11-17', total: 129990, items: 1, status: 'Processing', payment: 'Paid' },
  { id: 'ORD-9820', customer: 'Rahul Verma', email: 'rahul.v@example.com', date: '2026-11-17', total: 54990, items: 1, status: 'Delivered', payment: 'Paid' },
  { id: 'ORD-9819', customer: 'Sneha Patel', email: 'sneha.p@example.com', date: '2026-11-16', total: 21995, items: 2, status: 'Shipped', payment: 'Paid' },
  { id: 'ORD-9818', customer: 'Amit Kumar', email: 'amit.k@example.com', date: '2026-11-16', total: 62900, items: 1, status: 'Delivered', payment: 'Paid' },
  { id: 'ORD-9817', customer: 'Ananya Roy', email: 'ananya.r@example.com', date: '2026-11-15', total: 74990, items: 1, status: 'Cancelled', payment: 'Refunded' },
  { id: 'ORD-9816', customer: 'Vikram Joshi', email: 'vikram.j@example.com', date: '2026-11-15', total: 42990, items: 1, status: 'Shipped', payment: 'Paid' }
]

// Mock Customers
const INITIAL_CUSTOMERS = [
  { id: 1, name: 'Priya Sharma', email: 'priya.s@example.com', orders: 5, spent: 284950, city: 'Mumbai', joined: 'Oct 2025' },
  { id: 2, name: 'Rahul Verma', email: 'rahul.v@example.com', orders: 3, spent: 112480, city: 'Bengaluru', joined: 'Jan 2026' },
  { id: 3, name: 'Sneha Patel', email: 'sneha.p@example.com', orders: 8, spent: 340200, city: 'Ahmedabad', joined: 'Mar 2025' },
  { id: 4, name: 'Amit Kumar', email: 'amit.k@example.com', orders: 2, spent: 78900, city: 'Delhi', joined: 'Aug 2026' },
  { id: 5, name: 'Vikram Joshi', email: 'vikram.j@example.com', orders: 4, spent: 195000, city: 'Pune', joined: 'Feb 2026' }
]

// Mock Coupons / Discounts
const INITIAL_COUPONS = [
  { id: 1, code: 'FESTIVE25', discount: '25% OFF', type: 'Percentage', minOrder: 15000, usage: '214 times', status: 'Active', expiry: '2026-12-31' },
  { id: 2, code: 'RAJARANI1000', discount: '₹1,000 Flat', type: 'Fixed Amount', minOrder: 20000, usage: '489 times', status: 'Active', expiry: '2026-12-15' },
  { id: 3, code: 'COOLSUMMER', discount: '15% OFF', type: 'Category: Cooling', minOrder: 30000, usage: '82 times', status: 'Active', expiry: '2026-11-30' },
  { id: 4, code: 'WELCOME500', discount: '₹500 OFF', type: 'First Order', minOrder: 5000, usage: '1,204 times', status: 'Active', expiry: '2027-01-01' },
  { id: 5, code: 'FLASHDIWALI', discount: '30% OFF', type: 'Flash Sale', minOrder: 50000, usage: '750 times', status: 'Expired', expiry: '2026-11-05' }
]

// Mock Shipments & Courier Tracking
const INITIAL_SHIPMENTS = [
  { id: 'SHP-401', orderId: 'ORD-9821', partner: 'BlueDart Express', awb: 'BLD928410294', destination: 'Bandra West, Mumbai', eta: 'Tomorrow, by 2 PM', status: 'In Transit' },
  { id: 'SHP-400', orderId: 'ORD-9820', partner: 'Delhivery Surface', awb: 'DLV883192019', destination: 'Indiranagar, Bengaluru', eta: 'Delivered Today', status: 'Delivered' },
  { id: 'SHP-399', orderId: 'ORD-9819', partner: 'BlueDart Express', awb: 'BLD773829104', destination: 'Navrangpura, Ahmedabad', eta: '18 Nov 2026', status: 'Out for Delivery' },
  { id: 'SHP-398', orderId: 'ORD-9818', partner: 'DTDC Priority', awb: 'DTC492018471', destination: 'Connaught Place, Delhi', eta: 'Delivered 16 Nov', status: 'Delivered' },
  { id: 'SHP-397', orderId: 'ORD-9816', partner: 'Delhivery Surface', awb: 'DLV991029384', destination: 'Kothrud, Pune', eta: '19 Nov 2026', status: 'In Transit' }
]

// Mock Returns & RMAs
const INITIAL_RETURNS = [
  { id: 'RET-102', orderId: 'ORD-9805', customer: 'Deepak Nair', product: 'Barista Brew Espresso Machine', reason: 'Packaging damaged in transit', amount: 21995, status: 'Inspection Pending', requested: '16 Nov 2026' },
  { id: 'RET-101', orderId: 'ORD-9792', customer: 'Kavita Menon', product: 'Series 6 Built-in Dishwasher', reason: 'Size mismatch for modular cabinet', amount: 67990, status: 'Refund Approved', requested: '14 Nov 2026' },
  { id: 'RET-100', orderId: 'ORD-9780', customer: 'Rohan Gupta', product: 'V15 Detect Absolute Cordless Vacuum', reason: 'Changed mind before unboxing', amount: 62900, status: 'Completed', requested: '10 Nov 2026' }
]

// Mock Regional Warehouses
const INITIAL_WAREHOUSES = [
  { id: 'WH-MUM', name: 'Mumbai Central Fulfillment Hub', city: 'Bhiwandi, Maharashtra', totalUnits: 420, capacityUsage: '78%', manager: 'Rajesh G.' },
  { id: 'WH-BLR', name: 'Bengaluru South Tech Logistics', city: 'Hosur Road, Karnataka', totalUnits: 310, capacityUsage: '64%', manager: 'Suresh V.' },
  { id: 'WH-DEL', name: 'Delhi NCR Northern Mega Hub', city: 'Gurugram, Haryana', totalUnits: 580, capacityUsage: '89%', manager: 'Manoj S.' }
]

type AdminTab = 
  | 'dashboard' 
  | 'products' 
  | 'inventory'
  | 'categories'
  | 'content'
  | 'orders' 
  | 'shipping' 
  | 'returns' 
  | 'customers' 
  | 'coupons' 
  | 'analytics' 
  | 'settings'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [orders, setOrders] = useState(INITIAL_ORDERS)
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS)
  const [coupons, setCoupons] = useState(INITIAL_COUPONS)
  const [shipments, setShipments] = useState(INITIAL_SHIPMENTS)
  const [returns, setReturns] = useState(INITIAL_RETURNS)
  const [warehouses] = useState(INITIAL_WAREHOUSES)

  // CMS Content & Categories state
  const [contentItems, setContentItems] = useState<any[]>([])
  const [categoriesList, setCategoriesList] = useState<any[]>([])
  const [activeContentSection, setActiveContentSection] = useState('all')
  const [savingContent, setSavingContent] = useState(false)
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', note: '', image: '', display_order: 0 })

  // Fetch live dynamic data from MySQL
  const fetchAllData = async () => {
    try {
      const [prodRes, ordRes, custRes, coupRes, contentRes, catRes] = await Promise.all([
        fetch('/api/products').then(r => r.json()).catch(() => null),
        fetch('/api/orders').then(r => r.json()).catch(() => null),
        fetch('/api/customers').then(r => r.json()).catch(() => null),
        fetch('/api/coupons').then(r => r.json()).catch(() => null),
        fetch('/api/content').then(r => r.json()).catch(() => null),
        fetch('/api/categories').then(r => r.json()).catch(() => null)
      ])

      if (prodRes?.success && Array.isArray(prodRes.products) && prodRes.products.length > 0) {
        setProducts(prodRes.products)
      }
      if (ordRes?.success && Array.isArray(ordRes.orders) && ordRes.orders.length > 0) {
        setOrders(ordRes.orders)
      }
      if (custRes?.success && Array.isArray(custRes.customers) && custRes.customers.length > 0) {
        setCustomers(custRes.customers)
      }
      if (coupRes?.success && Array.isArray(coupRes.coupons) && coupRes.coupons.length > 0) {
        setCoupons(coupRes.coupons)
      }
      if (contentRes?.success && Array.isArray(contentRes.items)) {
        setContentItems(contentRes.items)
      }
      if (catRes?.success && Array.isArray(catRes.categories)) {
        setCategoriesList(catRes.categories)
      }
    } catch (err) {
      console.error('Error fetching dynamic MySQL data in admin:', err)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])
  
  // Search & Filter state
  const [productSearch, setProductSearch] = useState('')
  const [orderSearch, setOrderSearch] = useState('')
  const [orderStatusFilter, setOrderStatusFilter] = useState('All')

  // Add Coupon Modal
  const [showAddCouponModal, setShowAddCouponModal] = useState(false)
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    type: 'Percentage',
    minOrder: '10000',
    expiry: '2026-12-31'
  })
  
  // Add Product Modal
  const [showAddModal, setShowAddModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    category: 'Refrigerators',
    price: '',
    stock: '',
    image: '',
    status: 'Active'
  })

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Handle local image file upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewProduct(prev => ({ ...prev, image: reader.result as string }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle Add Product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.brand || !newProduct.price) {
      alert('Please fill out all required fields')
      return
    }
    const defaultPlaceholder = 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80'
    const payload = {
      brand: newProduct.brand,
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      oldPrice: Number(newProduct.price) * 1.15,
      stock: Number(newProduct.stock) || 0,
      image: newProduct.image || defaultPlaceholder,
      status: Number(newProduct.stock) === 0 ? 'Out of Stock' : (Number(newProduct.stock) < 5 ? 'Low Stock' : 'Active')
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.success) {
        showToast('Product added successfully!')
        setShowAddModal(false)
        setNewProduct({ name: '', brand: '', category: 'Refrigerators', price: '', stock: '', image: '', status: 'Active' })
        await fetchAllData()
      } else {
        showToast('Failed to save product')
      }
    } catch {
      showToast('Error saving product')
    }
  }

  // Handle Delete Product
  const handleDeleteProduct = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
        setProducts(products.filter(p => p.id !== id))
        showToast('Product deleted')
      } catch {
        showToast('Error deleting product')
      }
    }
  }

  // Handle Add Coupon
  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCoupon.code || !newCoupon.discount) return
    try {
      await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCoupon)
      })
      showToast('Discount coupon created!')
      fetchAllData()
    } catch {
      showToast('Error creating coupon')
    }
    setShowAddCouponModal(false)
    setNewCoupon({ code: '', discount: '', type: 'Percentage', minOrder: '10000', expiry: '2026-12-31' })
  }

  // Handle Update Order Status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus })
      })
      showToast(`Order ${orderId} updated to ${newStatus}`)
    } catch {
      showToast(`Order status updated locally`)
    }
  }

  // Stats calculation
  const totalRevenue = useMemo(() => {
    return orders.filter(o => o.status !== 'Cancelled').reduce((acc, curr) => acc + curr.total, 0)
  }, [orders])

  const totalOrdersCount = orders.length
  const totalProductsCount = products.length
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 5).length
  const outOfStockCount = products.filter(p => p.stock === 0).length

  // Filtered Products
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  )

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.email.toLowerCase().includes(orderSearch.toLowerCase())
    const matchesStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col md:flex-row antialiased font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-5 border-r border-slate-800 flex-shrink-0">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-md shadow-pink-600/30">
                RR
              </span>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block leading-tight">Raja Rani</span>
                <span className="text-[10px] text-pink-400 uppercase tracking-widest font-semibold">Admin Panel</span>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            {/* Core Store */}
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-1.5">
                Core Store
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'dashboard'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <LayoutDashboard size={16} className="flex-shrink-0" />
                    <span className="truncate">Dashboard</span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'products'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Package size={16} className="flex-shrink-0" />
                    <span className="truncate">Products</span>
                  </span>
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 flex-shrink-0">
                    {products.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('categories')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'categories'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <FolderTree size={16} className="flex-shrink-0" />
                    <span className="truncate">Categories</span>
                  </span>
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 flex-shrink-0">
                    {categoriesList.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'content'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Type size={16} className="flex-shrink-0" />
                    <span>CMS</span>
                  </span>
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold flex-shrink-0">
                    {contentItems.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'inventory'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Warehouse size={16} className="flex-shrink-0" />
                    <span className="truncate">Inventory & Stock</span>
                  </span>
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold flex-shrink-0">
                    {lowStockCount + outOfStockCount}
                  </span>
                </button>
              </nav>
            </div>

            {/* Orders & Logistics */}
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-1.5">
                Orders & Logistics
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'orders'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <ShoppingBag size={16} className="flex-shrink-0" />
                    <span className="truncate">Orders</span>
                  </span>
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 flex-shrink-0">
                    {orders.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'shipping'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Truck size={16} className="flex-shrink-0" />
                    <span className="truncate">Shipping & Tracking</span>
                  </span>
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold flex-shrink-0">
                    {shipments.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('returns')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'returns'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <RotateCcw size={16} className="flex-shrink-0" />
                    <span className="truncate">Returns & Refunds</span>
                  </span>
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 flex-shrink-0">
                    {returns.length}
                  </span>
                </button>
              </nav>
            </div>

            {/* Growth & Store */}
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-1.5">
                Marketing & Growth
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('customers')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'customers'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Users size={16} className="flex-shrink-0" />
                    <span className="truncate">Customers</span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('coupons')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'coupons'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Tag size={16} className="flex-shrink-0" />
                    <span className="truncate">Coupons & Deals</span>
                  </span>
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 flex-shrink-0">
                    {coupons.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'analytics'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <BarChart3 size={16} className="flex-shrink-0" />
                    <span className="truncate">Analytics & Reports</span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'settings'
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Settings size={16} className="flex-shrink-0" />
                    <span className="truncate">Settings</span>
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 mt-6 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <ArrowUpRight size={15} />
            Visit Storefront
          </Link>
          <div className="flex items-center gap-3 px-3.5 py-2 rounded-lg bg-slate-800/50">
            <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-white">Administrator</div>
              <div className="text-[11px] text-slate-400 truncate">admin@rajarani.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <h1 className="text-base md:text-lg font-bold text-slate-900 capitalize">
              {activeTab === 'inventory' ? 'Warehouse & Inventory Management' :
               activeTab === 'categories' ? 'Store Categories Management' :
               activeTab === 'content' ? 'Website Content & Image CMS' :
               activeTab === 'shipping' ? 'Order Shipments & Tracking' :
               activeTab === 'returns' ? 'Returns & Customer Refunds' :
               activeTab === 'coupons' ? 'Discount Coupons & Promotional Deals' :
               activeTab === 'analytics' ? 'Sales Analytics & Revenue Reports' :
               `${activeTab} Overview`}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === 'coupons' ? (
              <button 
                onClick={() => setShowAddCouponModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                <Plus size={15} />
                Create Coupon
              </button>
            ) : activeTab === 'categories' ? (
              <button 
                onClick={() => setShowAddCategoryModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                <Plus size={15} />
                Add Category
              </button>
            ) : (
              <button 
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                <Plus size={15} />
                Add Product
              </button>
            )}
            <div className="relative">
              <button 
                onClick={() => showToast('No new notifications')}
                className="p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 relative"
              >
                <Bell size={18} />
                <span className="w-2 h-2 rounded-full bg-pink-600 absolute top-1.5 right-1.5 ring-2 ring-white"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</span>
                    <span className="w-9 h-9 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center font-bold">
                      ₹
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-slate-900">₹{totalRevenue.toLocaleString('en-IN')}</span>
                    <span className="inline-flex items-center text-xs font-semibold text-emerald-600 gap-0.5">
                      <TrendingUp size={13} /> +14.2%
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">vs last month</span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Orders</span>
                    <span className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <ShoppingBag size={18} />
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-slate-900">{totalOrdersCount}</span>
                    <span className="inline-flex items-center text-xs font-semibold text-emerald-600 gap-0.5">
                      <TrendingUp size={13} /> +8.5%
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">6 awaiting shipment</span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Inventory</span>
                    <span className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Package size={18} />
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-slate-900">{totalProductsCount}</span>
                    <span className="inline-flex items-center text-xs font-medium text-slate-500">
                      items
                    </span>
                  </div>
                  <span className="text-xs text-amber-600 mt-1 block font-medium">
                    {lowStockCount} low stock alerts
                  </span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Customers</span>
                    <span className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Users size={18} />
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-slate-900">{customers.length}</span>
                    <span className="inline-flex items-center text-xs font-semibold text-emerald-600 gap-0.5">
                      <TrendingUp size={13} /> +22%
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">Active repeat buyers</span>
                </div>
              </div>

              {/* Quick Jump E-commerce Shortcut Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setActiveTab('shipping')}
                  className="p-4 bg-white border border-slate-200 rounded-xl hover:border-pink-500 hover:shadow-sm text-left transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Truck size={17} />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Active Shipments</div>
                  <div className="text-[11px] text-slate-500">{shipments.filter(s => s.status !== 'Delivered').length} in transit via BlueDart</div>
                </button>

                <button
                  onClick={() => setActiveTab('inventory')}
                  className="p-4 bg-white border border-slate-200 rounded-xl hover:border-pink-500 hover:shadow-sm text-left transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Warehouse size={17} />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Inventory Status</div>
                  <div className="text-[11px] text-slate-500">3 Regional Warehouses</div>
                </button>

                <button
                  onClick={() => setActiveTab('coupons')}
                  className="p-4 bg-white border border-slate-200 rounded-xl hover:border-pink-500 hover:shadow-sm text-left transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Tag size={17} />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Coupons & Promo</div>
                  <div className="text-[11px] text-slate-500">{coupons.filter(c => c.status === 'Active').length} active discounts</div>
                </button>

                <button
                  onClick={() => setActiveTab('returns')}
                  className="p-4 bg-white border border-slate-200 rounded-xl hover:border-pink-500 hover:shadow-sm text-left transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <RotateCcw size={17} />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Returns & Claims</div>
                  <div className="text-[11px] text-slate-500">{returns.filter(r => r.status !== 'Completed').length} pending actions</div>
                </button>
              </div>

              {/* Recent Orders & Quick Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders List */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Orders</h2>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-xs text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-1"
                    >
                      View all <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 uppercase font-semibold">
                          <th className="pb-3">Order ID</th>
                          <th className="pb-3">Customer</th>
                          <th className="pb-3">Amount</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-600">
                        {orders.slice(0, 5).map(order => (
                          <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 font-semibold text-slate-900">{order.id}</td>
                            <td className="py-3">{order.customer}</td>
                            <td className="py-3 font-medium text-slate-900">₹{order.total.toLocaleString('en-IN')}</td>
                            <td className="py-3">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700' :
                                order.status === 'Shipped' ? 'bg-blue-50 text-blue-700' :
                                order.status === 'Processing' ? 'bg-amber-50 text-amber-700' :
                                'bg-rose-50 text-rose-700'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button 
                                onClick={() => setActiveTab('orders')}
                                className="text-pink-600 hover:text-pink-800 font-semibold"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Stock Alerts & Insights */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Inventory Alerts</h2>
                    <div className="space-y-3">
                      {products.filter(p => p.stock <= 5).map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-amber-50/60 border border-amber-200/60 text-xs">
                          <div>
                            <div className="font-semibold text-slate-900">{item.name}</div>
                            <div className="text-[11px] text-amber-800 font-medium">{item.brand} • {item.category}</div>
                          </div>
                          <span className={`px-2 py-1 rounded text-[10px] font-bold ${item.stock === 0 ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'}`}>
                            {item.stock === 0 ? 'Out of Stock' : `${item.stock} left`}
                          </span>
                        </div>
                      ))}
                      {products.filter(p => p.stock <= 5).length === 0 && (
                        <p className="text-xs text-slate-400 py-6 text-center">All inventory stock levels are healthy.</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <button 
                      onClick={() => setActiveTab('inventory')}
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                      style={{ color: '#ffffff' }}
                    >
                      <Package size={14} className="text-white" />
                      <span className="text-white font-semibold">Manage All Inventory</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              {/* Product Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search products by title, brand, category..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-slate-50/50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                  >
                    <Plus size={15} />
                    Add Product
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                      <tr>
                        <th className="py-3.5 px-4">Product</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Price</th>
                        <th className="py-3.5 px-4">Stock</th>
                        <th className="py-3.5 px-4">Rating</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {filteredProducts.map(product => (
                        <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden relative flex-shrink-0 border border-slate-200">
                                {('image' in product && (product as { image?: string }).image) ? (
                                  <img 
                                    src={(product as { image?: string }).image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover" 
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <ImageIcon size={16} />
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">{product.name}</div>
                                <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">{product.brand}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                              {product.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            ₹{product.price.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-semibold ${
                              product.stock === 0 ? 'text-rose-600' :
                              product.stock <= 5 ? 'text-amber-600' : 'text-slate-800'
                            }`}>
                              {product.stock} units
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1 font-semibold text-amber-600">
                              <Star size={13} fill="currentColor" />
                              <span>{product.rating}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              product.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                              product.status === 'Low Stock' ? 'bg-amber-50 text-amber-700' :
                              'bg-rose-50 text-rose-700'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                                title="Delete product"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredProducts.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-slate-400">
                            No products matching your search query.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Order Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search by order ID, customer name, email..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-slate-50/50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Status:</span>
                  <select 
                    value={orderStatusFilter} 
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="border border-slate-200 bg-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                      <tr>
                        <th className="py-3.5 px-4">Order ID</th>
                        <th className="py-3.5 px-4">Customer</th>
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-4">Total Amount</th>
                        <th className="py-3.5 px-4">Payment</th>
                        <th className="py-3.5 px-4">Fulfillment Status</th>
                        <th className="py-3.5 px-4 text-right">Update Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {filteredOrders.map(order => (
                        <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-bold text-slate-900">{order.id}</td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-800">{order.customer}</div>
                            <div className="text-[11px] text-slate-400">{order.email}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-500">{order.date}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">
                            ₹{order.total.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              order.payment === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {order.payment}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700' :
                              order.status === 'Shipped' ? 'bg-blue-50 text-blue-700' :
                              order.status === 'Processing' ? 'bg-amber-50 text-amber-700' :
                              'bg-rose-50 text-rose-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className="border border-slate-200 bg-white rounded px-2 py-1 text-xs focus:ring-1 focus:ring-pink-500"
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                      {filteredOrders.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-slate-400">
                            No orders found matching your criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Registered Customer Base</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                      <tr>
                        <th className="py-3.5 px-4">Customer Name</th>
                        <th className="py-3.5 px-4">City</th>
                        <th className="py-3.5 px-4">Member Since</th>
                        <th className="py-3.5 px-4">Total Orders</th>
                        <th className="py-3.5 px-4">Lifetime Spent</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {customers.map(c => (
                        <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-900">{c.name}</div>
                            <div className="text-[11px] text-slate-400">{c.email}</div>
                          </td>
                          <td className="py-3.5 px-4">{c.city}</td>
                          <td className="py-3.5 px-4 text-slate-500">{c.joined}</td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">{c.orders} orders</td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">₹{c.spent.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              {/* Regional Warehouses overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {warehouses.map(wh => (
                  <div key={wh.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-pink-600 uppercase tracking-wider">{wh.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">Operational</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-2">{wh.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <MapPin size={12} className="text-slate-400" /> {wh.city}
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <div className="text-slate-400 text-[10px]">Stock Count</div>
                        <div className="font-bold text-slate-900">{wh.totalUnits} items</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px]">Capacity</div>
                        <div className="font-bold text-slate-900">{wh.capacityUsage}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px]">Manager</div>
                        <div className="font-medium text-slate-700">{wh.manager}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inventory Stock Threshold Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">SKU Stock & Reorder Levels</h3>
                    <p className="text-xs text-slate-500">Monitor live warehouse quantities and auto-replenishment flags.</p>
                  </div>
                  <button 
                    onClick={() => showToast('Syncing live inventory from ERP... Complete.')}
                    className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                  >
                    <RefreshCw size={13} />
                    Sync Stocks
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                        <th className="py-3 px-4">Item SKU</th>
                        <th className="py-3 px-4">Appliance</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Current Stock</th>
                        <th className="py-3 px-4">Safety Threshold</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4 font-mono text-slate-500">SKU-00{p.id}</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">{p.name} ({p.brand})</td>
                          <td className="py-3 px-4 text-slate-500">Bhiwandi Hub (WH-MUM)</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{p.stock} units</td>
                          <td className="py-3 px-4 text-slate-500">5 units</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              p.stock === 0 ? 'bg-rose-100 text-rose-700' :
                              p.stock <= 5 ? 'bg-amber-100 text-amber-700' :
                              'bg-emerald-100 text-emerald-700'
                            }`}>
                              {p.stock === 0 ? 'Out of Stock' : p.stock <= 5 ? 'Low Stock' : 'Optimal'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => {
                                setProducts(products.map(item => item.id === p.id ? { ...item, stock: item.stock + 10, status: 'Active' } : item))
                                showToast(`Reordered +10 units for ${p.name}`)
                              }}
                              className="text-pink-600 hover:text-pink-800 font-semibold"
                            >
                              + Reorder 10
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SHIPPING & SHIPMENTS */}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Logistics & Courier Integrations</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Automated dispatch manifests with BlueDart, Delhivery & DTDC Surface.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => showToast('Manifest downloaded for today’s pick-up.')}
                    className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Download size={14} /> Download Manifest
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                        <th className="py-3 px-4">Shipment ID</th>
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Courier Partner</th>
                        <th className="py-3 px-4">AWB Tracking No.</th>
                        <th className="py-3 px-4">Destination Address</th>
                        <th className="py-3 px-4">Estimated Delivery</th>
                        <th className="py-3 px-4">Transit Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {shipments.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4 font-bold text-slate-900">{s.id}</td>
                          <td className="py-3 px-4 font-semibold text-pink-600">{s.orderId}</td>
                          <td className="py-3 px-4">{s.partner}</td>
                          <td className="py-3 px-4 font-mono text-slate-500">{s.awb}</td>
                          <td className="py-3 px-4">{s.destination}</td>
                          <td className="py-3 px-4 font-medium text-slate-800">{s.eta}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              s.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700' :
                              s.status === 'Out for Delivery' ? 'bg-amber-50 text-amber-700' :
                              'bg-blue-50 text-blue-700'
                            }`}>
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: RETURNS & REFUNDS */}
          {activeTab === 'returns' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">RMA & Customer Return Requests</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Approve, inspect and trigger instant UPI/bank refunds for home appliances.</p>
                </div>
                <div className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100">
                  {returns.filter(r => r.status !== 'Completed').length} Pending Actions
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                        <th className="py-3 px-4">Return ID</th>
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-4">Reason for Return</th>
                        <th className="py-3 px-4">Refund Amount</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {returns.map(ret => (
                        <tr key={ret.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4 font-bold text-slate-900">{ret.id}</td>
                          <td className="py-3 px-4 font-medium text-pink-600">{ret.orderId}</td>
                          <td className="py-3 px-4">{ret.customer}</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">{ret.product}</td>
                          <td className="py-3 px-4 text-slate-500 max-w-xs">{ret.reason}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">₹{ret.amount.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              ret.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                              ret.status === 'Refund Approved' ? 'bg-blue-50 text-blue-700' :
                              'bg-amber-50 text-amber-700'
                            }`}>
                              {ret.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {ret.status !== 'Completed' ? (
                              <button
                                onClick={() => {
                                  setReturns(returns.map(r => r.id === ret.id ? { ...r, status: 'Completed' } : r))
                                  showToast(`Refund of ₹${ret.amount.toLocaleString('en-IN')} initiated to ${ret.customer}`)
                                }}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded text-[11px]"
                              >
                                Process Refund
                              </button>
                            ) : (
                              <span className="text-[11px] text-slate-400">Settled</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: COUPONS & DEALS */}
          {activeTab === 'coupons' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Promotional Coupons & Discount Vouchers</h3>
                  <p className="text-xs text-slate-500">Create promotional codes for festive seasons and cart abandonment recoveries.</p>
                </div>
                <button
                  onClick={() => setShowAddCouponModal(true)}
                  className="px-3.5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus size={14} /> Add Coupon
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                        <th className="py-3 px-4">Coupon Code</th>
                        <th className="py-3 px-4">Discount Value</th>
                        <th className="py-3 px-4">Type / Scope</th>
                        <th className="py-3 px-4">Min. Order Value</th>
                        <th className="py-3 px-4">Times Redeemed</th>
                        <th className="py-3 px-4">Expiry Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {coupons.map(cp => (
                        <tr key={cp.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4">
                            <span className="font-mono font-bold text-pink-600 bg-pink-50 px-2 py-1 rounded border border-pink-200">
                              {cp.code}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900">{cp.discount}</td>
                          <td className="py-3 px-4 text-slate-500">{cp.type}</td>
                          <td className="py-3 px-4 font-medium text-slate-800">₹{cp.minOrder.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-4">{cp.usage}</td>
                          <td className="py-3 px-4">{cp.expiry}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              cp.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {cp.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => {
                                setCoupons(coupons.filter(c => c.id !== cp.id))
                                showToast(`Coupon ${cp.code} deactivated`)
                              }}
                              className="text-slate-400 hover:text-rose-600 p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ANALYTICS & REPORTS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Average Order Value (AOV)</div>
                  <div className="text-2xl font-bold text-slate-900 mt-2">
                    ₹{Math.round(totalRevenue / Math.max(orders.length, 1)).toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">+6.4% from last quarter</div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Gross Merchandise Value (GMV)</div>
                  <div className="text-2xl font-bold text-slate-900 mt-2">
                    ₹{Math.round(totalRevenue * 1.08).toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">On-track for annual target</div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Cart Conversion Rate</div>
                  <div className="text-2xl font-bold text-slate-900 mt-2">3.82%</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">+0.5% industry benchmark</div>
                </div>
              </div>

              {/* Category Sales Breakdown */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Category Revenue Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { cat: 'Refrigerators', pct: 42, rev: '₹4,12,000' },
                    { cat: 'Cooling & Air Conditioners', pct: 28, rev: '₹2,75,000' },
                    { cat: 'Televisions & Home Audio', pct: 16, rev: '₹1,57,000' },
                    { cat: 'Laundry & Washing', pct: 10, rev: '₹98,000' },
                    { cat: 'Kitchen Appliances', pct: 4, rev: '₹39,000' }
                  ].map(item => (
                    <div key={item.cat}>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-800">{item.cat}</span>
                        <span className="text-slate-500">{item.rev} ({item.pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-pink-600 rounded-full" 
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Product Categories & Collections</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Manage store categories, titles, subtitles, and cover photos appearing on homepage rails.</p>
                </div>
                <button
                  onClick={() => setShowAddCategoryModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm self-start sm:self-auto"
                >
                  <Plus size={15} />
                  Add Category
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoriesList.map((cat) => (
                  <div key={cat.id || cat.name} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 relative border border-slate-200">
                          {cat.image ? (
                            <img
                              src={cat.image.startsWith('/') ? cat.image : `https://images.unsplash.com/${cat.image}?auto=format&fit=crop&w=200&q=80`}
                              alt={cat.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-900 truncate">{cat.name}</h3>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                              Order #{cat.display_order || 0}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cat.note || 'No note provided'}</p>
                          <div className="text-[11px] text-slate-400 font-mono mt-1.5 truncate">
                            Slug: {cat.slug || cat.name.toLowerCase()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Live on Storefront</span>
                      <button
                        onClick={async () => {
                          if (confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
                            try {
                              const res = await fetch(`/api/categories?id=${cat.id}`, { method: 'DELETE' })
                              const data = await res.json()
                              if (data.success) {
                                setCategoriesList(categoriesList.filter(c => c.id !== cat.id))
                                showToast('Category removed successfully!')
                              } else {
                                showToast('Failed to delete category')
                              }
                            } catch {
                              showToast('Error deleting category')
                            }
                          }
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1 flex items-center gap-1 font-medium transition-colors"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTENT CMS & IMAGES */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Website Content, Headings & Banner Images</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Edit any text, tagline, button label, or banner image on the website in real-time.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      setSavingContent(true)
                      try {
                        const payload: Record<string, string> = {}
                        contentItems.forEach(item => {
                          payload[item.content_key] = item.content_value
                        })
                        const res = await fetch('/api/content', {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ items: payload })
                        })
                        const data = await res.json()
                        if (data.success) {
                          showToast('All website content & images saved successfully!')
                        } else {
                          showToast('Failed to save content')
                        }
                      } catch {
                        showToast('Error saving content')
                      } finally {
                        setSavingContent(false)
                      }
                    }}
                    disabled={savingContent}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                  >
                    {savingContent ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                    {savingContent ? 'Saving Changes...' : 'Save All Website Changes'}
                  </button>
                </div>
              </div>

              {/* Section Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
                {[
                  { id: 'all', label: 'All Sections' },
                  { id: 'hero', label: 'Hero Banner' },
                  { id: 'trust_strip', label: 'Trust Badges' },
                  { id: 'homepage_sections', label: 'Section Headings' },
                  { id: 'editorial', label: 'Editorial Living' },
                  { id: 'promo_card', label: 'Promo Card' },
                  { id: 'header', label: 'Header & Announcement' },
                  { id: 'footer', label: 'Footer & Policies' }
                ].map(sec => (
                  <button
                    key={sec.id}
                    onClick={() => setActiveContentSection(sec.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      activeContentSection === sec.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>

              {/* Content Form Editor Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {contentItems
                  .filter(item => activeContentSection === 'all' || item.section === activeContentSection)
                  .map((item, index) => (
                    <div key={item.content_key} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded">
                          {item.section}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {item.content_key}
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          {item.label}
                        </label>

                        {item.input_type === 'image' ? (
                          <div className="space-y-2">
                            <div className="h-36 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden relative group">
                              <img
                                src={
                                  item.content_value.startsWith('/')
                                    ? item.content_value
                                    : item.content_value.startsWith('data:')
                                    ? item.content_value
                                    : `https://images.unsplash.com/${item.content_value}?auto=format&fit=crop&w=800&q=80`
                                }
                                alt={item.label}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={item.content_value}
                                onChange={(e) => {
                                  const updated = [...contentItems]
                                  const targetIdx = updated.findIndex(c => c.content_key === item.content_key)
                                  if (targetIdx !== -1) {
                                    updated[targetIdx].content_value = e.target.value
                                    setContentItems(updated)
                                  }
                                }}
                                placeholder="Image URL or Unsplash ID"
                                className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-pink-500 outline-none"
                              />
                              <label className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-1">
                                <Upload size={13} />
                                <span>Upload</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                      const reader = new FileReader()
                                      reader.onloadend = () => {
                                        const base64 = reader.result as string
                                        const updated = [...contentItems]
                                        const targetIdx = updated.findIndex(c => c.content_key === item.content_key)
                                        if (targetIdx !== -1) {
                                          updated[targetIdx].content_value = base64
                                          setContentItems(updated)
                                        }
                                      }
                                      reader.readAsDataURL(file)
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        ) : item.input_type === 'textarea' ? (
                          <textarea
                            rows={3}
                            value={item.content_value}
                            onChange={(e) => {
                              const updated = [...contentItems]
                              const targetIdx = updated.findIndex(c => c.content_key === item.content_key)
                              if (targetIdx !== -1) {
                                updated[targetIdx].content_value = e.target.value
                                setContentItems(updated)
                              }
                            }}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none resize-y"
                          />
                        ) : (
                          <input
                            type="text"
                            value={item.content_value}
                            onChange={(e) => {
                              const updated = [...contentItems]
                              const targetIdx = updated.findIndex(c => c.content_key === item.content_key)
                              if (targetIdx !== -1) {
                                updated[targetIdx].content_value = e.target.value
                                setContentItems(updated)
                              }
                            }}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                          />
                        )}
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              const res = await fetch('/api/content', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ key: item.content_key, value: item.content_value })
                              })
                              const data = await res.json()
                              if (data.success) {
                                showToast(`Saved "${item.label}"`)
                              } else {
                                showToast('Save failed')
                              }
                            } catch {
                              showToast('Error saving item')
                            }
                          }}
                          className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-semibold transition-colors"
                        >
                          Save Field
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Store & Admin Configuration</h2>
                <p className="text-xs text-slate-500 mt-1">Configure your store metadata, operational parameters, and payment preferences.</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Store Name</label>
                  <input
                    type="text"
                    defaultValue="Raja Rani Electronics"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Support Contact Email</label>
                  <input
                    type="email"
                    defaultValue="support@rajarani.com"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Default Currency</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none">
                    <option value="INR">Indian Rupee (INR - ₹)</option>
                    <option value="USD">US Dollar (USD - $)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Low Stock Alert Threshold</div>
                    <div className="text-[11px] text-slate-400">Trigger warnings when product stock dips below this limit</div>
                  </div>
                  <input 
                    type="number" 
                    defaultValue={5} 
                    className="w-20 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-center" 
                  />
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => showToast('Store settings saved successfully!')}
                    className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Add New Product</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Inverter Double Door Refrigerator"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samsung, LG, Sony"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                  >
                    <option value="Refrigerators">Refrigerators</option>
                    <option value="Laundry">Laundry</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Televisions">Televisions</option>
                    <option value="Cooling">Cooling</option>
                    <option value="Floor care">Floor care</option>
                    <option value="Dishwashers">Dishwashers</option>
                    <option value="Small appliances">Small appliances</option>
                    <option value="Water purifiers">Water purifiers</option>
                    <option value="Microwaves">Microwaves</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 45990"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    placeholder="e.g. 25"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
              </div>

              {/* Product Image Selection / Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Image</label>
                
                {/* Image Preview & Controls */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl mb-2">
                  <div className="w-16 h-16 rounded-lg bg-white border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0 relative shadow-xs">
                    {newProduct.image ? (
                      <img src={newProduct.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400 text-[10px]">
                        <ImageIcon size={20} className="mb-0.5" />
                        <span>No image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-pink-500 hover:text-pink-600 rounded-lg text-xs font-medium cursor-pointer transition-all shadow-xs">
                      <Upload size={13} />
                      <span>Upload from Device</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageFileChange} 
                        className="hidden" 
                      />
                    </label>
                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WebP up to 5MB</p>
                  </div>
                  {newProduct.image && (
                    <button
                      type="button"
                      onClick={() => setNewProduct({ ...newProduct, image: '' })}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                      title="Clear image"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>

                <div className="relative">
                  <div className="text-[11px] text-slate-500 mb-1">Or paste image web URL:</div>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Add Coupon Modal */}
      {showAddCouponModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Create Discount Coupon</h3>
              <button 
                onClick={() => setShowAddCouponModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCoupon} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SUMMER2026, EXTRA500"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono font-bold uppercase focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Discount Text *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 20% OFF or ₹1,500 Flat"
                    value={newCoupon.discount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Coupon Type</label>
                  <select
                    value={newCoupon.type}
                    onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                  >
                    <option value="Percentage">Percentage Discount</option>
                    <option value="Fixed Amount">Flat Amount</option>
                    <option value="First Order">First Order Welcome</option>
                    <option value="Category Specific">Category Specific</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Min. Order Value (₹)</label>
                  <input
                    type="number"
                    value={newCoupon.minOrder}
                    onChange={(e) => setNewCoupon({ ...newCoupon, minOrder: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={newCoupon.expiry}
                    onChange={(e) => setNewCoupon({ ...newCoupon, expiry: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCouponModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Add New Category</h3>
              <button 
                onClick={() => setShowAddCategoryModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault()
                try {
                  const res = await fetch('/api/categories', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCategory)
                  })
                  const data = await res.json()
                  if (data.success) {
                    setCategoriesList([...categoriesList, data.category])
                    setShowAddCategoryModal(false)
                    setNewCategory({ name: '', note: '', image: '', display_order: categoriesList.length + 1 })
                    showToast(`Category "${data.category.name}" added successfully!`)
                  } else {
                    showToast(data.error || 'Failed to add category')
                  }
                } catch {
                  showToast('Error creating category')
                }
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Lighting, Robotic Vacuums"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle / Note</label>
                <input
                  type="text"
                  placeholder="e.g. Intelligent home ambiance"
                  value={newCategory.note}
                  onChange={(e) => setNewCategory({ ...newCategory, note: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">Category Cover Photo</label>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                    {newCategory.image ? (
                      <img
                        src={newCategory.image.startsWith('/') || newCategory.image.startsWith('data:') ? newCategory.image : `https://images.unsplash.com/${newCategory.image}?auto=format&fit=crop&w=150&q=80`}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={20} className="text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer">
                      <Upload size={13} />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              setNewCategory({ ...newCategory, image: reader.result as string })
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Or paste image URL / Unsplash ID"
                  value={newCategory.image}
                  onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
