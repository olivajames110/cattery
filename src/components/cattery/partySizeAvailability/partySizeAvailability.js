import React from 'react';
import './css/partySizeAvailability.css';
import PartySizeRow from './partySizeRow/partySizeRow';
import { useState, useEffect } from 'react';

const PartySizeAvailability = ({ currentOccupancy, parties }) => {
	const [ filteredParties, setFilteredParties ] = useState(parties);

	useEffect(
		() => {
			let newParties = parties.filter((party) => {
				return (party.rowNum === 1 || party.isUpcomingReservation === true) && party.isOverdue === false;
			});

			let sortedParties = newParties.sort(function(p1, p2) {
				if (p1.times.timeStamp > p2.times.timeStamp) {
					return 1;
				} else {
					// moves larger to the top of array
					return -1;
				}
			});
			// console.dir(parties);
			// console.dir(sortedParties);

			let partyRows = Array.from(Array(15)).map((x, i) => (
				<PartySizeRow
					currentOccupancy={currentOccupancy}
					parties={sortedParties}
					partySize={i + 1}
					key={Math.random()}
				/>
			));

			setFilteredParties(partyRows);
		},
		[ currentOccupancy, parties ]
	);

	return (
		<div id="party-size-availability-container">
			<h2>Walk-In Availability</h2>
			{filteredParties}
		</div>
	);
};

export default PartySizeAvailability;
