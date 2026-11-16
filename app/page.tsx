'use client'

import { useEffect, useState } from 'react'
import Storefront from './storefront'

export default function Page() {
  const [cart, setCart] = useState<Record<number, number>>({})
  const [wishlist, setWishlist] = useState<number[]>([])
  const [storageReady, setStorageReady] = useState(false)
  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem('appliq-cart') || '{}'))
      setWishlist(JSON.parse(localStorage.getItem('appliq-wishlist') || '[]'))
    } catch { /* Ignore invalid saved browser state. */ }
    setStorageReady(true)
  }, [])
  useEffect(() => { if (storageReady) localStorage.setItem('appliq-cart', JSON.stringify(cart)) }, [cart, storageReady])
  useEffect(() => { if (storageReady) localStorage.setItem('appliq-wishlist', JSON.stringify(wishlist)) }, [wishlist, storageReady])
  return <Storefront cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist}/>
}
