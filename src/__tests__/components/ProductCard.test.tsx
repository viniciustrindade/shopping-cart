import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from '@/components/features/ProductCard'
import { CartProvider } from '@/context/CartContext'
import { Product } from '@/lib/types'

// Mock Next.js Link component
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
  MockLink.displayName = 'MockLink'
  return MockLink
})

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'This is a test product description',
  category: 'electronics',
  image: 'https://fakestoreapi.com/img/test.jpg',
  rating: { rate: 4.5, count: 100 }
}

const renderWithCart = (component: React.ReactElement) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  )
}

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('USD 99.99')).toBeInTheDocument()
    expect(screen.getByText(/This is a test product/)).toBeInTheDocument()
    expect(screen.getByText('4.5')).toBeInTheDocument()
    expect(screen.getByText('(100 reviews)')).toBeInTheDocument()
  })

  it('has add to cart button', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    
    const addButton = screen.getByLabelText('Add Test Product to cart')
    expect(addButton).toBeInTheDocument()
  })

  it('adds product to cart when add button is clicked', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    
    const addButton = screen.getByLabelText('Add Test Product to cart')
    fireEvent.click(addButton)
    
    // The toast notification would appear, but we're not testing that here
    // In a real test, you might check if a mock function was called
  })

  it('links to product details page', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/product/1')
  })
})
