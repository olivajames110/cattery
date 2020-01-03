import React, { Component } from "react";
import Input from "../../../utils/input/input";
import "./css/addParty.css";
let personn = [
  {
    name: "Carl",
    timeStart: "2:10",
    timeEnd: "3:10",
    timeRemaining: 60,
    width: "0%"
  }
];

class AddParty extends Component {
  state = {
    people: 1
  };

  addParty = (num, people) => {
    this.props.updateCurrentNumOfPeople(num, people);
  };

  handleUpdatePeople = () => {
    let valueNum = document.getElementById("num-value").value;

    this.setState({
      people: valueNum
    });
  };
  //Makes multuple inputs
  // handleMakeInputs = valueNum => {
  //   return Array.from(Array(Number(this.state.people))).map(person => (
  //     <Input label="Party Name:" type="text" />
  //   ));
  // };

  render() {
    const plusIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="plus"
        class="svg-inline--fa fa-plus fa-w-14"
        role="img"
        viewBox="0 0 448 512"
      >
        <path
          fill="currentColor"
          d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
        />
      </svg>
    );
    return (
      <div id="add-people-container">
        <h2>Add Party</h2>
        <div id="input-container-wrapper">
          <Input label="Party Name:" type="text" />
          <div id="input-container">
            <label>
              Description
              <textarea value={this.state.value} onChange={this.handleChange} />
            </label>
          </div>
          <div id="input-container">
            <label>Select # of People in Party:</label>
            <select
              onChange={this.handleUpdatePeople}
              id="num-value"
              valuename="number-of-people"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>

          <Input placeholder="placeholder" label="Party Name:" type="text" />
          <div
            onClick={() => this.addParty(this.state.people, personn)}
            id="input-container-button"
          >
            <span>Add Party</span>
            <span>{plusIcon}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default AddParty;
