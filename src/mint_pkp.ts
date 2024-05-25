import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LitNetwork } from "@lit-protocol/constants";
import { ethers } from "ethers";
import { LitContracts } from "@lit-protocol/contracts-sdk";
import { LIT_CHAIN_RPC_URL } from "@lit-protocol/constants";

require("dotenv").config();

async function main() {
  const litNodeClient = new LitNodeClient({
    litNetwork: LitNetwork.Cayenne,
    debug: true,
  });

  await litNodeClient.connect();

  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY!,
    new ethers.providers.JsonRpcProvider(LIT_CHAIN_RPC_URL)
  );

  const latestBlockhash = await litNodeClient.getLatestBlockhash();

  // mint a pkp
  const litContracts = new LitContracts({
    signer: wallet,
    debug: false,
    network: LitNetwork.Cayenne,
  });

  await litContracts.connect();

  const pkp = (await litContracts.pkpNftContractUtils.write.mint()).pkp;
  console.log("--------------------------------------------------");
  console.log("✅ pkp:", pkp);
}

main();
