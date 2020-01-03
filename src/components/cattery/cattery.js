import React, { Component } from "react";
import Input from "../../utils/input/input";
import AddPeople from "../addPeople/addPeople";
import ListOfPeople from "../listOfPeople/listOfPeople";
import "./cattery.css";
class Cattery extends Component {
  state = {
    currentNumOfPeople: 6,
    currentTime: "2:10 PM",
    listOfPeople: [
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
    this.setState({
      currentTime: "2:10PM"
    });
  }

  updateCurrentNumOfPeople = (num, people) => {
    let newPeopleList = [...this.state.listOfPeople, ...people];
    this.setState({
      currentNumOfPeople: Number(this.state.currentNumOfPeople) + Number(num),
      listOfPeople: newPeopleList
    });
  };
  render() {
    return (
      <div className="cattery-container">
        <div id="current-time">{this.state.currentTime}</div>
        <div id="number-of-people-container">
          <span id="current-number-of-people">
            <span className="number-in-cattery"># In Cattery</span>
            {this.state.currentNumOfPeople}
          </span>
          <AddPeople updateCurrentNumOfPeople={this.updateCurrentNumOfPeople} />
          <ListOfPeople listOfPeople={this.state.listOfPeople} />
        </div>
        <div className="group-size-availability">
          <h2>
            If a group of this size were to walk in...next available time.
          </h2>
          <div className="group-size-wrapper">
            <div className="group-size">3</div>
            <div className="next-available-time">Currently Available</div>
          </div>
          <div className="group-size-wrapper">
            <div className="group-size">4</div>
            <div className="next-available-time">Currently Available</div>
          </div>
          <div className="group-size-wrapper">
            <div className="group-size">5</div>
            <div className="next-available-time">Currently Available</div>
          </div>
          <div className="group-size-wrapper">
            <div className="group-size">11</div>
            <div className="next-available-time">2:20PM</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cattery;
