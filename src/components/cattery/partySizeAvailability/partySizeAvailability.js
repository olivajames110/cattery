import React, { Component } from 'react';
import './css/partySizeAvailability.css';
import PartySizeRow from './partySizeRow/partySizeRow';
const PartySizeAvailability = (props) => {
	//   let partyRows = function() {
	//     let partyRows = (
	//       <div className="containr">
	//         <PartySizeRow partySize="1" />
	//         <PartySizeRow partySize="1" />
	//         <PartySizeRow partySize="1" />
	//       </div>
	//     );
	let filtedParties = () => {
		let newParties = props.parties.filter((party) => {
			return party.rowNum === 1 || party.isUpcomingReservation === true;
		});

		console.dir(newParties);
		// return newParties;
	};

	let partyRows = Array.from(Array(15)).map((x, i) => (
		<PartySizeRow
			currentTime={props.currentTime}
			currentOccupancy={props.currentOccupancy}
			parties={props.parties}
			partySize={i + 1}
			key={Math.random()}
		/>
	));

	// for (let i = 0; i <= 15; i++) {
	//   //   console.log("Party: " + i);
	//   return <PartySizeRow partySize="1" />;
	// }

	return (
		<div id="party-size-availability-container">
			<h2>Walk-In Availability</h2>
			{partyRows}
			{filtedParties()}
		</div>
	);
};

export default PartySizeAvailability;
