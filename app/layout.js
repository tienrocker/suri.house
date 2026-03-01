import { Suspense } from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://suri.house'),
  title: {
    default: 'James Workspace — Free Online Developer Tools | Công cụ lập trình miễn phí',
    template: '%s',
  },
  description: 'James Workspace — Bộ 20+ công cụ lập trình miễn phí: Base64, URL Encode/Decode, JSON Formatter, Hash Generator, TOTP 2FA, UUID, Regex Tester. Chạy hoàn toàn trên trình duyệt.',
  keywords: ['developer tools', 'công cụ lập trình', 'base64', 'url encode', 'json formatter', 'hash generator', 'totp', 'uuid', 'regex tester'],
  authors: [{ name: 'James Tran', url: 'https://capquanghanoi.com' }],
  creator: 'James Tran',
  publisher: 'James Workspace',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://suri.house',
    siteName: 'James Workspace',
    title: 'James Workspace — Free Online Developer Tools',
    description: 'Bộ 20+ công cụ lập trình miễn phí chạy trên trình duyệt.',
  },
  alternates: { canonical: 'https://suri.house' },
  other: { 'contact:email': 'tienrocker@gmail.com' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var t=localStorage.getItem('jw-theme');
                if(!t)t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
                document.documentElement.setAttribute('data-theme',t);
              })();
            `,
          }}
        />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'James Workspace',
              url: 'https://suri.house',
              description: 'Bộ 20+ công cụ lập trình miễn phí chạy trên trình duyệt.',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Web',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'VND' },
              author: { '@type': 'Person', name: 'James Tran', email: 'tienrocker@gmail.com', url: 'https://capquanghanoi.com' },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <Suspense><Sidebar /></Suspense>
          <main className="main">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
