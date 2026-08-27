export type CatalogScript = {
  slug: string;
  name: string;
  outcome: string;
  runtime: string;
  price: string;
  version: string;
  updated: string;
  status: 'MAINTAINED' | 'POPULAR' | 'NEW';
  seller: string;
  category: 'Automation' | 'Data' | 'Operations';
  platform: 'Browser' | 'Web' | 'Files';
  views: number;
  watches: number;
  image: string;
};

export const scripts: CatalogScript[] = [
  {
    slug: 'session-pilot',
    name: 'Session Pilot',
    outcome: 'Reliable browser workflows with profile rotation.',
    runtime: 'Node 20+',
    price: '$39',
    version: '2.4.1',
    updated: '18 Jun 2026',
    status: 'MAINTAINED',
    seller: 'Northstar Automation',
    category: 'Automation',
    platform: 'Browser',
    views: 1220,
    watches: 186,
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'catalog-watcher',
    name: 'Catalog Watcher',
    outcome: 'Track price, stock, and listing changes.',
    runtime: 'Python 3.11+',
    price: '$24',
    version: '1.8.0',
    updated: '12 Jun 2026',
    status: 'POPULAR',
    seller: 'Northstar Automation',
    category: 'Data',
    platform: 'Web',
    views: 980,
    watches: 230,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'invoice-extractor',
    name: 'Invoice Extractor',
    outcome: 'Normalize purchase records into clean CSV.',
    runtime: 'Node 18+',
    price: '$29',
    version: '3.1.2',
    updated: '07 Jun 2026',
    status: 'NEW',
    seller: 'Data Foundry',
    category: 'Data',
    platform: 'Files',
    views: 640,
    watches: 144,
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'release-notifier',
    name: 'Release Notifier',
    outcome: 'Monitor release pages and send precise change alerts.',
    runtime: 'Python 3.11+',
    price: '$19',
    version: '1.2.0',
    updated: '21 Jun 2026',
    status: 'NEW',
    seller: 'Signal Workshop',
    category: 'Operations',
    platform: 'Web',
    views: 510,
    watches: 173,
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'form-runner',
    name: 'Form Runner',
    outcome: 'Run repeatable form submissions with visible checkpoints.',
    runtime: 'Node 20+',
    price: '$34',
    version: '2.0.3',
    updated: '15 Jun 2026',
    status: 'MAINTAINED',
    seller: 'Northstar Automation',
    category: 'Automation',
    platform: 'Browser',
    views: 870,
    watches: 119,
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'document-sorter',
    name: 'Document Sorter',
    outcome: 'Classify incoming files and prepare structured folders.',
    runtime: 'Python 3.11+',
    price: '$17',
    version: '1.0.6',
    updated: '10 Jun 2026',
    status: 'POPULAR',
    seller: 'Data Foundry',
    category: 'Operations',
    platform: 'Files',
    views: 760,
    watches: 204,
    image:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'listing-auditor',
    name: 'Listing Auditor',
    outcome: 'Check product listings for missing fields and anomalies.',
    runtime: 'Node 18+',
    price: '$27',
    version: '1.4.2',
    updated: '04 Jun 2026',
    status: 'MAINTAINED',
    seller: 'Signal Workshop',
    category: 'Data',
    platform: 'Web',
    views: 720,
    watches: 101,
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'queue-keeper',
    name: 'Queue Keeper',
    outcome: 'Turn recurring operational queues into tracked daily runs.',
    runtime: 'Node 20+',
    price: '$22',
    version: '1.1.0',
    updated: '20 Jun 2026',
    status: 'NEW',
    seller: 'Northstar Automation',
    category: 'Automation',
    platform: 'Browser',
    views: 430,
    watches: 154,
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
  },
];
