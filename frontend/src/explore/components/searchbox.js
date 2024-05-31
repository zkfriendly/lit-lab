import React, { useState } from "react";
// import getAvalibleYears from "../explore_service.js";
import "./searchbox.css";
import JSZip from "jszip";

function SearchBox({ onFiles }) {
  // let years = getAvalibleYears();
  const [repoUrl, setRepoUrl] = useState("");
  // const [fileList, setFileList] = useState({});

  const handleUrlChange = (e) => {
    setRepoUrl(e.target.value);
  };

  const fetchAndUnzipRepo = async () => {
    const proxyUrl = `http://localhost:3001/fetch-repo?url=${encodeURIComponent(
      repoUrl + "/archive/refs/heads/main.zip"
    )}`;

    try {
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error(`Error fetching the repo: ${response.statusText}`);
      }

      const zipArrayBuffer = await response.arrayBuffer();

      const zip = new JSZip();
      const unzipped = await zip.loadAsync(zipArrayBuffer);

      let idCounter = 1;
      const files = {
        id: `${idCounter++}`,
        name: "root",
        isFolder: true,
        items: [],
      };
      const filePromises = [];
      unzipped.forEach((relativePath, file) => {
        // files.push(relativePath);
        const parts = relativePath.split("/").filter(Boolean); // Split and remove empty strings
        let current = files;

        parts.forEach((part, index) => {
          let existingItem = current.items.find((item) => item.name === part);
          if (!existingItem) {
            existingItem = {
              id: `${idCounter++}`,
              name: part,
              isFolder: file.dir,
              content: file.dir ? null : file.async("string"),
              items: [],
            };
            current.items.push(existingItem);
            current.items.sort((a, b) => b.isFolder - a.isFolder);
          }
          current = existingItem;
        });
        if (!file.dir) {
          filePromises.push(
            file.async("string").then((content) => {
              current.content = content;
            })
          );
        }
      });
      await Promise.all(filePromises);
      console.log("Files:", files);

      // setFileList(files);
      onFiles(files);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input
        className="search"
        type="text"
        onChange={handleUrlChange}
        value={repoUrl}
        placeholder="Search the archive..."
      />
      <input
        className="submitBtn"
        type="submit"
        value="Search"
        onClick={fetchAndUnzipRepo}
      />
    </div>
  );
}

export default SearchBox;
