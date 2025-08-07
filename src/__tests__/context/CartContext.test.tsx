import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '@/context/CartContext'
import { Product } from '@/lib/types'

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test description',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: { rate: 4.5, count: 100 }
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe('CartContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    expect(result.current.state.items).toHaveLength(0)
    expect(result.current.state.totalItems).toBe(0)
    expect(result.current.state.totalPrice).toBe(0)
  })

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem(mockProduct)
    })
    
    expect(result.current.state.items).toHaveLength(1)
    expect(result.current.state.totalItems).toBe(1)
    expect(result.current.state.totalPrice).toBe(99.99)
    expect(result.current.state.items[0].title).toBe('Test Product')
  })

  it('increases quantity when adding same item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem(mockProduct)
      result.current.addItem(mockProduct)
    })
    
    expect(result.current.state.items).toHaveLength(1)
    expect(result.current.state.totalItems).toBe(2)
    expect(result.current.state.totalPrice).toBe(199.98)
    expect(result.current.state.items[0].quantity).toBe(2)
  })

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem(mockProduct)
    })
    
    expect(result.current.state.items).toHaveLength(1)
    
    act(() => {
      result.current.removeItem(mockProduct.id)
    })
    
    expect(result.current.state.items).toHaveLength(0)
    expect(result.current.state.totalItems).toBe(0)
    expect(result.current.state.totalPrice).toBe(0)
  })

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem(mockProduct)
    })
    
    act(() => {
      result.current.updateQuantity(mockProduct.id, 5)
    })
    
    expect(result.current.state.items[0].quantity).toBe(5)
    expect(result.current.state.totalItems).toBe(5)
    expect(result.current.state.totalPrice).toBe(499.95)
  })

  it('removes item when quantity is updated to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem(mockProduct)
    })
    
    act(() => {
      result.current.updateQuantity(mockProduct.id, 0)
    })
    
    expect(result.current.state.items).toHaveLength(0)
  })

  it('clears cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem(mockProduct)
      result.current.addItem({ ...mockProduct, id: 2 })
    })
    
    expect(result.current.state.items).toHaveLength(2)
    
    act(() => {
      result.current.clearCart()
    })
    
    expect(result.current.state.items).toHaveLength(0)
    expect(result.current.state.totalItems).toBe(0)
    expect(result.current.state.totalPrice).toBe(0)
  })

  it('checks if item is in cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    expect(result.current.isInCart(mockProduct.id)).toBe(false)
    
    act(() => {
      result.current.addItem(mockProduct)
    })
    
    expect(result.current.isInCart(mockProduct.id)).toBe(true)
  })

  it('gets item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    expect(result.current.getItemQuantity(mockProduct.id)).toBe(0)
    
    act(() => {
      result.current.addItem(mockProduct)
      result.current.addItem(mockProduct)
    })
    
    expect(result.current.getItemQuantity(mockProduct.id)).toBe(2)
  })
})
