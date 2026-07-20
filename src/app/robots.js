const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The gate and everything behind it. Crawlers can't complete the form,
        // and indexing these would only dilute the portfolio's own ranking.
        disallow: ["/login", "/resume", "/visitors"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
