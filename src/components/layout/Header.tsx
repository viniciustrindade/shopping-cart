'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/context/CartContext';
import { debounce } from '@/lib/utils';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export function Header({ onSearch, searchQuery = '' }: HeaderProps) {
  const { state } = useCart();
  const router = useRouter();

  // Debounced search handler
  const debouncedSearch = React.useMemo(
    () => debounce((query: string) => {
      if (onSearch) {
        onSearch(query);
      }
    }, 300),
    [onSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    debouncedSearch(query);
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            Shop
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <Input
              variant="search"
              type="text"
              placeholder="Buscar Productos ..."
              defaultValue={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>

          {/* Cart Icon with Badge */}
          <button
            onClick={handleCartClick}
            className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label={`Shopping cart with ${state.totalItems} items`}
          >
            {/* Shopping Cart Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>

            {/* Cart Badge */}
            {state.totalItems > 0 && (
              <Badge variant="cart">
                {state.totalItems}
              </Badge>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
