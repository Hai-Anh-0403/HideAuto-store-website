'use client';

import { ScriptListItem } from '@/features/catalog/script-list-item';
import type { CatalogScript } from '@/features/catalog/data';
import { useLocale } from '@/shared/ui/locale-provider';

export function HeroFeaturedScripts({ scripts }: { scripts: CatalogScript[] }) {
  const { t } = useLocale();

  return (
    <div className="hero-featured">
      <p className="label">{t('home.featuredScripts')}</p>
      {scripts.slice(0, 4).map((script, index) => (
        <ScriptListItem
          key={script.slug}
          script={script}
          priority={index < 2}
        />
      ))}
    </div>
  );
}
