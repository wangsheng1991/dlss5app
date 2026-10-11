/**
 * Small, privacy-conscious GA4 bridge shared by the SPA routes.
 *
 * The measurement ID is public by design. We only send route and language
 * dimensions; no GPU query, file, account or device identifier is included.
 */
const recentPageViews = new Map<string, number>();

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, parameters: Record<string, AnalyticsValue>) => void;
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

  // The inline bootstrap in index.html defines gtag before React runs. Calling it
  // queues an Arguments object that gtag.js understands, even if the script has
  // not loaded yet. A plain array pushed to dataLayer is not a gtag command.
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    page_title: document.title,
    language,
  });
}
