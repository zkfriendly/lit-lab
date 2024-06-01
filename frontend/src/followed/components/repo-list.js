import React from "react";
import "./repo-list.css";
import { BounceLoader } from "react-spinners";

const RepoList = ({ listOfRepos, loading }) => {
  return (
    <div className="RepoList">
      {loading ? (
        <BounceLoader color="#36d7b7" />
      ) : (
        <ul>
          {listOfRepos.map((repo) => {
            return <li key={repo}>{repo}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default RepoList;
