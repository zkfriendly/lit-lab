import React, { useState } from "react";
import SearchBox from "./components/searchbox.js";
import Folder from "./components/folder.js";
import TextEditor from "./components/text-editor.js";
import { BounceLoader } from "react-spinners";
import { Tooltip } from "react-tooltip";
import "./explore_comp.css";
// import useTraverseTree from "./hooks/use-traverse-tree";

function ExploreComponent() {
  const [files, setFiles] = useState({});
  const [fetching, setFetching] = useState(false);
  const [signature, setSignature] = useState({});
  const [currentFile, setFile] = useState("Select a file to view its content");

  return (
    <div>
      <SearchBox
        onFiles={setFiles}
        onFetch={setFetching}
        onSignature={setSignature}
      />
      {JSON.stringify(files) === "{}" ? (
        <div className="loadingSpinner">
          {fetching ? <BounceLoader color="#36d7b7" /> : <span></span>}
        </div>
      ) : (
        <div>
          <div
            id="selectable"
            data-tooltip-id="signatureToolTip"
            className="lock"
          >
            <h6>Signed with lit 🔒</h6>
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
              <h6>Signature:</h6>
              <p>{signature.sig.signature}</p>
            </div>
            <div>
              <h6>Public Key:</h6>
              <p>{signature.sig.publicKey}</p>
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
      )}
    </div>
  );
}

export default ExploreComponent;
