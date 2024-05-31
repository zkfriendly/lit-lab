// import express from "express";
// import fetch from "node-fetch";
// import cors from "cors";
// import singRepo from "../../../src/main.ts";
// var fetcher = require("../../../src/main.js");

import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
// import signRepo from "../src/main";
let signRepo = require("../src/main.js").default;

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/fetch-repo", async (req, res) => {
  const url = req.query.url as string;
  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    // console.log(typeof signRepo);
    // const buffer = await fetch(url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching the repo: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    res.set("Content-Type", "application/zip");
    console.log("buffer:", buffer); 
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.log("error:", error);
    res.status(500).send(`Error: ${error}`);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
