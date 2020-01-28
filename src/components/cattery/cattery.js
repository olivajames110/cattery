import React, { Component, Fragment } from 'react';
import AddParty from './addParty/addParty';
import EditParty from './editParty/editParty';
import ListOfParties from './listOfParties/listOfParties';
import PartySizeAvailability from './partySizeAvailability/partySizeAvailability';
import Modal from '../../utils/modal/modal';
import './css/cattery.css';
import * as moment from 'moment';
import { clockIcon, usersIcon, plusIcon } from '../../utils/icons/icons';
// import { formatAMPM } from '../../utils/helpers/formatTime';
// Todo

// -- Complete functionality
// -- Move complete to new section (undo btn in place of complete)
// -- Party size availability functionality
// -- Add 5 min button

//house timer here
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
		totalGuests                      : 0
	};

	//sets Current Time  and Num of People in each array
	componentDidMount() {
		let currentTime = moment().format('h:mm A');
		setInterval(this.checkPartyStartTimes, 1000);

		this.setState({
			currentTime : currentTime
		});
	}

	checkPartyStartTimes = () => {
		let currentTime = moment().format('h:mm A');

		// Checks startTime for each party in Parties
		for (let i = 0; i < this.state.parties.length; i++) {
			let party = this.state.parties;
			let currentTimePlus1 = moment().add('hours', 1).format('h:mm A');

			// -- Make party upcoming  if timeStart is equal to currentTime + 1 hour
			if (party[i].timeStart === currentTimePlus1 && party[i].isUpcomingReservation === false) {
				console.log('Match');
				party[i].isUpcomingReservation = true;
				this.modifyStateNum(party[i].numberInParty, 'currentNumOfUpcomingReservations');
			}

			// -- Move party if timeStart is equal to currentTime
			if (party[i].timeStart === currentTime && party[i].rowNum !== 1) {
				party[i].isUpcomingReservation = true;
				this.handleMoveParty(party[i].id, 1);
				// this.modifyStateNum(party[i].numberInParty, 'currentNumOfUpcomingReservations');
			}
		}

		this.setState({
			currentTime : currentTime
		});
	};

	// -----Shared
	handleAddParty = (party, numOfNewPeople, isReservation) => {
		if (isReservation) {
			this.modifyStateNum(numOfNewPeople, 'currentNumOfReservations');
		} else {
			this.modifyStateNum(numOfNewPeople, 'currentOccupancy');
		}
		let newPartyList = [ ...this.state.parties, ...party ];
		this.modifyStateNum(numOfNewPeople);
		this.setState({
			parties     : newPartyList,
			modalIsOpen : false
		});
	};

	handleCheckReservation = (id, numOfNewPeople) => {
		//<-------
		let filteredArray = this.state.parties.filter((party) => {
			return party.id !== id;
		});

		let filteredParty = this.getFilteredParty(id);
		console.dir(filteredParty[0]);

		//------->

		//Sets party reservation to false
		let newTimes = this.handleGetTimeStartTimeEnd();
		filteredParty[0].rowNum = 1;
		filteredParty[0].isReservation = false;
		filteredParty[0].timeStart = newTimes.timeStart;
		filteredParty[0].timeEnd = newTimes.timeEnd;
		let numOfUpcoming = filteredParty[0].isUpcomingReservation ? Number(numOfNewPeople) : 0;
		this.handleMoveParty(id, 1);
		this.modifyStateNum(numOfNewPeople, 'currentOccupancy');
		this.modifyStateNum(numOfNewPeople, 'currentNumOfReservations', true);
		this.modifyStateNum(numOfUpcoming, 'currentNumOfUpcomingReservations', true);

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
			parties : newPartyArray
		});
	};

	handleRemoveParty = (id, numInParty) => {
		let updatedParties = this.state.parties.filter((party) => {
			return party.id !== id;
		});
		let party = this.getFilteredParty(id);

		let overDueNum = party[0].isOverdue ? numInParty : 0;
		this.modifyStateNum(numInParty, 'currentOccupancy', true);
		this.modifyStateNum(numInParty, 'totalGuests');
		this.modifyStateNum(overDueNum, 'currentNumOverdue', true);

		this.setState({
			parties : updatedParties
		});
	};

	// -----CRUD functions------
	//Returns party
	getFilteredParty = (id) => {
		let filteredParty = this.state.parties.filter((party) => {
			return party.id === id;
		});

		return filteredParty;
	};

	//returns object of start and end time
	handleGetTimeStartTimeEnd = (id) => {
		let timeStartTimeEnd = {
			timeStart : moment().format('h:mm A'),
			timeEnd   : moment().add('hours', 1).format('h:mm A')
		};

		return timeStartTimeEnd;
	};

	// Updates start/end times
	handleUpdateTimes = (id) => {
		let newTimes = this.handleGetTimeStartTimeEnd();
		let filteredParty = this.getFilteredParty(id);
		filteredParty[0].timeStart = newTimes.timeStart;
		filteredParty[0].timeEnd = newTimes.timeEnd;
	};

	//Updates data
	updatePartyData = (id, targetKey, value) => {
		let filteredParty = this.getFilteredParty(id);
		filteredParty[0][targetKey] = value;
	};

	// --------------

	//Calculating numbers

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

	//Test
	handleTestMode = () => {
		if (this.state.countDownSpeed === 110) {
			this.setState({
				countDownSpeed : 60000
			});
		}
		if (this.state.countDownSpeed === 60000) {
			this.setState({
				countDownSpeed : 110
			});
		}
	};

	render() {
		const addUser = (
			<div id="number-of-people-container">
				<AddParty handleAddParty={this.handleAddParty} />
			</div>
		);

		const upcomingTag = (
			<div className="upcoming-reservations">Includes {this.state.currentNumOfUpcomingReservations} Upcoming</div>
		);

		const header = (
			<div id="time-and-people-container">
				<div id="current-time" className="container">
					<span className="icon">{clockIcon}</span>
					<div onClick={this.handleTestMode} className="primary-value">
						{this.state.currentTime}
						{this.state.countDownSpeed === 110 ? <div className="test-mode">Test Mode</div> : ''}
					</div>
				</div>
				<div id="current-spots remaining" className="container">
					<span className="icon">{usersIcon}</span>
					<span className="primary-value  number-in-cattery">
						<span>
							{15 -
								(this.state.currentOccupancy +
									this.state.currentNumOfUpcomingReservations -
									this.state.currentNumOverdue)}
						</span>
						{this.state.currentNumOfUpcomingReservations === 0 ? '' : upcomingTag}
					</span>
					<span className="open-spots">Spots Available</span>
				</div>
				<div id="current-occupancy" className="container">
					<span className="primary-value  number-in-cattery">
						<span>{this.state.totalGuests}</span>
					</span>
					<span className="open-spots">Total Guests Today</span>
				</div>
			</div>
		);

		const modal = (
			<Modal click={this.handleModalToggle}>
				{!this.state.isEditMode ? (
					addUser
				) : (
					<EditParty
						partyId={this.state.currentPartyId}
						updatePartyData={this.updatePartyData}
						handleEditModalToggle={this.handleEditModalToggle}
					/>
				)}
			</Modal>
		);
		const addPartyBtn = (
			<span onClick={this.handleModalToggle} className="modal-btn">
				<span className="text"> ADD PARTY</span>
				<span className="btn"> {plusIcon}</span>
			</span>
		);

		return (
			<Fragment>
				{header}
				<div className="cattery-container">
					{this.state.modalIsOpen ? modal : addPartyBtn}
					<div id="party-size-availability-col">
						<PartySizeAvailability
							currentTime={this.state.currentTime}
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
