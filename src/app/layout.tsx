import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FF5E00',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'ICEEFRUIT — Systems Architecture, Audio DSP & 3D WebGL',
  description:
    'Engineering monograph and interactive laboratory of Iceefruit. Serverless cartography, quantized ONNX inference gateways, quantitative execution engines, and live Web Audio synthesis.',
  keywords: [
    'Iceefruit',
    'Systems Architect',
    'Creative Developer',
    'WebGL',
    'Three.js',
    'Web Audio DSP',
    'FastAPI',
    'Next.js',
  ],
  authors: [{ name: 'Iceefruit' }],
  openGraph: {
    title: 'ICEEFRUIT — Engineering Monograph & Interactive Lab',
    description: 'Interactive 3D WebGL, Dual-Deck Audio DSP Station & Deep-Dive Engineering Case Studies.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${spaceGrotesk.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-icee-dark text-icee-text-bright antialiased selection:bg-icee-orange selection:text-icee-dark min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
