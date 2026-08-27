export const scriptPlatforms: Record<string, string[]> = {
  'session-pilot': ['Facebook', 'Instagram'],
  'catalog-watcher': ['Shopee', 'Lazada'],
  'invoice-extractor': ['TikTok Shop', 'Marketplace'],
  'release-notifier': ['YouTube', 'TikTok'],
  'form-runner': ['Facebook', 'TikTok'],
  'document-sorter': ['Google Drive', 'Marketplace'],
  'listing-auditor': ['Shopee', 'Lazada'],
  'queue-keeper': ['Facebook', 'YouTube'],
};

export function platformLabel(slug: string) {
  return scriptPlatforms[slug]?.join(' · ') ?? 'Multi-platform';
}
