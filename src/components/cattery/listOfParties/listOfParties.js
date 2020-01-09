import React from 'react';
import './listOfParties.css';
import PartyCard from './partyCard/partyCard';
const ListOfParties = props => {
	const peopleList = props.listArray.map(party => {
		return (
			<PartyCard
				key={party.id}
				onClick_checkReservation={props.onClick_checkReservation}
				onClick_remove={props.onClick_remove}
				party={party}
			/>
		);
	});

	return (
		<div className="row-container">
			<h2 className="title">
				{props.title} ({props.currentNumOfPeople})
			</h2>
			<div id="list-of-parties-container">{peopleList}</div>
		</div>
	);
};

export default ListOfParties;
