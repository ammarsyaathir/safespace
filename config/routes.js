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
const authController = require("../controllers/authController");

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
router.get("/login", pageController.getLogin);

// ==========================================
// API & Authentication Action Routes
// ==========================================
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/logout", authController.logout);

router.post("/api/checkin", supportController.processCheckin);

module.exports = router;
