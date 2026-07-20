import Link from "next/link";
import { cookies } from "next/headers";
import UnlockForm from "@/components/UnlockForm";
import { ADMIN_COOKIE, readAdminToken } from "@/lib/session";
import { listVisitors, usingFirestore } from "@/lib/visitors";

export const metadata = {
  title: "Visitors",
  robots: { index: false, follow: false },
};

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function VisitorsPage() {
  const cookieStore = await cookies();
  const admin = readAdminToken(cookieStore.get(ADMIN_COOKIE)?.value);

  if (!admin) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center px-6">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-[-0.03em]">
            Private area
          </h1>
          <p className="text-fg/50 mt-2 text-sm">
            Enter the admin key to view captured visitors.
          </p>
        </div>
        <UnlockForm />
        <Link
          href="/"
          className="text-fg/35 hover:text-fg mt-8 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors"
        >
          ← Portfolio
        </Link>
      </main>
    );
  }

  const visitors = await listVisitors();

  return (
    <main className="min-h-svh px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.03em]">
              Visitors
            </h1>
            <p className="text-fg/45 mt-2 text-sm">
              {visitors.length} sign-in{visitors.length === 1 ? "" : "s"} ·
              stored in{" "}
              {usingFirestore() ? "Firestore" : "the local dev file (.data/)"}
            </p>
          </div>
          <Link
            href="/"
            className="text-fg/50 hover:text-fg font-mono text-xs tracking-[0.14em] uppercase transition-colors"
          >
            ← Portfolio
          </Link>
        </header>

        {visitors.length === 0 ? (
          <p className="text-fg/40 border-fg/10 rounded-2xl border border-dashed px-6 py-16 text-center text-sm">
            No sign-ins yet.
          </p>
        ) : (
          <div className="border-fg/10 overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-[54rem] text-left text-sm">
              <thead className="border-fg/10 text-fg/40 border-b">
                <tr>
                  {["When", "Name", "Email", "Company", "Reason", "Type"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-4 py-3 font-mono text-[10px] tracking-[0.16em] uppercase"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor) => (
                  <tr
                    key={visitor.id}
                    className="border-fg/5 hover:bg-fg/[0.03] border-b transition-colors last:border-0"
                  >
                    <td className="text-fg/40 px-4 py-3 font-mono text-[11px] whitespace-nowrap">
                      {formatDate(visitor.createdAt)}
                    </td>
                    <td className="px-4 py-3">{visitor.name}</td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${visitor.email}`}
                        className="text-accent hover:underline"
                      >
                        {visitor.email}
                      </a>
                    </td>
                    <td className="text-fg/60 px-4 py-3">{visitor.company}</td>
                    <td className="text-fg/60 px-4 py-3">{visitor.role}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] ${
                          visitor.emailKind === "work"
                            ? "border-accent-2/40 text-accent-2"
                            : "border-fg/15 text-fg/40"
                        }`}
                      >
                        {visitor.emailKind}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
