import React, { useState, useEffect } from 'react';
import { usersIcon } from '../../utils/icons/icons';
import { sortArrayByKey } from '../../utils/helpers/helpers';

const SpotsAvailable = ({ parties, currentOccupancy, currentNumOfUpcomingReservations, currentNumOverdue }) => {
	const [ numOfOverlap, setNumOfOverlap ] = useState(0);
	const [ numOfSpotsAvailable, setNumOfSpotsAvailable ] = useState(0);
	// const [numOfCurrentOccupancy, setNumOfCurrentOccupancy] = useState(0);
	const upcomingTag = (
		<div className="upcoming-reservations">Includes {currentNumOfUpcomingReservations} Upcoming</div>
	);
	//Currently: if overlapping===true ==> overlapOffset goes up or down  || if overlapping===false ==> overlapOffset 0
	//-----Want: if overlapping===false ==> overlapOffset goes up or down  || if overlapping===true ==> overlapOffset 0
	let checkifOverlap = () => {
		let currentOccupancyList = sortArrayByKey(parties, 'isUpcomingReservation', false);
		let reservationList = sortArrayByKey(parties, 'isUpcomingReservation', true);
		let overLappingParties__false = sortArrayByKey(parties, 'isOverlap', false);
		let overLapOffset = 0;

		if (parties.length >= 1 && reservationList.length >= 1 && overLappingParties__false >= 1) {
			//   let firstPartyEndTime = parties[0].times.timeStamp + 3600;
			//   let upcomingEndTime = reservationList[0].times.timeStamp;
			let sumOfOverLappingParties__false;
			let sumOfUpcomingReservations;
			//check if parties in currentOccupancyList is overlapping -- sets party to true if overlapping
			for (let i = 0; i < reservationList.length; i++) {
				console.log(`currentOccupancyList: ${currentOccupancyList}`);
				let reservationTime = reservationList[i].times.timeStamp;
				currentOccupancyList.forEach((party) => {
					//   console.dir(party);
					//   console.dir(reservationList);
					if (party.times.timeStamp + 3600 >= reservationTime) {
						party.isOverlap = true;
					}
				});
			}

			let updatedOverLappingParties__false = sortArrayByKey(parties, 'isOverlap', false);
			//sum of nonOverlaps -- returns Number
			sumOfOverLappingParties__false = updatedOverLappingParties__false.reduce(function(prev, cur) {
				return prev + cur.numberInParty;
			}, 0);

			//sum of upcoming reservations -- returns Number
			sumOfUpcomingReservations = reservationList.reduce(function(prev, cur) {
				return prev + cur.numberInParty;
			}, 0);

			if (sumOfOverLappingParties__false > sumOfUpcomingReservations) {
				overLapOffset = sumOfOverLappingParties__false;
			} else {
				overLapOffset = sumOfUpcomingReservations;
			}
		} else {
			overLapOffset = 0;
		}

		setNumOfOverlap(overLapOffset);
	};

	useEffect(
		() => {
			let num = 15 - (currentOccupancy + currentNumOfUpcomingReservations - currentNumOverdue - numOfOverlap);

			checkifOverlap();
			// calcNumOfCurrentOccupancy();
			setNumOfSpotsAvailable(num);
		},
		[ currentOccupancy, currentNumOfUpcomingReservations, currentNumOverdue, numOfOverlap, parties ]
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
