'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  formatMessage,
  type MessageValues,
} from '@/shared/i18n/format-message';
import { messages, type MessageKey } from '@/shared/i18n/messages';

export const localeLabels = { en: 'English', vi: 'Tiếng Việt' } as const;
export type Locale = keyof typeof localeLabels;
const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey, values?: MessageValues) => string;
} | null>(null);

function getStoredLocale(): Locale {
  return window.localStorage.getItem('locale') === 'vi' ? 'vi' : 'en';
}

function persistLocale(locale: Locale) {
  window.localStorage.setItem('locale', locale);
  document.cookie = `locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setCurrentLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const syncLocale = () => {
      const storedLocale = getStoredLocale();
      persistLocale(storedLocale);
      setCurrentLocale(storedLocale);
    };
    syncLocale();
    window.addEventListener('storage', syncLocale);
    window.addEventListener('localechange', syncLocale);

    return () => {
      window.removeEventListener('storage', syncLocale);
      window.removeEventListener('localechange', syncLocale);
    };
  }, []);

  const setLocale = (next: Locale) => {
    persistLocale(next);
    setCurrentLocale(next);
    document.documentElement.lang = next;
    window.dispatchEvent(new Event('localechange'));
  };
  const t = (key: MessageKey, values?: MessageValues) => {
    const localized = messages[locale][key] ?? messages.en[key];
    if (process.env.NODE_ENV !== 'production' && !messages[locale][key]) {
      console.warn(`Missing ${locale} translation for "${key}".`);
    }
    return formatMessage(localized, values);
  };
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}
export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within LocaleProvider');
  return context;
}
