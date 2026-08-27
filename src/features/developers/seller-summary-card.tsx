import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import type { Developer } from '@/data/developers';
import { Message } from '@/shared/ui/message';
import { TranslatedText } from '@/shared/ui/translated-text';

export function SellerSummaryCard({ seller }: { seller: Developer }) {
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
        </h3>
        <p>
          <TranslatedText en={seller.headline} vi={seller.headlineVi} />
        </p>
        <div className="seller-summary-card__stats">
          <span>
            <b>{seller.products}</b> <Message id="seller.products" />
          </span>
          <span>
            <b>{seller.views.toLocaleString('en-US')}</b>{' '}
            <Message id="seller.views" />
          </span>
        </div>
        <Link
          className="seller-summary-card__link"
          href={`/developers/${seller.slug}`}
        >
          <Message id="seller.viewProfile" /> <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
