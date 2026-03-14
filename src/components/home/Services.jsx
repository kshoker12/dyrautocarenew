'use client';

import { useMemo } from 'react';
import ServiceCard from './ServiceCard';
import { extractCategories } from '@/lib/helpers';

export default function Services() {
  const categories = useMemo(() => extractCategories(), []);

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1 bg-blue-gray-50 py-4 px-4">
      {categories.map((category) => (
        <ServiceCard key={category.id} cardData={category} className="" />
      ))}
    </div>
  );
}
