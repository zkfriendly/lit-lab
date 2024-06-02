import React from "react";
import "./repo-list.css";
import { BounceLoader } from "react-spinners";

const RepoList = ({ listOfRepos, loading, onArchiveChoosen }) => {
  return (
    <div className="RepoList">
      {loading ? (
        <BounceLoader color="#36d7b7" />
      ) : (
        <ul>
          {listOfRepos.map((repo) => {
            if (typeof repo === "string") {
              return <li key={repo}>{repo}</li>;
            }
            return (
              <li
                key={repo.signature.cid}
                onClick={() => onArchiveChoosen(repo.signature.cid)}
              >
                {repo.signature.repoUrl}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RepoList;
