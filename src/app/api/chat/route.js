import { headers } from "next/headers";
import { MAX_INPUT_CHARS, streamReply } from "@/lib/chat";
import { recordChat } from "@/lib/visitors";

/**
 * The portfolio assistant endpoint.
 *
 * A public, unauthenticated POST that streams Gemini's reply back as plain
 * text. Because anyone can call it, it is defended the same way the sign-in
 * action is: a per-IP rate limit plus hard input caps, so it can't be driven
 * to run up Vertex cost.
 */

// This route is request-specific and must never be prerendered or cached.
export const dynamic = "force-dynamic";

const WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 12; // messages per IP per minute
const attempts = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const seen = (attempts.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  seen.push(now);
  attempts.set(ip, seen);

  if (attempts.size > 5000) {
    for (const [key, times] of attempts) {
      if (times.every((at) => now - at >= WINDOW_MS)) attempts.delete(key);
    }
  }
  return seen.length > MAX_PER_WINDOW;
}

function badRequest(message) {
  return Response.json({ error: message }, { status: 400 });
}

export async function POST(request) {
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  if (rateLimited(ip)) {
    return Response.json(
      { error: "You're sending messages too quickly. Please slow down." },
      { status: 429 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request body.");
  }

  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!message) return badRequest("Message is required.");
  if (message.length > MAX_INPUT_CHARS) {
    return badRequest(`Please keep it under ${MAX_INPUT_CHARS} characters.`);
  }

  // Only the shape the model needs; never trust client-sent roles blindly.
  const history = Array.isArray(body?.history) ? body.history : [];

  const referrer = requestHeaders.get("referer");
  const userAgent = requestHeaders.get("user-agent");

  const encoder = new TextEncoder();
  let answer = "";

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of streamReply({ message, history })) {
          answer += chunk;
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (error) {
        console.error("Chat stream failed:", error);
        // If nothing has streamed yet, surface a friendly line; otherwise the
        // partial answer stands and we just stop.
        if (!answer) {
          controller.enqueue(
            encoder.encode(
              "Sorry — I'm having trouble answering right now. Please try again, or email directly.",
            ),
          );
        }
      } finally {
        controller.close();
      }

      // Save the transcript after the reply is fully sent. Best-effort: a
      // storage hiccup must not affect what the visitor already received.
      try {
        if (answer)
          await recordChat({ question: message, answer, referrer, userAgent });
      } catch (error) {
        console.error("Failed to record chat:", error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
