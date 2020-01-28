import React, { Component } from 'react';
import { checkMark } from '../../../../utils/icons/icons';
import './css/partySizeRow.css';
import { render } from '@testing-library/react';

class PartySizeRow extends Component {
	state = {
		isAvailable       : false,
		nextAvailableTime : '2:45'
	};

	componentWillMount() {
		this.checkIfAvailable();
	}

	checkIfAvailable = () => {
		let currentParty = this.props.partySize;
		let currentParties = this.props.currentOccupancy;
		let listOfParties = this.props.listOfParties;

		if (currentParty < currentParties) {
			// console.log('Current: ' + currentParty);
			// console.log('End: ' + currentParties);
			// console.log('Parties: ' + this.props.currentOccupancy);
			this.setState({
				isAvailable : true
			});
		} else {
			this.setState({
				isAvailable : false
			});
		}
	};

	getNextAvailableTime = (partySize) => {
		let nextAvailableTime;
		let spotsRemaining = 15 - this.props.currentOccupancy;
		let exitedGuests = spotsRemaining + this.props.listOfParties[0].numberInParty;
		let firstPartyEndTime = this.props.listOfParties[0].timeEnd;

		// console.log(`spotsRemaining: ${spotsRemaining}`);
		// console.log(`--------partySize: ${this.props.partySize}`);
		// console.log(`-----exitedGuests: ${exitedGuests}`);

		// if (this.props.partySize <= exitedGuests) {
		// 	return firstPartyEndTime;
		// } else {
		// 	return 'Later';
		// }

		// do {

		// }
		// while(this.props.partySize <= exitedGuests)

		for (let i = 0; i < this.props.listOfParties.length; i++) {
			if (this.props.partySize <= exitedGuests) {
				nextAvailableTime = this.props.listOfParties[i].timeEnd;
				break;
			} else {
				exitedGuests += this.props.listOfParties[i].numberInParty;
			}
		}

		return nextAvailableTime;
	};

	render() {
		const { partySize } = this.props;

		return (
			<div
				onClick={() => {
					this.getNextAvailableTime();
				}}
				id="party-size1"
				className="party-size-wrapper"
			>
				<div className="party-size">{partySize}</div>
				<div className="next-available-time">
					{partySize <= 15 - this.props.currentOccupancy ? checkMark : this.getNextAvailableTime(partySize)}
				</div>
			</div>
		);
	}
}

export default PartySizeRow;
