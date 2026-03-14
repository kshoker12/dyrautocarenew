'use client';

import { ThemeProvider } from '@material-tailwind/react';

export default function ThemeWrapper({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
