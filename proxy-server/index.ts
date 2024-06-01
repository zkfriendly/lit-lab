import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
// import signRepo from "../src/main";
let signRepo = require("../src/main.js").default;

const app = express();
const PORT = 3001;
let repos = ["repo1", "repo2", "repo3"];


app.use(cors());

app.get("/fetch-repo", async (req, res) => {
  const url = req.query.url as string;
  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const buffer = await signRepo(url);
    res.set("Content-Type", "application/zip");
    // console.log("buffer:", buffer); 
    res.send(Buffer.from(buffer));
  } catch (error) {
    // console.log("error:", error);
    res.status(500).send(`Error: ${error}`);
  }
});

app.get("/followed-repos", async (req, res) => {
  res.set("Content-Type", "application/json");
  res.send({ repos: repos});
});

app.post("/followed-repos", async (req, res) => {
  const newRepo = req.query.url;
  if (!newRepo) {
    return res.status(400).send("URL is required");
  }
  repos.push(newRepo as string);
  res.set("Content-Type", "application/json");
  res.send({ repos: repos});
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
