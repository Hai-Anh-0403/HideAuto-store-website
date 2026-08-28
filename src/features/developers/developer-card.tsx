'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, Send, Star } from 'lucide-react';
import type { Developer } from '@/data/developers';
import { useLocale } from '@/shared/ui/locale-provider';

export function DeveloperCard({ developer }: { developer: Developer }) {
  const { locale, t } = useLocale();
  const isVi = locale === 'vi';

  return (
    <article>
      <Image
        src={developer.avatar}
        alt={`${developer.name} seller profile`}
        width={100}
        height={100}
      />
      <div>
        <h2>
          <Link href={`/developers/${developer.slug}`}>{developer.name}</Link>
          {developer.verified && (
            <span className="developer-verified">
              <span aria-hidden="true">✓</span>
              <span className="sr-only">{t('common.verifiedSeller')}</span>
            </span>
          )}
        </h2>
        <p className="developer-stats">
          <Star size={14} fill="currentColor" /> {developer.rating} (
          {developer.reviewCount}) · {t('seller.products')}:{' '}
          {developer.products} · {t('seller.views')}:{' '}
          {developer.views.toLocaleString('en-US')} ·{' '}
          {t('seller.orders')}: {developer.orders}
        </p>
        <p>{isVi ? developer.headlineVi : developer.headline}</p>
        <p>
          <small>
            {t('common.joined', { date: developer.joined })}
          </small>
        </p>
        <p className="developer-contact">
          <Mail size={15} /> {developer.email} <Phone size={15} />{' '}
          {developer.phone}
        </p>
      </div>
      <a
        className="primary developer-contact-button"
        href={`mailto:${developer.email}`}
      >
        <Send size={16} /> {t('seller.contact')}
      </a>
    </article>
  );
}
