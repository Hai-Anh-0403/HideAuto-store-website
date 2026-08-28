'use client';

import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { AdSlot } from '@/features/advertising/ad-slot';
import { scripts } from '@/features/catalog/data';
import { ScriptListItem } from '@/features/catalog/script-list-item';
import { developers } from '@/features/developers/data';
import { SellerSummaryCard } from '@/features/developers/seller-summary-card';
import { StoreHeader } from '@/shared/ui/store-header';
import { StoreFooter } from '@/shared/ui/store-footer';
import { useLocale } from '@/shared/ui/locale-provider';
import type { MessageKey } from '@/shared/i18n/messages';

const rails = [
  {
    label: '02',
    titleKey: 'catalog.topViews' as const,
    sort: 'views',
    items: [...scripts].sort((a, b) => b.views - a.views).slice(0, 6),
  },
  {
    label: '03',
    titleKey: 'catalog.newest' as const,
    sort: 'newest',
    items: [...scripts]
      .sort((a, b) => b.updated.localeCompare(a.updated))
      .slice(0, 6),
  },
  {
    label: '04',
    titleKey: 'catalog.mostWatched' as const,
    sort: 'watched',
    items: [...scripts].sort((a, b) => b.watches - a.watches).slice(0, 6),
  },
  {
    label: '05',
    titleKey: 'catalog.recentlyUpdated' as const,
    sort: 'updated',
    items: [...scripts]
      .sort((a, b) => b.updated.localeCompare(a.updated))
      .slice(0, 6),
  },
];

const deliverySteps = [
  {
    num: '01',
    titleKey: 'home.deliveryStep1Title' as const,
    descKey: 'home.deliveryStep1Desc' as const,
  },
  {
    num: '02',
    titleKey: 'home.deliveryStep2Title' as const,
    descKey: 'home.deliveryStep2Desc' as const,
  },
  {
    num: '03',
    titleKey: 'home.deliveryStep3Title' as const,
    descKey: 'home.deliveryStep3Desc' as const,
  },
];

function ScriptRail({
  label,
  titleKey,
  sort,
  items,
}: {
  label: string;
  titleKey: MessageKey;
  sort: string;
  items: typeof scripts;
}) {
  const { t } = useLocale();

  return (
    <section className="shell section script-rail">
      <div className="heading">
        <div>
          <p className="label">
            {label} / {t('home.discoverScripts')}
          </p>
          <h2>{t(titleKey)}</h2>
        </div>
        <Link href={`/scripts?sort=${sort}`}>
          {t('common.viewAll')} <ArrowRight size={15} />
        </Link>
      </div>
      <div className="script-list-grid">
        {items.map((script) => (
          <ScriptListItem key={script.slug} script={script} />
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  const { t } = useLocale();

  return (
    <>
      <a className="skip" href="#main">
        Skip to main content
      </a>
      <StoreHeader />
      <main id="main">
        <section className="shell hero">
          <p className="label">
            01 / {t('home.scriptMarketplace')}
          </p>
          <div className="hero-grid frame">
            <div>
              <p className="label">{t('home.automationDirectContact')}</p>
              <h1>
                {t('home.heroLineOne')}
                <br />
                {t('home.heroLineTwo')}{' '}
                <em>{t('home.heroEmphasis')}</em>
              </h1>
              <p className="lead">{t('home.heroLead')}</p>
              <div className="actions">
                <Link className="primary" href="/scripts">
                  {t('common.browseScripts')} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="hero-featured">
              <p className="label">{t('home.featuredScripts')}</p>
              {scripts.slice(0, 4).map((script, index) => (
                <ScriptListItem
                  key={script.slug}
                  script={script}
                  priority={index < 2}
                />
              ))}
            </div>
          </div>
        </section>
        <ScriptRail {...rails[0]} />
        <div className="shell">
          <AdSlot slotId="home-after-top-views" />
        </div>
        <ScriptRail {...rails[1]} />
        <div className="shell">
          <AdSlot slotId="home-between-rails" />
        </div>
        <ScriptRail {...rails[2]} />
        <ScriptRail {...rails[3]} />
        <section className="shell section script-rail" id="hideauto-scripts">
          <div className="heading">
            <div>
              <p className="label">
                06 / {t('home.hideAutoScripts')}
              </p>
              <h2>{t('home.hideAutoScriptsTitle')}</h2>
            </div>
            <Link href="/scripts">
              {t('home.viewAllHideAutoScripts')} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="script-list-grid">
            {scripts.slice(0, 6).map((script) => (
              <ScriptListItem key={script.slug} script={script} />
            ))}
          </div>
        </section>
        <section className="shell section" id="developers">
          <div className="heading">
            <div>
              <p className="label">
                07 / {t('home.community')}
              </p>
              <h2>{t('home.featuredSellersTitle')}</h2>
            </div>
            <Link href="/developers">
              {t('seller.viewAll')} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="seller-summary-grid">
            {developers.slice(0, 3).map((seller) => (
              <SellerSummaryCard key={seller.slug} seller={seller} />
            ))}
          </div>
        </section>
        <section className="shell delivery" id="docs">
          <div>
            <p className="label">
              08 / {t('home.clearDelivery')}
            </p>
            <h2>{t('home.afterContactTitle')}</h2>
          </div>
          <ol>
            {deliverySteps.map(({ num, titleKey, descKey }) => (
              <li key={num}>
                <span>{num}</span>
                <div>
                  <h3>{t(titleKey)}</h3>
                  <p>{t(descKey)}</p>
                </div>
                <Check size={17} />
              </li>
            ))}
          </ol>
        </section>
        <div className="shell footer-ad">
          <AdSlot slotId="home-footer" />
        </div>
      </main>
      <StoreFooter />
    </>
  );
}
