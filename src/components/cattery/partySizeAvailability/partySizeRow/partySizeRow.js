import React from 'react';
import { checkMark } from '../../../../utils/icons/icons';
import './css/partySizeRow.css';

// import { useState } from 'react';

const PartySizeRow = (props) => {
	const { currentOccupancy, partySize, parties } = props;

	// const [ isAvailable, setIsAvailable ] = useState(false);
	// const [ nextTimeAvailable, setNextTimeAvailable ] = useState('');
	//   const [exitedGuests, setExitedGuests] = useState(currentOccupancy);
	const spotsRemaining = 15 - currentOccupancy;

	let getNextTime = () => {
		// let firstPartyEndTime = parties[0].times.end;
		let newTime;
		let numSpotsAvailable = 0;

		if (parties.length >= 1) {
			numSpotsAvailable = spotsRemaining + parties[0].numberInParty || 0;
		}
		for (let i = 0; i < parties.length; i++) {
			//14 <= 7 + 3
			if (partySize <= numSpotsAvailable) {
				newTime = parties[i].times.end;
				break;
			} else {
				newTime = parties[i].times.end;
				numSpotsAvailable = numSpotsAvailable + parties[i].numberInParty;
			}
		}
		return newTime;
	};

	return (
		<div id="party-size1" className="party-size-wrapper">
			<div className="party-size">{partySize}</div>
			<div className="next-available-time">{partySize <= spotsRemaining ? checkMark : getNextTime()}</div>
		</div>
	);
};

// this.getNextAvailableTime(partySize)
export default PartySizeRow;
