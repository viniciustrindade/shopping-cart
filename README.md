# React Shopping Cart - Next.js Implementation

A fully functional shopping cart application built with React, Next.js, and TypeScript, featuring product browsing, cart management, and responsive design.

## 🚀 Features

- **Product Catalog**: Browse products from Fake Store API with search and pagination
- **Shopping Cart**: Add, remove, and manage product quantities
- **Product Details**: Detailed view for individual products
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: React Context API with localStorage persistence
- **Search Functionality**: Real-time product filtering
- **Toast Notifications**: User feedback for cart actions
- **Unit Testing**: Comprehensive test coverage with Jest and React Testing Library

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.6
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API + useReducer
- **API**: Fake Store API
- **Testing**: Jest + React Testing Library + MSW
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with CartProvider
│   ├── page.tsx                # Home page (product list)
│   ├── cart/page.tsx           # Shopping cart page
│   └── product/[id]/page.tsx   # Product details page
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── layout/                 # Layout components
│   └── features/               # Feature-specific components
├── context/
│   └── CartContext.tsx         # Global cart state
├── hooks/
│   ├── useProducts.tsx         # Product fetching logic
│   ├── usePagination.tsx       # Pagination logic
│   └── useLocalStorage.tsx     # Persistence logic
├── lib/
│   ├── api.ts                  # API utilities
│   ├── types.ts                # TypeScript interfaces
│   └── utils.ts                # Helper functions
└── __tests__/                  # Unit tests
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd app
```

2. **Install dependencies**
```bash
# Install production dependencies
npm install clsx tailwind-merge react-hot-toast

# Install development dependencies
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event msw
```

3. **Set up testing configuration**
```bash
# Create Jest configuration files (see docs/technical.md for content)
touch jest.config.js jest.setup.js
```

4. **Start development server**
```bash
npm run dev
```

5. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📱 Pages Overview

### Home Page (`/`)
- Product grid with responsive layout
- Search bar for filtering products
- "See More" pagination (loads 3 products at a time)
- Add to cart functionality

### Shopping Cart (`/cart`)
- List of cart items with quantities
- Total price calculation
- Remove items functionality
- Continue shopping navigation

### Product Details (`/product/[id]`)
- Detailed product information
- Large product image
- Add to cart with quantity selection
- Breadcrumb navigation

## 🎨 Design Decisions

### State Management
- **React Context + useReducer**: Chosen for predictable state updates and built-in React support
- **localStorage Persistence**: Cart state persists across browser sessions
- **Action-based Updates**: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART

### Performance Optimizations
- **React.memo**: Prevents unnecessary re-renders of ProductCard components
- **Debounced Search**: 300ms delay to reduce API calls
- **Image Optimization**: Next.js Image component for automatic optimization
- **Client-side Caching**: Products cached during session

### UX Enhancements
- **Toast Notifications**: Immediate feedback for user actions
- **Loading States**: Skeleton components during data fetching
- **Error Handling**: Graceful fallbacks for API failures
- **Responsive Design**: Mobile-first approach with breakpoints

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

### Code Quality
- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Next.js recommended configuration
- **Tailwind CSS**: Consistent styling with utility classes
- **Testing**: Unit tests for critical components and hooks

## 📊 Implementation Timeline

- **Phase 1**: Foundation Setup (15 min)
- **Phase 2**: Core State Management (20 min)  
- **Phase 3**: Essential Components (25 min)
- **Phase 4**: Pages Implementation (50 min)
- **Phase 5**: Testing Suite (20 min)
- **Phase 6**: UX Polish & Documentation (15 min)

**Total Estimated Time**: ~2.5 hours

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Manual Build
```bash
npm run build
npm start
```

## 📋 TODO / Future Enhancements

- [ ] User authentication and profiles
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Order history
- [ ] Payment integration
- [ ] Advanced filtering (price range, category)
- [ ] Virtual scrolling for large product lists
- [ ] PWA capabilities

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for product data
- [Next.js](https://nextjs.org/) team for the excellent framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [React Testing Library](https://testing-library.com/) for testing utilities
