import lighthouse from "@lighthouse-web3/sdk";
import { URLSearchParams } from "url";
require("dotenv").config();

// upload a file to Lighthouse and return metadata
async function upload(filePath: string) {
  const apiKey = process.env.LIGHTHOUSE_API_KEY!;

  const dealParams = {
    num_copies: 2,
    repair_threshold: 28800,
    deal_duration: 518400,
    renew_threshold: 240,
    miner: ["t017840"],
    network: "calibration",
    add_mock_data: 2,
  };

  return await lighthouse.upload(filePath, apiKey, false, dealParams);
}

async function uploadFromBuffer(buffer: Buffer) {
  const apiKey = process.env.LIGHTHOUSE_API_KEY!;

  const dealParams = {
    num_copies: 2,
    repair_threshold: 28800,
    deal_duration: 518400,
    renew_threshold: 240,
    miner: ["t017840"],
    network: "calibration",
    add_mock_data: 2,
  };

  const uploadReceipt = await lighthouse.uploadBuffer(buffer, apiKey);
}


(async () => {
  // first we need to upload the file to lighthouse
  // at first it will only be available on IPFS
  // we will have to wait ~ 48 hours for it to be available on Filecoin
  const uploadReceipt = await upload("index.html");
  const cid = uploadReceipt.data.Hash;

  // now we can check the status of the deal
  const status = await lighthouse.dealStatus(cid);

  let proofResponse = await fetch(
    "https://api.lighthouse.storage/api/lighthouse/get_proof" +
      new URLSearchParams({ cid: cid, network: "testnet" })
  );

  console.log(proofResponse.status);

  console.log("🚀 File uploaded to Lighthouse!");
  console.log("🔗 IPFS CID:", cid);
  console.log("📦 Filecoin Deal Status:", status);

  console.log(
    "my uploads:",
    await lighthouse.getUploads(process.env.LIGHTHOUSE_API_KEY!)
  );
})();
