/**
 * Security headers applied to every response.
 * Content-Security-Policy is set per-request in src/proxy.js so it can carry
 * a fresh nonce for Next's inline bootstrap scripts.
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
  // Emits .next/standalone with a minimal server + only the traced deps,
  // which is what the Cloud Run container runs.
  output: "standalone",
  reactStrictMode: true,
  // Don't advertise the framework version.
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // No remote image hosts are used — keep the allowlist empty.
    remotePatterns: [],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
