"use server";

import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  checkAdminKey,
  createAdminToken,
} from "@/lib/session";

/**
 * Unlocks the private visitor list.
 *
 * The key is submitted through a form rather than a query string so it never
 * ends up in Cloud Run access logs or browser history.
 */
export async function unlock(prevState, formData) {
  const key = formData.get("key");

  if (!process.env.ADMIN_KEY) {
    return {
      status: "error",
      message:
        "ADMIN_KEY is not configured on this environment, so the list stays locked.",
    };
  }

  if (!checkAdminKey(typeof key === "string" ? key : "")) {
    // Blunt the speed of an online guessing loop.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { status: "error", message: "Incorrect key." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, createAdminToken(), adminCookieOptions());

  // Setting a cookie in a Server Action re-renders the current route, so the
  // page re-reads the cookie and renders the unlocked view in this roundtrip.
  return { status: "ok", message: "" };
}
