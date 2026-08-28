import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import { LocaleProvider } from '@/shared/ui/locale-provider';
import { BackToTop } from '@/shared/ui/back-to-top';

export const metadata: Metadata = {
  title: 'HideAuto — Script Marketplace',
  description: 'Versioned automation scripts with clear compatibility.',
  icons: { icon: '/images/icon.png', apple: '/images/icon.png' },
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const cookieStore = await cookies();
  const initialLocale = cookieStore.get('locale')?.value === 'vi' ? 'vi' : 'en';

  return (
    <html lang={initialLocale}>
      <body>
        <LocaleProvider initialLocale={initialLocale}>
          {children}
          <BackToTop />
        </LocaleProvider>
      </body>
    </html>
  );
}
