import React, { useState, Fragment, useEffect } from 'react';
import './listOfParties.css';
import PartyCard from './partyCard/partyCard';
const ListOfParties = (props) => {
	const [ parties, setParties ] = useState([]);
	const [ reservations, setReservations ] = useState([]);

	useEffect(
		() => {
			//Takes list of all parties. Sorts by if isReservation is true or false
			let partiesList = props.parties.filter((party) => {
				return party.rowNum === 1;
			});

			let reservationsList = props.parties.filter((party) => {
				return party.rowNum === 2;
			});

			let sortedPartiesList = partiesList.sort(function(p1, p2) {
				if (p1.times.timeStamp >= p2.times.timeStamp) {
					return 1;
				} else {
					// moves larger to the top of array
					return -1;
				}
			});
			let sortedReservationsList = reservationsList.sort(function(p1, p2) {
				if (p1.times.timeStamp >= p2.times.timeStamp) {
					return 1;
				} else {
					// moves larger to the top of array
					return -1;
				}
			});

			setParties(sortedPartiesList);
			setReservations(sortedReservationsList);
		},
		[ props.parties ]
	);

	const mapList = (array) => {
		return array.map((party) => {
			return (
				<PartyCard
					modifyStateNum={props.modifyStateNum}
					countDownSpeed={props.countDownSpeed}
					key={party.id}
					handleRemoveParty={props.handleRemoveParty}
					handleCheckReservation={props.handleCheckReservation}
					handleUpdateTimes={props.handleUpdateTimes}
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
