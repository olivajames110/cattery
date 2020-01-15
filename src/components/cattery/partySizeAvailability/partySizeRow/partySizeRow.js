import React, { Component } from "react";
import { checkMark } from "../../../../utils/icons/icons";
import "./css/partySizeRow.css";
import { render } from "@testing-library/react";

class PartySizeRow extends Component {
  state = {
    isAvailable: false,
    nextAvailableTime: "2:45"
  };

  componentWillMount() {
    this.checkIfAvailable();
  }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     this.checkIfAvailable();
  //     return nextState.blocks.length > this.state.blocks.length;
  //   }

  checkIfAvailable = () => {
    let currentParty = this.props.partySize * 60;
    let currentParties = this.props.currentNumOfPeople * 60;
    let listOfParties = this.props.listOfParties;

    if (currentParty < currentParties) {
      console.log("Current: " + currentParty);
      console.log("End: " + currentParties);
      console.log("Parties: " + this.props.currentNumOfPeople);
      this.setState({
        isAvailable: true
      });
    } else {
      this.setState({
        isAvailable: false
      });
    }
  };

  getNextAvailableTime = () => {
    let nextAvailableTime;
    let timeRemaining = this.props.currentNumOfPeople * 60;
    // if (this.props.partySize * 60 <= timeRemaining) {
    //   // let sortedList = this.props.listOfParties.sort();
    //   this.props.listOfParties[0].timeEnd;
    // }

    let endTime = this.props.listOfParties[0].timeEnd;
    //
    let numInEndtimeParty = this.props.listOfParties[0].numberInParty;
    let numInEndtimeParty__min = this.props.listOfParties[0].numberInParty * 60;
    //
    let numInEnteringPary = this.props.partySize;
    let numInEnteringPary__min = this.props.partySize * 60;

    let newTimeRemaining__min = numInEndtimeParty__min;

    if (numInEnteringPary__min < newTimeRemaining__min) {
      console.log("You May Enter");
    } else {
      //   console.log("Return NextAvailableTime (${tis})");
      console.log(
        `Return NextAvailableTime (Current Time + (Current Time - End Time)|| ${this.props.currentTime} + time remainings`
      );
    }
    console.log(`End Time: ${endTime}`);

    // return currentTime + timeDifference;
    // return nextAvailableTime;
  };

  render() {
    const { partySize } = this.props;

    return (
      <div
        onClick={() => {
          this.getNextAvailableTime();
        }}
        id="party-size1"
        className="party-size-wrapper"
      >
        <div className="party-size">{partySize}</div>
        <div className="next-available-time">
          {partySize * 60 <= 900 - this.props.currentNumOfPeople * 60
            ? checkMark
            : this.state.nextAvailableTime}
        </div>
      </div>
    );
  }
}

export default PartySizeRow;
