/**
 * SafeSpace MY - ITT588 Lab Work 03: Front-End Technology
 * Module: outputMethods.js
 * Purpose: Demonstrates the 4 required JavaScript Output Delivery Methods:
 *   1. innerHTML
 *   2. document.write()
 *   3. window.alert()
 *   4. console.log()
 */

"use strict";

let latestReport = null;

/**
 * Method 1: innerHTML
 * Injects dynamic HTML content directly into an element without reloading the page.
 */
function displayViaInnerHTML(targetId, htmlContent) {
  const target = document.getElementById(targetId);
  if (target) {
    target.innerHTML = htmlContent;
  }
}

/**
 * Method 2: document.write()
 * Dynamically generates a clean, standalone, printable emergency summary in a secondary window.
 */
function writeReport(data) {
  const r = data || latestReport || {
    name: "Sample visitor",
    label: "General support information",
    title: "Sample support summary",
    advice:
      "If you are concerned about your safety, consider contacting a trusted person or recognised support service.",
    next: "Choose the support option that feels safest for your situation.",
    notes: "",
    stamp: new Date().toLocaleString("en-MY", {
      timeZone: "Asia/Kuala_Lumpur",
    }),
  };

  const w = window.open("", "_blank", "width=760,height=700");
  if (!w) {
    showInfoModal(
      "Report window blocked",
      "Your browser blocked the report popup. Please allow pop-ups for this page, then try again."
    );
    return;
  }

  w.document.open();
  w.document.write(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>SafeSpace MY - Emergency Support Summary</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 720px;
      margin: 35px auto;
      padding: 0 25px;
      color: #202c39;
      line-height: 1.65;
    }
    header {
      border-bottom: 3px solid #327c78;
      padding-bottom: 18px;
      margin-bottom: 25px;
    }
    h1 {
      color: #172b3a;
      margin: 0;
      font-size: 28px;
    }
    .meta {
      font-size: 12px;
      color: #697887;
    }
    .box {
      background: #e4f2ef;
      padding: 16px;
      border-radius: 12px;
      margin: 18px 0;
    }
    h2 {
      font-size: 17px;
      color: #172b3a;
      margin-top: 24px;
      margin-bottom: 6px;
    }
    button {
      border: 0;
      border-radius: 8px;
      padding: 12px 18px;
      background: #327c78;
      color: #fff;
      cursor: pointer;
      font-weight: bold;
    }
    @media print {
      button { display: none; }
      body { margin: 0; }
    }
  </style>
</head>
<body>
  <header>
    <h1>SafeSpace MY</h1>
    <div>Domestic Violence Support Summary · Generated via document.write()</div>
  </header>
  <p><b>Prepared for:</b> ${esc(r.name)}</p>
  <p><b>Generated on:</b> ${esc(r.stamp)}</p>

  <div class="box">
    <b>${esc(r.title)}</b>
    <p>${esc(r.advice)}</p>
  </div>

  <h2>Selected Support Area</h2>
  <p>${esc(r.label)}</p>

  <h2>Suggested Information</h2>
  <p>${esc(r.next)}</p>

  ${
    r.notes
      ? `<h2>Personal Note</h2><p>${esc(r.notes)}</p>`
      : ""
  }

  <h2>Important Contacts</h2>
  <p>Emergency Services: <b>999</b><br>Talian Kasih: <b>15999</b></p>

  <p class="meta">Educational demo only. This is not an official risk assessment or a substitute for emergency, legal, or professional advice. Verify current contact details with official sources when safe.</p>

  <p><button onclick="window.print()">Print Summary</button></p>
</body>
</html>`);
  w.document.close();

  console.log(
    "[SafeSpace MY] Separate report generated successfully using document.write()."
  );
}

/**
 * Method 3: window.alert() / Accessible Notification
 * Triggers a centered informative pop-up to avoid harsh browser-blocking dialogs.
 */
function triggerAlert() {
  const alertMessage =
    "SafeSpace MY Notification:\n\nYou deserve to feel safe and supported.\n\nImmediate danger: call 999 if safe to do so.\nTalian Kasih: 15999.";
  
  // Demonstrates custom accessible alert dialog replacing harsh default browser prompt
  showInfoModal("SafeSpace MY Alert", alertMessage, "safe");
}

/**
 * Method 4: console.log()
 * Outputs structured debugging and analytical diagnostic data to the developer tools.
 */
function triggerConsole() {
  const timestamp = new Date().toLocaleString("en-MY", {
    timeZone: "Asia/Kuala_Lumpur",
  });

  console.log(
    "%cSafeSpace MY · ITT588 Lab Work 03",
    "font-weight:bold;font-size:14px;color:#327c78"
  );
  console.log("Output method: console.log()");
  console.log("Malaysia timestamp:", timestamp);
  console.table([
    { method: "innerHTML", target: "Modal Injection", output: "Custom popup content" },
    { method: "document.write()", target: "New Window", output: "Printable summary report" },
    { method: "window.alert()", target: "Dialog Overlay", output: "Centered accessible dialog" },
    { method: "console", target: "DevTools / Terminal", output: "Structured logs & table" },
  ]);

  showConsoleTerminal([
    "[SafeSpace MY] ITT588 Lab Work 03 Execution Log",
    "Output Method: console.log()",
    `Malaysia Timestamp: ${timestamp}`,
    "Status: System active and event loop running.",
    "",
    "Method 1: innerHTML -> Injected check-in evaluation into modal layer",
    "Method 2: document.write() -> Standalone emergency pass in new window",
    "Method 3: window.alert() -> Replaced with centered accessible modal",
    "Method 4: console -> Diagnostic table and output displayed below",
  ]);
}

/**
 * Helper to mirror console output onto the on-page terminal box.
 */
function showConsoleTerminal(lines) {
  const consoleOutput = document.getElementById("consoleOutput");
  const consoleOutputText = document.getElementById("consoleOutputText");

  if (consoleOutput && consoleOutputText) {
    consoleOutputText.textContent = lines.join("\n");
    consoleOutput.classList.add("visible");
    consoleOutput.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

// Wire up event listeners
document.addEventListener("DOMContentLoaded", () => {
  const makeReportBtn = document.getElementById("makeReport");
  const testWriteBtn = document.getElementById("testWrite");
  const testAlertBtn = document.getElementById("testAlert");
  const testConsoleBtn = document.getElementById("testConsole");

  if (makeReportBtn) {
    makeReportBtn.addEventListener("click", () => writeReport(latestReport));
  }
  if (testWriteBtn) {
    testWriteBtn.addEventListener("click", () => writeReport(null));
  }
  if (testAlertBtn) {
    testAlertBtn.addEventListener("click", triggerAlert);
  }
  if (testConsoleBtn) {
    testConsoleBtn.addEventListener("click", triggerConsole);
  }
});
