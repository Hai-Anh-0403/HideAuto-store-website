'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import type { Developer } from '@/data/developers';
import { useLocale } from '@/shared/ui/locale-provider';

export function SellerSummaryCard({ seller }: { seller: Developer }) {
  const { locale, t } = useLocale();

  return (
    <article className="seller-summary-card">
      <Image
        src={seller.avatar}
        alt={`${seller.name} seller profile`}
        width={88}
        height={88}
      />
      <div className="seller-summary-card__content">
        <p className="seller-summary-card__rating">
          <Star size={13} fill="currentColor" /> {seller.rating} (
          {seller.reviewCount})
        </p>
        <h3>
          <Link href={`/developers/${seller.slug}`}>{seller.name}</Link>
          {seller.verified && (
            <span className="seller-verified">
              <span aria-hidden="true">✓</span>
              <span className="sr-only">{t('common.verifiedSeller')}</span>
            </span>
          )}
        </h3>
        <p>{locale === 'vi' ? seller.headlineVi : seller.headline}</p>
        <div className="seller-summary-card__stats">
          <span>
            <b>{seller.products}</b> {t('seller.products')}
          </span>
          <span>
            <b>{seller.views.toLocaleString('en-US')}</b> {t('seller.views')}
          </span>
        </div>
        <Link
          className="seller-summary-card__link"
          href={`/developers/${seller.slug}`}
        >
          {t('seller.viewProfile')} <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
