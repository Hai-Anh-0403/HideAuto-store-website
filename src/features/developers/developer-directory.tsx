'use client';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { developers } from './data';
import { DeveloperCard } from './developer-card';

export function DeveloperDirectory() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const items = developers.filter((developer) =>
    `${developer.name} ${developer.headline} ${developer.specialties.join(' ')}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(items.length / 5));
  const visible = items.slice((page - 1) * 5, page * 5);
  return (
    <>
      <div className="catalog-search">
        <Search size={18} />
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          placeholder="Search developers or specialties"
          aria-label="Search developers"
        />
      </div>
      <div className="developer-cards">
        {visible.map((developer) => (
          <DeveloperCard key={developer.slug} developer={developer} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pager">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={page === index + 1 ? 'active' : ''}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
