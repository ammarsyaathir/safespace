/**
 * SafeSpace MY - ITT588 Lab Work 03: Front-End Technology
 * Router: routes.js
 * Purpose: Central request routing table connecting URLs to Controller actions.
 * Architecture: Model-View-Controller (MVC) Routing Layer
 */

const express = require("express");
const router = express.Router();

const pageController = require("../controllers/pageController");
const supportController = require("../controllers/supportController");

// ==========================================
// Page View Routes (Controller dispatch)
// ==========================================
router.get("/", pageController.getHome);
router.get("/home", pageController.getHome);
router.get("/learn", pageController.getLearn);
router.get("/checkin", pageController.getCheckin);
router.get("/resources", pageController.getResources);
router.get("/calm", pageController.getCalm);
router.get("/methods", pageController.getMethods);

// ==========================================
// API Action Routes
// ==========================================
router.post("/api/checkin", supportController.processCheckin);

module.exports = router;
