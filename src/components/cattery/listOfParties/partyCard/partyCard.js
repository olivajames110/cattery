import React, { Component } from "react";
import "./css/partyCard.css";
import { edit, checkMark, dollarSign } from "../../../../utils/icons/icons";

class PartyCard extends Component {
  state = {
    timeRemaining: 60,
    width: "1%",
    isReservation: null,
    reservationIsReady: null,
    isPaid: null
  };

  componentDidMount() {
    this.setState({
      isReservation: this.props.party.isReservation,
      reservationIsReady: this.props.party.reservationIsReady,
      isPaid: this.props.party.paid
    });

    if (!this.props.party.isReservation) {
      this.handleStartCountdown();
    }
  }

  // componentDidUpdate(prevProps) {
  // 	if (this.state.isReservation !== prevProps.isReservation) {
  // 		this.handleStartCountdown();
  // 	}
  // }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    console.log("Unmounted");
    clearInterval(this.interval);
  }

  handleStartCountdown = () => {
    let d = 60000;
    let t = 1500;
    if (!this.state.isReservation) {
      this.interval = setInterval(() => {
        let widthAmt;
        if (this.state.width === "100%") {
          widthAmt = "100%";
        } else {
          widthAmt = `${100 - 100 / (61 / this.state.timeRemaining)}%`;
        }
        console.log("LOOOOP");
        this.setState({
          timeRemaining: this.state.timeRemaining - 1,
          width: widthAmt
        });
      }, this.props.countDownSpeed);
    } else {
      this.setState({
        width: "0%"
      });
    }
  };

  handleButtonClick = () => {
    if (!this.state.isReservation) {
      this.props.onClick_remove(
        this.props.party.id,
        this.props.party.numberInParty
      );
    } else if (this.state.isReservation && this.state.reservationIsReady) {
      this.setState(
        {
          isReservation: false
        },
        () => {
          this.props.handleEditModalToggle(this.props.party.id);
          this.props.handleUpdateTimes(this.props.party.id);
          this.handleStartCountdown();
        }
      );
    } else if (this.state.isReservation && !this.state.reservationIsReady) {
      this.setState(
        {
          isReservation: false,
          reservationIsReady: true
        },

        () => {
          this.props.handleEditModalToggle(this.props.party.id);
          this.props.onClick_checkReservation(
            this.props.party.id,
            this.props.party.numberInParty
          );
        }
      );
    }

    console.log("CHECKED IN");
  };

  handleIsPaidToggle = () => {
    this.props.updatePartyData(this.props.party.id, "paid", !this.state.isPaid);
    this.setState({ isPaid: !this.state.isPaid });
  };

  handleFill = () => {
    this.setState({
      width: "100%"
    });
  };

  render() {
    const {
      id,
      name,
      description,
      numberInParty,
      paid,
      isReservation,
      reservationIsReady,
      timeStart,
      timeEnd
    } = this.props.party;

    return (
      <div
        style={{
          backgroundColor: this.state.timeRemaining >= 1 ? "#fbfbfb" : "#ffbaba"
        }}
        className={`party-wrapper ${
          this.state.isReservation ? "reservation" : ""
        }`}
      >
        <div className="details-container">
          <div className="detail-row" id="name">
            Party Name: {name}
          </div>
          <div className="detail-row" id="description">
            <span className="details-title">Description:</span>
            <span className="details-value">{description}</span>
          </div>
          <div className="sub-details-container">
            <div className="detail-row" id="number-in-party">
              <span className="details-title">Size:</span>
              <span className="details-value">{numberInParty}</span>
            </div>
            <div className="detail-row" id="status">
              <span className="details-title">Status:</span>
              <span className="details-value">
                {this.state.isReservation ? "Reservation" : "In Room"}
              </span>
            </div>
            <div
              onClick={() => {
                this.handleIsPaidToggle();
              }}
              className="detail-row"
              id="payment"
            >
              <span className="details-title">Paid:</span>
              <span
                style={{ color: this.state.isPaid ? "#6fa037" : "#c1c0c0" }}
                className="details-value"
              >
                {dollarSign}
              </span>
            </div>
          </div>
        </div>
        <div className="time-remaining-cta-container">
          <div className="time-remaining-container">
            <span id="time-remaining">
              <span id="title">Time Left:</span>
              <span id="time">{this.state.timeRemaining}</span>
            </span>
            <div className="time-start-end-container">
              <div className="detail-row" id="time-start">
                <span className="details-title"> Start:</span>
                <span className="details-value"> {timeStart}</span>
              </div>
              <div className="detail-row" id="time-end">
                <span className="details-title"> End:</span>
                <span className="details-value"> {timeEnd}</span>
              </div>
            </div>
          </div>
          <div className="cta-container">
            <button
              onClick={() => {
                this.handleButtonClick();
              }}
              className="complete-btn"
            >
              <span>{this.state.isReservation ? "Check-In" : "Complete"}</span>
              <div style={{ width: this.state.width }} className="fill"></div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PartyCard;
