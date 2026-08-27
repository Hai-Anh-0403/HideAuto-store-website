'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useSyncExternalStore,
} from 'react';

export const localeLabels = { en: 'English', vi: 'Tiếng Việt' } as const;
export type Locale = keyof typeof localeLabels;
const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
} | null>(null);

function getStoredLocale(): Locale {
  return window.localStorage.getItem('locale') === 'vi' ? 'vi' : 'en';
}

function getServerLocale(): Locale {
  return 'en';
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener('localechange', onStoreChange);
  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener('localechange', onStoreChange);
  };
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getStoredLocale,
    getServerLocale,
  );
  const setLocale = (next: Locale) => {
    window.localStorage.setItem('locale', next);
    document.documentElement.lang = next;
    window.dispatchEvent(new Event('localechange'));
  };
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within LocaleProvider');
  return context;
}
