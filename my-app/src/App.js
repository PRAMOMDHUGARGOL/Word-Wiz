import "./App.css";
import React, { useState } from "react";

import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar title="Word-WIZ" />
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <TextForm heading="Text Box" />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
