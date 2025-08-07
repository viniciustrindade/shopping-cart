import { Product, ApiResponse } from './types';

const API_BASE_URL = 'https://fakestoreapi.com';

// Generic API error handler
class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic fetch wrapper with error handling
async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API Error:', error);
    
    if (error instanceof ApiError) {
      return { data: null as T, error: error.message };
    }
    
    return { 
      data: null as T, 
      error: 'Network error. Please check your connection and try again.' 
    };
  }
}

// Fetch all products
export async function fetchProducts(): Promise<ApiResponse<Product[]>> {
  return fetchWithErrorHandling<Product[]>(`${API_BASE_URL}/products`);
}

// Fetch single product by ID
export async function fetchProduct(id: number): Promise<ApiResponse<Product>> {
  return fetchWithErrorHandling<Product>(`${API_BASE_URL}/products/${id}`);
}

// Fetch products by category
export async function fetchProductsByCategory(
  category: string
): Promise<ApiResponse<Product[]>> {
  return fetchWithErrorHandling<Product[]>(
    `${API_BASE_URL}/products/category/${category}`
  );
}

// Fetch all categories
export async function fetchCategories(): Promise<ApiResponse<string[]>> {
  return fetchWithErrorHandling<string[]>(`${API_BASE_URL}/products/categories`);
}

// Client-side product filtering
export function filterProducts(
  products: Product[],
  query: string,
  category?: string
): Product[] {
  return products.filter((product) => {
    const matchesQuery = 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase());
    
    const matchesCategory = !category || product.category === category;
    
    return matchesQuery && matchesCategory;
  });
}

// Sort products by different criteria
export function sortProducts(
  products: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'name' | 'rating'
): Product[] {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.title.localeCompare(b.title);
      case 'rating':
        return b.rating.rate - a.rating.rate;
      default:
        return 0;
    }
  });
}
