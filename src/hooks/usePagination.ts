'use client';

import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  initialItemsPerPage?: number;
}

interface UsePaginationReturn<T> {
  currentItems: T[];
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
  totalShown: number;
  totalItems: number;
}

export function usePagination<T>({
  items,
  initialItemsPerPage = 3,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [itemsToShow, setItemsToShow] = useState(initialItemsPerPage);

  // Get current items to display
  const currentItems = useMemo(() => {
    return items.slice(0, itemsToShow);
  }, [items, itemsToShow]);

  // Check if there are more items to load
  const hasMore = useMemo(() => {
    return itemsToShow < items.length;
  }, [itemsToShow, items.length]);

  // Load more items (increment by initialItemsPerPage)
  const loadMore = () => {
    setItemsToShow(prev => prev + initialItemsPerPage);
  };

  // Reset pagination to initial state
  const reset = () => {
    setItemsToShow(initialItemsPerPage);
  };

  // Reset when items change (e.g., when search results change)
  useMemo(() => {
    setItemsToShow(initialItemsPerPage);
  }, [items, initialItemsPerPage]);

  return {
    currentItems,
    hasMore,
    loadMore,
    reset,
    totalShown: currentItems.length,
    totalItems: items.length,
  };
}
