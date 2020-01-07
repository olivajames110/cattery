import React from 'react';
import './listOfParties.css';
import PartyCard from './partyCard/partyCard';
const ListOfParties = props => {
	const peopleList = props.listOfParties.map(party => {
		return <PartyCard party={party} />;
	});

	return <div id="list-of-parties-container">{peopleList}</div>;
};

export default ListOfParties;
