/**
 * SafeSpace MY - ITT588 Lab Work 03: Front-End Technology
 * Module: modal.js
 * Purpose: Accessible PopUp Dialog management (WCAG keyboard accessible, aria attributes).
 * Demonstrates: DOM manipulation, event listeners, escape key handling.
 */

"use strict";

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const reportButton = document.getElementById("makeReport");

/**
 * Escapes unsafe characters for secure dynamic innerHTML injection.
 */
function esc(str) {
  if (str === null || str === undefined) return "";
  return String(str).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c] || c
  );
}

/**
 * Opens the accessible custom modal dialog.
 */
function openModal() {
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  const closeBtn = document.getElementById("closeModal");
  if (closeBtn) closeBtn.focus();
}

/**
 * Closes the modal dialog.
 */
function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

/**
 * Displays an informational modal with custom status styling.
 */
function showInfoModal(title, message, status = "safe") {
  const modalTitle = document.getElementById("modalTitle");
  const modalSub = document.getElementById("modalSub");

  if (modalTitle) modalTitle.textContent = title;
  if (modalSub) modalSub.textContent = "SafeSpace MY notification";

  if (modalContent) {
    modalContent.innerHTML = `<div class="status ${status}">${esc(message).replace(
      /\n/g,
      "<br>"
    )}</div>`;
  }

  if (reportButton) {
    reportButton.style.display = "none";
  }

  openModal();
}

// Wire up event listeners
document.addEventListener("DOMContentLoaded", () => {
  const closeModalBtn = document.getElementById("closeModal");
  const doneModalBtn = document.getElementById("doneModal");

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (doneModalBtn) doneModalBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) {
      closeModal();
    }
  });

  const quickHelpBtn = document.getElementById("quickHelp");
  if (quickHelpBtn) {
    quickHelpBtn.addEventListener("click", () => {
      showInfoModal(
        "QUICK SAFETY INFORMATION",
        "If you are in immediate danger, move to a safer place if possible and call 999 if it is safe to do so.\n\nTalian Kasih: 15999.\n\nThis website is an educational demonstration portal, not an official emergency service.",
        "urgent"
      );
    });
  }

  const safetyReminderBtn = document.getElementById("safetyReminder");
  if (safetyReminderBtn) {
    safetyReminderBtn.addEventListener("click", () => {
      const modalTitle = document.getElementById("modalTitle");
      const modalSub = document.getElementById("modalSub");

      if (modalTitle) modalTitle.textContent = "A safety reminder";
      if (modalSub) modalSub.textContent = "A few things to keep in mind";

      if (modalContent) {
        modalContent.innerHTML = `
          <div class="status safe">You deserve to feel safe and respected.</div>
          <div class="detail">
            <b>You can choose your next step</b>
            <p>You do not have to explain everything or make a decision immediately. Consider what feels safest for you.</p>
          </div>
          <div class="detail">
            <b>If your device may be monitored</b>
            <p>Consider using a safer device if available. Closing this page may not erase your browser history.</p>
          </div>
          <div class="detail">
            <b>Emergency contacts</b>
            <p>999 for immediate emergencies if safe to call. Talian Kasih: 15999.</p>
          </div>
        `;
      }

      if (reportButton) reportButton.style.display = "none";
      openModal();
    });
  }
});
