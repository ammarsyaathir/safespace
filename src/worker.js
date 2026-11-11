/**
 * SafeSpace MY - ITT588 Lab Work 03: Front-End Technology
 * Cloudflare Worker Entry Point: src/worker.js
 * Mirrors Express MVC routes & controllers for global edge hosting.
 */

import layoutHtml from "../views/layouts/main.html";
import homeHtml from "../views/pages/home.html";
import learnHtml from "../views/pages/learn.html";
import checkinHtml from "../views/pages/checkin.html";
import resourcesHtml from "../views/pages/resources.html";
import calmHtml from "../views/pages/calm.html";
import methodsHtml from "../views/pages/methods.html";

const PAGE_ROUTES = {
  "/": {
    viewName: "home",
    html: homeHtml,
    title: "SafeSpace MY | Domestic Violence Support & Awareness",
  },
  "/home": {
    viewName: "home",
    html: homeHtml,
    title: "SafeSpace MY | Domestic Violence Support & Awareness",
  },
  "/learn": {
    viewName: "learn",
    html: learnHtml,
    title: "Understand the Signs of Abuse | SafeSpace MY",
  },
  "/checkin": {
    viewName: "checkin",
    html: checkinHtml,
    title: "Private Check-in & Urgency Evaluation | SafeSpace MY",
  },
  "/resources": {
    viewName: "resources",
    html: resourcesHtml,
    title: "Support Contacts & Emergency Hotlines | SafeSpace MY",
  },
  "/calm": {
    viewName: "calm",
    html: calmHtml,
    title: "Pause & Prepare | Grounding Breathing & Safety Plan",
  },
  "/methods": {
    viewName: "methods",
    html: methodsHtml,
    title: "JavaScript Output Methods Demonstration | SafeSpace MY",
  },
};

function renderPage(viewName, pageHtml, title) {
  let output = layoutHtml.replace("<!-- {{CONTENT}} -->", pageHtml);
  output = output.replace(/\{\{PAGE_TITLE\}\}/g, title || "SafeSpace MY");
  output = output.replace(
    new RegExp(`class="navlink-${viewName}"`, "g"),
    `class="navlink-${viewName} active"`
  );
  return new Response(output, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

async function parseBody(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return await request.json();
  }
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const formData = await request.formData();
    return Object.fromEntries(formData.entries());
  }
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function handleCheckin(body) {
  const { nickname, danger, supportType, notes } = body || {};

  let status = "safe";
  let title = "Support information";
  let advice =
    "Consider speaking with a trusted person or an established support service when you feel ready.";

  if (danger === "yes") {
    status = "urgent";
    title = "Immediate safety comes first";
    advice =
      "If you are in immediate danger, move to a safer place if possible and call 999 immediately. You do not need to complete any forms to seek emergency help.";
  } else if (danger === "unsure") {
    status = "caution";
    title = "Take your concern seriously";
    advice =
      "If possible, contact a trusted person or support service and think about where you could go if the situation becomes unsafe.";
  }

  const labels = {
    safety: "Safety planning",
    emotional: "Emotional support or counselling",
    legal: "Legal or protection information",
    shelter: "Shelter or practical support",
    friend: "Supporting a friend or family member",
    learn: "Learning more",
  };

  return Response.json({
    success: true,
    message: "Check-in evaluated successfully.",
    data: {
      name: nickname || "Anonymous",
      danger: danger || "no",
      status,
      title,
      advice,
      supportArea: labels[supportType] || "General Support",
      notes: notes || "",
      timestamp: new Date().toLocaleString("en-MY", {
        timeZone: "Asia/Kuala_Lumpur",
      }),
    },
  });
}

function renderNotFound() {
  return new Response(
    `<!doctype html>
    <html lang="en">
      <head>
        <title>404 - Page Not Found | SafeSpace MY</title>
        <link rel="stylesheet" href="/css/style.css">
      </head>
      <body style="display:grid; place-items:center; min-height:100vh; text-align:center;">
        <div style="background:#fff; padding:40px; border-radius:18px; box-shadow:0 10px 30px rgba(0,0,0,0.06); max-width:460px;">
          <h1 style="color:#172b3a; margin-top:0;">404 - Page Not Found</h1>
          <p style="color:#697887;">The requested page route could not be found.</p>
          <a href="/home" class="button primary" style="margin-top:15px;">Return to SafeSpace MY Home</a>
        </div>
      </body>
    </html>`,
    {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname =
      url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname;
    const method = request.method.toUpperCase();

    if (method === "GET" && PAGE_ROUTES[pathname]) {
      const page = PAGE_ROUTES[pathname];
      return renderPage(page.viewName, page.html, page.title);
    }

    if (method === "POST" && pathname === "/api/checkin") {
      const body = await parseBody(request);
      return handleCheckin(body);
    }

    if (env.ASSETS) {
      const assetRes = await env.ASSETS.fetch(request);
      if (assetRes.status !== 404) {
        return assetRes;
      }
    }

    return renderNotFound();
  },
};
