export const ADSENSE_CLIENT_ID = 'ca-pub-2038032133903223';

export const ADSENSE_SLOT = {
  clubContentBottom: '',
} as const;

export type AdSenseSlotName = keyof typeof ADSENSE_SLOT;
