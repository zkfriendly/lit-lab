export const litCode = `(async () => {
  const resp = await fetch(url).then((response) => response);
  const respArrayBuffer = await resp.arrayBuffer();
  const repoCommit = new Uint8Array(
    await crypto.subtle.digest('SHA-256', respArrayBuffer)
  );
  console.log("repoCommit:", repoCommit);
  console.log("respArrayBuffer:", respArrayBuffer);
  const sigShare = await LitActions.signEcdsa({
    toSign: repoCommit,
    publicKey,
    sigName: "sig",
  });
  LitActions.setResponse({
    response: JSON.stringify({ timestamp: Date.now().toString()}),
  });
})();`;
