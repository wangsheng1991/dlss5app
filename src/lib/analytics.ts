/**
 * Small, privacy-conscious GA4 bridge shared by the SPA routes.
 *
 * The measurement ID is public by design. We only send route and language
 * dimensions; no GPU query, file, account or device identifier is included.
 */
const recentPageViews = new Map<string, number>();

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

type AnalyticsValue = string | number | boolean;

export function trackPageView(path: string, language: string) {
  if (typeof window === 'undefined') return;
  const key = `${path}:${language}`;
  const now = Date.now();
  const previous = recentPageViews.get(key);
  if (previous && now - previous < 1500) return;
  recentPageViews.set(key, now);

  window.dataLayer ??= [];
  window.dataLayer.push(['event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
    language,
  } satisfies Record<string, AnalyticsValue>]);
}
