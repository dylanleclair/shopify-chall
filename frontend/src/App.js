//import logo from './logo.svg';
import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { CookiesProvider } from "react-cookie";

//import Wrapper from './components/Summoner';
import Home from "./components/Home";
import Uuid from "./components/Uuid";
const App = () => (
  <CookiesProvider>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* This will allow the user to view previous journeys */}
          <Route path="/:uuid" component={Uuid} />
          {/* This will allow the user to retrieve liked images */}
          <Route path="/gallery" component={Uuid} />
        </Switch>
      </Suspense>
    </Router>
  </CookiesProvider>
);

export default App;
