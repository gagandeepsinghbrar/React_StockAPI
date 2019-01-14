import React, { Component } from "react";
import "./stockdetails.css";
import error from "./error.png";
export default class StockDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { fadeIn: false };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ fadeIn: true });
    }, 4);
  }
  forward() {
    this.props.sendIndex(this.props.index);
  }
  render() {
    return (
      <div
        className={
          "stock_box " +
          (Number(this.props.detail.change) < 0 ? "loss " : "profit ") +
          (this.state.fadeIn ? "fillUp" : "")
        }
      >
        <img src={error} onClick={this.forward.bind(this)} className="cross" />
        <p>{this.props.detail.symbol}</p>
        <p>$ {this.props.detail.lastTradePriceOnly}</p>
        <p>Change : {Math.round(this.props.detail.change * 100000) / 100000}</p>
        <p>
          ( % {Math.round(this.props.detail.changeInPercent * 100000) / 100000})
        </p>
      </div>
    );
  }
}
