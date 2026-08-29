'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Check, MessageCircle } from 'lucide-react';
import { AdSlot } from '@/features/advertising/ad-slot';
import type { CatalogScript } from '@/features/catalog/data';
import { ScriptListItem } from '@/features/catalog/script-list-item';
import { platformsForScript } from '@/data/script-platforms';
import { developerSlug, type Developer } from '@/features/developers/data';
import { useLocale } from '@/shared/ui/locale-provider';
import { BackButton } from '@/shared/ui/back-button';

export function ScriptDetailContent({
  script,
  seller,
  relatedScripts,
}: {
  script: CatalogScript;
  seller?: Developer;
  relatedScripts: CatalogScript[];
}) {
  const { locale, t } = useLocale();
  const isVi = locale === 'vi';

  return (
    <main className="shell section py-8 md:py-12">
      <div className="back-button-wrapper mb-4">
        <BackButton fallbackHref="/scripts" />
      </div>
      <p className="label font-mono text-[10px] uppercase tracking-widest text-[var(--dim)] mb-4">
        <Link href="/scripts" className="hover:text-[var(--steel)]">{t('script.scriptsLabel')}</Link> /{' '}
        {script.name.toUpperCase()}
      </p>
      <div className="hero-grid grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <section className="min-w-0">
          <p className="label font-mono text-[10px] uppercase tracking-widest text-[var(--steel)] font-semibold mb-2">
            {script.status} / VERSION {script.version}
          </p>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl uppercase text-[var(--ink)] my-2 leading-tight">
            {script.name}
          </h1>
          <p className="lead text-base text-[var(--muted)] leading-relaxed my-3">{script.outcome}</p>
          <p className="label font-mono text-[10px] uppercase tracking-widest text-[var(--dim)] mb-4">
            {t('script.sellerLabel')}{' '}
            <Link href={`/developers/${developerSlug(script.seller)}`} className="text-[var(--steel)] hover:underline font-semibold">
              {script.seller.toUpperCase()}
            </Link>{' '}
            / {t('script.verifiedProfile')}
          </p>
          <figure className="detail-media relative h-[240px] sm:h-[360px] my-6 overflow-hidden bg-[var(--panel)] border border-[var(--line)]">
            <Image
              src={script.image}
              alt={`Preview for ${script.name}`}
              width={1200}
              height={675}
              priority
              sizes="(max-width: 760px) 100vw, (max-width: 1200px) 80vw, 800px"
              className="w-full h-full object-cover filter saturate-75 contrast-105"
            />
            <figcaption className="absolute right-0 bottom-0 px-3 py-1.5 bg-[var(--bg)]/90 text-[var(--steel)] font-mono text-[10px] tracking-wider uppercase border-t border-l border-[var(--line)]">
              {t('script.previewTitle')}
            </figcaption>
          </figure>
          <h2 className="font-heading font-bold text-2xl uppercase text-[var(--ink)] mt-6 mb-2">
            {t('script.builtForRepeatableTitle')}
          </h2>
          <p className="lead text-sm text-[var(--muted)] leading-relaxed my-3">
            {t('script.builtForRepeatableLead')}
          </p>
          <div className="tags flex flex-wrap gap-2 my-4">
            <span className="px-2.5 py-1 bg-[var(--panel)] border border-[var(--line)] font-mono text-[10px] text-[var(--ink)]">{script.runtime}</span>
            {platformsForScript(script.slug).map((platform) => (
              <span key={platform} className="px-2.5 py-1 bg-[var(--panel)] border border-[var(--line)] font-mono text-[10px] text-[var(--ink)]">{platform}</span>
            ))}
            <span className="px-2.5 py-1 bg-[var(--panel)] border border-[var(--line)] font-mono text-[10px] text-[var(--ink)]">{t('script.sourceExamples')}</span>
            <span className="px-2.5 py-1 bg-[var(--panel)] border border-[var(--line)] font-mono text-[10px] text-[var(--ink)]">{t('script.updatesPeriod')}</span>
          </div>
        </section>
        <aside className="purchase p-5 bg-[var(--panel)] border border-[var(--line)] h-fit">
          <p className="label font-mono text-[10px] uppercase tracking-widest text-[var(--dim)] mb-1">{t('common.startingPrice')}</p>
          <strong className="block font-heading font-bold text-4xl text-[var(--ink)] my-2">{script.price}</strong>
          <p className="text-xs text-[var(--muted)] my-3 leading-relaxed">{t('script.agreeTermsNotice')}</p>
          <button className="w-full my-2 p-2.5 border border-[var(--line)] bg-transparent text-left text-xs font-mono text-[var(--ink)] flex justify-between items-center hover:border-[var(--steel)] transition-colors">
            <span>{t('script.tierPersonal')}</span>{' '}
            <span className="text-[var(--dim)] text-[10px]">{t('script.activation1')}</span>
          </button>
          <button className="w-full my-2 p-2.5 border border-[var(--line)] bg-transparent text-left text-xs font-mono text-[var(--ink)] flex justify-between items-center hover:border-[var(--steel)] transition-colors">
            <span>{t('script.tierTeam')}</span>{' '}
            <span className="text-[var(--dim)] text-[10px]">{t('script.activation5')}</span>
          </button>
          <Link
            className="primary contact-link w-full mt-4 py-3 bg-[var(--steel)] text-[var(--bg)] font-heading font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            href={`/contact?script=${script.slug}`}
          >
            <MessageCircle size={16} /> {t('seller.contact')}
          </Link>
          <small className="flex items-center gap-1.5 text-xs text-[var(--dim)] mt-4">
            <Check size={14} className="text-[var(--steel)]" /> {t('script.typicalReply')}
          </small>
        </aside>
      </div>
      <section className="script-detail-info grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-8 my-10 py-8 border-y border-[var(--line)]">
        <div>
          <p className="label font-mono text-[10px] uppercase tracking-widest text-[var(--dim)] mb-1">{t('script.productDetailsLabel')}</p>
          <h2 className="font-heading font-bold text-3xl uppercase text-[var(--ink)] my-2">{t('script.clearReqTitle')}</h2>
          <p className="lead text-sm text-[var(--muted)] leading-relaxed m-0">{t('script.clearReqLead')}</p>
        </div>
        <dl className="script-detail-facts grid grid-cols-1 sm:grid-cols-2 border-t border-l border-[var(--line)] m-0">
          <div className="p-4 border-r border-b border-[var(--line)]">
            <dt className="font-mono text-[9px] uppercase tracking-widest text-[var(--dim)]">{t('script.versionLabel')}</dt>
            <dd className="font-heading font-semibold text-lg uppercase text-[var(--ink)] mt-1 m-0">{script.version}</dd>
          </div>
          <div className="p-4 border-r border-b border-[var(--line)]">
            <dt className="font-mono text-[9px] uppercase tracking-widest text-[var(--dim)]">{t('script.lastUpdatedLabel')}</dt>
            <dd className="font-heading font-semibold text-lg uppercase text-[var(--ink)] mt-1 m-0">{script.updated}</dd>
          </div>
          <div className="p-4 border-r border-b border-[var(--line)]">
            <dt className="font-mono text-[9px] uppercase tracking-widest text-[var(--dim)]">{t('script.categoryLabel')}</dt>
            <dd className="font-heading font-semibold text-lg uppercase text-[var(--ink)] mt-1 m-0">{script.category}</dd>
          </div>
          <div className="p-4 border-r border-b border-[var(--line)]">
            <dt className="font-mono text-[9px] uppercase tracking-widest text-[var(--dim)]">{t('script.runtimeLabel')}</dt>
            <dd className="font-heading font-semibold text-lg uppercase text-[var(--ink)] mt-1 m-0">{script.runtime}</dd>
          </div>
          <div className="p-4 border-r border-b border-[var(--line)]">
            <dt className="font-mono text-[9px] uppercase tracking-widest text-[var(--dim)]">{t('script.platformsLabel')}</dt>
            <dd className="font-heading font-semibold text-lg uppercase text-[var(--ink)] mt-1 m-0">{platformsForScript(script.slug).join(' · ')}</dd>
          </div>
          <div className="p-4 border-r border-b border-[var(--line)]">
            <dt className="font-mono text-[9px] uppercase tracking-widest text-[var(--dim)]">{t('script.supportLabel')}</dt>
            <dd className="font-heading font-semibold text-lg uppercase text-[var(--ink)] mt-1 m-0">{t('script.directSellerSupport')}</dd>
          </div>
        </dl>
      </section>
      <section className="script-detail-includes py-6 border-b border-[var(--line)]">
        <p className="label font-mono text-[10px] uppercase tracking-widest text-[var(--dim)] mb-3">{t('script.whatsIncludedLabel')}</p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none m-0 p-0">
          <li className="flex items-start gap-2 text-sm text-[var(--muted)]">
            <Check size={17} className="text-[var(--steel)] shrink-0 mt-0.5" />
            {t('script.incSourceFiles')}
          </li>
          <li className="flex items-start gap-2 text-sm text-[var(--muted)]">
            <Check size={17} className="text-[var(--steel)] shrink-0 mt-0.5" />
            {t('script.incDoc')}
          </li>
          <li className="flex items-start gap-2 text-sm text-[var(--muted)]">
            <Check size={17} className="text-[var(--steel)] shrink-0 mt-0.5" />
            {t('script.incUpdates')}
          </li>
        </ul>
      </section>
      {seller && (
        <section className="script-detail-seller grid grid-cols-1 sm:grid-cols-[88px_minmax(0,1fr)_auto] gap-4 items-center py-6 border-b border-[var(--line)]">
          <Image
            src={seller.avatar}
            alt={`${seller.name} seller profile`}
            width={88}
            height={88}
            className="w-[88px] h-[88px] object-cover border border-[var(--line)]"
          />
          <div>
            <p className="label font-mono text-[10px] uppercase tracking-widest text-[var(--dim)] mb-1">{t('script.publishedBy')}</p>
            <h2 className="font-heading font-bold text-2xl uppercase text-[var(--ink)] my-1">{seller.name}</h2>
            <p className="text-xs text-[var(--muted)] m-0">{isVi ? seller.headlineVi : seller.headline}</p>
          </div>
          <Link href={`/developers/${seller.slug}`} className="font-heading font-semibold text-sm text-[var(--steel)] hover:underline whitespace-nowrap">
            {t('seller.viewProfile')}
          </Link>
        </section>
      )}
      <AdSlot slotId="script-detail-after-description" />
      <section className="script-recommendations pt-10">
        <div className="heading flex items-end justify-between mb-6 pb-3 border-b border-[var(--line)]">
          <div>
            <p className="label font-mono text-[10px] uppercase tracking-widest text-[var(--dim)] mb-1">{t('script.relatedScriptsLabel')}</p>
            <h2 className="font-heading font-bold text-3xl uppercase text-[var(--ink)] m-0">{t('script.relatedScriptsTitle')}</h2>
          </div>
          <Link href="/scripts" className="font-heading font-semibold text-sm text-[var(--steel)] hover:underline">{t('common.viewAll')}</Link>
        </div>
        <div className="script-list-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedScripts.map((item) => (
            <ScriptListItem key={item.slug} script={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
