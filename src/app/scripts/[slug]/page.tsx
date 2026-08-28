import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { scripts } from '@/features/catalog/data';
import { developers } from '@/features/developers/data';
import { StoreHeader } from '@/shared/ui/store-header';
import { StoreFooter } from '@/shared/ui/store-footer';
import { ScriptDetailContent } from './script-detail-content';

export function generateStaticParams() {
  return scripts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/scripts/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const script = scripts.find((item) => item.slug === slug);
  if (!script) return { title: 'Script not found — HideAuto' };
  return { title: `${script.name} — HideAuto`, description: script.outcome };
}

export default async function ScriptPage({
  params,
}: PageProps<'/scripts/[slug]'>) {
  const { slug } = await params;
  const script = scripts.find((s) => s.slug === slug);
  if (!script) notFound();
  const seller = developers.find((developer) => developer.name === script.seller);
  const relatedScripts = scripts
    .filter((item) => item.slug !== script.slug)
    .sort(
      (a, b) =>
        Number(b.category === script.category) -
        Number(a.category === script.category),
    )
    .slice(0, 3);

  return (
    <>
      <StoreHeader />
      <ScriptDetailContent
        script={script}
        seller={seller}
        relatedScripts={relatedScripts}
      />
      <StoreFooter />
    </>
  );
}
