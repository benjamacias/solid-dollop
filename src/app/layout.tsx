import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Benjamín Macías · Fractional CTO',
  description:
    'Consultoría técnica, delivery end-to-end y mentoría para lanzar productos de software sin fricción.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
