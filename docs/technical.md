# Technical Specification - React Shopping Cart

## 1. Project Setup
- **Framework**: Next.js (TypeScript preferred)
- **Package Manager**: npm or yarn
- **Code Style**: ESLint + Prettier
- **Styling**: Tailwind CSS (or alternative chosen)

---

## 2. APIs Used
- **Fake Store API**
  - Endpoint: `https://fakestoreapi.com/products`
  - Used for: Listing products, individual product details

---

## 3. Pages & Functionalities

### Home Page (`/`)
- Fetch initial 3 products
- Button: "See More" → paginated fetch or reveal more
- Product Card includes:
  - Title
  - Description
  - Price
  - "Add to Cart" button
- Search Bar:
  - Filters already-loaded products by title/description
- Header:
  - App logo
  - Search input
  - Cart badge (displays number of items)

### Shopping Cart Page (`/cart`)
- Lists cart items with:
  - Title
  - Quantity
  - Total (quantity × price)
- Button: "Continue Shopping" → returns to home

### Product Details Page (`/product/[id]`)
- Displays:
  - Image
  - Title
  - Description
  - Price
  - Add to Cart button

---

## 4. Global State Management
- Using React Context API
- Cart is managed globally
- Example:
```ts
interface CartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
}
```

---

## 5. Custom Hooks
- `usePagination`:
  - Handles slicing of product list
  - Exposes: current items, loadMore

---

## 6. Error Handling
- API failures show user-friendly message
- Retry logic can be implemented optionally

---

## 7. Testing
- Library: Jest + React Testing Library
- Tests to include:
  - ProductCard functionality
  - Cart state updates
  - Pagination behavior
  - Header badge updates

---

## 8. UX Improvements (Optional Bonus)
- Show toast on add to cart
- Cart persistence using localStorage
- Animated transitions

---

## 9. Accessibility
- Use ARIA labels where needed
- Keyboard navigable cart and product lists
- Responsive layout with media queries or Tailwind utilities

---

## 10. Dependencies & Setup

### Required Dependencies (UPDATED)
```json
{
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "next": "15.4.6",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "react-hot-toast": "^2.4.1"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.4.6",
    "@eslint/eslintrc": "^3",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "@testing-library/react": "^14.2.0",
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/user-event": "^14.5.0",
    "msw": "^2.1.0"
  }
}
```

### Installation Commands
```bash
# Install production dependencies
npm install clsx tailwind-merge react-hot-toast

# Install development dependencies
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event msw
```

### File Structure Implementation
```
src/
├── app/
│   ├── layout.tsx              # Root layout with CartProvider
│   ├── page.tsx                # Home page (product list)
│   ├── cart/page.tsx           # Shopping cart page
│   └── product/[id]/page.tsx   # Product details page
├── components/
│   ├── ui/                     # Reusable UI components
│   └── layout/                 # Layout components
├── context/
│   └── CartContext.tsx         # Global cart state
├── hooks/
│   ├── useProducts.tsx         # Product fetching
│   └── usePagination.tsx       # Pagination logic
├── lib/
│   ├── api.ts                  # API utilities
│   ├── types.ts                # TypeScript interfaces
│   └── utils.ts                # Helper functions
└── __tests__/                  # Unit tests
```

## 11. Tooling & Productivity
- Optionally use AI-assisted tools (e.g., GitHub Copilot, ChatGPT)
- Auto format with Prettier
- GitHub repository with README, commit history

## 12. Configuration Files Required

### Jest Configuration (`jest.config.js`)
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

### Jest Setup (`jest.setup.js`)
```javascript
import '@testing-library/jest-dom'
```

### MSW Setup (`src/mocks/handlers.ts`)
```typescript
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://fakestoreapi.com/products', () => {
    return HttpResponse.json([
      {
        id: 1,
        title: 'Test Product',
        price: 109.95,
        description: 'Test description',
        category: 'electronics',
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 3.9, count: 120 }
      }
    ])
  }),
]
```

## 13. Performance Considerations
- **Image Optimization**: Use Next.js Image component with proper sizing
- **Code Splitting**: Lazy load components when beneficial
- **Memoization**: React.memo for ProductCard, useMemo for expensive calculations
- **Debouncing**: Search input with 300ms delay
- **Caching**: Products cached in memory during session
