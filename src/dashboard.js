import React, { Component } from "react";
import "./dashboard.css";
import Header from "./header";
import Details from "./details";
import Manage from "./manage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class DashBoard extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />

         
          <Route path="/details" component={Details} />
          <Route path="/manage" component={Manage} />
        </div>
      </Router>
    );
  }
}
