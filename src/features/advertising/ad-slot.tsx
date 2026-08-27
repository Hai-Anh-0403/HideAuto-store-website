import { advertisingPlacements, type AdvertisingPlacement } from './data';

export function AdSlot({
  slotId,
  compact = false,
}: {
  slotId: AdvertisingPlacement['slotId'];
  compact?: boolean;
}) {
  const placement = advertisingPlacements.find(
    (item) => item.slotId === slotId,
  );
  return (
    <aside
      className={`ad-slot${compact ? 'ad-slot-compact' : ''}`}
      aria-label="Advertisement placeholder"
    >
      <span>{placement?.label.toUpperCase() ?? 'ADVERTISEMENT'}</span>
      <strong>Reserved placement · {slotId}</strong>
      <p>{placement?.active ? 'Campaign space' : 'Campaign space available'}</p>
    </aside>
  );
}
