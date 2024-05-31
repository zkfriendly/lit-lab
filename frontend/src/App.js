import "./App.css";
import React, { useState } from "react";

import ExploreComponent from "./explore/explore_comp.js";
import FollowedReposComponent from "./followed/followed-comp.js";

function App() {
  const [selected, setSelected] = useState("Explorer");

  return (
    <div className="App">
      <header className="App-header">
        <img src="logo.svg" className="App-logo" alt="logo" />
        <span
          onClick={() => setSelected("Explorer")}
          className={
            "App-map-link " + (selected === "Explorer" ? "selected" : "")
          }
        >
          Explorer
        </span>
        <span
          onClick={() => setSelected("Followed")}
          className={
            "App-map-link " + (selected === "Explorer" ? "" : "selected")
          }
        >
          Followed Repos
        </span>
      </header>
      <body className="App-body">
        {selected === "Explorer" ? (
          <ExploreComponent />
        ) : (
          <FollowedReposComponent />
        )}
      </body>
    </div>
  );
}

export default App;
