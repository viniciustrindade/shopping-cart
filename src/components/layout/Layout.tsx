'use client';

import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export function Layout({ children, onSearch, searchQuery }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={onSearch} searchQuery={searchQuery} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
