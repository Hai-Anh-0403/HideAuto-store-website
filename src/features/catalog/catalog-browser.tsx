'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { scripts } from './data';
import { ScriptListItem } from './script-list-item';

const categories = ['Automation', 'Data', 'Operations'];
const platforms = ['Browser', 'Web', 'Files'];
const runtimes = ['Node', 'Python'];
const statuses = ['MAINTAINED', 'NEW', 'POPULAR'];
const sellers = ['Northstar Automation', 'Data Foundry', 'Signal Workshop'];
const priceBands = ['Under $25', '$25–$34', '$35 and above'];

export function CatalogBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [draft, setDraft] = useState(params.get('q') ?? '');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const values = {
    q: params.get('q')?.toLowerCase() ?? '',
    category: params.get('category') ?? '',
    platform: params.get('platform') ?? '',
    runtime: params.get('runtime') ?? '',
    status: params.get('status') ?? '',
    seller: params.get('seller') ?? '',
    price: params.get('price') ?? '',
    sort: params.get('sort') ?? 'views',
  };
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
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
            `${script.name} ${script.outcome} ${script.seller} ${script.category} ${script.platform} ${script.runtime}`
              .toLowerCase()
              .includes(values.q),
        )
        .filter(
          (script) => !values.category || script.category === values.category,
        )
        .filter(
          (script) => !values.platform || script.platform === values.platform,
        )
        .filter(
          (script) =>
            !values.runtime || script.runtime.startsWith(values.runtime),
        )
        .filter((script) => !values.status || script.status === values.status)
        .filter((script) => !values.seller || script.seller === values.seller)
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
      values.platform,
      values.price,
      values.q,
      values.runtime,
      values.seller,
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
          {option}
        </label>
      ))}
    </fieldset>
  );
  const chips = [
    ['q', values.q],
    ['category', values.category],
    ['platform', values.platform],
    ['runtime', values.runtime],
    ['status', values.status],
    ['seller', values.seller],
    ['price', values.price],
  ] as const;

  return (
    <div className="catalog-browser">
      <form className="catalog-search" onSubmit={submit}>
        <Search size={18} />
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Search task, seller, platform, or runtime"
          aria-label="Search scripts"
        />
        <button className="primary" type="submit">
          Search
        </button>
      </form>
      <div className="catalog-layout">
        <aside
          id="catalog-filters"
          className={`catalog-filters${filtersOpen ? 'filters-open' : ''}`}
        >
          <div className="filter-title">
            <SlidersHorizontal size={16} />
            <strong>Filters</strong>
            <button type="button" onClick={clear}>
              Clear all
            </button>
            <button
              className="filter-close"
              type="button"
              onClick={() => setFiltersOpen(false)}
              aria-label="Close filters"
            >
              <X size={16} />
            </button>
          </div>
          {filter('category', 'Category', categories)}
          {filter('platform', 'Platform', platforms)}
          {filter('runtime', 'Runtime', runtimes)}
          {filter('status', 'Status', statuses)}
          {filter('seller', 'Seller', sellers)}
          {filter('price', 'Starting price', priceBands)}
          <button
            className="filter-results primary"
            type="button"
            onClick={() => setFiltersOpen(false)}
          >
            Show {results.length} results
          </button>
        </aside>
        <section className="catalog-results">
          <div className="catalog-toolbar">
            <p>
              <b>{results.length}</b> scripts found
            </p>
            <button
              className="mobile-filter-button"
              type="button"
              onClick={() => setFiltersOpen(true)}
              aria-controls="catalog-filters"
              aria-expanded={filtersOpen}
            >
              <SlidersHorizontal size={15} /> Filters
            </button>
            <label>
              Sort{' '}
              <select
                value={values.sort}
                onChange={(event) => update('sort', event.target.value)}
              >
                <option value="views">Top views</option>
                <option value="newest">Newest</option>
                <option value="watched">Most watched</option>
                <option value="updated">Recently updated</option>
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
                      {name === 'q' ? `Search: ${value}` : value}{' '}
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
              <h2>No scripts match this search.</h2>
              <p>
                Try a broader phrase, or remove filters to see more scripts.
              </p>
              <button className="secondary" onClick={clear}>
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
