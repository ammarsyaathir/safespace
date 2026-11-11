/**
 * SafeSpace MY - ITT588 Lab Work 03: Front-End Technology
 * Module: breathing.js
 * Purpose: Grounding 60-Second Breathing Reset Orb.
 * Demonstrates: JavaScript Event Loop, async/await, Promises, state management, and cancellation tokens.
 */

"use strict";

let breathingRun = false;
let breathingToken = 0;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runBreathing() {
  if (breathingRun) return;
  breathingRun = true;
  const token = ++breathingToken;

  const breathOrb = document.getElementById("breathOrb");
  const breathOrbText = document.getElementById("breathOrbText");
  const breathStatus = document.getElementById("breathStatus");
  const startBtn = document.getElementById("startBreathing");
  const stopBtn = document.getElementById("stopBreathing");

  if (startBtn) startBtn.disabled = true;
  if (stopBtn) stopBtn.disabled = false;

  try {
    for (let cycle = 1; cycle <= 3; cycle++) {
      if (token !== breathingToken) break;

      // Inhale Phase (4 seconds)
      if (breathOrb) breathOrb.className = "breath-orb inhale";
      if (breathOrbText) breathOrbText.textContent = "Breathe in";
      if (breathStatus) {
        breathStatus.textContent = `Breath ${cycle} of 3 · Breathe in gently`;
      }
      await wait(4000);

      if (token !== breathingToken) break;

      // Pause Phase (1 second)
      if (breathOrb) breathOrb.className = "breath-orb";
      if (breathOrbText) breathOrbText.textContent = "Pause";
      if (breathStatus) {
        breathStatus.textContent = "Pause briefly, only if comfortable";
      }
      await wait(1000);

      if (token !== breathingToken) break;

      // Exhale Phase (4 seconds)
      if (breathOrb) breathOrb.className = "breath-orb exhale";
      if (breathOrbText) breathOrbText.textContent = "Breathe out";
      if (breathStatus) {
        breathStatus.textContent = `Breath ${cycle} of 3 · Breathe out slowly`;
      }
      await wait(4000);
    }

    if (token === breathingToken) {
      if (breathOrb) breathOrb.className = "breath-orb";
      if (breathOrbText) breathOrbText.textContent = "Well done";
      if (breathStatus) {
        breathStatus.textContent =
          "Exercise complete. Take your time before moving on.";
      }
    }
  } finally {
    if (token === breathingToken) {
      breathingRun = false;
      if (startBtn) startBtn.disabled = false;
      if (stopBtn) stopBtn.disabled = true;
    }
  }
}

function stopBreathingExercise() {
  if (!breathingRun) return;
  breathingToken++;
  breathingRun = false;

  const breathOrb = document.getElementById("breathOrb");
  const breathOrbText = document.getElementById("breathOrbText");
  const breathStatus = document.getElementById("breathStatus");
  const startBtn = document.getElementById("startBreathing");
  const stopBtn = document.getElementById("stopBreathing");

  if (breathOrb) breathOrb.className = "breath-orb";
  if (breathOrbText) breathOrbText.textContent = "Paused";
  if (breathStatus) {
    breathStatus.textContent = "Exercise stopped. You can restart whenever you like.";
  }
  if (startBtn) startBtn.disabled = false;
  if (stopBtn) stopBtn.disabled = true;
}

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBreathing");
  const stopBtn = document.getElementById("stopBreathing");

  if (startBtn) startBtn.addEventListener("click", runBreathing);
  if (stopBtn) stopBtn.addEventListener("click", stopBreathingExercise);
});
