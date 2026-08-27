'use client';

import { type MessageKey } from '@/shared/i18n/messages';
import { type MessageValues } from '@/shared/i18n/format-message';
import { useLocale } from './locale-provider';

export function Message({
  id,
  values,
}: {
  id: MessageKey;
  values?: MessageValues;
}) {
  const { t } = useLocale();
  return <>{t(id, values)}</>;
}
