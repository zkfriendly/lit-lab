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
  const [repoUrl, setRepoUrl] = useState("");
  const [archiving, setArchiving] = useState(false);
  const [archived, setArchived] = useState(false);

  async function archive() {
    setArchiving(true);
    const proxyUrl = `http://localhost:3001/archive?url=${encodeURIComponent(
      repoUrl
    )}`;
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setArchiving(false);
    setArchived(true);
  }

  return (
    <div>
      <SearchBox
        onFiles={setFiles}
        onFetch={setFetching}
        onSignature={setSignature}
        onRepoUrl={setRepoUrl}
      />
      {JSON.stringify(files) === "{}" ? (
        <div className="loadingSpinner">
          {fetching ? <BounceLoader color="#36d7b7" /> : <span></span>}
        </div>
      ) : (
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
              <p>{Date(signature.timestamp)}</p>
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
          <div className="footer">
            {archiving ? ( // If archiving, show spinner
              <BounceLoader color="#36d7b7" />
            ) : (
              <span></span>
            )}
            {archived ? ( // If archived, show message
              <h6>Archived!</h6>
            ) : (
              <button onClick={archive} className="footerButton">
                Archive
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExploreComponent;
