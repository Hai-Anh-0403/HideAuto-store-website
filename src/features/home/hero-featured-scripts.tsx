import { ScriptListItem } from '@/features/catalog/script-list-item';
import type { CatalogScript } from '@/features/catalog/data';
import { Message } from '@/shared/ui/message';

export function HeroFeaturedScripts({ scripts }: { scripts: CatalogScript[] }) {
  return (
    <div className="hero-featured">
      <p className="label">
        <Message id="home.featuredScripts" />
      </p>
      {scripts.slice(0, 4).map((script) => (
        <ScriptListItem key={script.slug} script={script} />
      ))}
    </div>
  );
}
