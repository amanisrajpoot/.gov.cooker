import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '.gov.cooker - Transparency & Accountability Platform',
  description: 'Make corruption and non-delivery visible, verifiable, and costly for officials—while protecting citizens and whistleblowers.',
  keywords: ['transparency', 'accountability', 'government', 'corruption', 'RTI', 'petitions'],
  authors: [{ name: '.gov.cooker Team' }],
  creator: '.gov.cooker',
  publisher: '.gov.cooker',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: '.gov.cooker - Transparency & Accountability Platform',
    description: 'Make corruption and non-delivery visible, verifiable, and costly for officials—while protecting citizens and whistleblowers.',
    url: '/',
    siteName: '.gov.cooker',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '.gov.cooker - Transparency & Accountability Platform',
    description: 'Make corruption and non-delivery visible, verifiable, and costly for officials—while protecting citizens and whistleblowers.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
