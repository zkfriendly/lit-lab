import React, { useState } from "react";
import SearchBox from "./components/searchbox.js";
import Folder from "./components/folder.js";
// import useTraverseTree from "./hooks/use-traverse-tree";

function ExploreComponent() {
  const [files, setFiles] = useState({});
  console.log(files);
  console.log(Object.keys(files).lenght);
  return (
    <div>
      <SearchBox onFiles={setFiles} />
      {JSON.stringify(files) === "{}" ? (
        <span></span>
      ) : (
        <Folder explorer={files} />
      )}
    </div>
  );
}

export default ExploreComponent;
