'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Star } from 'lucide-react';
import type { Developer } from '@/data/developers';
import type { CatalogScript } from '@/features/catalog/data';
import { ScriptListItem } from '@/features/catalog/script-list-item';
import { useLocale } from '@/shared/ui/locale-provider';
import { BackButton } from '@/shared/ui/back-button';

export function DeveloperDetailContent({
  developer,
  developerScripts,
}: {
  developer: Developer;
  developerScripts: CatalogScript[];
}) {
  const { locale, t } = useLocale();
  const isVi = locale === 'vi';

  return (
    <main className="shell section developer-page">
      <div className="back-button-wrapper">
        <BackButton fallbackHref="/developers" />
      </div>
      <p className="label">
        <Link href="/developers">{t('seller.sellersLabel')}</Link> /{' '}
        {developer.name.toUpperCase()}
      </p>
      <div className="developer-profile">
        <div className="developer-profile__header">
          <Image
            className="developer-profile__avatar"
            src={developer.avatar}
            alt={`${developer.name} seller profile`}
            width={128}
            height={128}
            priority
          />
          <div>
            <p className="label">{t('seller.featuredBadge')}</p>
            <h1>
              {developer.name}
              {developer.verified && (
                <span className="developer-verified">
                  <span aria-hidden="true">✓</span>
                  <span className="sr-only">{t('common.verifiedSeller')}</span>
                </span>
              )}
            </h1>
            <p className="lead">
              {isVi ? developer.headlineVi : developer.headline}
            </p>
            <div className="developer-profile__stats">
              <span>
                <Star size={15} fill="currentColor" /> {developer.rating} (
                {developer.reviewCount})
              </span>
              <span>
                <b>{developer.products}</b> {t('seller.products')}
              </span>
              <span>
                <b>{developer.views.toLocaleString('en-US')}</b>{' '}
                {t('seller.views')}
              </span>
              <span>
                <b>{developer.orders}</b> {t('seller.orders')}
              </span>
            </div>
            <p className="developer-profile__contact">
              <Mail size={15} /> {developer.email} <Phone size={15} />{' '}
              {developer.phone}
            </p>
          </div>
        </div>
        <p>{isVi ? developer.bioVi : developer.bio}</p>
        <div className="tags">
          {developer.specialties.map((specialty) => (
            <span key={specialty}>{specialty}</span>
          ))}
        </div>
      </div>
      <div className="heading">
        <div>
          <p className="label">{t('seller.releases')}</p>
          <h2>{t('seller.releasesTitle', { name: developer.name })}</h2>
        </div>
      </div>
      {developerScripts.length ? (
        <div className="catalog-list">
          {developerScripts.map((script) => (
            <ScriptListItem key={script.slug} script={script} />
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <h2>{t('seller.noReleasesTitle')}</h2>
          <p>{t('seller.noReleasesDesc')}</p>
          <Link className="secondary" href="/scripts">
            {t('common.browseScripts')}
          </Link>
        </div>
      )}
    </main>
  );
}
