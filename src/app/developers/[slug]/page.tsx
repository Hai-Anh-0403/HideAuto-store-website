import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { scripts } from '@/features/catalog/data';
import { developers } from '@/features/developers/data';
import { StoreHeader } from '@/shared/ui/store-header';
import { StoreFooter } from '@/shared/ui/store-footer';
import { DeveloperDetailContent } from './developer-detail-content';

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
      <DeveloperDetailContent
        developer={developer}
        developerScripts={developerScripts}
      />
      <StoreFooter />
    </>
  );
}
