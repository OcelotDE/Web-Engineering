const express = require("express");
const app = express();
const path = require("path");
const port = 5000;

// Serve the static files from the "dist" directory
app.use(express.static(path.join(__dirname, "dist")));

// Serve the index.html file for all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
