import React, { Component } from "react";
import "./header.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ""
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }
  render() {
    return (
      <div className="header">
        <span className="padLeft"> Stock app</span>
        <div className="buttons">
          {this.state.time
            ? `${this.state.time.getHours()}:${
                this.state.time.getMinutes() > 9
                  ? this.state.time.getMinutes()
                  : "0" + this.state.time.getMinutes()
              }:${
                this.state.time.getSeconds() > 9
                  ? this.state.time.getSeconds()
                  : "0" + this.state.time.getSeconds()
              }`
            : ""}
          <Link to="/details">
            <button className="btn-primary">Dashboard</button>
          </Link>
          <Link to="/manage">
            <button className="btn-primary"> Manage </button>
          </Link>
        </div>
      </div>
    );
  }
}
