import React, { Component } from 'react';
import { checkMark } from '../../../../utils/icons/icons';
import './css/partySizeRow.css';
import { render } from '@testing-library/react';
import { useState, useEffect } from 'react';

const PartySizeRow = (props) => {
	const { isAvailable, setIsAvailable } = useState(false);
	const { nextTimeAvailable, setNextTimeAvailable } = useState('2:45PM');
	const { exitedGuests, setExitedGuests } = useState(0);

	useEffect(() => {
		let currentParty = this.props.partySize;
		let currentParties = this.props.currentOccupancy;
		if (currentParty < currentParties) {
			setIsAvailable(true);
		} else {
			setIsAvailable(false);
		}
	}, []);

	useEffect(() => {
		console.log(this.props.parties);

		let nextAvailableTime;
		let spotsRemaining = 15 - this.props.currentOccupancy;
		let exitedGuests = spotsRemaining + this.props.parties[0].numberInParty;
		let firstPartyEndTime = this.props.parties[0].times.end;

		// for (let i = 0; i < this.props.parties.length; i++) {
		// 	if (this.props.partySize <= exitedGuests) {
		// 		nextAvailableTime = this.props.parties[i].times.end;
		// 		break;
		// 	} else {
		// 		exitedGuests += this.props.parties[i].numberInParty;
		// 	}
		// }
		let time = 'time';
		setNextTimeAvailable(time);
	}, exitedGuests);

	return (
		<div
			onClick={() => {
				this.getNextAvailableTime();
			}}
			id="party-size1"
			className="party-size-wrapper"
		>
			<div className="party-size">{this.props.partySize}</div>
			<div className="next-available-time">
				{this.props.partySize <= 15 - this.props.currentOccupancy ? checkMark : nextAvailableTime}
			</div>
		</div>
	);
};

// this.getNextAvailableTime(partySize)
export default PartySizeRow;
