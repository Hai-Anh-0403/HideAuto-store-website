'use client';

import { useLocale } from './locale-provider';

export function TranslatedText({ en, vi }: { en: string; vi: string }) {
  const { locale } = useLocale();
  return <>{locale === 'vi' ? vi : en}</>;
}
