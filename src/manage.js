import React, { Component } from "react";
import "./manage.css";

export default class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    };
  }
  componentDidMount() {
    let toLoad = JSON.parse(localStorage.getItem("stockData"));
    this.setState({ stocks: toLoad });
  }
  removeItem(val) {
    let store = JSON.parse(localStorage.getItem("stockData"));
    store.splice(store.indexOf(val), 1);
    localStorage.setItem("stockData", JSON.stringify(store));
    this.setState({ stocks: store });
  }

  render() {
    return (
      <div className="manage">
        <ul>
          {this.state.stocks.map(val => (
            <li>
              {val}
              <span
                className="close"
                onClick={() => {
                  this.removeItem(val);
                }}
              >
                X
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
