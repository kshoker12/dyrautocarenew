'use client';

import Image from 'next/image';

export default function ApplicationLogo({ className = '', ...props }) {
  return (
    <Image
      src="/images/dyr2.png"
      alt="DYR Autocare"
      width={144}
      height={48}
      className={className}
      {...props}
    />
  );
}
