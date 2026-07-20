import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/resume";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title = `${profile.name} — Generative AI Engineer`;
const description = profile.summary;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    "Generative AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "LLM",
    "RAG",
    "MLOps",
    profile.name,
  ],
  openGraph: {
    type: "profile",
    title,
    description,
    siteName: profile.name,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050506" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.roles[0],
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: siteUrl,
  sameAs: [profile.linkedin],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Kansas",
    addressCountry: "US",
  },
  description: profile.summary,
};

export default async function RootLayout({ children }) {
  /*
   * Opts the page into dynamic rendering, which the nonce-based CSP requires:
   * a prerendered HTML file would carry a stale nonce that never matches the
   * per-request policy, and every Next script would be blocked. The nonce
   * itself is stamped onto Next's scripts from the request header — it is
   * deliberately not passed into JSX, because React drops `nonce` on the
   * client and the attribute would then fail hydration.
   */
  await headers();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-bg text-fg flex min-h-full flex-col">
        <script
          type="application/ld+json"
          // Serialized from a local constant — no user input reaches this string.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
