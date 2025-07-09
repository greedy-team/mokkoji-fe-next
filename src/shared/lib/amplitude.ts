import * as amplitude from '@amplitude/analytics-browser';

const AMPLITUDE_ENABLED = process.env.NEXT_PUBLIC_AMPLITUDE_ENABLED === 'true';

function trackEvent(eventName: string, eventProperties?: Record<string, any>) {
  if (!AMPLITUDE_ENABLED) return;
  amplitude.track(eventName, eventProperties);
}

export default trackEvent;
