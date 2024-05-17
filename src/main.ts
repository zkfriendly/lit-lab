import * as LitJsSdk from "@lit-protocol/lit-node-client";

async function main() {
  let litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
    alertWhenUnauthorized: false,
    litNetwork: "habanero",
  });
  await litNodeClient.connect();

  console.log("Connected to Lit Node");
}

main().catch((error) => {
  console.error(error);
});
