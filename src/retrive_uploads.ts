import lighthouse from "@lighthouse-web3/sdk";
import { URLSearchParams } from "url";
import fs from 'fs';
require("dotenv").config();
import fetch from 'node-fetch'; 

// upload a file to Lighthouse and return metadata
export async function retriveAll() {
  const response = await lighthouse.getUploads(process.env.LIGHTHOUSE_API_KEY!);
  console.log(
    "my uploads:",
    response
  );

  for (let i = 0; i < response.data.fileList.length; i++) {
    const upload = response.data.fileList[i];
    console.log("upload:", upload);
    const cid = upload.cid;
    const dealStatus = await lighthouse.dealStatus(cid);
    console.log("dealStatus:", dealStatus);
  }

  return response.data.fileList;

  // await lighthouse.getUploads(process.env.LIGHTHOUSE_API_KEY!)
  // return await lighthouse.upload(filePath, apiKey, false, dealParams);
}


export async function retrive(cid: string) {
  return await fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`)
    .then(response => {
      if (response.ok) return response.arrayBuffer();
      throw new Error('Network response was not ok.');
    });
}


// (async () => {
//   // first we need to upload the file to lighthouse
//   // at first it will only be available on IPFS
//   // we will have to wait ~ 48 hours for it to be available on Filecoin
//   await retrive();
// })();
