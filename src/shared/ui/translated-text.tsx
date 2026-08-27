'use client';

import { useLocale } from './locale-provider';

/**
 * @deprecated Use the typed `Message` component or `useLocale().t()` with a
 * message key from `shared/i18n/messages` for all new interface copy.
 */
export function TranslatedText({ en, vi }: { en: string; vi: string }) {
  const { locale } = useLocale();
  return <>{locale === 'vi' ? vi : en}</>;
}
