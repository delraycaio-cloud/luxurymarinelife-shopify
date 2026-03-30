export type AnalyticsPayload = Record<string, unknown>;

export type AnalyticsEventName =
  | "page_view"
  | "view_item_list"
  | "view_item"
  | "add_to_cart"
  | "begin_checkout"
  | "purchase"
  | `cta_click_${string}`;

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
};

function shouldLogAnalytics(): boolean {
  return import.meta.env.DEV || import.meta.env.VITE_LOG_ANALYTICS === "true";
}

export function trackEvent(event: AnalyticsEventName, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;
  const runtimeWindow = window as AnalyticsWindow;
  
  const safePayload = { ...payload };
  const ts = new Date().toISOString();

  if (Array.isArray(runtimeWindow.dataLayer)) {
    runtimeWindow.dataLayer.push({
      event,
      ...safePayload,
      ts,
    });
  }

  if (typeof runtimeWindow.gtag === "function") {
    runtimeWindow.gtag("event", event, safePayload);
  }

  if (shouldLogAnalytics()) {
    console.info("[shop analytics]", event, safePayload);
  }
}

export function trackPageView(route: string): void {
  if (typeof window !== "undefined") {
    const runtimeWindow = window as AnalyticsWindow;
    if (typeof runtimeWindow.gtag === "function") {
      runtimeWindow.gtag("event", "page_view", {
        page_location: window.location.href,
        page_path: route,
        page_title: document.title,
      });
    }
  }
}
