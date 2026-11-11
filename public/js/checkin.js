/**
 * SafeSpace MY - ITT588 Lab Work 03: Front-End Technology
 * Module: checkin.js
 * Purpose: Private Check-in Form processing and decision logic.
 * Demonstrates: Form validation, risk evaluation algorithms, dynamic modal injection (innerHTML), console logging.
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("supportForm");
  const clearBtn = document.getElementById("clearForm");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("nickname")?.value.trim() || "Anonymous";
    const dangerInput = document.querySelector('input[name="danger"]:checked');

    if (!dangerInput) {
      showInfoModal("Incomplete Form", "Please indicate whether you are in immediate danger.", "caution");
      return;
    }

    const danger = dangerInput.value;
    const type = document.getElementById("supportType")?.value;
    const notes = document.getElementById("notes")?.value.trim() || "";

    if (!type) {
      showInfoModal("Incomplete Form", "Please select what kind of support you are looking for.", "caution");
      return;
    }

    // Risk Categorization Algorithm (JavaScript Control Statements)
    let status = "safe";
    let title = "Support information";
    let advice = "Consider speaking with a trusted person or an established support service when you feel ready.";

    if (danger === "yes") {
      status = "urgent";
      title = "Immediate safety comes first";
      advice =
        "If you are in immediate danger, move to a safer place if possible and call 999 if it is safe to do so. You do not need to complete this form to seek emergency help.";
    } else if (danger === "unsure") {
      status = "caution";
      title = "Take your concern seriously";
      advice =
        "If possible, contact a trusted person or support service and think about where you could go if the situation becomes unsafe.";
    }

    // Support Type Mapping
    const labels = {
      safety: "Safety planning",
      emotional: "Emotional support or counselling",
      legal: "Legal or protection information",
      shelter: "Shelter or practical support",
      friend: "Supporting a friend or family member",
      learn: "Learning more",
    };

    let next = "Choose the support option that feels safest for your situation.";
    switch (type) {
      case "safety":
        next =
          "If safe, identify a safe place, a trusted contact, and a way to get help. Avoid making plans on a device that may be monitored.";
        break;
      case "emotional":
        next =
          "A counsellor, healthcare professional, or established support organisation can help you talk through options without pressure.";
        break;
      case "legal":
        next =
          "Contact a qualified legal aid body (e.g. Legal Aid Bureau / YBGK) or established support organisation for current information about Interim Protection Orders (IPO) and protection options.";
        break;
      case "shelter":
        next =
          "A local support organisation or the Social Welfare Department (JKM) can explain shelter and emergency accommodation options.";
        break;
      case "friend":
        next =
          "Listen without blaming or pressuring the person. Ask what would help, respect their choices, and seek emergency help if there is immediate danger.";
        break;
      case "learn":
        next =
          "Learning about domestic violence and available support in Malaysia is an empowering first step. Use reliable sources and protect your privacy.";
        break;
    }

    // Record latest report state
    latestReport = {
      name,
      danger,
      label: labels[type] || "General Support",
      title,
      advice,
      next,
      notes,
      stamp: new Date().toLocaleString("en-MY", {
        timeZone: "Asia/Kuala_Lumpur",
      }),
    };

    // Output Method 1: innerHTML dynamic injection into modal dialog
    const modalTitle = document.getElementById("modalTitle");
    const modalSub = document.getElementById("modalSub");
    const modalContent = document.getElementById("modalContent");
    const reportButton = document.getElementById("makeReport");

    if (modalTitle) modalTitle.textContent = "Your support options";
    if (modalSub) modalSub.textContent = "A general guide based on your answers";
    if (reportButton) reportButton.style.display = "inline-flex";

    if (modalContent) {
      modalContent.innerHTML = `
        <div class="status ${status}">${esc(title)}</div>
        <div class="detail">
          <b>Check-in for:</b>
          <p>${esc(name)}</p>
        </div>
        <div class="detail">
          <b>Suggested next step:</b>
          <p>${esc(advice)}</p>
        </div>
        <div class="detail">
          <b>${esc(labels[type])}</b>
          <p>${esc(next)}</p>
        </div>
        ${
          notes
            ? `<div class="detail"><b>Your note:</b><p>${esc(notes)}</p></div>`
            : ""
        }
        <div class="detail">
          <b>Support contacts:</b>
          <p>Emergency: <a href="tel:999">999</a> · Talian Kasih: <a href="tel:15999">15999</a></p>
        </div>
        <p class="fineprint">Generated ${esc(
          latestReport.stamp
        )}. This is general educational information, not an official risk assessment.</p>
      `;
    }

    // Output Method 4: Diagnostic logging to browser console
    console.log("[SafeSpace MY] Check-in processed successfully", {
      immediateDanger: danger,
      supportArea: labels[type],
      timestamp: new Date().toISOString(),
    });

    // Open Accessible PopUp Modal
    openModal();

    // Critical Immediate Danger Escalation
    if (danger === "yes") {
      setTimeout(() => {
        showInfoModal(
          "URGENT SAFETY REMINDER",
          "If you are in immediate danger, please move to a safer location immediately and call 999 as soon as it is safe to do so.",
          "urgent"
        );
      }, 350);
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      form.reset();
      showInfoModal("Form cleared", "The support check-in form has been reset.", "safe");
    });
  }
});
