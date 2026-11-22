const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The web résumé repeats the portfolio's content, and /visitors is
        // private; indexing either would only dilute the portfolio's ranking.
        disallow: ["/resume", "/visitors"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
