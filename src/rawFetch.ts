var fs = require("fs");
(async () => {
  const res = await fetch(
    "https://codeload.github.com/zkfriendly/zkGitPerks/zip/refs/heads/main"
  );
  const data = await res.arrayBuffer();
  fs.writeFileSync("zkGitPerks.zip", Buffer.from(data));
  console.log("✅ data:", data);
})();
