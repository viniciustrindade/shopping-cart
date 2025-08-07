# Architecture Document - React Shopping Cart Challenge

## Overview
This document outlines the high-level architecture for the React Shopping Cart challenge using Next.js. It includes application structure, component breakdown, data flow, and core design decisions.

---

## 1. Tech Stack
- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: Tailwind CSS (or alternative of choice)
- **State Management**: React Context API (or Redux, Zustand, etc. if preferred)
- **Data Source**: [Fake Store API](https://fakestoreapi.com/products)
- **Testing**: Jest + React Testing Library

---

## 2. Application Structure
```
/pages
  |-- index.tsx             // Main page (Product list)
/cart.tsx              // Shopping cart page
/product/[id].tsx      // Product details page
/components
  |-- Header.tsx            // Shared header with cart badge and search
  |-- ProductCard.tsx       // Display product information
  |-- ProductList.tsx       // Paginated product list
  |-- CartItem.tsx          // Item row in shopping cart
  |-- Layout.tsx            // Shared layout for all pages
/context
  |-- CartContext.tsx       // Global cart state
/hooks
  |-- usePagination.tsx     // Custom hook for local pagination
/styles
  |-- globals.css           // Global styles (via Tailwind or custom)
/tests
  |-- unit/                 // Unit test files
```

---

## 3. Routing Strategy
- `/` → Main Page
- `/cart` → Shopping Cart Page
- `/product/[id]` → Product Details Page

---

## 4. State Management (ENHANCED)

### **Global State Architecture**
- **Cart State**: React Context with useReducer for predictable updates
- **Products**: Fetched via custom hooks with local caching
- **UI State**: Local component state for search, pagination, loading

### **State Interfaces**
```ts
interface Product {
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

interface CartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };
```

### **State Persistence Strategy**
- localStorage integration with custom useLocalStorage hook
- Automatic cart state hydration on app initialization
- Graceful fallback for SSR compatibility

---

## 5. Data Flow
- Products fetched on initial render (SSR or CSR)
- Cart interactions update context state and persist between views
- Search filters product list client-side
- "See More" triggers local pagination (fetch more from API or lazy reveal)

---

## 6. UX Enhancements
- Add loading spinners
- Handle API/network errors with fallback messages
- Improve mobile responsiveness
- Retain cart state using localStorage (optional)

---

## 7. Performance & Accessibility
- Lazy load images
- Use semantic HTML elements
- Ensure keyboard navigation and ARIA attributes

---

## 8. Testing
- Unit tests for: ProductCard, CartContext, usePagination, and Header
- Mock API calls using MSW or similar library

---

## 9. Implementation Plan (UPDATED)

### **CRITICAL PATH - MVP (75 minutes total)**

#### Phase 1A: Foundation Setup (15 min)
- Install dependencies: clsx, tailwind-merge, react-hot-toast, testing libraries
- Configure Jest with jsdom environment and MSW setup
- Create TypeScript interfaces (Product, CartItem, CartState, CartAction)
- Set up project structure with components/, hooks/, context/, lib/ directories

#### Phase 1B: Core State Management (20 min)
- CartContext with useReducer pattern for predictable state updates
- Cart actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART
- localStorage persistence with custom useLocalStorage hook
- Context provider integration in root layout

#### Phase 1C: Essential Components (25 min)
- ProductCard with image, title, price, description, and add-to-cart button
- Header with logo, search bar, and dynamic cart badge
- Layout wrapper with consistent spacing and navigation
- Loading spinner and error message components

#### Phase 2A: Home Page Implementation (20 min)
- Product list with Fake Store API integration using custom useProducts hook
- Client-side search filtering with debounced input
- "See More" pagination with usePagination hook (loads 3 more products per click)
- Responsive CSS Grid layout (1 column mobile, 2 tablet, 3+ desktop)

#### Phase 2B: Shopping Cart Page (15 min)
- Cart items display with ProductCard-like layout
- Quantity controls with increment/decrement buttons
- Remove item functionality with confirmation
- Total calculation display and empty cart state with CTA

#### Phase 2C: Product Details Page (15 min)
- Dynamic route `/product/[id]` with product data fetching
- Large product image, full description, and pricing
- Add to cart functionality with quantity selector
- Breadcrumb navigation back to home

### **QUALITY ASSURANCE (45 minutes total)**

#### Phase 3A: Testing Suite (20 min)
- CartContext reducer unit tests with all action types
- ProductCard component tests including user interactions
- Custom hooks testing (useProducts, usePagination, useLocalStorage)
- API integration tests with MSW mocking

#### Phase 3B: UX Enhancements (15 min)
- Toast notifications for cart actions (add, remove, clear)
- Enhanced loading states with skeleton components
- Mobile-first responsive design refinements
- Accessibility improvements (ARIA labels, keyboard navigation)

#### Phase 3C: Performance & Documentation (10 min)
- Next.js Image component optimization for product images
- React.memo for expensive components
- README.md with setup, development, and testing instructions
- Code documentation and final ESLint/TypeScript compliance

## 10. Deployment (Optional)
- Use Vercel for seamless Next.js deployment
