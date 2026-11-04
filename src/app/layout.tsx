import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#FF5E00',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Iceefruit | Cybernetic Portfolio & Audio Lab',
  description: 'Personal portfolio, interactive 3D WebGL core, dual-deck DJ mixer station, and GitHub vault for Iceefruit.',
  keywords: ['Iceefruit', 'Portfolio', 'Full Stack Developer', 'WebGL', 'Three.js', 'Audio Mixer', 'Next.js'],
  authors: [{ name: 'Iceefruit' }],
  openGraph: {
    title: 'Iceefruit | Portfolio',
    description: 'Interactive 3D WebGL, Dual-Deck DJ Station & OS Project Explorer for Iceefruit.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-icee-dark text-icee-text-bright antialiased selection:bg-icee-orange selection:text-icee-dark min-h-screen">
        {children}
      </body>
    </html>
  );
}
