import React, { useState } from "react";
import getAvalibleYears from "../explore_service.js";
import "./searchbox.css";
import JSZip from "jszip";

function SearchBox() {
  let years = getAvalibleYears();
  const [repoUrl, setRepoUrl] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleUrlChange = (e) => {
    setRepoUrl(e.target.value);
  };

  const fetchAndUnzipRepo = async () => {
    // const proxyUrl = `http://localhost:3001/fetch-repo?url=${encodeURIComponent(
    //   repoUrl + "/archive/refs/heads/main.zip"
    // )}`;
    // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const gitUrl = `${repoUrl + "/archive/refs/heads/main.zip"}`;
    const proxyUrl = `http://localhost:3001/fetch-repo?url=${encodeURIComponent(
      repoUrl + "/archive/refs/heads/main.zip"
    )}`;
    // const fetchUrl = proxyUrl + gitUrl;

    try {
      //   const response = await axios.get(gitUrl, {
      //     headers: {
      //       "Content-Type": "application/zip",
      //       "Access-Control-Allow-Origin": "*",
      //     },
      //   });
      const response = await fetch(proxyUrl);
      //   response.header("Access-Control-Allow-Origin", "*");
      //   response.header(
      //     "Access-Control-Allow-Headers",
      //     "Origin, X-Requested-With, Content-Type, Accept"
      //   );
      if (!response.ok) {
        throw new Error(`Error fetching the repo: ${response.statusText}`);
      }

      const zipArrayBuffer = await response.arrayBuffer();
      //   const decompressedData = await zipInflate(zipArrayBuffer);

      const zip = new JSZip();
      const unzipped = await zip.loadAsync(zipArrayBuffer);

      const files = [];
      unzipped.forEach((relativePath, file) => {
        files.push(relativePath);
      });

      setFileList(files);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        <input
          className="search"
          type="text"
          onChange={handleUrlChange}
          value={repoUrl}
          placeholder="Search the archive..."
        />
        {/* <select className="years" id="years">
          {years &&
            years.years.map((year, index) => (
              <option value={year}>{year}</option>
            ))}
        </select> */}
        <input
          className="submitBtn"
          type="submit"
          value="Search"
          onClick={fetchAndUnzipRepo}
        />
      </div>
      <div>
        {fileList.length > 0 ? (
          <ul>
            {fileList.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        ) : (
          <p>No files found</p>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
