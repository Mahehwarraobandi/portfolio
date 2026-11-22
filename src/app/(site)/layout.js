import ChatWidget from "@/components/ChatWidget";
import Contact from "@/components/Contact";
import CursorGlow from "@/components/CursorGlow";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";

/**
 * Chrome shared by every public page.
 *
 * This is a route group, so the folder name adds no URL segment — `/about`
 * stays `/about`. The standalone routes (/resume, /visitors) sit outside the
 * group deliberately: they carry their own minimal header and should not offer
 * the portfolio nav.
 */
export default function SiteLayout({ children }) {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main className="relative z-10 flex-1">{children}</main>
      <Contact />
      <ChatWidget />
      {/* Film grain over everything — texture, not content. */}
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-[70] opacity-[0.045] mix-blend-overlay"
      />
    </>
  );
}
