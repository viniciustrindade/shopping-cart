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

export function ProductDetailsClient() {
  const params = useParams();
  const router = useRouter();
  const { addItem, addMultipleItems, getItemQuantity } = useCart();
  
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

    if (quantity === 1) {
      addItem(product);
    } else {
      addMultipleItems(product, quantity);
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
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Product Not Found
            </h1>
            <p className="text-gray-600 mb-8" data-testid="error-message">
              {error || 'The product you are looking for does not exist.'}
            </p>
            <div className="space-y-4">
              <Button 
                onClick={() => router.back()} 
                variant="outline"
                data-testid="go-back-button"
              >
                Go Back
              </Button>
              <Link href="/">
                <Button data-testid="browse-products-button">
                  Browse Products
                </Button>
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
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" data-testid="breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-purple-600" data-testid="breadcrumb-home">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2" data-testid="breadcrumb-separator-1">/</span>
            </li>
            <li>
              <span className="capitalize hover:text-purple-600" data-testid="breadcrumb-category">
                {product.category}
              </span>
            </li>
            <li>
              <span className="mx-2" data-testid="breadcrumb-separator-2">/</span>
            </li>
            <li className="text-gray-900 truncate max-w-xs" data-testid="breadcrumb-product">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border border-gray-200 p-8">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-full object-contain"
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
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border-2 border-gray-600 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="px-3 py-2 bg-white text-gray-800 hover:bg-gray-100 hover:border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    data-testid="decrease-quantity"
                  >
                    −
                  </button>
                  <span 
                    className="px-4 py-2 bg-white font-bold text-gray-900 min-w-[3rem] text-center"
                    data-testid="quantity-display"
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10}
                    className="px-3 py-2 bg-white text-gray-800 hover:bg-gray-100 hover:border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    data-testid="increase-quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Cart Status */}
              {currentQuantityInCart > 0 && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
                  <span className="text-sm font-medium text-purple-700">
                    {currentQuantityInCart} already in cart
                  </span>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full"
                data-testid="add-to-cart-button"
              >
                Add to Cart
                {quantity > 1 && (
                  <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
                    {quantity}
                  </span>
                )}
              </Button>
              
              <Link href="/cart">
                <Button variant="outline" size="lg" className="w-full">
                  View Cart ({currentQuantityInCart})
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 space-y-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Free shipping</span>
                <span>On orders over $50</span>
              </div>
              <div className="flex justify-between">
                <span>Returns</span>
                <span>30 days return policy</span>
              </div>
              <div className="flex justify-between">
                <span>Support</span>
                <span>24/7 customer service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
