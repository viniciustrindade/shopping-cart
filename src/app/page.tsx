'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductList } from '@/components/features/ProductList';
import { useProducts } from '@/hooks/useProducts';
import { usePagination } from '@/hooks/usePagination';

export default function Home() {
  const { products, filteredProducts, loading, error, setSearchQuery } = useProducts();
  const { currentItems, hasMore, loadMore } = usePagination({
    items: filteredProducts,
    initialItemsPerPage: 3,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-red-600 text-lg font-semibold mb-4">
            Error loading products
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout onSearch={handleSearch}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-gray-600">
            Discover amazing products at great prices
          </p>
        </div>

        {/* Products Section */}
        <ProductList
          products={currentItems}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />

        {/* Results Info */}
        {!loading && filteredProducts.length > 0 && (
          <div className="text-center text-sm text-gray-500">
            Showing {currentItems.length} of {filteredProducts.length} products
          </div>
        )}
      </div>
    </Layout>
  );
}
