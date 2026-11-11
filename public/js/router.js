/**
 * SafeSpace MY - ITT588 Lab Work 03: Front-End Technology
 * Module: router.js (Client-Side Single-Page Router & Controller Dispatcher)
 * Purpose: Allows standalone browser execution via file:// protocol while preserving
 *          strict separation of Pages, Router, Controllers, Views, and CSS.
 */

"use strict";

const Router = {
  routes: {},

  init() {
    window.addEventListener("hashchange", () => this.handleRoute());
    window.addEventListener("DOMContentLoaded", () => this.handleRoute());
  },

  register(path, viewId, title) {
    this.routes[path] = { viewId, title };
  },

  handleRoute() {
    const hash = window.location.hash.replace("#", "") || "home";
    const route = this.routes[hash] || this.routes["home"];

    if (!route) return;

    // Hide all view pages
    document.querySelectorAll(".page-view").forEach((view) => {
      view.style.display = "none";
    });

    // Show target view
    const target = document.getElementById(route.viewId);
    if (target) {
      target.style.display = "block";
    }

    // Update document title
    document.title = route.title;

    // Update active navlinks
    document.querySelectorAll(".navlinks a").forEach((a) => {
      a.classList.remove("active");
      if (a.getAttribute("href") === `#${hash}` || a.getAttribute("href") === `/${hash}`) {
        a.classList.add("active");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  },
};

// Register client-side routes
Router.register("home", "view-home", "SafeSpace MY | Home Dashboard");
Router.register("learn", "view-learn", "Understand Abuse | SafeSpace MY");
Router.register("checkin", "view-checkin", "Private Check-in | SafeSpace MY");
Router.register("resources", "view-resources", "Support Resources | SafeSpace MY");
Router.register("calm", "view-calm", "Pause & Prepare | SafeSpace MY");
Router.register("methods", "view-methods", "Output Methods | SafeSpace MY");

Router.init();
