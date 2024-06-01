import React, { useState, useEffect } from "react";
import RepoList from "./components/repo-list";

import "./followed-comp.css";
import RepoAdd from "./components/repo-add";

function FollowedReposComponent() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRepos = async () => {
    // Get the list of followed repos
    setLoading(true);
    const repoList = await fetch("http://localhost:3001/archive");
    repoList.json().then((repoList) => {
      setRepos(repoList.repos);
    });
    setLoading(false);
  };

  const filterRepos = (filter) => {
    if (filter === "") {
      getRepos();
    } else {
      const filteredRepo = repos.filter((repo) => {
        return repo.fileName.includes(filter);
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

      <RepoList listOfRepos={repos} loading={loading} />
    </div>
  );
}

export default FollowedReposComponent;
