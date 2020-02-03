import React, { useState, useEffect } from 'react';
import { usersIcon } from '../../utils/icons/icons';
import { checkIfMultiple, checkifOverlap, sortArrayByKey } from '../../utils/helpers/helpers';

const SpotsAvailable = ({ parties, currentOccupancy, currentNumOfUpcomingReservations, currentNumOverdue }) => {
	const [ numOfOverlap, setNumOfOverlap ] = useState(0);
	const [ numOfSpotsAvailable, setNumOfSpotsAvailable ] = useState(0);
	const upcomingTag = (
		<div className="upcoming-reservations">Includes {currentNumOfUpcomingReservations} Upcoming</div>
	);

	let checkifOverlap = () => {
		// firstParty = 1580766540 + 3600
		// firstParty = 1580770140
		// resParty = 1580769300
		console.log('STARTUBG');
		let reservationList = sortArrayByKey(parties, 'isUpcomingReservation' ,true);
		let overLapOffset = 0;
		//party sum = num of all parties where isOverlapping === false;
		let partiesSum = 1;
		//sum of all IsUpcomingReservation
		let reservationSum = 7;
		let calcOverLapOffset = () => {
			if (partiesSum < reservationSum ) {
				overLapOffset = sumOfAllPartiesWhereIsOverlapIsEqualToFalse
			} 
		}
		console.log('PARTY LIST_____');
		console.log(parties.length)
		console.log('RES LIST_____');
		console.log(reservationList.length)
		if (parties.length >= 1 && reservationList.length >= 1) {
			let numOverlap;
			let firstPartyEndTime = parties[0].times.timeStamp + 3600;
			let upcomingEndTime = reservationList[0].times.timeStamp;
			let numInUpcomingParty = parties[0].numberInParty;

			if (firstPartyEndTime >= upcomingEndTime) {
				numOverlap = numOverlap + numInUpcomingParty;
				//take first party, set that first party to isOverlapping === true (by default sel all IsOverlapping ===false).
				console.log('YES overlap');
				console.log(numInUpcomingParty);
			} else {
				console.log('NO overlap');
			}
		}
	};

	let overLap = ()

	useEffect(
		() => {
			let num = 15 - (currentOccupancy + currentNumOfUpcomingReservations - currentNumOverdue - overLapOffset );
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
