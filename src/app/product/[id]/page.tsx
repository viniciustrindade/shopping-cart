import { ProductDetailsClient } from './ProductDetailsClient';

export async function generateStaticParams() {
  // Generate static params for products 1-20 (Fake Store API has 20 products)
  return Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function ProductDetailsPage() {
  return <ProductDetailsClient />;
}