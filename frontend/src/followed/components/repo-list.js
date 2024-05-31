import React, { useState, useEffect } from "react";
import "./repo-list.css";

const RepoList = ({ listOfRepos }) => {
  return (
    <div className="RepoList">
      <ul>
        {listOfRepos.map((repo) => {
          return <li>{repo}</li>;
        })}
      </ul>
    </div>
  );
};

export default RepoList;
