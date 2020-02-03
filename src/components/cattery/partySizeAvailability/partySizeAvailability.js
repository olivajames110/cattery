import React, { Component } from 'react';
import './css/partySizeAvailability.css';
import PartySizeRow from './partySizeRow/partySizeRow';
import { useState, useEffect } from 'react';
import * as moment from 'moment';
const PartySizeAvailability = (props) => {
	const [ filteredParties, setFilteredParties ] = useState(props.parties);

	useEffect(
		() => {
			let newParties = props.parties.filter((party) => {
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
			// console.dir(props.parties);
			// console.dir(sortedParties);

			let partyRows = Array.from(Array(15)).map((x, i) => (
				<PartySizeRow
					currentTime={props.currentTime}
					currentOccupancy={props.currentOccupancy}
					parties={sortedParties}
					partySize={i + 1}
					key={Math.random()}
				/>
			));

			setFilteredParties(partyRows);
		},
		[ props.currentOccupancy ]
	);

	return (
		<div id="party-size-availability-container">
			<h2>Walk-In Availability</h2>
			{filteredParties}
		</div>
	);
};

export default PartySizeAvailability;

// import React, { Component } from 'react';
// import './css/partySizeAvailability.css';
// import PartySizeRow from './partySizeRow/partySizeRow';
// import * as moment from 'moment';
// import { useState, useEffect } from 'react';
// const PartySizeAvailability = (props) => {
// 	const [ filteredParties, setFilteredParties ] = useState([]);

// 	useEffect(() => {
// 		let newParties = props.parties.filter((party) => {
// 			return (party.rowNum === 1 || party.isUpcomingReservation === true) && party.isOverdue === false;
// 		});
// 		console.dir(newParties);
// 		setFilteredParties(newParties);
// 	}, props.parties);

// 	let partyRows = Array.from(Array(15)).map((x, i) => (
// 		<PartySizeRow
// 			currentTime={props.currentTime}
// 			currentOccupancy={props.currentOccupancy}
// 			parties={filteredParties}
// 			partySize={i + 1}
// 			key={Math.random()}
// 		/>
// 	));

// 	// for (let i = 0; i <= 15; i++) {
// 	//   //   console.log("Party: " + i);
// 	//   return <PartySizeRow partySize="1" />;
// 	// }

// 	return (
// 		<div id="party-size-availability-container">
// 			<h2>Walk-In Availability</h2>
// 			{partyRows}
// 		</div>
// 	);
// };

// export default PartySizeAvailability;
