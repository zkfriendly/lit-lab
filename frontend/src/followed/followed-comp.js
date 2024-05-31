import React, { useState, useEffect } from "react";
import RepoList from "./components/repo-list";

import "./followed-comp.css";
import RepoAdd from "./components/repo-add";

// import useTraverseTree from "./hooks/use-traverse-tree";

function FollowedReposComponent() {
  const [repos, setRepos] = useState([]);

  const getRepos = async () => {
    // Get the list of followed repos
    const repoList = await fetch("http://localhost:3001/followed-repos");
    repoList.json().then((repoList) => {
      setRepos(repoList.repos);
    });
  };

  const filterRepos = (filter) => {
    if (filter === "") {
      getRepos();
    } else {
      const filteredRepo = repos.filter((repo) => {
        return repo.includes(filter);
      });
      setRepos(filteredRepo);
    }
  };

  useEffect(() => {
    getRepos();
  }, []);

  return (
    <div className="followed-comp">
      <RepoAdd listFilter={filterRepos} />

      <RepoList listOfRepos={repos} />
    </div>
  );
}

export default FollowedReposComponent;
