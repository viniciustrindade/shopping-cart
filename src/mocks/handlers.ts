import { http, HttpResponse } from 'msw'

// Mock products data
const mockProducts = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description: 'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: { rate: 4.7, count: 500 }
  }
]

export const handlers = [
  // Get all products
  http.get('https://fakestoreapi.com/products', () => {
    return HttpResponse.json(mockProducts)
  }),

  // Get single product
  http.get('https://fakestoreapi.com/products/:id', ({ params }) => {
    const { id } = params
    const product = mockProducts.find(p => p.id === parseInt(id as string))
    
    if (!product) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      )
    }
    
    return HttpResponse.json(product)
  }),

  // Get products by category
  http.get('https://fakestoreapi.com/products/category/:category', ({ params }) => {
    const { category } = params
    const filteredProducts = mockProducts.filter(p => p.category === category)
    return HttpResponse.json(filteredProducts)
  }),

  // Get categories
  http.get('https://fakestoreapi.com/products/categories', () => {
    const categories = [...new Set(mockProducts.map(p => p.category))]
    return HttpResponse.json(categories)
  }),
]
