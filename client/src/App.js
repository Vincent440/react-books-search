/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import search from './pages/search';
import saved from './pages/saved';
import noMatch from "./pages/noMatch";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" component={search} />
          <Route exact path="/saved" component={saved} />
          <Route component={noMatch} />
        </Switch>
      </div>
    </Router>
    );
}

export default App;
