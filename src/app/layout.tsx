import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Flexible Form',
  description: 'A flexible form builder application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
