import React, { Component } from "react";
import "./details.css";
import StockDetails from "./stockdetails";
export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:
        "https://angular2-in-action-api.herokuapp.com/stocks/snapshot?symbols=",
      inputvalue: "",
      data: []
    };
  }
  handleSubmit(e) {
    // preventing form submission
    e.preventDefault();

    /* Fetching data  */

    fetch(this.state.url + this.state.inputvalue)
      .then(results => results.json())
      .catch(err => {
        console.log(err);
      })
      .then(newobj => {
        // Data has some content and has information ( Sometime you just get {Symbol : "Something "})
        if (newobj && newobj[0].change) {
          // If duplicate is found get the index of it in the state
          if (this.state.data.map(o => o.symbol).includes(newobj[0].symbol)) {
            //store index in a variable
            let inx = this.state.data
              .map(o => o.symbol)
              .indexOf(newobj[0].symbol);

            // update that portion with the recent data
            this.setState(current => {
              data: current.data
                .slice(0, inx)
                .concat(newobj)
                .concat(current.data.slice(inx + 1));
            });
          }

          // if couldn't find duplicate
          else {
            this.setState({ data: this.state.data.concat(newobj) });
            // check if local storage has it
            // let storedData= JSON.parse(localStorage.getItem('data'))
          }
        }

        // check local Storage

        // if exists make sure not to duplicate symbol
        if (localStorage.getItem("stockData")) {
          var found = JSON.parse(localStorage.getItem("stockData"));
          if (!found.includes(newobj[0].symbol)) {
            found.push(newobj[0].symbol);
            localStorage.setItem("stockData", JSON.stringify(found));
          }
        } else {
          localStorage.setItem(
            "stockData",
            JSON.stringify([].concat([newobj[0].symbol]))
          );
        }
      })
      .catch(err => {
        console.log(err);
      });

    // clear input

    this.setState({ inputvalue: "" });
  }
  componentDidMount() {
    this.refreshFromLocal();
    setInterval(() => {
      this.refreshFromLocal();
    }, 60000);
  }

  refreshFromLocal() {
    console.log("Refreshing Data  .....");
    let toLoad = JSON.parse(localStorage.getItem("stockData"));
    let requests = toLoad.map(x =>
      fetch(this.state.url + x).then(res => res.json())
    );
    Promise.all([...requests]).then(resp => {
      let temp = [];
      resp.forEach(arr => {
        temp.push(arr[0]);
      });
      this.setState({ data: temp });
    });
  }

  updateInputValue(e) {
    this.setState({ inputvalue: e.target.value });
  }
  //getting input from stockdetail component so it gets removed on X clicked
  getIndex(num) {
    let fetchedLocalStorageArr = JSON.parse(localStorage.getItem("stockData"));
    let itemToRemove = this.state.data[num].symbol;
    fetchedLocalStorageArr.splice(
      fetchedLocalStorageArr.indexOf(itemToRemove),
      1
    );
    localStorage.setItem("stockData", JSON.stringify(fetchedLocalStorageArr));
    this.state.data.splice(num, 1);
    this.setState({ data: this.state.data });
  }

  render() {
    return (
      <div className="details_view">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            value={this.state.inputvalue}
            onChange={this.updateInputValue.bind(this)}
            ref="input_box"
          />
          <input type="submit" className="btn-primary" />
        </form>
        <div className="wrapper">
          {this.state.data
            ? this.state.data.map((obj, index) => (
                <StockDetails
                  detail={obj}
                  key={index}
                  sendIndex={this.getIndex.bind(this)}
                  index={index}
                />
              ))
            : ""}
        </div>
      </div>
    );
  }
}
