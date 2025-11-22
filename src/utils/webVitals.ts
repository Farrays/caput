/**
 * Web Vitals tracking utility
 * Monitors Core Web Vitals (CLS, INP, LCP) and other performance metrics
 */

import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals';

/**
 * Sends Web Vitals data to analytics
 * You can customize this to send to Google Analytics, Sentry, or your own endpoint
 */
function sendToAnalytics(metric: Metric): void {
  const globalWindow = typeof window !== 'undefined' ? window : undefined;

  // Send to Google Analytics if available
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (globalWindow && (globalWindow as any).gtag) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalWindow as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Send to Sentry if available
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (globalWindow && (globalWindow as any).Sentry) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalWindow as any).Sentry.captureMessage(`Web Vital: ${metric.name}`, {
      level:
        metric.rating === 'good'
          ? 'info'
          : metric.rating === 'needs-improvement'
            ? 'warning'
            : 'error',
      tags: {
        webVital: metric.name,
        rating: metric.rating,
      },
      extra: {
        value: metric.value,
        delta: metric.delta,
        id: metric.id,
      },
    });
  }

  // Console log in development
  if (process.env['NODE_ENV'] === 'development') {
    // Using console.warn as console.log is not allowed by ESLint rules
    console.warn(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }
}

/**
 * Initialize Web Vitals tracking
 * Call this function once when the app starts
 */
export function reportWebVitals(): void {
  try {
    // Core Web Vitals
    onCLS(sendToAnalytics); // Cumulative Layout Shift
    onINP(sendToAnalytics); // Interaction to Next Paint
    onLCP(sendToAnalytics); // Largest Contentful Paint

    // Other metrics
    onFCP(sendToAnalytics); // First Contentful Paint
    onTTFB(sendToAnalytics); // Time to First Byte
  } catch (error) {
    console.error('[Web Vitals] Error initializing:', error);
  }
}

/**
 * Get performance thresholds for each metric
 */
export const PERFORMANCE_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint (ms)
  INP: { good: 200, poor: 500 }, // Interaction to Next Paint (ms)
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift (score)
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint (ms)
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte (ms)
} as const;

/**
 * Check if a metric value is considered "good"
 */
export function isGoodMetric(
  metricName: keyof typeof PERFORMANCE_THRESHOLDS,
  value: number
): boolean {
  const threshold = PERFORMANCE_THRESHOLDS[metricName];
  return value <= threshold.good;
}

/**
 * Get rating for a metric value
 */
export function getMetricRating(
  metricName: keyof typeof PERFORMANCE_THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = PERFORMANCE_THRESHOLDS[metricName];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}
