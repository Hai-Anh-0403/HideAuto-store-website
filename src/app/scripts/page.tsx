'use client';

import { Suspense } from 'react';
import { CatalogBrowser } from '@/features/catalog/catalog-browser';
import { StoreHeader } from '@/shared/ui/store-header';
import { StoreFooter } from '@/shared/ui/store-footer';
import { useLocale } from '@/shared/ui/locale-provider';

function CatalogHeader() {
  const { t } = useLocale();

  return (
    <>
      <p className="label">{t('catalog.label')}</p>
      <div className="heading">
        <div>
          <h1>{t('catalog.title')}</h1>
          <p className="catalog-intro">{t('catalog.intro')}</p>
        </div>
      </div>
    </>
  );
}

function CatalogLoading() {
  const { t } = useLocale();
  return <p className="label">{t('system.loadingCatalog')}</p>;
}

export default function ScriptsPage() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to main content
      </a>
      <StoreHeader />
      <main id="main" className="shell section catalog-page">
        <CatalogHeader />
        <Suspense fallback={<CatalogLoading />}>
          <CatalogBrowser />
        </Suspense>
      </main>
      <StoreFooter />
    </>
  );
}
