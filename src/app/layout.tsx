import { Outfit } from 'next/font/google';
import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { QueryProvider } from '@/components/QueryProvider';
import { YearProvider } from '@/context/YearContext';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>
            <YearProvider>
              <QueryProvider>
                {children}
              </QueryProvider>
            </YearProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
