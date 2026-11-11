/**
 * SafeSpace MY - ITT588 Lab Work 03: Front-End Technology
 * Controller: pageController.js
 * Purpose: Handles routing and page view responses for each distinct section.
 * Architecture: Model-View-Controller (MVC) Controller Layer
 */

const path = require("path");
const fs = require("fs");

/**
 * Helper to render view with main layout
 */
function renderPage(res, viewName, data = {}) {
  const viewsDir = path.join(__dirname, "..", "views");
  const layoutPath = path.join(viewsDir, "layouts", "main.html");
  const pagePath = path.join(viewsDir, "pages", `${viewName}.html`);

  try {
    let layoutHtml = fs.readFileSync(layoutPath, "utf-8");
    let pageHtml = fs.readFileSync(pagePath, "utf-8");

    // Replace {{content}} in main layout
    let output = layoutHtml.replace("<!-- {{CONTENT}} -->", pageHtml);

    // Replace page title & active navigation
    output = output.replace(/\{\{PAGE_TITLE\}\}/g, data.title || "SafeSpace MY");
    output = output.replace(
      new RegExp(`class="navlink-${viewName}"`, "g"),
      `class="navlink-${viewName} active"`
    );

    res.send(output);
  } catch (err) {
    console.error(`Error rendering view ${viewName}:`, err);
    res.status(500).send("Error loading page view.");
  }
}

module.exports = {
  // Page 1: Home Dashboard & Hero Timepiece
  getHome: (req, res) => {
    renderPage(res, "home", {
      title: "SafeSpace MY | Domestic Violence Support & Awareness",
    });
  },

  // Page 2: Educational Awareness Module (Understand Abuse)
  getLearn: (req, res) => {
    renderPage(res, "learn", {
      title: "Understand the Signs of Abuse | SafeSpace MY",
    });
  },

  // Page 3: Private Check-in Form
  getCheckin: (req, res) => {
    renderPage(res, "checkin", {
      title: "Private Check-in & Urgency Evaluation | SafeSpace MY",
    });
  },

  // Page 4: Emergency Contacts & Support Directories
  getResources: (req, res) => {
    renderPage(res, "resources", {
      title: "Support Contacts & Emergency Hotlines | SafeSpace MY",
    });
  },

  // Page 5: Calming Reset Orb & Safety Plan Checklist
  getCalm: (req, res) => {
    renderPage(res, "calm", {
      title: "Pause & Prepare | Grounding Breathing & Safety Plan",
    });
  },

  // Page 6: JavaScript Output Methods Demonstration Showcase
  getMethods: (req, res) => {
    renderPage(res, "methods", {
      title: "JavaScript Output Methods Demonstration | SafeSpace MY",
    });
  },
};
