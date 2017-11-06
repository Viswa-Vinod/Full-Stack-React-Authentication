import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import Welcome from "./Welcome";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Welcome} />
      </div>
    );
  }
}
