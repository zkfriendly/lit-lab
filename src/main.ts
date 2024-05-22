import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LitAbility, LitActionResource } from "@lit-protocol/auth-helpers";
import { AuthCallbackParams } from "@lit-protocol/types";
import { ethers } from "ethers";
import * as siwe from "siwe";
import * as crypto from "crypto";
require("dotenv").config();

const litActionCode = `
const go = async () => {  
  const url = "https://api.weather.gov/gridpoints/TOP/31,80/forecast";
  const resp = await fetch(url).then((response) => response.json());
  const temp = resp.properties.periods[0].temperature;

  // only sign if the temperature is above 60.  if it's below 60, exit.
  if (temp < 60) {
    return;
  }
  
  // this requests a signature share from the Lit Node
  // the signature share will be automatically returned in the HTTP response from the node
  // all the params (toSign, publicKey, sigName) are passed in from the LitJsSdk.executeJs() function
  const sigShare = await LitActions.signEcdsa({ toSign, publicKey , sigName });
};

go();
`;

async function main() {
  const message = new Uint8Array(
    await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode("Hello world")
    )
  );

  const litNodeClient = new LitJsSdk.LitNodeClient({
    alertWhenUnauthorized: true,
    litNetwork: "cayenne",
    debug: true,
  });
  await litNodeClient.connect();

  // Initialize the signer
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  const address = ethers.getAddress(await wallet.getAddress());

  // Craft the SIWE message
  const domain = "localhost";
  const origin = "https://localhost/login";
  const statement =
    "This is a test statement.  You can put anything you want here.";

  // expiration time in ISO 8601 format.  This is 7 days in the future, calculated in milliseconds
  const expirationTime = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).toISOString();

  let nonce = await litNodeClient.getLatestBlockhash();
  const siweMessage = new siwe.SiweMessage({
    domain,
    address: address,
    statement,
    uri: origin,
    version: "1",
    chainId: 1,
    nonce,
    expirationTime,
  });
  const messageToSign = siweMessage.prepareMessage();

  // Sign the message and format the authSig
  const signature = await wallet.signMessage(messageToSign);

  const authSig = {
    sig: signature,
    derivedVia: "web3.eth.personal.sign",
    signedMessage: messageToSign,
    address: address,
  };

  // Form the authNeededCallback to create a session with
  // the wallet signature.
  const authNeededCallback = async (params: AuthCallbackParams) => {
    const response = await litNodeClient.signSessionKey({
      statement: params.statement,
      authMethods: [
        {
          authMethodType: 1,
          // use the authSig created above to authenticate
          // allowing the pkp to sign on behalf.
          accessToken: JSON.stringify(authSig),
        },
      ],
      pkpPublicKey: `0x04d1625d29780660d604f5c86fc4c9f047fdd9983ca85a3fdcc941076dbd09d5350adc6e504eabb806915c322fa16361063c566c1252782834cfd844ee2f707ae3`,
      expiration: params.expiration,
      resources: params.resources,
      chainId: 1,
    });
    return response.authSig;
  };

  // Set resources to allow for signing of any message.
  const resourceAbilities = [
    {
      resource: new LitActionResource("*"),
      ability: LitAbility.PKPSigning,
    },
  ];
  // Get the session key for the session signing request
  // will be accessed from local storage or created just in time.
  const sessionKeyPair = litNodeClient.getSessionKey();

  // Request a session with the callback to sign
  // with an EOA wallet from the custom auth needed callback created above.
  const sessionSigs = await litNodeClient.getSessionSigs({
    chain: "ethereum",
    expiration: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    resourceAbilityRequests: resourceAbilities,
    authNeededCallback,
  });

  const signatures = await litNodeClient.executeJs({
    code: litActionCode,
    sessionSigs,
    // all jsParams can be used anywhere in your litActionCode
    jsParams: {
      toSign: message,
      publicKey:
        "0x02e5896d70c1bc4b4844458748fe0f936c7919d7968341e391fb6d82c258192e64",
      sigName: "sig1",
    },
  });

  await litNodeClient.disconnect();
}

main().catch((error) => {
  console.error(error);
});
