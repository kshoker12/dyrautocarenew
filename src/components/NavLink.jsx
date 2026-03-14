'use client';

import Link from 'next/link';

export default function NavLink({ active = false, className = '', children, href, ...props }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-1 pr-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${
        active ? 'border-b-[3px] border-primary-gold text-white focus:border-primary-gold hover:text-white' : 'transition-underline border-transparent text-gray-400 hover:text-gray-100 focus:text-gray-100'
      }`}
      {...props}
    >
      {children}
    </Link>
  );
}
