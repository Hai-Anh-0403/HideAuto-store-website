'use client';

import Link from 'next/link';
import { StoreHeader } from '@/shared/ui/store-header';
import { StoreFooter } from '@/shared/ui/store-footer';
import { useLocale } from '@/shared/ui/locale-provider';

export default function NotFound() {
  const { t } = useLocale();

  return (
    <>
      <StoreHeader />
      <main className="shell section system-page">
        <p className="label">{t('system.notFoundLabel')}</p>
        <h1>{t('system.notFoundTitle')}</h1>
        <p className="lead">{t('system.notFoundLead')}</p>
        <div className="actions">
          <Link className="primary" href="/scripts">
            {t('common.browseScripts')}
          </Link>
          <Link className="secondary" href="/">
            {t('common.returnHome')}
          </Link>
        </div>
      </main>
      <StoreFooter />
    </>
  );
}
