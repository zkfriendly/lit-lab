import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LitNetwork } from "@lit-protocol/constants";
import {
  LitPKPResource,
  LitActionResource,
  generateAuthSig,
  createSiweMessageWithRecaps,
} from "@lit-protocol/auth-helpers";
import { LitAbility } from "@lit-protocol/types";
import { AuthCallbackParams } from "@lit-protocol/types";
import { ethers } from "ethers";
import { LIT_CHAIN_RPC_URL } from "@lit-protocol/constants";
import { litCode } from "./litactioncode";

require("dotenv").config();

export async function litSignRepo(url: string) {
  //   console.log("🔥 LET'S GO!");
  const litNodeClient = new LitNodeClient({
    litNetwork: LitNetwork.Cayenne,
    debug: false,
  });

  await litNodeClient.connect();

  //   console.log("Connected nodes:", litNodeClient.connectedNodes);

  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY!,
    new ethers.providers.JsonRpcProvider(LIT_CHAIN_RPC_URL)
  );

  const latestBlockhash = await litNodeClient.getLatestBlockhash();

  const sessionSigs = await litNodeClient.getSessionSigs({
    resourceAbilityRequests: [
      {
        resource: new LitPKPResource("*"),
        ability: LitAbility.PKPSigning,
      },
      {
        resource: new LitActionResource("*"),
        ability: LitAbility.LitActionExecution,
      },
    ],
    authNeededCallback: async (params: AuthCallbackParams) => {
      if (!params.uri) {
        throw new Error("uri is required");
      }
      if (!params.expiration) {
        throw new Error("expiration is required");
      }

      if (!params.resourceAbilityRequests) {
        throw new Error("resourceAbilityRequests is required");
      }

      const toSign = await createSiweMessageWithRecaps({
        uri: params.uri,
        expiration: params.expiration,
        resources: params.resourceAbilityRequests,
        walletAddress: wallet.address,
        nonce: latestBlockhash,
        litNodeClient,
      });

      const authSig = await generateAuthSig({
        signer: wallet,
        toSign,
      });

      return authSig;
    },
  });

  //   console.log("✅ got sessionSigs:");

  let pkp = {
    publicKey: process.env.PKPPUBLIC_KEY!,
  };

  // -- executeJs
  const executeJsRes = await litNodeClient.executeJs({
    code: litCode,
    sessionSigs,
    jsParams: {
      url: url,
      publicKey: pkp.publicKey,
    },
  });

  return await executeJsRes;
}
