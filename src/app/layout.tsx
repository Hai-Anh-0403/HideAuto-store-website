import type { Metadata } from 'next';
import './globals.css';
import { LocaleProvider } from '@/shared/ui/locale-provider';
import { BackToTop } from '@/shared/ui/back-to-top';

export const metadata: Metadata = {
  title: 'HideAuto — Script Marketplace',
  description: 'Versioned automation scripts with clear compatibility.',
  icons: { icon: '/images/icon.png', apple: '/images/icon.png' },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          {children}
          <BackToTop />
        </LocaleProvider>
      </body>
    </html>
  );
}
