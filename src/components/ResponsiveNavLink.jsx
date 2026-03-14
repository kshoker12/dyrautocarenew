'use client';

import Link from 'next/link';

export default function ResponsiveNavLink({ active = false, className = '', children, href, ...props }) {
  return (
    <Link
      href={href}
      className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
        active
          ? 'border-primary-orange text-primary-orange bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700'
          : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 w-full transition-underline '
      } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
