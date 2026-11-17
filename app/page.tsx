'use client'

import { useEffect, useState } from 'react'
import Storefront from './storefront'

export default function Page() {
  const [cart, setCart] = useState<Record<number, number>>({})
  const [wishlist, setWishlist] = useState<number[]>([])
  const [storageReady, setStorageReady] = useState(false)
  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem('rajarani-cart') || '{}'))
      setWishlist(JSON.parse(localStorage.getItem('rajarani-wishlist') || '[]'))
    } catch { /* Ignore invalid saved browser state. */ }
    setStorageReady(true)
  }, [])
  useEffect(() => { if (storageReady) localStorage.setItem('rajarani-cart', JSON.stringify(cart)) }, [cart, storageReady])
  useEffect(() => { if (storageReady) localStorage.setItem('rajarani-wishlist', JSON.stringify(wishlist)) }, [wishlist, storageReady])
  return <Storefront cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist}/>
}
