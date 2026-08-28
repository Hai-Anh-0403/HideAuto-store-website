'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useLocale } from './locale-provider';

export function BackButton({
  fallbackHref = '/',
  className = '',
  label,
}: {
  fallbackHref?: string;
  className?: string;
  label?: string;
}) {
  const router = useRouter();
  const { t } = useLocale();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      className={`back-button ${className}`.trim()}
      onClick={handleBack}
      aria-label={label || t('common.back')}
    >
      <ArrowLeft size={15} />
      <span>{label || t('common.back')}</span>
    </button>
  );
}
