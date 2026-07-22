const ALLOWED_ORIGIN = "https://nismoev.github.io";
const APP_ID = "0482cad5-9623-4e63-85df-a04dc4069d70";
const EXTERNAL_ID = "matt-ariya";
const APP_URL = "https://nismoev.github.io/Nismo-EV/";

function json(data, status = 200, origin = ALLOWED_ORIGIN) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      if (origin !== ALLOWED_ORIGIN) {
        return json({ error: "Origin not allowed" }, 403);
      }
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
          "Vary": "Origin"
        }
      });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    if (origin !== ALLOWED_ORIGIN) {
      return json({ error: "Origin not allowed" }, 403);
    }

    if (!env.ONESIGNAL_REST_API_KEY) {
      return json({ error: "Server secret is not configured" }, 500);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }

    const sendAt = new Date(body.sendAt);
    const now = Date.now();
    const maxTime = now + 48 * 60 * 60 * 1000;

    if (
      Number.isNaN(sendAt.getTime()) ||
      sendAt.getTime() < now + 30_000 ||
      sendAt.getTime() > maxTime
    ) {
      return json(
        { error: "sendAt must be between 30 seconds and 48 hours from now" },
        400
      );
    }

    const label =
      typeof body.label === "string" && body.label.trim()
        ? body.label.trim().slice(0, 120)
        : "Your charging session is complete.";

    const oneSignalResponse = await fetch(
      "https://api.onesignal.com/notifications",
      {
        method: "POST",
        headers: {
          "Authorization": `Key ${env.ONESIGNAL_REST_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          app_id: APP_ID,
          include_aliases: {
            external_id: [EXTERNAL_ID]
          },
          target_channel: "push",
          headings: {
            en: "NISMO EV"
          },
          contents: {
            en: label
          },
          send_after: sendAt.toISOString(),
          url: APP_URL
        })
      }
    );

    const result = await oneSignalResponse.json().catch(() => ({}));

    console.log("OneSignal response", {
      status: oneSignalResponse.status,
      ok: oneSignalResponse.ok,
      result
    });

    if (!oneSignalResponse.ok || !result.id) {
      return json(
        {
          error: "OneSignal rejected the schedule request",
          oneSignalStatus: oneSignalResponse.status,
          details: result
        },
        502
      );
    }

    return json({
      success: true,
      notificationId: result.id,
      scheduledFor: sendAt.toISOString()
    });
  }
};
