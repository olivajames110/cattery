import React, { Component } from "react";
import Input from "../../../utils/input/input";
import TimePicker from "react-time-picker";
import "./css/addParty.css";
let personn = [
  {
    name: "Carll",
    description: "1 person with black shirt, red hat",
    numberInParty: 2,
    paid: true,
    status: "In Room",
    timeRemaining: 60,
    timeStart: "2:10",
    timeEnd: "3:10",
    isReservation: true
  }
];

class AddParty extends Component {
  state = {
    name: null,
    description: null,
    numberInParty: 2,
    paid: false,
    status: null,
    timeRemaining: null,
    timeStart: "10:00",
    timeEnd: null,
    isReservation: false
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

  handleUpdateWalkIn = () => {
    this.setState({ isReservation: false });
  };
  handleUpdateReservation = () => {
    this.setState({ isReservation: true });
  };

  onChange = time => this.setState({ time });
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

    const timeInputs = (
      <div className="time-input-container">
        <TimePicker onChange={this.onChange} value={this.state.time} />
      </div>
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
          <div id="walkIn-res__container">
            <span className="title">Party Type</span>
            <div className="walkIn-res__wrapper">
              <span
                onClick={this.handleUpdateWalkIn}
                id="walk-on"
                className={`walkIn-res__btn ${
                  !this.state.isReservation ? "active" : ""
                }`}
              >
                Walk-In
              </span>
              <span
                onClick={this.handleUpdateReservation}
                id="reservation"
                className={`walkIn-res__btn ${
                  this.state.isReservation ? "active" : ""
                }`}
              >
                Reservation
              </span>
            </div>
            {!this.state.isReservation ? "" : timeInputs}
          </div>

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
