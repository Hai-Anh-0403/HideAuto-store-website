'use client';

import Link from 'next/link';
import { ContactForm } from '@/features/support/components/contact-form';
import { scripts } from '@/features/catalog/data';
import { StoreHeader } from '@/shared/ui/store-header';
import { StoreFooter } from '@/shared/ui/store-footer';
import { useLocale } from '@/shared/ui/locale-provider';
import { useSearchParams } from 'next/navigation';
import { BackButton } from '@/shared/ui/back-button';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const script = searchParams.get('script');
  const selectedSlug = typeof script === 'string' ? script : undefined;
  const product =
    scripts.find((item) => item.slug === selectedSlug) ?? scripts[0];
  const { t } = useLocale();

  return (
    <>
      <StoreHeader />
      <main className="shell section">
        <div className="back-button-wrapper">
          <BackButton fallbackHref="/scripts" />
        </div>
        <p className="label">{t('contact.requestDetailsLabel')}</p>
        <div className="hero-grid">
          <ContactForm product={product} />
          <aside className="purchase">
            <p className="label">{t('contact.whatHappensNext')}</p>
            <h2>{t('contact.directAndClear')}</h2>
            <p>{t('contact.sellerReplyNotice')}</p>
            <small>{t('contact.privacyNote')}</small>
            <Link href="/scripts">{t('contact.returnToCatalog')}</Link>
          </aside>
        </div>
      </main>
      <StoreFooter />
    </>
  );
}
