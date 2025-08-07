'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';
import { fetchProduct } from '@/lib/api';
import { formatPrice } from '@/lib/utils';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, getItemQuantity } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const productId = parseInt(params.id as string);
  const currentQuantityInCart = getItemQuantity(productId);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId || isNaN(productId)) {
        setError('Invalid product ID');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetchProduct(productId);
        
        if (response.error) {
          setError(response.error);
        } else if (response.data) {
          setProduct(response.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-red-600 text-lg font-semibold mb-4" data-testid="error-message">
              {error || 'Product not found'}
            </div>
            <div className="flex gap-4">
              <Button onClick={() => router.back()} variant="outline" data-testid="go-back-button">
                Go Back
              </Button>
              <Link href="/">
                <Button data-testid="browse-products-button">Browse Products</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8" data-testid="breadcrumb">
          <Link href="/" className="hover:text-purple-600" data-testid="breadcrumb-home">
            Home
          </Link>
          <span data-testid="breadcrumb-separator-1">/</span>
          <span className="text-gray-900 capitalize" data-testid="breadcrumb-category">{product.category}</span>
          <span data-testid="breadcrumb-separator-2">/</span>
          <span className="text-gray-900 truncate max-w-xs" data-testid="breadcrumb-product">
            {product.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                data-testid="product-image"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div>
              <Badge variant="purple" className="capitalize" data-testid="category-badge">
                {product.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4" data-testid="product-rating">
              <div className="flex items-center">
                <div data-testid="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating.rate)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  <span data-testid="rating-number">{product.rating.rate}</span> (<span data-testid="review-count">{product.rating.count} reviews</span>)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900" data-testid="product-price">
              {formatPrice(product.price)}
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed" data-testid="product-description">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4" data-testid="quantity-selector">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-900">
                  Quantity:
                </label>
                <div className="flex items-center border-2 border-gray-600 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-100 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                    data-testid="decrease-quantity"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 border-x-2 border-gray-600 min-w-[60px] text-center font-bold text-gray-900" data-testid="quantity-display">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 py-2 text-gray-800 hover:text-black hover:bg-gray-100 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity >= 10}
                    data-testid="increase-quantity"
                  >
                    +
                  </button>
                </div>
                {currentQuantityInCart > 0 && (
                  <span className="text-sm text-gray-500">
                    ({currentQuantityInCart} in cart)
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 max-w-xs"
                >
                  Add to Cart
                </Button>
                <Link href="/cart">
                  <Button variant="outline" size="lg">
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Category:</span>
                  <span className="ml-2 text-gray-600 capitalize">{product.category}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Product ID:</span>
                  <span className="ml-2 text-gray-600">#{product.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
