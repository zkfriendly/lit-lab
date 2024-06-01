import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
// import signRepo from "../src/main";
let signRepo = require("../src/main.js").default;
let retriveAll = require("../src/retrive_uploads.js").retriveAll;
let retrive = require("../src/retrive_uploads.js").retrive;
let uploadFromRepoUrl = require("../src/upload.js").uploadFromRepoUrl;

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
    await uploadFromRepoUrl(url);
    res.set("Content-Type", "application/json");
    res.send({"message": "success"});
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
});

app.get("/archive", async (req, res) => {
  res.set("Content-Type", "application/json");
  // console.log("repos:", await retriveAll());
  res.send({ repos: await retriveAll()});
});

app.get("/archiveFromCid", async (req, res) => {
  const cid = req.query.cid as string;
  if (!cid) {
    return res.status(400).send("CID is required");
  }
  res.set("Content-Type", "application/json");
  const buffer = await retrive(cid);
  res.send(buffer);
});



app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
