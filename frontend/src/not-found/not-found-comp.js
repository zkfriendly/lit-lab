import React, { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";

import "./not-found-comp.css";

function NotFoundComponent({ repoLink }) {
  const [addingRepo, setAddingRepo] = useState(false);

  const addRepo = async () => {
    // Add the repo to the list of followed repos
    setAddingRepo(true);
    const response = await fetch("http://localhost:3001/followed-repos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repo: repoLink }),
    });
    setAddingRepo(false);
  };

  return (
    <div className="notFound">
      {addingRepo ? (
        <BounceLoader color="#36d7b7" />
      ) : (
        <div className="notFound">
          <h2>
            Hmm... It seems that we don't have your repo in our followed list
          </h2>
          <h3>Would you like to add it?</h3>
          <span onClick={addRepo}>{repoLink}</span>
        </div>
      )}
    </div>
  );
}

export default NotFoundComponent;
