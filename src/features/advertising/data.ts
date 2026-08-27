export type AdvertisingPlacement = {
  slotId: 'home-after-top-views' | 'home-between-rails' | 'home-footer';
  placement: 'home';
  active: boolean;
  label: string;
  campaignId?: string;
  startsAt?: string;
  endsAt?: string;
  creativeUrl?: string;
  creativeAlt?: string;
  destinationUrl?: string;
};

export const advertisingPlacements: AdvertisingPlacement[] = [
  {
    slotId: 'home-after-top-views',
    placement: 'home',
    active: false,
    label: 'Advertisement',
  },
  {
    slotId: 'home-between-rails',
    placement: 'home',
    active: false,
    label: 'Advertisement',
  },
  {
    slotId: 'home-footer',
    placement: 'home',
    active: false,
    label: 'Advertisement',
  },
];
