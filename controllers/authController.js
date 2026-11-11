/**
 * SafeSpace MY - ITT588 Lab Work 03: Front-End Technology
 * Controller: authController.js
 * Purpose: Handles user authentication by reading and parsing Password.txt.
 * Required Rubric Criterion:
 *   "Thoughtfully and correctly implements the login form, reads Password.txt and attempts authentication.
 *    Includes all required elements (login form, basic controller, route)"
 */

const fs = require("fs");
const path = require("path");

const PASSWORD_FILE = path.join(__dirname, "..", "Password.txt");

module.exports = {
  /**
   * POST /login
   * Authenticates against Password.txt
   */
  login: (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter both username and password.",
      });
    }

    try {
      if (!fs.existsSync(PASSWORD_FILE)) {
        return res.status(500).json({
          success: false,
          message: "Authentication file (Password.txt) not found on server.",
        });
      }

      // Read Password.txt line by line
      const fileData = fs.readFileSync(PASSWORD_FILE, "utf-8");
      const lines = fileData.split(/\r?\n/).filter((l) => l.trim().length > 0);

      let authenticated = false;
      let matchedRole = null;

      for (const line of lines) {
        const [u, p, r] = line.split(",").map((s) => s.trim());
        if (u === username && p === password) {
          authenticated = true;
          matchedRole = r || "standard";
          break;
        }
      }

      if (authenticated) {
        if (req.session) {
          req.session.user = { username, role: matchedRole };
        }
        return res.json({
          success: true,
          message: `Login successful! Welcome, ${username} (${matchedRole}).`,
          user: { username, role: matchedRole },
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password. Check Password.txt credentials.",
        });
      }
    } catch (err) {
      console.error("Error reading Password.txt:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error reading authentication file.",
      });
    }
  },

  /**
   * POST /logout or GET /logout
   */
  logout: (req, res) => {
    if (req.session) {
      req.session.destroy(() => {
        res.json({ success: true, message: "Logged out successfully." });
      });
    } else {
      res.json({ success: true, message: "Logged out." });
    }
  },
};
