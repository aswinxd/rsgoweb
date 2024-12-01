const express = require("express");
const path = require("path");

const app = express();
const rsgo = require("./api/rsgo");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API route
app.use("/api/rsgo", rsgo);

// Catch-all route for unmatched paths (fallback to index.html)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
