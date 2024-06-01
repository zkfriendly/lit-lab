import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
// import signRepo from "../src/main";
let signRepo = require("../src/main.js").default;
let retrive = require("../src/retrive_uploads.js").default;

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
    res.set("Content-Type", "application/json");
    // console.log("buffer:", buffer); 
    res.send(buffer);
  } catch (error) {
    // console.log("error:", error);
    res.status(500).send(`Error: ${error}`);
  }
});

app.post("/archive", async (req, res) => {

  const url = req.query.url as string;
  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const buffer = await signRepo(url);
    res.set("Content-Type", "application/json");
    res.send(buffer);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
});

app.get("/archive", async (req, res) => {
  res.set("Content-Type", "application/json");
  console.log("repos:", await retrive());
  res.send({ repos: await retrive()});
});



app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
