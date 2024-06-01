import lighthouse from "@lighthouse-web3/sdk";
import { URLSearchParams } from "url";
require("dotenv").config();

// upload a file to Lighthouse and return metadata
async function retrive() {
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

  // await lighthouse.getUploads(process.env.LIGHTHOUSE_API_KEY!)
  // return await lighthouse.upload(filePath, apiKey, false, dealParams);
}

export default retrive;

// (async () => {
//   // first we need to upload the file to lighthouse
//   // at first it will only be available on IPFS
//   // we will have to wait ~ 48 hours for it to be available on Filecoin
//   await retrive();
// })();
