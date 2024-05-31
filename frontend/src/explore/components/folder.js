import React, { useState } from "react";
import "./folder.css";
// import { on } from "events";

const Folder = (props) => {
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [expand, setExpand] = useState(false);
  const onFile = props.onFile;
  const explorer = props.explorer;

  if (explorer.isFolder) {
    return (
      <div className="fileExplorer">
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📂 {explorer.name}</span>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📂" : "📄"}</span>
              <input
                autoFocus
                // onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                type="text"
                className="inputContainer__input"
              />
            </div>
          )}
          {explorer.items.map((item) => {
            return (
              <Folder
                // handleInsertNode={handleInsertNode}
                explorer={item}
                key={item.id}
                onFile={onFile}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <span
        className="file"
        onClick={() => {
          console.log(explorer.content);
          if (typeof onFile === "function") {
            onFile(explorer.content);
          }
        }}
      >
        📄 {explorer.name}
      </span>
    );
  }
};

export default Folder;
