import React, { Component, Fragment } from "react";
import "./css/partyCard.css";
import { dollarSign } from "../../../../utils/icons/icons";
import * as moment from "moment";

class PartyCard extends Component {
    state = {
        timeRemaining: 60,
        width: "1%",
        isReservation: null,
        isPaid: null
    };

    componentDidMount() {
        this.setState({
            isReservation: this.props.party.isReservation,
            isPaid: this.props.party.paid
        });

        if (!this.props.party.isReservation) {
            this.handleUpdateTimeRemaining();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentTime !== this.props.currentTime) {
            this.handleUpdateTimeRemaining();
        }
    }

    handleUpdateTimeRemaining = () => {
        let currentTime = moment(this.props.currentTime, "HH:mm:ss a");
        let endTime = moment(this.props.party.times.end, "HH:mm:ss a");
        let duration = moment.duration(endTime.diff(currentTime));
        let hours = parseInt(duration.asHours());
        let timeLeft;
        if (hours === 1) {
            timeLeft = 60;
        } else {
            timeLeft = parseInt(duration.asMinutes()) % 60;
        }

        this.setState({
            timeRemaining: timeLeft
        });
    };

    handleButtonClick = () => {
        if (!this.props.party.isReservation) {
            this.props.handleRemoveParty(this.props.party.id, this.props.party.numberInParty);
        } else {
            this.props.handleEditModalToggle(this.props.party.id);
            this.props.handleCheckReservation(this.props.party.id, this.props.party.numberInParty);
            // this.handleStartCountdown();
        }
        console.log("CHECKED IN");
    };

    handleIsPaidToggle = () => {
        this.props.updatePartyData(this.props.party.id, "paid", !this.state.isPaid);
        this.setState({
            isPaid: !this.state.isPaid
        });
    };

    handleFill = () => {
        this.setState({
            width: "100%"
        });
    };

    render() {
        const { name, description, numberInParty, isReservation, times, isUpcomingReservation } = this.props.party;

        return (
            <div
                style={{
                    backgroundColor: this.state.timeRemaining >= 1 ? "#fbfbfb" : "#ffbaba"
                }}
                // className={`party-wrapper ${this.state.isReservation ? 'reservation' : ''}`}
                className="party-wrapper"
            >
                <div
                    // className="details-container"
                    className={`details-container ${isReservation && isUpcomingReservation ? "reservation" : ""}`}
                    // style={{
                    // 	backgroundColor : isUpcomingReservation ? '#c9dfeb' : '#fbfbfb'
                    // }}
                >
                    <div className="detail-row" id="party-name">
                        <span id="title"> Name: </span> <span id="name"> {name} </span>{" "}
                    </div>
                    <div className="detail-row" id="description">
                        <span className="details-title"> Description: </span> <span className="details-value"> {description} </span>{" "}
                    </div>{" "}
                    <div className="sub-details-container">
                        <div className="detail-row" id="number-in-party">
                            <span className="details-title"> Size: </span> <span className="details-value"> {numberInParty} </span>{" "}
                        </div>{" "}
                        <div className="detail-row" id="status">
                            <span className="details-title"> Status: </span> <span className="details-value"> {isReservation ? "Reservation" : "In Room"} </span>{" "}
                        </div>{" "}
                        <div
                            onClick={() => {
                                this.handleIsPaidToggle();
                            }}
                            className="detail-row"
                            id="payment"
                        >
                            <span className="details-title"> Paid: </span>{" "}
                            <span
                                style={{
                                    color: this.state.isPaid ? "#6fa037" : "#ff0000"
                                }}
                                className="details-value"
                            >
                                {dollarSign}{" "}
                            </span>{" "}
                        </div>{" "}
                    </div>{" "}
                </div>{" "}
                <div className="time-remaining-cta-container">
                    <div className="time-remaining-container">
                        <span id="time-remaining">
                            <span id="title"> {isReservation ? "Reservation Time" : "Time Left"}: </span>{" "}
                            <span id="time">
                                {" "}
                                {isReservation ? (
                                    times.start
                                ) : (
                                    <Fragment>
                                        <span> {this.state.timeRemaining} </span> <span> min </span>{" "}
                                    </Fragment>
                                )}{" "}
                            </span>{" "}
                        </span>{" "}
                        <div className="time-start-end-container">
                            <div className="detail-row" id="time-start">
                                <span className="details-title"> Start: </span> <span className="details-value"> {times.start} </span>{" "}
                            </div>{" "}
                            <div className="detail-row" id="time-end">
                                <span className="details-title"> End: </span> <span className="details-value"> {times.end} </span>{" "}
                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                    <div className="cta-container">
                        <button
                            onClick={() => {
                                this.handleButtonClick();
                            }}
                            className="complete-btn"
                        >
                            <span> {this.state.isReservation ? "Check-In" : "Complete"} </span>{" "}
                            <div
                                style={{
                                    width: this.state.width
                                }}
                                className="fill"
                            />
                        </button>{" "}
                    </div>{" "}
                </div>{" "}
            </div>
        );
    }
}

export default PartyCard;
