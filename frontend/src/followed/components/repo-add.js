import React, { useState, useEffect } from "react";
import "./repo-add.css";

const RepoAdd = () => {
  const [repoUrl, setRepoUrl] = useState("");
  // const [fileList, setFileList] = useState({});

  const handleUrlChange = (e) => {
    setRepoUrl(e.target.value);
  };

  const addUrl = async () => {
    // Add the url to the list of followed repos
  };

  return (
    <div>
      <input
        className="addTextBox"
        type="text"
        onChange={handleUrlChange}
        value={repoUrl}
        placeholder="Couldn't find the repo? Add it here!"
      />
      <input
        className="submitBtn"
        type="submit"
        value="Add Repo"
        onClick={addUrl}
      />
    </div>
  );
};

export default RepoAdd;
