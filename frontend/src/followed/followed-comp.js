import React, { useState, useEffect } from "react";
import RepoList from "./components/repo-list";

import "./followed-comp.css";
import RepoAdd from "./components/repo-add";

function FollowedReposComponent() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getRepoUrl(cid) {
    try {
      const response = await fetch(
        "http://localhost:3001/archiveFromCid?cid=" + cid
      );
      const jsObj = await response.json();
      if (jsObj.signature && jsObj.signature.repoUrl) {
        return jsObj.signature.repoUrl;
      } else {
        return cid;
      }
    } catch (error) {
      console.error("Error fetching repo URL:", error);
      return cid;
    }
  }

  const getRepos = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/archive");
      const reposList = await response.json();
      const filteredRepos = reposList.repos.filter((repo) => !repo.mimeType);

      const repoUrls = await Promise.all(
        filteredRepos.map((repo) => getRepoUrl(repo.cid))
      );

      setRepos(repoUrls);
    } catch (error) {
      console.error("Error fetching repos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterRepos = (filter) => {
    if (filter === "") {
      getRepos();
    } else {
      const filteredRepo = repos.filter((repo) => repo.includes(filter));
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
