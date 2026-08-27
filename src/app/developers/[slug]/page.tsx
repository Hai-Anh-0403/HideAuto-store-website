import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Mail, Phone, Star } from 'lucide-react';
import { scripts } from '@/features/catalog/data';
import { ScriptListItem } from '@/features/catalog/script-list-item';
import { developers } from '@/features/developers/data';
import { StoreHeader } from '@/shared/ui/store-header';
import { TranslatedText } from '@/shared/ui/translated-text';

export function generateStaticParams() {
  return developers.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: PageProps<'/developers/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const developer = developers.find((item) => item.slug === slug);
  return developer
    ? { title: `${developer.name} — HideAuto`, description: developer.headline }
    : { title: 'Developer not found — HideAuto' };
}

export default async function DeveloperPage({
  params,
}: PageProps<'/developers/[slug]'>) {
  const { slug } = await params;
  const developer = developers.find((item) => item.slug === slug);
  if (!developer) notFound();
  const developerScripts = scripts.filter(
    (script) => script.seller === developer.name,
  );
  return (
    <>
      <StoreHeader />
      <main className="shell section developer-page">
        <p className="label">
          <Link href="/#developers">
            <TranslatedText en="SELLERS" vi="NGƯỜI BÁN" />
          </Link>{' '}
          / {developer.name.toUpperCase()}
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
              <p className="label">
                <TranslatedText en="FEATURED SELLER" vi="NGƯỜI BÁN TIÊU BIỂU" />
              </p>
              <h1>
                {developer.name}
                {developer.verified && (
                  <span className="developer-verified">
                    <span aria-hidden="true">✓</span>
                    <span className="sr-only">
                      <TranslatedText
                        en="Verified seller"
                        vi="Người bán đã xác minh"
                      />
                    </span>
                  </span>
                )}
              </h1>
              <p className="lead">
                <TranslatedText
                  en={developer.headline}
                  vi={developer.headlineVi}
                />
              </p>
              <div className="developer-profile__stats">
                <span>
                  <Star size={15} fill="currentColor" /> {developer.rating} (
                  {developer.reviewCount})
                </span>
                <span>
                  <b>{developer.products}</b>{' '}
                  <TranslatedText en="Products" vi="Sản phẩm" />
                </span>
                <span>
                  <b>{developer.views.toLocaleString('en-US')}</b>{' '}
                  <TranslatedText en="Views" vi="Lượt xem" />
                </span>
                <span>
                  <b>{developer.orders}</b>{' '}
                  <TranslatedText en="Orders" vi="Đơn hàng" />
                </span>
              </div>
              <p className="developer-profile__contact">
                <Mail size={15} /> {developer.email} <Phone size={15} />{' '}
                {developer.phone}
              </p>
            </div>
          </div>
          <p>
            <TranslatedText en={developer.bio} vi={developer.bioVi} />
          </p>
          <div className="tags">
            {developer.specialties.map((specialty) => (
              <span key={specialty}>{specialty}</span>
            ))}
          </div>
        </div>
        <div className="heading">
          <div>
            <p className="label">
              <TranslatedText en="RELEASES" vi="BẢN PHÁT HÀNH" />
            </p>
            <h2>
              <TranslatedText
                en={`Scripts by ${developer.name}`}
                vi={`Kịch bản của ${developer.name}`}
              />
            </h2>
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
            <h2>
              <TranslatedText
                en="No published scripts yet."
                vi="Chưa có kịch bản được phát hành."
              />
            </h2>
            <Link className="secondary" href="/scripts">
              <TranslatedText
                en="Browse all scripts"
                vi="Xem tất cả kịch bản"
              />
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
