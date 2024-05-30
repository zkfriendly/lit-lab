import React, { useState } from "react";
import "./folder.css";

const Folder = ({ explorer }) => {
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [expand, setExpand] = useState(false);

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 20, marginLeft: 10, marginBottom: 20 }}>
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
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
};

export default Folder;
