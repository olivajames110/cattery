import React, { useState, useEffect } from 'react';
import { usersIcon } from '../../utils/icons/icons';
import { sortArrayByKey, addArrayByKey } from '../../utils/helpers/helpers';

const SpotsAvailable = ({
	parties,
	currentOccupancy,
	currentNumOfUpcomingReservations,
	currentNumOverdue,
	handleSendToServer
}) => {
	const [ numOfNonOverlap, setNumOfNonOverlap ] = useState(0);
	const [ numOfSpotsAvailable, setNumOfSpotsAvailable ] = useState(0);

	let checkifOverlap = () => {
		let upcomingReservationList = sortArrayByKey(parties, 'isUpcomingReservation', true);
		let overlapAdjustment = 0;
		// console.log('LOOOOOOP STARTED');

		if (parties.length >= 1 && upcomingReservationList.length >= 1) {
			let row1 = sortArrayByKey(parties, 'rowNum', 1);
			let currentOccupancyList = sortArrayByKey(row1, 'isUpcomingReservation', false);

			//Set any parties that are overlapping to TRUE
			for (let i = 0; i < upcomingReservationList.length; i++) {
				let reservationTime = upcomingReservationList[i].times.timeStamp;
				currentOccupancyList.forEach((party) => {
					let partyEndTime = party.times.timeStamp + 3600;
					if (partyEndTime >= reservationTime) {
						party.isOverlap = true;
					} else {
						party.isOverlap = false;
					}
				});
			}

			let nonOverlappingParties__sum;
			let upcomingReservations__sum;

			let nonOverlappingParties__updatedArray = sortArrayByKey(row1, 'isOverlap', false);
			console.log(`nonOverlap length: ${nonOverlappingParties__updatedArray.length}`);
			console.log(`upcomingReservationList length: ${upcomingReservationList.length}`);

			if (nonOverlappingParties__updatedArray.length > 1 && upcomingReservationList.length >= 1) {
				if (nonOverlappingParties__updatedArray.length > 1) {
					nonOverlappingParties__sum = addArrayByKey(nonOverlappingParties__updatedArray, 'numberInParty');
				} else {
					nonOverlappingParties__sum = nonOverlappingParties__updatedArray[0].numberInParty;
				}

				if (upcomingReservationList.length > 1) {
					upcomingReservations__sum = addArrayByKey(upcomingReservationList, 'numberInParty');
				} else {
					upcomingReservations__sum = upcomingReservationList[0].numberInParty;
				}

				if (nonOverlappingParties__sum < upcomingReservations__sum) {
					overlapAdjustment = nonOverlappingParties__sum;
				} else {
					overlapAdjustment = upcomingReservations__sum;
				}
			} else {
				overlapAdjustment = 0;
			}
		}

		console.log(`OVERLAP ADJUSTMENT:  ${overlapAdjustment}`);
		setNumOfNonOverlap(overlapAdjustment);
	};

	useEffect(
		() => {
			checkifOverlap();
			let num = 15 - (currentOccupancy + currentNumOfUpcomingReservations - currentNumOverdue - numOfNonOverlap);
			setNumOfSpotsAvailable(num);
		},
		[ parties ]
	);

	// useEffect(
	// 	() => {
	// 		handleSendToServer();
	// 	},
	// 	[ numOfSpotsAvailable ]
	// );

	return (
		<div id="current-spots remaining" className="container">
			<span className="icon">{usersIcon}</span>
			<span className="primary-value  number-in-cattery">
				<span>{numOfSpotsAvailable}</span>
				{currentNumOfUpcomingReservations === 0 ? (
					''
				) : (
					<div className="upcoming-reservations">Includes {currentNumOfUpcomingReservations} Upcoming</div>
				)}
			</span>
			<span className="open-spots">Spots Available</span>
		</div>
	);
};

export default SpotsAvailable;
