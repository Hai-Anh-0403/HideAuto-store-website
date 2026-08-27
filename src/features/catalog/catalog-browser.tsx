'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { AdSlot } from '@/features/advertising/ad-slot';
import { platformsForScript, scriptPlatforms } from '@/data/script-platforms';
import { useLocale } from '@/shared/ui/locale-provider';
import { scripts } from './data';
import { ScriptListItem } from './script-list-item';

const statusMessageIds = {
  MAINTAINED: 'scriptStatus.maintained',
  NEW: 'scriptStatus.new',
  POPULAR: 'scriptStatus.popular',
} as const;

const categories = ['Automation', 'Data', 'Operations'];
const socialPlatforms = [
  ...new Set(Object.values(scriptPlatforms).flat()),
].sort();
const statuses = ['MAINTAINED', 'NEW', 'POPULAR'];
const priceBands = ['Under $25', '$25–$34', '$35 and above'];

export function CatalogBrowser() {
  const { t } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [draft, setDraft] = useState(params.get('q') ?? '');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const values = {
    q: params.get('q')?.toLowerCase() ?? '',
    category: params.get('category') ?? '',
    socialPlatform: params.get('socialPlatform') ?? '',
    status: params.get('status') ?? '',
    price: params.get('price') ?? '',
    sort: params.get('sort') ?? 'views',
  };
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('platform');
    next.delete('seller');
    next.delete('page');
    router.replace(`${pathname}?${next.toString()}`);
  };
  const clear = () => {
    setDraft('');
    router.replace(pathname);
  };
  const results = useMemo(
    () =>
      [...scripts]
        .filter(
          (script) =>
            !values.q ||
            `${script.name} ${script.outcome} ${script.seller} ${script.category} ${script.platform} ${platformsForScript(script.slug).join(' ')}`
              .toLowerCase()
              .includes(values.q),
        )
        .filter(
          (script) => !values.category || script.category === values.category,
        )
        .filter(
          (script) =>
            !values.socialPlatform ||
            platformsForScript(script.slug).includes(values.socialPlatform),
        )
        .filter((script) => !values.status || script.status === values.status)
        .filter((script) => {
          const price = Number(script.price.slice(1));
          return (
            !values.price ||
            (values.price === 'Under $25' && price < 25) ||
            (values.price === '$25–$34' && price >= 25 && price <= 34) ||
            (values.price === '$35 and above' && price >= 35)
          );
        })
        .sort((a, b) =>
          values.sort === 'newest' || values.sort === 'updated'
            ? b.updated.localeCompare(a.updated)
            : values.sort === 'watched'
              ? b.watches - a.watches
              : values.sort === 'price'
                ? Number(a.price.slice(1)) - Number(b.price.slice(1))
                : b.views - a.views,
        ),
    [
      values.category,
      values.price,
      values.q,
      values.socialPlatform,
      values.sort,
      values.status,
    ],
  );
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    update('q', draft.trim());
  };
  const filter = (
    name: keyof typeof values,
    label: string,
    options: string[],
    optionLabel = (option: string) => option,
  ) => (
    <fieldset>
      <legend>{label}</legend>
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name={name}
            checked={values[name] === option}
            onChange={() => update(name, values[name] === option ? '' : option)}
          />
          {optionLabel(option)}
        </label>
      ))}
    </fieldset>
  );
  const chips = [
    ['q', values.q],
    ['category', values.category],
    ['socialPlatform', values.socialPlatform],
    ['status', values.status],
    ['price', values.price],
  ] as const;

  return (
    <div className="catalog-browser">
      <form className="catalog-search" onSubmit={submit}>
        <Search size={18} />
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={t('catalog.searchPlaceholder')}
          aria-label={t('navigation.searchScripts')}
        />
        <button className="primary" type="submit">
          {t('catalog.search')}
        </button>
      </form>
      <div className="catalog-layout">
        <aside
          id="catalog-filters"
          className={`catalog-filters${filtersOpen ? 'filters-open' : ''}`}
        >
          <div className="filter-title">
            <SlidersHorizontal size={16} />
            <strong>{t('catalog.filters')}</strong>
            <button type="button" onClick={clear}>
              {t('catalog.clearAll')}
            </button>
            <button
              className="filter-close"
              type="button"
              onClick={() => setFiltersOpen(false)}
              aria-label={t('catalog.closeFilters')}
            >
              <X size={16} />
            </button>
          </div>
          {filter('category', 'Category', categories)}
          {filter(
            'socialPlatform',
            t('catalog.socialPlatforms'),
            socialPlatforms,
          )}
          {filter('status', t('catalog.status'), statuses, (status) =>
            t(statusMessageIds[status as keyof typeof statusMessageIds]),
          )}
          {filter('price', 'Starting price', priceBands)}
          <button
            className="filter-results primary"
            type="button"
            onClick={() => setFiltersOpen(false)}
          >
            {t('catalog.showResults', { count: results.length })}
          </button>
        </aside>
        <section className="catalog-results">
          <div className="catalog-toolbar">
            <p>{t('catalog.resultsFound', { count: results.length })}</p>
            <button
              className="mobile-filter-button"
              type="button"
              onClick={() => setFiltersOpen(true)}
              aria-controls="catalog-filters"
              aria-expanded={filtersOpen}
            >
              <SlidersHorizontal size={15} /> {t('catalog.filters')}
            </button>
            <label>
              {t('catalog.sort')}{' '}
              <select
                value={values.sort}
                onChange={(event) => update('sort', event.target.value)}
              >
                <option value="views">{t('catalog.topViews')}</option>
                <option value="newest">{t('catalog.newest')}</option>
                <option value="watched">{t('catalog.mostWatched')}</option>
                <option value="updated">{t('catalog.recentlyUpdated')}</option>
              </select>
            </label>
          </div>
          {chips.some(([, value]) => value) && (
            <div className="filter-chips">
              {chips.map(
                ([name, value]) =>
                  value && (
                    <button
                      key={name}
                      onClick={() => {
                        if (name === 'q') setDraft('');
                        update(name, '');
                      }}
                    >
                      {name === 'q'
                        ? t('catalog.searchChip', { value })
                        : value}{' '}
                      <X size={12} />
                    </button>
                  ),
              )}
            </div>
          )}
          {results.length ? (
            <div className="catalog-list">
              {results.map((script) => (
                <ScriptListItem key={script.slug} script={script} />
              ))}
            </div>
          ) : (
            <div className="catalog-empty">
              <h2>{t('catalog.noMatchTitle')}</h2>
              <p>{t('catalog.noMatchDescription')}</p>
              <button className="secondary" onClick={clear}>
                {t('catalog.clearFilters')}
              </button>
            </div>
          )}
          <AdSlot slotId="catalog-after-results" />
        </section>
      </div>
    </div>
  );
}
