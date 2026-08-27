'use client';

import { advertisingPlacements, type AdvertisingPlacement } from './data';
import { useLocale } from '@/shared/ui/locale-provider';

export function AdSlot({
  slotId,
  compact = false,
}: {
  slotId: AdvertisingPlacement['slotId'];
  compact?: boolean;
}) {
  const { t } = useLocale();
  const placement = advertisingPlacements.find(
    (item) => item.slotId === slotId,
  );
  return (
    <aside
      className={`ad-slot${compact ? 'ad-slot-compact' : ''}`}
      aria-label={t('advertising.ariaLabel')}
    >
      <span>
        {placement?.label.toUpperCase() ?? t('advertising.defaultLabel')}
      </span>
      <strong>{t('advertising.reservedPlacement', { slotId })}</strong>
      <p>
        {t(
          placement?.active
            ? 'advertising.campaignActive'
            : 'advertising.campaignAvailable',
        )}
      </p>
    </aside>
  );
}
