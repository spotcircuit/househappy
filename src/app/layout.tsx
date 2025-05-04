import './globals.css';
import type { Metadata } from 'next';
import GlassyNav from '@/components/navigation/glassy-nav';

export const metadata: Metadata = {
  title: 'HouseHappy AI Demos',
  description: 'Interactive demonstrations of AI capabilities for HouseHappy home services marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <GlassyNav />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}