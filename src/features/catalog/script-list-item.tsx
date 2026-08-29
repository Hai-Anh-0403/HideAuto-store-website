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
    <article className="script-list-item group transition-all duration-200">
      <div className="script-list-link grid grid-cols-[100px_minmax(0,1fr)] sm:grid-cols-[120px_minmax(0,1fr)] gap-3 sm:gap-4 p-3 bg-[var(--panel)] border border-[var(--line)] hover:border-[var(--steel)] transition-colors">
        <Link
          className="script-thumbnail relative shrink-0 aspect-square overflow-hidden border border-[var(--line)] bg-[var(--bg)]"
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
            className="w-full h-full object-cover filter saturate-75 contrast-105 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="script-list-copy min-w-0 flex flex-col justify-between">
          <div>
            <span className="status font-mono text-[9px] uppercase tracking-wider text-[var(--steel)] font-semibold block mb-0.5">
              {t(statusMessageIds[script.status])}
            </span>
            <h3 className="font-heading font-bold text-base sm:text-lg leading-snug uppercase text-[var(--ink)] group-hover:text-[var(--steel)] transition-colors truncate">
              <Link href={`/scripts/${script.slug}`}>{script.name}</Link>
            </h3>
            <p className="script-seller text-xs text-[var(--muted)] flex items-center gap-1.5 my-0.5 truncate">
              <Link
                href={`/developers/${developerSlug(script.seller)}`}
                className="hover:underline hover:text-[var(--steel)] font-medium"
              >
                {script.seller}
              </Link>{' '}
              <b className="text-[var(--steel)] text-[8px]" aria-label="Verified seller">●</b>
            </p>
            <p className="script-meta font-mono text-[10px] text-[var(--dim)] flex items-center gap-2 my-0.5">
              <span className="inline-flex items-center gap-1">
                <Star size={11} fill="currentColor" className="text-[var(--steel)]" /> {script.watches}
              </span>
              <span className="inline-flex items-center gap-1">
                <Eye size={11} /> {new Intl.NumberFormat('en-US').format(script.views)}
              </span>
            </p>
            <p className="script-outcome text-xs text-[var(--muted)] line-clamp-2 my-1 leading-normal">
              {script.outcome}
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 mt-1.5 pt-1.5 border-t border-[var(--line)]">
            <small className="script-social-tags font-mono text-[10px] text-[var(--dim)] truncate">
              {platformLabel(script.slug)}
            </small>
            <strong className="font-heading font-bold text-sm sm:text-base text-[var(--ink)] whitespace-nowrap">
              {script.price} <small className="font-mono text-[9px] font-normal text-[var(--dim)] uppercase ml-0.5">{t('common.startingPrice')}</small>
            </strong>
          </div>
        </div>
      </div>
    </article>
  );
}
