const express = require("express");
const router = express.Router();

// Sample data for RSGO
const rsgoData = {
  name: "RSGO",
  description: "The best platform for color games and trusted domains in India.",
  logo: "https://static.cc-bet.app/market/rsgo/rsgo_app.jpg",
  website: "https://rsgo.yourwebsite.com",
  keywords: ["RSGO", "Color Games", "Trusted Domains", "India"]
};

// GET route for RSGO details
router.get("/", (req, res) => {
  res.json(rsgoData);
});

// POST route for future extensions (e.g., contact forms, custom queries)
router.post("/", (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required!" });
  }
  res.json({ message: `Received your query: ${query}`, data: rsgoData });
});

module.exports = router;

4. Vercel Configuration
vercel.json

This file configures the project to run as a serverless function on Vercel.

{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/api/rsgo", "dest": "/api/rsgo.js" },
    { "src": "/.*", "dest": "/index.js" }
  ]
}

5. Deploy on Vercel
Steps:

    Push to GitHub/Bitbucket/GitLab: Commit all files to a version control platform.
    Connect to Vercel:
        Log in to Vercel.
        Click New Project and import your repository.
    Deploy:
        Vercel automatically detects your project as a Node.js project.
        Once deployed, you'll get a public URL like https://rsgo.vercel.app.

6. Test API
Example Requests:

    GET Home:
        URL: https://rsgo.vercel.app/
        Response: HTML content with a welcome message.

    GET RSGO Data:
        URL: https://rsgo.vercel.app/api/rsgo
        Response:

    {
      "name": "RSGO",
      "description": "The best platform for color games and trusted domains in India.",
      "logo": "https://static.cc-bet.app/market/rsgo/rsgo_app.jpg",
      "website": "https://rsgo.yourwebsite.com",
      "keywords": ["RSGO", "Color Games", "Trusted Domains", "India"]
    }

POST Query:

    URL: https://rsgo.vercel.app/api/rsgo
    Body:

{ "query": "What is RSGO?" }

Response:

        {
          "message": "Received your query: What is RSGO?",
          "data": { ...rsgoData }
        }

Let me know if you'd like to add more functionality or if something isn't clear!
You said:
the index.html should work 
ChatGPT said:
ChatGPT

To serve an index.html file in addition to the API on Vercel, you can combine Express.js with static file serving. Here's how you can include a static HTML file (index.html) as the home page while keeping your API functional.
1. Update Project Structure

Add an index.html file in a public directory:

/rsgo-backend
  ├── /api
  │    └── rsgo.js          # API logic
  ├── /public
  │    └── index.html       # Frontend home page
  ├── index.js              # Main server file
  ├── package.json          # Dependencies and scripts
  └── vercel.json           # Vercel configuration

2. Static File Serving
index.js

Update your server file to serve the index.html file:

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
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

3. Create index.html

Place this file in the public directory (/public/index.html):

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSGO</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    }
    h1 {
      color: #4caf50;
    }
    a {
      text-decoration: none;
      color: #2196f3;
    }
  </style>
</head>
<body>
  <h1>Welcome to RSGO</h1>
  <p>Your platform for trusted domains and games in India!</p>
  <a href="/api/rsgo">Explore API</a>
</body>
</html>

4. Vercel Configuration

Ensure your vercel.json includes static file handling:
vercel.json

{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/api/rsgo", "dest": "/api/rsgo.js" },
    { "src": "/.*", "dest": "/index.js" }
  ]
}

5. Deploy to Vercel

    Push the updated project to your Git repository.
    Deploy it on Vercel as before.
    Visit your deployment URL:
        Home page: https://rsgo.vercel.app/
        API endpoint: https://rsgo.vercel.app/api/rsgo

Let me know if you need additional enhancements or guidance!
You said:
like remove indec.js  and keep index.html
ChatGPT said:
ChatGPT

If you'd like to serve the index.html file directly without any backend logic, you can simplify the setup for deployment on Vercel by removing index.js and setting up index.html as the root file.
Steps to Serve Only index.html on Vercel

    Update Project Structure Your project should look like this:

/rsgo-frontend
  ├── index.html         # Main HTML file
  └── vercel.json        # Vercel configuration

index.html Place your current HTML code in the root directory as index.html. Here’s an example:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RSGO</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
        }
        h1 {
            color: #4caf50;
        }
        a {
            text-decoration: none;
            color: #2196f3;
        }
    </style>
</head>
<body>
    <h1>Welcome to RSGO</h1>
    <p>Your platform for trusted domains and games in India!</p>
</body>
</html>

vercel.json Use this configuration file to ensure Vercel correctly serves the index.html file:

    {
      "version": 2,
      "builds": [
        {
          "src": "index.html",
          "use": "@vercel/static"
        }
      ]
    }

    Deploy to Vercel
        Push your project to a Git repository.
        Deploy it to Vercel.
        The index.html will now be served directly at your deployment URL:
        https://your-vercel-project.vercel.app/

This way, your website will serve the index.html file as the root page without any backend code.
