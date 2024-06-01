export const litCode = `(async () => {
  const resp = await fetch(url).then((response) => response);
  const repository = await resp.arrayBuffer();
  const timestamp = Date.now().toString();
  const repositoryCommit = new Uint8Array(
    await crypto.subtle.digest('SHA-256', repository)
  );

  const toSignJson = { // cannot include timestamp
    url,
    repositoryCommit,
  };

  const toSignStr = JSON.stringify(toSignJson, null, 0);
  const toSignBuff = new Uint8Array(toSignStr.length);
  for (var i = 0; i < toSignStr.length; i++) {
    toSignBuff[i] = toSignStr.charCodeAt(i);
  }

  const toSign = new Uint8Array(
    await crypto.subtle.digest('SHA-256', toSignBuff)
  );

  const sigShare = await LitActions.signEcdsa({
    toSign,
    publicKey,
    sigName: "sig",
  });

  LitActions.setResponse({
    response: JSON.stringify({ timestamp, url, repositoryCommit}),
  });
})();`;
