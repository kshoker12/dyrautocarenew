'use client';

import { forwardRef } from 'react';

const TextInput = forwardRef(({ type = 'text', className = '', ...props }, ref) => (
  <input
    className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`}
    type={type}
    ref={ref}
    {...props}
  />
));

TextInput.displayName = 'TextInput';
export default TextInput;
