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

function BasicButton(props) {
  return (
    <div>
      <button className="btn btn-outline-dark" onClick={props.function}>
        {props.text}
      </button>
    </div>
  );
}

function Introduction(props) {
  return (
    <section id="intro-section" className="flex flex-col">
      <div id="intro-container" className="flex flex-col container">
        {props.children}
      </div>
    </section>
  );
}

export { Introduction, BasicButton, Header };
export default App;
