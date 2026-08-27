import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
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
          <p className="label">
            <TranslatedText en="FEATURED SELLER" vi="NGƯỜI BÁN TIÊU BIỂU" />
          </p>
          <h1>{developer.name}</h1>
          <p className="lead">
            <TranslatedText en={developer.headline} vi={developer.headlineVi} />
          </p>
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
