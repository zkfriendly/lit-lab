import React, { useState, useEffect } from "react";
import Folder from "./components/folder.js";
import TextEditor from "./components/text-editor.js";
import { BounceLoader } from "react-spinners";
import { Tooltip } from "react-tooltip";
import JSZip from "jszip";

import "./archived-comp.css";
// import useTraverseTree from "./hooks/use-traverse-tree";

function ArchivedComponent({ signature, arrayBuffer }) {
  const [files, setFiles] = useState({});
  const [currentFile, setFile] = useState("Select a file to view its content");

  const fetchAndUnzipRepo = async () => {
    try {
      console.log("Signature:", signature);
      console.log("Timestamp", new Date(parseInt(signature.timestamp)));

      const zipArrayBuffer = Uint8Array.from(atob(arrayBuffer), (c) =>
        c.charCodeAt(0)
      ).buffer;
      console.log("ArrayBuffer:", zipArrayBuffer);

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
      setFiles(files);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAndUnzipRepo();
  }, []);

  return (
    <div>
      <div>
        <div className="lock">
          <h6 id="selectable" data-tooltip-id="signatureToolTip">
            Signed with lit 🔒
          </h6>
        </div>
        <Tooltip
          id="signatureToolTip"
          anchorSelect="#selectable"
          effect="solid"
          style={{
            fontSize: "0.5em",
            display: "flex",
            flexDirection: "column",
          }}
          clickable
        >
          <div>
            <h5>Signature:</h5>
            <p>{signature.sig.signature}</p>
          </div>
          <div>
            <h5>Public Key:</h5>
            <p>{signature.sig.publicKey}</p>
          </div>
          <div>
            <h5>Timestamp:</h5>
            <p>{new Date(parseInt(signature.timestamp)).toUTCString()}</p>
          </div>
        </Tooltip>
        <div className="explorerContainer">
          <div className="folderContainer">
            <Folder explorer={files} onFile={setFile} />
          </div>
          <div className="fileContainer">
            <TextEditor fileContent={currentFile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchivedComponent;
