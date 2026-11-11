/**
 * SafeSpace MY - ITT588 Lab Work 03: Front-End Technology
 * Module: clock.js
 * Purpose: Live Malaysian Standard Time (MYT · UTC+08:00) synchronization.
 * Demonstrates: Date & Time Handling, Intl API, setInterval event loop.
 */

"use strict";

function updateClock() {
  const now = new Date();

  // Extract hours, minutes, seconds formatted for Kuala Lumpur
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kuala_Lumpur",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = timeFormatter.formatToParts(now);
  const getPart = (name) => parts.find((p) => p.type === name)?.value || "00";

  const hoursEl = document.getElementById("clockHours");
  const minutesEl = document.getElementById("clockMinutes");
  const secondsEl = document.getElementById("clockSeconds");
  const dateEl = document.getElementById("clockDate");
  const miniEl = document.getElementById("clockMini");
  const statusEl = document.getElementById("clockStatus");

  if (hoursEl) hoursEl.textContent = getPart("hour");
  if (minutesEl) minutesEl.textContent = getPart("minute");
  if (secondsEl) secondsEl.textContent = getPart("second");

  if (dateEl) {
    dateEl.textContent = new Intl.DateTimeFormat("en-MY", {
      timeZone: "Asia/Kuala_Lumpur",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);
  }

  if (miniEl) {
    miniEl.textContent =
      new Intl.DateTimeFormat("en-MY", {
        timeZone: "Asia/Kuala_Lumpur",
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now) + " · MYT";
  }

  if (statusEl) {
    statusEl.textContent = "Live · updating 1s";
  }
}

// Initialise immediately on load, then tick every 1000ms
document.addEventListener("DOMContentLoaded", () => {
  updateClock();
  setInterval(updateClock, 1000);
});
