import React, { useState } from "react";
import SearchBox from "./components/searchbox.js";
import Folder from "./components/folder.js";
import TextEditor from "./components/text-editor.js";
import "./explore_comp.css";
// import useTraverseTree from "./hooks/use-traverse-tree";

function ExploreComponent() {
  const [files, setFiles] = useState({});
  const [currentFile, setFile] = useState("Select a file to view its content");

  return (
    <div>
      <SearchBox onFiles={setFiles} />
      {JSON.stringify(files) === "{}" ? (
        <span></span>
      ) : (
        <div className="explorerContainer">
          <div className="folderContainer">
            <Folder explorer={files} onFile={setFile} />
          </div>
          <div className="fileContainer">
            <TextEditor fileContent={currentFile} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ExploreComponent;
