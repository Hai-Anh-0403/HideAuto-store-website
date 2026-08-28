'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme, type Theme } from './theme-provider';
import { useLocale } from './locale-provider';
import type { MessageKey } from '@/shared/i18n/messages/en';

const icons: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
};

const labelKeys: Record<Theme, MessageKey> = {
  light: 'theme.light',
  dark: 'theme.dark',
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLocale();

  const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
  const Icon = icons[theme];

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={t('theme.toggle')}
      title={`${t(labelKeys[theme])} → ${t(labelKeys[nextTheme])}`}
      onClick={() => setTheme(nextTheme)}
    >
      <Icon size={15} />
    </button>
  );
}
