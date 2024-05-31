import React, { useState } from "react";
import RepoList from "./components/repo-list";

import "./followed-comp.css";
import RepoAdd from "./components/repo-add";

// import useTraverseTree from "./hooks/use-traverse-tree";

function FollowedReposComponent() {
  return (
    <div className="followed-comp">
      <RepoAdd />

      <RepoList
        listOfRepos={[
          "repo1",
          "repo2",
          "repo3",
          "repo1",
          "repo2",
          "repo3",
          "repo1",
          "repo2",
          "repo3",
          "repo1",
          "repo2",
          "repo3",
        ]}
      />
    </div>
  );
}

export default FollowedReposComponent;
