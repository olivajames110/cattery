import React, { Component } from "react";
import Input from "../../utils/input/input";
import AddParty from "./addParty/addParty";
import ListOfParties from "./listOfParties/listOfParties";
import PartySizeAvailability from "./partySizeAvailability/partySizeAvailability";
import "./css/cattery.css";
class Cattery extends Component {
  state = {
    currentNumOfPeople: 0,
    currentTime: "2:10 PM",
    listOfParties: [
      {
        name: "John",
        timeStart: "1:20",
        timeEnd: "2:20",
        numberInParty: 2,
        width: "90%",
        timeRemaining: 10
      },
      {
        name: "James",
        timeStart: "1:50",
        timeEnd: "2:50",
        numberInParty: 2,
        width: "50%",
        timeRemaining: 30
      },
      {
        name: "Pete",
        timeStart: "1:50",
        timeEnd: "2:50",
        numberInParty: 2,
        width: "50%",
        timeRemaining: 30
      }
    ]
  };

  componentDidMount() {
    let currentTime = formatAMPM(new Date()).toUpperCase();
    function formatAMPM(date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let currentTime = hours + ":" + minutes + " " + ampm;
      return currentTime;
    }

    this.setState({
      currentTime: currentTime
    });
  }

  updateCurrentNumOfPeople = (num, people) => {
    let newPeopleList = [...this.state.listOfParties, ...people];
    this.setState({
      currentNumOfPeople: Number(this.state.currentNumOfPeople) + Number(num),
      listOfParties: newPeopleList
    });
  };
  render() {
    const clockIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="clock"
        class="svg-inline--fa fa-clock fa-w-16"
        role="img"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
        />
      </svg>
    );

    const usersIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="user-friends"
        class="svg-inline--fa fa-user-friends fa-w-20"
        role="img"
        viewBox="0 0 640 512"
      >
        <path
          fill="currentColor"
          d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"
        />
      </svg>
    );
    return (
      <div className="cattery-container">
        <div id="cattery-panel-col">
          <div id="time-and-people-container">
            <div id="current-time-wrapper" className="container">
              <span className="icon">{clockIcon}</span>
              <div className="primary-value">{this.state.currentTime}</div>
            </div>
            <div id="current-number-of-people-wrapper">
              <span className="icon">{usersIcon}</span>

              <span className="primary-value  number-in-cattery">
                {this.state.currentNumOfPeople}
              </span>
              <span className="open-spots">Active People</span>
            </div>
          </div>
          <PartySizeAvailability />
        </div>
        <div id="cattery-body-col">
          <div id="number-of-people-container">
            <AddParty
              updateCurrentNumOfPeople={this.updateCurrentNumOfPeople}
            />
          </div>
          <ListOfParties listOfParties={this.state.listOfParties} />
        </div>
      </div>
    );
  }
}

export default Cattery;
