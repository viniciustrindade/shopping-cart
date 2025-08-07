'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const totalPrice = item.quantity * item.price;

  return (
    <div className="flex items-center py-4 border-b border-gray-200 last:border-b-0">
      {/* Quantity */}
      <div className="w-16 text-center">
        <div className="flex flex-col items-center space-y-1">
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-xs"
            aria-label="Increase quantity"
          >
            +
          </button>
          <span className="text-lg font-medium">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-xs"
            aria-label="Decrease quantity"
          >
            −
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex items-center space-x-4 px-6">
        <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain p-2"
            sizes="64px"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500">
            {formatPrice(item.price)} each
          </p>
        </div>
      </div>

      {/* Total Price */}
      <div className="w-24 text-right">
        <div className="text-lg font-semibold text-gray-900">
          {formatPrice(totalPrice)}
        </div>
      </div>

      {/* Remove Button */}
      <div className="w-16 text-center">
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 p-1"
          aria-label={`Remove ${item.title} from cart`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
