'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { formatPriceBadge, truncateText } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, getItemQuantity } = useCart();
  const quantityInCart = getItemQuantity(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group relative overflow-hidden transition-shadow hover:shadow-lg cursor-pointer" data-testid="product-card">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain transition-transform group-hover:scale-105 p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`absolute top-4 left-4 w-8 h-8 rounded-md flex items-center justify-center transition-colors shadow-sm ${
              quantityInCart > 0
                ? 'bg-purple-600 text-white hover:bg-purple-700 border-2 border-purple-600'
                : 'bg-white border-2 border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
            aria-label={`Add ${product.title} to cart`}
          >
            {quantityInCart > 0 ? (
              <span className="text-xs font-bold">{quantityInCart}</span>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}
          </button>

          {/* Price Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge variant="purple" className="px-3 py-1 text-sm font-semibold" data-testid="price-badge">
              {formatPriceBadge(product.price)}
            </Badge>
          </div>
        </div>

        {/* Product Info */}
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {product.title}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">
            {truncateText(product.description, 120)}
          </p>

          {/* Rating and Cart Status */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="ml-1">{product.rating.rate}</span>
              </div>
              <span>({product.rating.count} reviews)</span>
            </div>
            
            {/* Cart Quantity Indicator */}
            {quantityInCart > 0 && (
              <div className="flex items-center gap-1 text-sm">
                <svg
                  className="w-4 h-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
                <span className="text-purple-600 font-medium">
                  {quantityInCart} in cart
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
