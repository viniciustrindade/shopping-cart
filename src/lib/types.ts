// Product interface matching Fake Store API
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Cart item interface
export interface CartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
  image: string;
}

// Cart state interface
export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Cart actions
export type CartAction = 
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'ADD_MULTIPLE_ITEMS'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

// API response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Search and pagination types
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  hasMore: boolean;
}

export interface SearchFilters {
  query: string;
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}
