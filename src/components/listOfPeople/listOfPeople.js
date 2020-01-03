import React from "react";
import "./listOfPeople.css";
const ListOfPeople = props => {
  const peopleList = props.listOfPeople.map(person => {
    return (
      <div className="person-wrapper">
        <div className="details-container">
          <span id="name">Party Name: {person.name}</span>
          <span id="number-in-party"># In Party: {person.numberInParty}</span>
          <span id="time-start">Time Start: {person.timeStart}</span>
          <span id="time-end">Time End: {person.timeEnd}</span>
          <span id="time-remaining">
            <span id="title">Minutes Remaining:</span>
            <span id="time">{person.timeRemaining}</span>
          </span>
        </div>
        <div className="people-in-party-container">
          <div className="person"></div>
          <div className="person"></div>
          <div style={{ width: person.width }} className="fill"></div>
        </div>
      </div>
    );
  });

  return <div id="list-of-people-container">{peopleList}</div>;
};

export default ListOfPeople;
