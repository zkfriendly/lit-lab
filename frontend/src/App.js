import "./App.css";

import ExploreComponent from "./explore/explore_comp.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="logo.svg" className="App-logo" alt="logo" />

        <ExploreComponent />

        {/* <RepoUnzipper /> */}
      </header>
      <body></body>
    </div>
  );
}

export default App;
