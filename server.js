/**
 * SafeSpace MY - ITT588 Lab Work 03: Front-End Technology
 * Server Entry Point: server.js
 * Architecture: Model-View-Controller (MVC) Full-Stack Web Application
 */

const express = require("express");
const path = require("path");
const routes = require("./config/routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets (CSS, client-side JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Mount central routing table
app.use("/", routes);

// 404 Catch-all handler
app.use((req, res) => {
  res.status(404).send(`
    <!doctype html>
    <html lang="en">
      <head>
        <title>404 - Page Not Found | SafeSpace MY</title>
        <link rel="stylesheet" href="/css/style.css">
      </head>
      <body style="display:grid; place-items:center; min-height:100vh; text-align:center;">
        <div style="background:#fff; padding:40px; border-radius:18px; box-shadow:0 10px 30px rgba(0,0,0,0.06); max-width:460px;">
          <h1 style="color:#172b3a; margin-top:0;">404 - Page Not Found</h1>
          <p style="color:#697887;">The requested page route could not be found.</p>
          <a href="/home" class="button primary" style="margin-top:15px;">Return to SafeSpace MY Home</a>
        </div>
      </body>
    </html>
  `);
});

// Start web server
app.listen(PORT, () => {
  console.log("==========================================================");
  console.log(" SafeSpace MY - ITT588 Lab Work 03 (MVC Application)");
  console.log(` Server successfully started on port ${PORT}`);
  console.log(` Access application at: http://localhost:${PORT}`);
  console.log("==========================================================");
});
