'use client';

import { localeLabels, type Locale, useLocale } from './locale-provider';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  return (
    <label className="language-switcher">
      <span className="sr-only">Language</span>
      <select
        aria-label="Select language"
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
      >
        {Object.entries(localeLabels).map(([code, label]) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
