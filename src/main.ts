import { litSignRepo } from "./litaction";
import { getGitZipLink } from "./utils/gitlink";
var fs = require("fs");

async function signRepo(repo: string, branch: string = "main") {
  const [url, name] = getGitZipLink(repo, branch);

  const response = await litSignRepo(url);

  console.log("response:", response);

  const resp = await fetch(url).then((response) => response);
  const respArrayBuffer = await resp.arrayBuffer();
  const repoCommit = new Uint8Array(
    await crypto.subtle.digest("SHA-256", respArrayBuffer)
  );

  console.log("repoCommit:", repoCommit);

  return respArrayBuffer;
}

signRepo("https://github.com/zkfriendly/lit-lab");
