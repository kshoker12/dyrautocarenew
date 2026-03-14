import './globals.css';
import Script from 'next/script';
import ThemeWrapper from '@/components/ThemeWrapper';
import Providers from '@/components/Providers';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'boxicons/css/boxicons.min.css';

export const metadata = {
  title: 'DYR Autocare - Detail Your Ride',
  description: 'Professional auto detailing and ceramic coating services',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="https://fonts.bunny.net/css?family=open-sans:400,600,700|raleway:400,600,700|poppins:400,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased max-h-[98.5vh]">
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-11537417190" strategy="afterInteractive" />
        <Script id="gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-11537417190');`}
        </Script>
        <Providers>
          <ThemeWrapper>{children}</ThemeWrapper>
        </Providers>
      </body>
    </html>
  );
}
