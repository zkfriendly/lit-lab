import React, { useState } from "react";
import SearchBox from "./components/searchbox.js";
import Folder from "./components/folder.js";
import TextEditor from "./components/text-editor.js";
import { BounceLoader } from "react-spinners";
import "./explore_comp.css";
// import useTraverseTree from "./hooks/use-traverse-tree";

function ExploreComponent() {
  const [files, setFiles] = useState({});
  const [fetching, setFetching] = useState(false);
  const [currentFile, setFile] = useState("Select a file to view its content");

  return (
    <div>
      <SearchBox onFiles={setFiles} onFetch={setFetching} />
      {JSON.stringify(files) === "{}" ? (
        <div className="loadingSpinner">
          {fetching ? <BounceLoader color="#36d7b7" /> : <span></span>}
        </div>
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
