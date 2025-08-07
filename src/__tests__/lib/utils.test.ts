import { 
  formatPrice, 
  formatPriceBadge, 
  truncateText, 
  calculateCartTotals,
  isValidProduct 
} from '@/lib/utils'

describe('Utils', () => {
  describe('formatPrice', () => {
    it('formats price correctly', () => {
      expect(formatPrice(99.99)).toBe('$99.99')
      expect(formatPrice(100)).toBe('$100.00')
      expect(formatPrice(0)).toBe('$0.00')
    })
  })

  describe('formatPriceBadge', () => {
    it('formats price badge correctly', () => {
      expect(formatPriceBadge(99.99)).toBe('USD 99.99')
      expect(formatPriceBadge(100)).toBe('USD 100.00')
      expect(formatPriceBadge(0)).toBe('USD 0.00')
    })
  })

  describe('truncateText', () => {
    it('truncates text when longer than max length', () => {
      const text = 'This is a very long text that should be truncated'
      expect(truncateText(text, 20)).toBe('This is a very long...')
    })

    it('returns original text when shorter than max length', () => {
      const text = 'Short text'
      expect(truncateText(text, 20)).toBe('Short text')
    })

    it('returns original text when equal to max length', () => {
      const text = 'Exactly twenty chars'
      expect(truncateText(text, 20)).toBe('Exactly twenty chars')
    })
  })

  describe('calculateCartTotals', () => {
    it('calculates totals correctly', () => {
      const items = [
        { quantity: 2, price: 10.00 },
        { quantity: 1, price: 15.50 },
        { quantity: 3, price: 5.25 }
      ]

      const result = calculateCartTotals(items)
      
      expect(result.totalItems).toBe(6)
      expect(result.totalPrice).toBe(51.25)
    })

    it('returns zero for empty cart', () => {
      const result = calculateCartTotals([])
      
      expect(result.totalItems).toBe(0)
      expect(result.totalPrice).toBe(0)
    })
  })

  describe('isValidProduct', () => {
    const validProduct = {
      id: 1,
      title: 'Test Product',
      price: 99.99,
      description: 'Test description',
      image: 'https://example.com/image.jpg'
    }

    it('returns true for valid product', () => {
      expect(isValidProduct(validProduct)).toBe(true)
    })

    it('returns false for null/undefined', () => {
      expect(isValidProduct(null)).toBe(false)
      expect(isValidProduct(undefined)).toBe(false)
    })

    it('returns false for missing required fields', () => {
      expect(isValidProduct({ ...validProduct, id: undefined })).toBe(false)
      expect(isValidProduct({ ...validProduct, title: undefined })).toBe(false)
      expect(isValidProduct({ ...validProduct, price: undefined })).toBe(false)
      expect(isValidProduct({ ...validProduct, description: undefined })).toBe(false)
      expect(isValidProduct({ ...validProduct, image: undefined })).toBe(false)
    })

    it('returns false for wrong field types', () => {
      expect(isValidProduct({ ...validProduct, id: 'string' })).toBe(false)
      expect(isValidProduct({ ...validProduct, title: 123 })).toBe(false)
      expect(isValidProduct({ ...validProduct, price: 'string' })).toBe(false)
      expect(isValidProduct({ ...validProduct, description: 123 })).toBe(false)
      expect(isValidProduct({ ...validProduct, image: 123 })).toBe(false)
    })
  })
})
