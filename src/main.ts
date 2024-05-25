import {
  LitNodeClient,
  encryptString,
  decryptToString,
} from "@lit-protocol/lit-node-client";

import { LitNetwork } from "@lit-protocol/constants";
import {
  LitPKPResource,
  LitActionResource,
  generateAuthSig,
  createSiweMessageWithRecaps,
  LitAccessControlConditionResource,
} from "@lit-protocol/auth-helpers";
import { LitAbility } from "@lit-protocol/types";
import { AuthCallbackParams } from "@lit-protocol/types";
import { ethers } from "ethers";
import { LitContracts } from "@lit-protocol/contracts-sdk";
import { LIT_CHAIN_RPC_URL, LIT_CHAINS } from "@lit-protocol/constants";

require("dotenv").config();

(async () => {
  console.log("🔥 LET'S GO!");
  const litNodeClient = new LitNodeClient({
    litNetwork: LitNetwork.Cayenne,
    debug: true,
  });

  console.log("Connecting to LitNode...");
  await litNodeClient.connect();
  console.log(litNodeClient.config);

  console.log("Connected nodes:", litNodeClient.connectedNodes);

  // const wallet = new ethers.Wallet(
  //   process.env.PRIVATE_KEY!,
  //   new ethers.providers.JsonRpcProvider(LIT_CHAIN_RPC_URL)
  // );

  // const latestBlockhash = await litNodeClient.getLatestBlockhash();
  // console.log("latestBlockhash:", latestBlockhash);

  // // mint a pkp
  // const litContracts = new LitContracts({
  //   signer: wallet,
  //   debug: false,
  //   network: LitNetwork.Cayenne,
  // });

  // await litContracts.connect();

  // // const pkp = (await litContracts.pkpNftContractUtils.write.mint()).pkp;
  // // console.log("✅ pkp:", pkp);

  // const sessionSigs = await litNodeClient.getSessionSigs({
  //   resourceAbilityRequests: [
  //     {
  //       resource: new LitPKPResource("*"),
  //       ability: LitAbility.PKPSigning,
  //     },
  //     {
  //       resource: new LitActionResource("*"),
  //       ability: LitAbility.LitActionExecution,
  //     },
  //   ],
  //   authNeededCallback: async (params: AuthCallbackParams) => {
  //     if (!params.uri) {
  //       throw new Error("uri is required");
  //     }
  //     if (!params.expiration) {
  //       throw new Error("expiration is required");
  //     }

  //     if (!params.resourceAbilityRequests) {
  //       throw new Error("resourceAbilityRequests is required");
  //     }

  //     const toSign = await createSiweMessageWithRecaps({
  //       uri: params.uri,
  //       expiration: params.expiration,
  //       resources: params.resourceAbilityRequests,
  //       walletAddress: wallet.address,
  //       nonce: latestBlockhash,
  //       litNodeClient,
  //     });

  //     const authSig = await generateAuthSig({
  //       signer: wallet,
  //       toSign,
  //     });

  //     return authSig;
  //   },
  // });

  // console.log("✅ sessionSigs:", sessionSigs);

  // let pkp = {
  //   publicKey:
  //     "0x049ef2071b95008064ed609c96bd0ee04491a40845ed8c6f12155640f3a2143d05114f1c1fef7b7250600a69ab455caf09cb3a512e56b883f40235c32e29e364d6",
  // };

  // // -- executeJs
  // const executeJsRes = await litNodeClient.executeJs({
  //   code: `(async () => {
  //   const sigShare = await LitActions.signEcdsa({
  //     toSign: dataToSign,
  //     publicKey,
  //     sigName: "sig",
  //   });
  // })();`,
  //   sessionSigs,
  //   jsParams: {
  //     dataToSign: ethers.utils.arrayify(
  //       ethers.utils.keccak256([1, 2, 3, 4, 5])
  //     ),
  //     publicKey: pkp.publicKey,
  //   },
  // });

  // console.log("✅ executeJsRes:", executeJsRes);

  // // -- pkpSign
  // const pkpSignRes = await litNodeClient.pkpSign({
  //   pubKey: pkp.publicKey,
  //   sessionSigs: sessionSigs,
  //   toSign: ethers.utils.arrayify(ethers.utils.keccak256([1, 2, 3, 4, 5])),
  // });

  // console.log("✅ pkpSignRes:", pkpSignRes);

  // // -- encryptString

  // const accs = [
  //   {
  //     contractAddress: <const>"",
  //     standardContractType: <const>"",
  //     chain: <const>"ethereum",
  //     method: <const>"",
  //     parameters: [":userAddress"],
  //     returnValueTest: {
  //       comparator: <const>"=",
  //       value: wallet.address,
  //     },
  //   },
  // ];

  // const encryptRes = await encryptString(
  //   {
  //     accessControlConditions: accs,
  //     dataToEncrypt: "Hello world",
  //   },
  //   litNodeClient
  // );

  // console.log("✅ encryptRes:", encryptRes);

  // // -- decrypt string
  // const accsResourceString =
  //   await LitAccessControlConditionResource.generateResourceString(
  //     accs,
  //     encryptRes.dataToEncryptHash
  //   );

  // const sessionSigsToDecryptThing = await litNodeClient.getSessionSigs({
  //   resourceAbilityRequests: [
  //     {
  //       resource: new LitAccessControlConditionResource(accsResourceString),
  //       ability: LitAbility.AccessControlConditionDecryption,
  //     },
  //   ],
  //   authNeededCallback: async (params: AuthCallbackParams) => {
  //     if (!params.uri) {
  //       throw new Error("uri is required");
  //     }
  //     if (!params.expiration) {
  //       throw new Error("expiration is required");
  //     }

  //     if (!params.resourceAbilityRequests) {
  //       throw new Error("resourceAbilityRequests is required");
  //     }

  //     const toSign = await createSiweMessageWithRecaps({
  //       uri: params.uri,
  //       expiration: params.expiration,
  //       resources: params.resourceAbilityRequests,
  //       walletAddress: wallet.address,
  //       nonce: latestBlockhash,
  //       litNodeClient,
  //     });

  //     const authSig = await generateAuthSig({
  //       signer: wallet,
  //       toSign,
  //     });

  //     return authSig;
  //   },
  // });

  // // -- Decrypt the encrypted string
  // const decryptRes = await decryptToString(
  //   {
  //     accessControlConditions: accs,
  //     ciphertext: encryptRes.ciphertext,
  //     dataToEncryptHash: encryptRes.dataToEncryptHash,
  //     sessionSigs: sessionSigsToDecryptThing,
  //     chain: "ethereum",
  //   },
  //   litNodeClient
  // );

  // console.log("✅ decryptRes:", decryptRes);
})();
