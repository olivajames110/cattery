import React from 'react';
import './listOfParties.css';
import PartyCard from './partyCard/partyCard';
const ListOfParties = props => {
	const peopleList = props.listArray.map(party => {
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
	});

	return (
		<div className="row-container">
			<h2 className="title">
				{props.title} ({props.currentOccupancy})
			</h2>
			<div id="list-of-parties-container">{peopleList}</div>
		</div>
	);
};

export default ListOfParties;
