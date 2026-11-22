import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/**
 * Security headers applied to every rendered response.
 * Content-Security-Policy is set per-request in worker.js so it can carry a
 * fresh nonce for Next's inline bootstrap scripts. Static assets, which never
 * reach the Worker, get the same headers from public/_headers.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Origin-Agent-Cluster", value: "?1" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework version.
  poweredByHeader: false,
  compress: true,
  images: {
    // The only raster image is a 720px portrait already sized for the page,
    // so Workers serves it as-is instead of paying for an Images binding.
    unoptimized: true,
    // No remote image hosts are used — keep the allowlist empty.
    remotePatterns: [],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

// Gives `next dev` the Worker's bindings (D1, Workers AI) via Wrangler, so
// getCloudflareContext() works locally exactly as it does in production.
initOpenNextCloudflareForDev();
