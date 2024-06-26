import React, { useState, useEffect } from "react";
import RepoList from "./components/repo-list";

import "./followed-comp.css";
import RepoAdd from "./components/repo-add";
import ArchivedComponent from "../archived/archived-comp";

function FollowedReposComponent() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chosenArchived, setChosenArchived] = useState({});
  const [showArchived, setShowArchived] = useState(false);

  async function onArchiveChoosen(cid) {
    getRepoUrl(cid)
      .then((repo) => {
        setChosenArchived(repo);
      })
      .then(() => {
        setShowArchived(true);
      });
  }

  async function getRepoUrl(cid) {
    try {
      const response = await fetch(
        "http://localhost:3001/archiveFromCid?cid=" + cid
      );
      const jsObj = await response.json();
      console.log("JSObj:", jsObj);
      if (jsObj.signature && jsObj.signature.repoUrl) {
        jsObj.signature.cid = cid;
        return jsObj;
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
      {showArchived ? (
        <ArchivedComponent
          signature={chosenArchived.signature}
          arrayBuffer={chosenArchived.bufferArray}
        />
      ) : (
        <div>
          <RepoAdd listFilter={filterRepos} />
          <RepoList
            listOfRepos={repos}
            loading={loading}
            onArchiveChoosen={onArchiveChoosen}
          />
        </div>
      )}
    </div>
  );
}

export default FollowedReposComponent;
