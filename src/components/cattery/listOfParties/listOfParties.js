import React, { useState, Fragment, useEffect } from "react";
import "./listOfParties.css";
import PartyCard from "./partyCard/partyCard";
const ListOfParties = props => {
  const [parties, setParties] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    //Takes list of all parties. Sorts by if isReservation is true or false
    let partiesList = props.parties.filter(party => {
      return party.rowNum === 1;
    });

    let reservationsList = props.parties.filter(party => {
      return party.rowNum === 2;
    });

    setParties(partiesList);
    setReservations(reservationsList);
  }, [props.parties]);

  return (
    <Fragment>
      <div id="cattery" className="row-container">
        <h2 className="title">
          {props.title} ({props.currentOccupancy})
        </h2>
        <div id="list-of-parties-container">
          {parties.map(party => {
            return (
              <PartyCard
                countDownSpeed={props.countDownSpeed}
                key={party.id}
                onClick_remove={props.onClick_remove}
                onClick_checkReservation={props.onClick_checkReservation}
                handleUpdateTimes={props.handleUpdateTimes}
                party={party}
                updatePartyData={props.updatePartyData}
                handleEditModalToggle={props.handleEditModalToggle}
                calcCurrentNumOfSpotsLeft={props.calcCurrentNumOfSpotsLeft}
                updateCurrentPartyLists={props.updateCurrentPartyLists}
              />
            );
          })}
        </div>
      </div>
      <div id="reservations" className="row-container">
        <h2 className="title">
          {props.title} ({props.currentOccupancy})
        </h2>
        <div id="list-of-parties-container">
          {reservations.map(party => {
            return (
              <PartyCard
                countDownSpeed={props.countDownSpeed}
                key={party.id}
                onClick_remove={props.onClick_remove}
                onClick_checkReservation={props.onClick_checkReservation}
                handleUpdateTimes={props.handleUpdateTimes}
                party={party}
                updatePartyData={props.updatePartyData}
                handleEditModalToggle={props.handleEditModalToggle}
                calcCurrentNumOfSpotsLeft={props.calcCurrentNumOfSpotsLeft}
                updateCurrentPartyLists={props.updateCurrentPartyLists}
                handleMoveParty={props.handleMoveParty}
              />
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default ListOfParties;
