"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { classifyEmail, validateVisitor } from "@/lib/validate";
import { recordVisitor } from "@/lib/visitors";
import {
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/session";

/*
 * Coarse per-IP throttle. A server action is a public POST endpoint, so without
 * this a script could burn through the Firestore free tier in minutes. In-memory
 * is enough here: each Cloud Run instance keeps its own window, and the goal is
 * blunting bulk abuse rather than exact accounting.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const attempts = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const seen = (attempts.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  seen.push(now);
  attempts.set(ip, seen);

  // Bound the map so a long-lived instance can't grow it without limit.
  if (attempts.size > 5000) {
    for (const [key, times] of attempts) {
      if (times.every((at) => now - at >= WINDOW_MS)) attempts.delete(key);
    }
  }

  return seen.length > MAX_PER_WINDOW;
}

/** Only allow redirects to our own paths — never an attacker-supplied origin. */
function safeNext(value) {
  if (typeof value !== "string") return "/resume";
  if (!value.startsWith("/") || value.startsWith("//")) return "/resume";
  return value;
}

export async function signIn(prevState, formData) {
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "Too many attempts. Please try again a little later.",
      errors: {},
      values: {},
    };
  }

  const values = {
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    company: formData.get("company") ?? "",
    role: formData.get("role") ?? "",
  };

  const result = validateVisitor(values);
  if (!result.ok) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: result.errors,
      values,
    };
  }

  const { domain, kind } = classifyEmail(result.data.email);

  try {
    await recordVisitor({
      ...result.data,
      emailDomain: domain,
      emailKind: kind,
      referrer: requestHeaders.get("referer"),
      userAgent: requestHeaders.get("user-agent"),
    });
  } catch (error) {
    console.error("Failed to record visitor:", error);
    return {
      status: "error",
      message: "Something went wrong saving your details. Please try again.",
      errors: {},
      values,
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_COOKIE,
    createSessionToken(result.data),
    sessionCookieOptions(),
  );

  // redirect() throws to unwind, so nothing below it runs.
  redirect(safeNext(formData.get("next")));
}
