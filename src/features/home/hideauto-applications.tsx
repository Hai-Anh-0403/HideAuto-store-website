import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Message } from '@/shared/ui/message';

const products = [
  {
    slug: 'hideauto-browser-automation',
    name: 'HideAuto Browser Automation',
    category: 'home.products.browserAutomationCategory',
    description: 'home.products.browserAutomationDescription',
  },
  {
    slug: 'hideauto-profile-manager',
    name: 'HideAuto Profile Manager',
    category: 'home.products.profileManagerCategory',
    description: 'home.products.profileManagerDescription',
  },
  {
    slug: 'hideauto-data-toolkit',
    name: 'HideAuto Data Toolkit',
    category: 'home.products.dataToolkitCategory',
    description: 'home.products.dataToolkitDescription',
  },
] as const;

export function HideAutoProducts() {
  return (
    <section className="shell section hideauto-products">
      <div className="heading">
        <div>
          <p className="label">
            06 / <Message id="home.products.label" />
          </p>
          <h2>
            <Message id="home.products.title" />
          </h2>
        </div>
        <p>
          <Message id="home.products.introduction" />
        </p>
      </div>
      <div className="hideauto-products-grid">
        {products.map(({ slug, name, category, description }) => (
          <article key={slug}>
            <Image
              src="/images/icon.png"
              alt="HideAuto"
              width={48}
              height={48}
            />
            <p className="label">
              <Message id={category} />
            </p>
            <h3>{name}</h3>
            <p>
              <Message id={description} />
            </p>
            <Link href={`/contact?product=${slug}`}>
              <Message id="home.products.learnMore" /> <ArrowRight size={15} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
