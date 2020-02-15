import React, { useState, Fragment, useEffect } from "react";
import "./listOfParties.css";
import PartyCard from "./partyCard/partyCard";
import { sortPartyArray } from "../../../utils/helpers/helpers";
const ListOfParties = props => {
    const [parties, setParties] = useState([]);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        let sortedPartiesList = sortPartyArray(props.parties, 1, true);
        let sortedReservationsList = sortPartyArray(props.parties, 2, true);

        setParties(sortedPartiesList);
        setReservations(sortedReservationsList);
    }, [props.parties]);

    const mapList = array => {
        return array.map(party => {
            return (
                <PartyCard
                    modifyStateNum={props.modifyStateNum}
                    countDownSpeed={props.countDownSpeed}
                    currentTime={props.currentTime}
                    key={party.id}
                    handleRemoveParty={props.handleRemoveParty}
                    handleCheckReservation={props.handleCheckReservation}
                    party={party}
                    updatePartyData={props.updatePartyData}
                    handleEditModalToggle={props.handleEditModalToggle}
                    updateCurrentPartyLists={props.updateCurrentPartyLists}
                />
            );
        });
    };

    return (
        <Fragment>
            <div id="cattery" className="row-container">
                <h2 className="title">Current Occupancy ({props.currentOccupancy})</h2>
                <div id="list-of-parties-container">{mapList(parties)}</div>
            </div>
            <div id="reservations" className="row-container">
                <h2 className="title">Upcoming Reservations ({props.currentNumOfReservations})</h2>
                <div id="list-of-parties-container">
                    <div id="list-of-parties-container">{mapList(reservations)}</div>
                </div>
            </div>
        </Fragment>
    );
};

export default ListOfParties;
