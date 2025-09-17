'use client';

import { useEffect } from 'react';
import { onLCP, onCLS, onINP } from 'web-vitals/attribution';
import type { Metric } from 'web-vitals';

export default function WebVitalProvider() {
  useEffect(() => {
    function sendToGA(metric: Metric & { attribution?: any }) {
      const { name, value, delta, id, attribution } = metric;

      const val = name === 'CLS' ? Math.round(value * 1000) : Math.round(value);

      const params: Record<string, any> = {
        value: val,
        event_category: 'Web Vitals',
        event_label: id,
        metric_id: id,
        metric_value: value,
        metric_delta: delta,
        non_interaction: true,
      };

      if (name === 'LCP') {
        params.debug_element = attribution?.element;
        params.debug_url = attribution?.url;
        params.debug_loadState = attribution?.loadState;
        params.debug_ttfb = attribution?.timeToFirstByte;
      }

      if (name === 'CLS') {
        params.debug_target = attribution?.largestShiftTarget;
      }

      if (name === 'INP') {
        params.debug_target = attribution?.interactionTarget;
      }

      // @ts-ignore
      window.gtag('event', name, params);
    }

    onLCP(sendToGA);
    onCLS(sendToGA);
    onINP(sendToGA);
  }, []);

  return null;
}
