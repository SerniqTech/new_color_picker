export type Browser = "chrome" | "edge" | "unknown";

export function detectBrowser(): Browser {
  const ua = navigator.userAgent;

  if (/edg/i.test(ua)) return "edge";
  if (/chrome|crios/i.test(ua)) return "chrome";
  return "unknown";
}
