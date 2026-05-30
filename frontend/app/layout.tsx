import "./globals.css";
import { Manrope } from 'next/font/google';
import NavigationBar from '@/components/dashboard/NavigationBar';
import { AuthWrapper } from '@/components/AuthWrapper';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans">
        <AuthWrapper>
          <NavigationBar />
          <main className="px-8 py-6">
            {children}
          </main>
        </AuthWrapper>
      </body>
    </html>
  );
}
