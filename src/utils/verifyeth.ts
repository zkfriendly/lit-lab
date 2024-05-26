import { ethers } from "ethers";

export function verifyEthSig(
  sig: string,
  toSign: Uint8Array,
  publicKey: string
) {
  const recovered = ethers.utils.verifyMessage(toSign, sig);
  console.log("✅ recovered:", recovered);
  return recovered === publicKey;
}
