//import logo from './logo.svg';
import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { CookiesProvider } from "react-cookie";

//import Wrapper from './components/Summoner';
import Home from "./components/Home";
import Uuid from "./components/Uuid";
import Gallery from "./components/Gallery";
const App = () => (
  <CookiesProvider>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* This will allow the user to view previous journeys */}
          {/* This will allow the user to retrieve liked images */}
          <Route path="/gallery" component={Gallery} />
          <Route path="/:uuid" component={Uuid} />
        </Switch>
      </Suspense>
    </Router>
  </CookiesProvider>
);

function Header(props) {
  return (
    <header>
      <nav className="flex gap-s">
        <a id="home-link" href="/">
          caskaydia
        </a>
        {!props.homepage && " | "}
        {!props.homepage && <a href="/">home</a>}
        {" | "}
        <a href="/gallery">gallery</a>
      </nav>
    </header>
  );
}
export { Header };
export default App;
