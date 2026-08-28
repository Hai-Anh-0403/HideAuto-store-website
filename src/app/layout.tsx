import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import { LocaleProvider } from '@/shared/ui/locale-provider';
import { ThemeProvider, type Theme } from '@/shared/ui/theme-provider';
import { BackToTop } from '@/shared/ui/back-to-top';

export const metadata: Metadata = {
  title: 'HideAuto — Script Marketplace',
  description: 'Versioned automation scripts with clear compatibility.',
  icons: { icon: '/images/icon.png', apple: '/images/icon.png' },
};

const validThemes: Theme[] = ['light', 'dark'];

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const cookieStore = await cookies();
  const initialLocale = cookieStore.get('locale')?.value === 'vi' ? 'vi' : 'en';
  const themeCookie = cookieStore.get('theme')?.value as Theme | undefined;
  const initialTheme: Theme = themeCookie === 'dark' ? 'dark' : 'light';

  return (
    <html lang={initialLocale} data-theme={initialTheme}>
      <body>
        <ThemeProvider initialTheme={initialTheme}>
          <LocaleProvider initialLocale={initialLocale}>
            {children}
            <BackToTop />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

