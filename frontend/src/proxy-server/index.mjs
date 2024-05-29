import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/fetch-repo", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching the repo: ${response.statusText}`);
    }

    const buffer = await response.buffer();
    res.set("Content-Type", "application/zip");
    res.send(buffer);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
