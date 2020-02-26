import React from "react";
import MainPage from "./pages/main-page";
import CreatePage from "./pages/create-page";
import ShowPage from "./pages/show-page"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/create">
            <CreatePage />
          </Route>
          <Route path="/show/:_id">
            <ShowPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
