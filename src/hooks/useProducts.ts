'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { fetchProducts, filterProducts } from '@/lib/api';

interface UseProductsState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

interface UseProductsReturn extends UseProductsState {
  setSearchQuery: (query: string) => void;
  refetch: () => Promise<void>;
}

export function useProducts(): UseProductsReturn {
  const [state, setState] = useState<UseProductsState>({
    products: [],
    filteredProducts: [],
    loading: true,
    error: null,
    searchQuery: '',
  });

  // Fetch products from API
  const fetchProductsData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetchProducts();
      
      if (response.error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: response.error || 'Failed to fetch products',
        }));
        return;
      }

      const products = response.data || [];
      setState(prev => ({
        ...prev,
        products,
        filteredProducts: products,
        loading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'An unexpected error occurred',
      }));
    }
  };

  // Filter products based on search query
  const setSearchQuery = (query: string) => {
    setState(prev => {
      const filteredProducts = query.trim()
        ? filterProducts(prev.products, query)
        : prev.products;

      return {
        ...prev,
        searchQuery: query,
        filteredProducts,
      };
    });
  };

  // Refetch products
  const refetch = async () => {
    await fetchProductsData();
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProductsData();
  }, []);

  return {
    ...state,
    setSearchQuery,
    refetch,
  };
}
