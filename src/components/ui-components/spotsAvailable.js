import React, { useState, useEffect } from 'react';
import { usersIcon } from '../../utils/icons/icons';
import { sortArrayByKey } from '../../utils/helpers/helpers';

const SpotsAvailable = ({ parties, currentOccupancy, currentNumOfUpcomingReservations, currentNumOverdue }) => {
	const [ numOfOverlap, setNumOfOverlap ] = useState(0);
	const [ numOfSpotsAvailable, setNumOfSpotsAvailable ] = useState(0);
	const upcomingTag = (
		<div className="upcoming-reservations">Includes {currentNumOfUpcomingReservations} Upcoming</div>
	);

	let checkifOverlap = () => {
		console.log('STARTUBG');

		let reservationList = sortArrayByKey(parties, 'isUpcomingReservation', true);
		let nonOverlappingPartiesArray = sortArrayByKey(parties, 'isOverlap', false);
		let overLapOffset = 0;

		if (parties.length >= 1 && reservationList.length >= 1) {
			let firstPartyEndTime = parties[0].times.timeStamp + 3600;
			let upcomingEndTime = reservationList[0].times.timeStamp;
			let sumOfNonOverlaps;
			let sumOfUpcomingReservations;
			// let numInUpcomingParty = parties[0].numberInParty;

			if (firstPartyEndTime >= upcomingEndTime) {
				parties[0].isOverlap = true;
			}

			let nonOverLappingNum = nonOverlappingPartiesArray.reduce(function(prev, cur) {
				return prev + cur.numberInParty;
			}, 0);
			let reservationListSum = reservationList.reduce(function(prev, cur) {
				return prev + cur.numberInParty;
			}, 0);

			sumOfNonOverlaps = nonOverLappingNum;
			sumOfUpcomingReservations = reservationListSum;
			console.log(`Sum of sumOfNonOverlaps ${sumOfNonOverlaps}`);
			console.log(`Sum of sumOfUpcomingReservations${sumOfUpcomingReservations}`);

			if (sumOfNonOverlaps < sumOfUpcomingReservations) {
				overLapOffset = sumOfNonOverlaps;
			} else {
				overLapOffset = sumOfUpcomingReservations;
			}
		}

		setNumOfOverlap(overLapOffset);
	};

	useEffect(
		() => {
			let num = 15 - (currentOccupancy + currentNumOfUpcomingReservations - currentNumOverdue - numOfOverlap);
			checkifOverlap();
			setNumOfSpotsAvailable(num);
		},
		[ currentOccupancy, currentNumOfUpcomingReservations, currentNumOverdue, numOfOverlap ]
	);

	return (
		<div id="current-spots remaining" className="container">
			<span className="icon">{usersIcon}</span>
			<span className="primary-value  number-in-cattery">
				<span>{numOfSpotsAvailable}</span>
				{currentNumOfUpcomingReservations === 0 ? '' : upcomingTag}
			</span>
			<span className="open-spots">Spots Available</span>
		</div>
	);
};

export default SpotsAvailable;
