'use client';

import { DeveloperDirectory } from '@/features/developers/developer-directory';
import { StoreHeader } from '@/shared/ui/store-header';
import { StoreFooter } from '@/shared/ui/store-footer';
import { useLocale } from '@/shared/ui/locale-provider';

export default function DevelopersPage() {
  const { t } = useLocale();

  return (
    <>
      <StoreHeader />
      <main className="shell section developer-directory-page">
        <p className="label">{t('sellers.directoryLabel')}</p>
        <div className="heading">
          <div>
            <h1>{t('sellers.directoryTitle')}</h1>
            <p className="catalog-intro">{t('sellers.directoryLead')}</p>
          </div>
        </div>
        <DeveloperDirectory />
      </main>
      <StoreFooter />
    </>
  );
}
