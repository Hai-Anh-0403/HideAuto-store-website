'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, Star } from 'lucide-react';
import type { CatalogScript } from './data';
import { developerSlug } from '@/features/developers/data';
import { useLocale } from '@/shared/ui/locale-provider';
import { platformLabel } from '@/data/script-platforms';

const statusMessageIds = {
  MAINTAINED: 'scriptStatus.maintained',
  NEW: 'scriptStatus.new',
  POPULAR: 'scriptStatus.popular',
} as const;

export function ScriptListItem({
  script,
  priority = false,
}: {
  script: CatalogScript;
  priority?: boolean;
}) {
  const { t } = useLocale();

  return (
    <article className="script-list-item">
      <div className="script-list-link">
        <Link
          className="script-thumbnail"
          href={`/scripts/${script.slug}`}
          aria-label={`View ${script.name}`}
        >
          <Image
            src={script.image}
            alt={`Preview for ${script.name}`}
            width={120}
            height={120}
            priority={priority}
            sizes="(max-width: 760px) 100px, 120px"
          />
        </Link>
        <div className="script-list-copy">
          <span className="status">{t(statusMessageIds[script.status])}</span>
          <h3>
            <Link href={`/scripts/${script.slug}`}>{script.name}</Link>
          </h3>
          <p className="script-seller">
            <Link href={`/developers/${developerSlug(script.seller)}`}>
              {script.seller}
            </Link>{' '}
            <b aria-label="Verified seller">●</b>
          </p>
          <p className="script-meta">
            <Star size={12} fill="currentColor" /> {script.watches}{' '}
            <Eye size={12} />{' '}
            {new Intl.NumberFormat('en-US').format(script.views)}
          </p>
          <p className="script-outcome">{script.outcome}</p>
          <small className="script-social-tags">
            {platformLabel(script.slug)}
          </small>
          <strong>
            {script.price} <small>{t('common.startingPrice')}</small>
          </strong>
        </div>
      </div>
    </article>
  );
}
