import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

const ogImageUrl = process.env.NEXT_PUBLIC_OG_IMAGE || 'https://bolt.new/static/og_default.png';

export const metadata: Metadata = {
  title: 'TradeBoard - Find Local Tradespeople Fast',
  description: 'Post your home service needs and let qualified tradespeople in your area find you.',
  openGraph: {
    images: [
      {
        url: ogImageUrl,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: ogImageUrl,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <footer className="border-t bg-white py-8">
          <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-400 sm:px-6">
            TradeBoard &mdash; Connecting homeowners with local tradespeople.
          </div>
        </footer>
      </body>
    </html>
  );
}
