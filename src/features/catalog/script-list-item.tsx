import Image from 'next/image';
import Link from 'next/link';
import { Eye, Star } from 'lucide-react';
import type { CatalogScript } from './data';
import { developerSlug } from '@/features/developers/data';
import { platformLabel } from '@/data/script-platforms';

export function ScriptListItem({ script }: { script: CatalogScript }) {
  return (
    <article className="script-list-item">
      <div className="script-list-link">
        <Image
          src={script.image}
          alt={`Preview for ${script.name}`}
          width={120}
          height={120}
        />
        <div className="script-list-copy">
          <span className="status">{script.status}</span>
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
          <small>{platformLabel(script.slug)}</small>
          <strong>
            {script.price} <small>STARTING PRICE</small>
          </strong>
        </div>
      </div>
    </article>
  );
}
