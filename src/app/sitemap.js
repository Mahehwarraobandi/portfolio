const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Public, indexable pages only. /login, /resume, and /visitors are gated or
// private, and are excluded here as well as in robots.js.
const routes = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.9 },
  { path: "/experience", priority: 0.9 },
  { path: "/projects", priority: 0.8 },
  { path: "/skills", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap() {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
