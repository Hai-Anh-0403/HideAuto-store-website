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
    <main className="shell section">
      <p className="label">
        <Link href="/scripts">{t('script.scriptsLabel')}</Link> /{' '}
        {script.name.toUpperCase()}
      </p>
      <div className="hero-grid">
        <section>
          <p className="label">
            {script.status} / VERSION {script.version}
          </p>
          <h1>{script.name}</h1>
          <p className="lead">{script.outcome}</p>
          <p className="label">
            {t('script.sellerLabel')}{' '}
            <Link href={`/developers/${developerSlug(script.seller)}`}>
              {script.seller.toUpperCase()}
            </Link>{' '}
            / {t('script.verifiedProfile')}
          </p>
          <figure className="detail-media">
            <Image
              src={script.image}
              alt={`Preview for ${script.name}`}
              width={1200}
              height={675}
              priority
              sizes="(max-width: 760px) 100vw, (max-width: 1200px) 80vw, 800px"
            />
            <figcaption>{t('script.previewTitle')}</figcaption>
          </figure>
          <h2>{t('script.builtForRepeatableTitle')}</h2>
          <p className="lead">{t('script.builtForRepeatableLead')}</p>
          <div className="tags">
            <span>{script.runtime}</span>
            {platformsForScript(script.slug).map((platform) => (
              <span key={platform}>{platform}</span>
            ))}
            <span>{t('script.sourceExamples')}</span>
            <span>{t('script.updatesPeriod')}</span>
          </div>
        </section>
        <aside className="purchase">
          <p className="label">{t('common.startingPrice')}</p>
          <strong>{script.price}</strong>
          <p>{t('script.agreeTermsNotice')}</p>
          <button>
            {t('script.tierPersonal')}{' '}
            <span>{t('script.activation1')}</span>
          </button>
          <button>
            {t('script.tierTeam')}{' '}
            <span>{t('script.activation5')}</span>
          </button>
          <Link
            className="primary contact-link"
            href={`/contact?script=${script.slug}`}
          >
            <MessageCircle size={16} /> {t('seller.contact')}
          </Link>
          <small>
            <Check size={14} /> {t('script.typicalReply')}
          </small>
        </aside>
      </div>
      <section className="script-detail-info">
        <div>
          <p className="label">{t('script.productDetailsLabel')}</p>
          <h2>{t('script.clearReqTitle')}</h2>
          <p className="lead">{t('script.clearReqLead')}</p>
        </div>
        <dl className="script-detail-facts">
          <div>
            <dt>{t('script.versionLabel')}</dt>
            <dd>{script.version}</dd>
          </div>
          <div>
            <dt>{t('script.lastUpdatedLabel')}</dt>
            <dd>{script.updated}</dd>
          </div>
          <div>
            <dt>{t('script.categoryLabel')}</dt>
            <dd>{script.category}</dd>
          </div>
          <div>
            <dt>{t('script.runtimeLabel')}</dt>
            <dd>{script.runtime}</dd>
          </div>
          <div>
            <dt>{t('script.platformsLabel')}</dt>
            <dd>{platformsForScript(script.slug).join(' · ')}</dd>
          </div>
          <div>
            <dt>{t('script.supportLabel')}</dt>
            <dd>{t('script.directSellerSupport')}</dd>
          </div>
        </dl>
      </section>
      <section className="script-detail-includes">
        <p className="label">{t('script.whatsIncludedLabel')}</p>
        <ul>
          <li>
            <Check size={17} />
            {t('script.incSourceFiles')}
          </li>
          <li>
            <Check size={17} />
            {t('script.incDoc')}
          </li>
          <li>
            <Check size={17} />
            {t('script.incUpdates')}
          </li>
        </ul>
      </section>
      {seller && (
        <section className="script-detail-seller">
          <Image
            src={seller.avatar}
            alt={`${seller.name} seller profile`}
            width={88}
            height={88}
          />
          <div>
            <p className="label">{t('script.publishedBy')}</p>
            <h2>{seller.name}</h2>
            <p>{isVi ? seller.headlineVi : seller.headline}</p>
          </div>
          <Link href={`/developers/${seller.slug}`}>
            {t('seller.viewProfile')}
          </Link>
        </section>
      )}
      <AdSlot slotId="script-detail-after-description" />
      <section className="script-recommendations">
        <div className="heading">
          <div>
            <p className="label">{t('script.relatedScriptsLabel')}</p>
            <h2>{t('script.relatedScriptsTitle')}</h2>
          </div>
          <Link href="/scripts">{t('common.viewAll')}</Link>
        </div>
        <div className="script-list-grid">
          {relatedScripts.map((item) => (
            <ScriptListItem key={item.slug} script={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
