import React, { Component } from "react";
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
    let currentParties = this.props.listOfParties;

    if (currentParty < currentParties) {
      console.log("Current: " + currentParty);
      console.log("End: " + currentParties);
      console.log("Parties: " + currentParties);
      this.setState({
        isAvailable: true
      });
    } else {
      this.setState({
        isAvailable: false
      });
    }
  };

  render() {
    const { partySize } = this.props;
    const checkMark = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="checkmark"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="check"
        class="svg-inline--fa fa-check fa-w-16"
        role="img"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
        />
      </svg>
    );

    return (
      <div id="party-size1" className="party-size-wrapper">
        <div className="party-size">{partySize}</div>
        <div className="next-available-time">
          {this.state.isAvailable ? checkMark : this.state.nextAvailableTime}
        </div>
      </div>
    );
  }
}

export default PartySizeRow;
