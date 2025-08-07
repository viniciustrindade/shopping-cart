'use client';

import React from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { CartItem } from '@/components/features/CartItem';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { state, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <div className="mb-8">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/">
              <Button size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="cart-title">Your Cart</h1>
          <p className="text-gray-600">
            {state.totalItems} {state.totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            {/* Table Header */}
            <div className="hidden md:flex items-center py-4 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
              <div className="w-16 text-center">Qty</div>
              <div className="flex-1 px-6">Product</div>
              <div className="w-24 text-right">Total</div>
              <div className="w-16"></div>
            </div>

            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
              {state.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Order Summary
              </h3>
              <p className="text-gray-600">
                {state.totalItems} {state.totalItems === 1 ? 'item' : 'items'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900" data-testid="total-price">
                {formatPrice(state.totalPrice)}
              </div>
              <p className="text-sm text-gray-500">Total</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
          
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Clear Cart
            </Button>
            <Button size="lg" className="px-8">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
