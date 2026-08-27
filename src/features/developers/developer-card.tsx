import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, Send, Star } from 'lucide-react';
import type { Developer } from '@/data/developers';
import { Message } from '@/shared/ui/message';

export function DeveloperCard({ developer }: { developer: Developer }) {
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
          <Link href={`/developers/${developer.slug}`}>{developer.name}</Link>{' '}
          <b>✓</b>
        </h2>
        <p className="developer-stats">
          <Star size={14} fill="currentColor" /> {developer.rating} (
          {developer.reviewCount}) · <Message id="seller.products" />:{' '}
          {developer.products} · <Message id="seller.views" />:{' '}
          {developer.views.toLocaleString('en-US')} ·{' '}
          <Message id="seller.orders" />: {developer.orders}
        </p>
        <p>{developer.headline}</p>
        <p>
          <small>
            <Message id="common.joined" values={{ date: developer.joined }} />
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
        <Send size={16} /> <Message id="seller.contact" />
      </a>
    </article>
  );
}
