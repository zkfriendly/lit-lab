export function getGitZipLink(str: string, branch: string = "main"): string[] {
  if (!str) {
    return ["", ""];
  }
  const parts = str.split("/");
  const repo = parts[parts.length - 1];
  const usr = parts[parts.length - 2];
  return [
    `https://github.com/${usr}/${repo}/archive/refs/heads/${branch}.zip`,
    `${usr}-${repo}`,
  ];
}
