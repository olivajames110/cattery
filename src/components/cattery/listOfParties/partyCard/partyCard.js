import React from "react";
import "./css/partyCard.css";
const PartyCard = props => {
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
    <div
      style={{
        backgroundColor: props.party.timeRemaining !== 0 ? "#fbfbfb" : "#ffbaba"
      }}
      className={`party-wrapper ${
        props.party.isReservation ? "reservation" : ""
      }`}
    >
      <div className="details-container">
        <div className="detail-row" id="name">
          Party Name: {props.party.name}
        </div>
        <div className="detail-row" id="description">
          <span className="details-title">Description:</span>
          <span className="details-value">{props.party.description}</span>
        </div>
        <div className="sub-details-container">
          <div className="detail-row" id="number-in-party">
            <span className="details-title">Size:</span>
            <span className="details-value">{props.party.numberInParty}</span>
          </div>
          <div className="detail-row" id="status">
            <span className="details-title">Status:</span>
            <span className="details-value">
              {props.party.isReservation ? "Reservation" : "In Room"}
            </span>
          </div>
          <div className="detail-row" id="payment">
            <span className="details-title">Paid:</span>
            <span className="details-value">{checkMark}</span>
          </div>
        </div>
      </div>
      <div className="time-remaining-container">
        <div style={{ width: props.party.width }} className="fill"></div>
        <span id="time-remaining">
          <span id="title">Minutes Remaining:</span>
          <span id="time">{props.party.timeRemaining}</span>
        </span>
        <div className="time-start-end-container">
          <div className="detail-row" id="time-start">
            <span className="details-title"> Start:</span>
            <span className="details-value"> {props.party.timeStart}</span>
          </div>
          <div className="detail-row" id="time-end">
            <span className="details-title"> End:</span>
            <span className="details-value"> {props.party.timeEnd}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyCard;
