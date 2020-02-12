import React, { Component, Fragment } from 'react';
import EditParty from './cattery/editParty/editParty';
import ListOfParties from './cattery/listOfParties/listOfParties';
import PartySizeAvailability from './cattery/partySizeAvailability/partySizeAvailability';
import Modal from '../utils/modal/modal';
import Header from './ui-components/header';
import AddUser from './ui-components/addUser';
import AddPartyButton from './ui-components/addPartyButton';
import { handleGetTimes, sortArrayByKey, addArrayByKey } from '../utils/helpers/helpers';
import './css/cattery.css';
import * as moment from 'moment';

class Cattery extends Component {
	state = {
		countDownSpeed                   : 60000,
		currentNumOfReservations         : 0,
		currentNumOfUpcomingReservations : 0,
		currentNumOverdue                : 0,
		currentOccupancy                 : 0,
		currentTime                      : '2:10 PM',
		isEditMode                       : false,
		modalIsOpen                      : false,
		parties                          : [],
		totalGuests                      : 0,
		times                            : {
			minute              : null,
			hour                : null,
			currentTime         : null,
			currentTimePlusHour : null
		}
	};

	//LIST OF ACTIONS
	//- Toggle Payment
	//- Add current party
	//- Remove current party (mark complete)
	//- Add reservation party
	//- Check in reservation party
	//- Change reservation to upcoming party when within 1 hour
	//- Change reservation to upcoming party
	//- Move Reservation from Row 2 to Row 1 when start time is equal to current time
	//- Detect if parties overlap with reservation

	//sets Current Time  and Num of People in each array
	componentDidMount() {
		let currentTime = moment().format('h:mm A');
		let currentDate = moment().format('D-MM-YYYY').toString();
		let times = {
			minute              : moment().minute(),
			hour                : moment().hour(),
			currentTime         : currentTime,
			currentTimePlusHour : moment().add('hours', 1).format('h:mm A'),
			timeStamp           : moment(`${currentDate} ${currentTime}`, 'D-MM-YYYY h:mmA').unix()
		};
		setInterval(this.checkPartyStartTimes, 1000);
		console.log(this.props.partyState);

		this.setState({
			times : times
			// parties: this.props.parties
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.parties !== this.props.parties) {
			console.log('incoming parties', this.props.parties.length);
			let sumOfNewCurrentOccupancy = 0;
			let sumOfNewCurrentNumOfReservations = 0;
			let sumOfNewCurrentNumOfUpcomingReservations = 0;
			let sumOfNewCurrentNumOverdue = 0;
			let sumOfNewTotalGuests = 0;
			if (this.props.parties.length >= 1) {
				let newParties = sortArrayByKey(this.props.parties, 'isReservation', false);
				sumOfNewCurrentOccupancy = addArrayByKey(newParties, 'numberInParty') || 0;
				console.log(`Current Occupancy: ${sumOfNewCurrentOccupancy}`);

				let newPartiesReservations = sortArrayByKey(this.props.parties, 'isReservation', true);
				sumOfNewCurrentNumOfReservations = addArrayByKey(newPartiesReservations, 'numberInParty') || 0;
				console.log(`Reservations: ${sumOfNewCurrentNumOfReservations}`);

				let newUpcomingReservations = sortArrayByKey(this.props.parties, 'isUpcomingReservation', true);
				sumOfNewCurrentNumOfUpcomingReservations = addArrayByKey(newUpcomingReservations, 'numberInParty') || 0;
				console.log(`Reservations: ${sumOfNewCurrentNumOfUpcomingReservations}`);

				let newOverdueList = sortArrayByKey(this.props.parties, 'isOverdue', true);
				sumOfNewCurrentNumOverdue = addArrayByKey(newOverdueList, 'numberInParty') || 0;
				console.log(`Reservations: ${sumOfNewCurrentNumOverdue}`);
			}

			this.setState({
				parties                          : this.props.parties,
				currentOccupancy                 : sumOfNewCurrentOccupancy,
				currentNumOfReservations         : sumOfNewCurrentNumOfReservations,
				currentNumOfUpcomingReservations : sumOfNewCurrentNumOfUpcomingReservations,
				currentNumOverdue                : sumOfNewCurrentNumOverdue,
				totalGuests                      : sumOfNewTotalGuests
			});
		}
	}

	checkPartyStartTimes = () => {
		let currentTime = moment().format('h:mm A');
		let currentDate = moment().format('D-MM-YYYY').toString();
		let times = {
			minute              : moment().minute(),
			hour                : moment().hour(),
			currentTime         : currentTime,
			currentTimePlusHour : moment().add('hours', 1).format('h:mm A'),
			timeStamp           : moment(`${currentDate} ${currentTime}`, 'D-MM-YYYY h:mmA').unix()
		};

		for (let i = 0; i < this.state.parties.length; i++) {
			let party = this.state.parties;

			// -- Make party upcoming  if timestamp difference of party and state is <= 3600
			if (
				party[i].times.timeStamp - this.state.times.timeStamp <= 3600 &&
				party[i].isUpcomingReservation === false &&
				party[i].rowNum === 2
			) {
				console.log('Match');
				party[i].isUpcomingReservation = true;
				this.handleSendToServer();
				// this.modifyStateNum(party[i].numberInParty, 'currentNumOfUpcomingReservations');
			}

			// -- Move party if timeStart is equal to currentTime
			if (party[i].times.start === this.state.times.currentTime && party[i].rowNum !== 1) {
				party[i].isUpcomingReservation = true;
				party[i].rowNum = 1;
				// this.handleMoveParty(party[i].id, 1);
				this.handleSendToServer();
				// this.modifyStateNum(party[i].numberInParty, 'currentNumOfUpcomingReservations');
			}
		}

		this.setState({
			times : times
		});
	};

	handleAddParty = (party, numOfNewPeople, isReservation) => {
		// if (isReservation) {
		// 	this.modifyStateNum(numOfNewPeople, 'currentNumOfReservations');
		// } else {
		// 	//   this.modifyStateNum(numOfNewPeople, "currentOccupancy");
		// 	this.modifyCurrentOccupancy(numOfNewPeople, false);
		// }
		// this.modifyStateNum(numOfNewPeople);
		let newPartyList = [ ...this.state.parties, ...party ];
		this.props.updateCatteryState(newPartyList);
		this.setState({
			// parties     : newPartyList,
			modalIsOpen : false
		});
	};

	handleCheckReservation = (id, numOfNewPeople) => {
		let filteredParty = this.getFilteredParty(id);
		let newTimes = handleGetTimes();

		filteredParty[0].rowNum = 1;
		filteredParty[0].isReservation = false;
		filteredParty[0].times.start = newTimes.start;
		filteredParty[0].times.end = newTimes.end;
		filteredParty[0].rowNum = 1;
		// let numOfUpcoming = filteredParty[0].isUpcomingReservation ? Number(numOfNewPeople) : 0;
		// this.handleMoveParty(id, 1);
		// this.modifyStateNum(numOfNewPeople, "currentOccupancy")
		// this.modifyCurrentOccupancy(numOfNewPeople, false);
		// this.modifyStateNum(numOfNewPeople, 'currentNumOfReservations', true);
		// this.modifyStateNum(numOfUpcoming, 'currentNumOfUpcomingReservations', true);
		let updatedParties = this.state.parties;
		this.props.updateCatteryState([ ...updatedParties ]);
		// if (filteredParty[0].isUpcomingReservation) {
		// 	filteredParty[0].isUpcomingReservation = false;
		// }
	};

	handleEditModalToggle = (id) => {
		this.handleModalToggle();
		this.setState({
			isEditMode     : !this.state.isEditMode,
			currentPartyId : id || null
		});
	};

	handleModalToggle = () => {
		this.setState({
			modalIsOpen : !this.state.modalIsOpen,
			isEditMode  : false
		});
	};

	handleMoveParty = (id, destinationRow) => {
		//Returns the party
		let filteredArray = this.state.parties.filter((party) => {
			return party.id !== id;
		});

		let filteredParty = this.getFilteredParty(id);
		console.dir(filteredParty[0]);
		filteredParty[0].rowNum = destinationRow;

		let newPartyArray = [ ...filteredArray, ...filteredParty ];

		this.setState({
			//this is where i would put emitter function
			parties : newPartyArray
		});
	};

	handleRemoveParty = (id, numInParty) => {
		console.log('Updated Remove Started');
		let updatedParties = this.state.parties.filter((party) => {
			return party.id !== id;
		});
		let party = this.getFilteredParty(id);

		let overDueNum = party[0].isOverdue ? numInParty : 0;
		// this.modifyStateNum(numInParty, "currentOccupancy", true);
		// this.modifyCurrentOccupancy(numInParty, true);
		// this.modifyStateNum(numInParty, 'totalGuests');
		// this.modifyStateNum(overDueNum, 'currentNumOverdue', true);
		this.setState({
			parties : [ ...updatedParties ]
		});
		console.log('Updated Remove', [ ...updatedParties ]);

		this.props.updateCatteryState([ ...updatedParties ]);
	};

	//Returns specified party
	getFilteredParty = (id) => {
		let filteredParty = this.state.parties.filter((party) => {
			return party.id === id;
		});

		return filteredParty;
	};

	// Updates start/end times
	handleUpdateTimes = (id) => {
		let newTimes = handleGetTimes();
		let filteredParty = this.getFilteredParty(id);
		filteredParty[0].times.start = newTimes.times.start;
		filteredParty[0].times.end = newTimes.times.end;
	};

	//Updates party data property
	updatePartyData = (id, targetKey, value) => {
		let filteredParty = this.getFilteredParty(id);
		filteredParty[0][targetKey] = value;
		this.handleSendToServer();
	};

	modifyStateNum = (num, stateName, isSubtract) => {
		if (isSubtract) {
			this.setState({
				[stateName] : Number(this.state[stateName]) - Number(num)
			});
		} else {
			this.setState({
				[stateName] : Number(this.state[stateName]) + Number(num)
			});
		}
	};

	modifyCurrentOccupancy = (num, isSubtract) => {
		let currentOccupancyList__rowNum = sortArrayByKey(this.state.parties, 'rowNum', 1);
		let currentOccupancyList = sortArrayByKey(currentOccupancyList__rowNum, 'isReservation', false);
		let currentOccupancyNum = currentOccupancyList.reduce(function(prev, cur) {
			return prev + cur.numberInParty;
		}, 0);
		let statenum;

		if (isSubtract) {
			statenum = currentOccupancyNum - num;
		} else {
			statenum = currentOccupancyNum + num;
		}

		this.setState({
			currentOccupancy : statenum
		});
	};

	handleUpdateStateNums = (parties) => {};

	handleSendToServer = () => {
		let updatedParties = this.state.parties;
		this.props.updateCatteryState([ ...updatedParties ]);
	};

	render() {
		const modal = (
			<Modal click={this.handleModalToggle}>
				{!this.state.isEditMode ? (
					<AddUser handleAddParty={this.handleAddParty} />
				) : (
					<EditParty
						partyId={this.state.currentPartyId}
						updatePartyData={this.updatePartyData}
						handleEditModalToggle={this.handleEditModalToggle}
					/>
				)}
			</Modal>
		);

		return (
			<Fragment>
				<Header
					parties={this.state.parties}
					currentTime={this.state.times.currentTime}
					currentOccupancy={this.state.currentOccupancy}
					currentNumOfUpcomingReservations={this.state.currentNumOfUpcomingReservations}
					currentNumOverdue={this.state.currentNumOverdue}
					totalGuests={this.state.totalGuests}
					handleSendToServer={this.handleSendToServer}
				/>
				<div className="cattery-container">
					{this.state.modalIsOpen ? modal : <AddPartyButton handleModalToggle={this.handleModalToggle} />}
					<div id="party-size-availability-col">
						<PartySizeAvailability
							currentTime={this.state.times.currentTime}
							currentOccupancy={
								this.state.currentOccupancy +
								this.state.currentNumOfUpcomingReservations -
								this.state.currentNumOverdue
							}
							parties={this.state.parties}
						/>
					</div>
					<div id="cattery-body-col">
						<ListOfParties
							title="Current Occupancy"
							modifyStateNum={this.modifyStateNum}
							countDownSpeed={this.state.countDownSpeed}
							currentOccupancy={this.state.currentOccupancy}
							currentNumOfReservations={this.state.currentNumOfReservations}
							handleRemoveParty={this.handleRemoveParty}
							handleCheckReservation={this.handleCheckReservation}
							handleUpdateTimes={this.handleUpdateTimes}
							updatePartyData={this.updatePartyData}
							handleEditModalToggle={this.handleEditModalToggle}
							handleAddParty={this.handleAddParty}
							parties={this.state.parties}
							handleMoveParty={this.handleMoveParty}
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Cattery;
