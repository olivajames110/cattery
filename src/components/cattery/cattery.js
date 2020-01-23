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
		countDownSpeed: 60000,
		modalIsOpen: false,
		currentOccupancy: 0,
		currentNumOfReservations: 0,
		currentNumOfUpcomingReservations: 0,
		currentNumOverdue: 0,
		totalGuests: 0,
		selectedPartyId: null,
		currentTime: '2:10 PM',
		endTimes: 80,
		listOfParties: [
			// {
			// 	id: 111,
			// 	name: 'Test',
			// 	description: null,
			// 	numberInParty: 5,
			// 	paid: true,
			// 	status: null,
			// 	timeRemaining: 60,
			// 	timeStart: null,
			// 	timeEnd: null,
			// 	width: '100%',
			// 	isReservation: false,
			// 	reservationTime: null
			// }
		],
		listOfReservations: [
			// {
			// 	name: 'Carll',
			// 	description: '1 person with black shirt, red hat',
			// 	numberInParty: 2,
			// 	paid: true,
			// 	status: 'In Room',
			// 	timeRemaining: 60,
			// 	timeStart: '2:10',
			// 	timeEnd: '3:10',
			// 	isReservation: true
			// }
		],
		isEditMode: false
	};

	//sets Current Time  and Num of People in each array
	componentDidMount() {
		let currentTime = moment().format('h:mm A');
		setInterval(this.getCurrentTime, 1000);

		this.setState({
			currentTime: currentTime
		});
	}

	getCurrentTime = () => {
		let currentTime = moment().format('h:mm A');
		for (let i = 0; i < this.state.listOfReservations.length; i++) {
			let party = this.state.listOfReservations;
			let now = moment()
				.add('hours', 1)
				.format('h:mm A');
			party[i].reservationIsReady = true;

			if (party[i].timeStart === currentTime) {
				this.handleMoveParty(
					party[i].id,
					party[i].numberInParty,
					this.state.listOfReservations,
					this.state.listOfParties
				);
			}
			console.log(`Party Time Start: ${party[i].timeStart}`);

			let currentTimePlus1 = moment()
				.add('hours', 1)
				.format('h:mm A');
			if (party[i].timeStart === currentTimePlus1 && party[i].isUpcomingReservation === false) {
				console.log('Match');
				party[i].isUpcomingReservation = true;
				this.setState({
					currentNumOfUpcomingReservations:
						this.state.currentNumOfUpcomingReservations + party[i].numberInParty
				});
			}
		}

		this.setState({
			currentTime: currentTime
		});
	};

	handleGetTimeStartTimeEnd = id => {
		let timeStartTimeEnd = {
			timeStart: moment().format('h:mm A'),
			timeEnd: moment()
				.add('hours', 1)
				.format('h:mm A')
		};

		return timeStartTimeEnd;
	};

	handleUpdateTimes = id => {
		let newTimes = this.handleGetTimeStartTimeEnd();
		let party = this.state.listOfParties.filter(party => {
			return party.id === id;
		});
		party[0].timeStart = newTimes.timeStart;
		party[0].timeEnd = newTimes.timeEnd;

		console.log(newTimes, party);
	};

	//Modal Toggle
	handleModalToggle = () => {
		this.setState({
			modalIsOpen: !this.state.modalIsOpen,
			isEditMode: false
		});
	};

	//Removes Party from list
	handleRemoveParty = (id, numInParty, timeRemaining) => {
		let updatedParties = this.state.listOfParties.filter(party => {
			return party.id !== id;
		});

		this.setState({
			listOfParties: updatedParties,
			currentOccupancy: this.state.currentOccupancy - numInParty,
			totalGuests: this.state.totalGuests + numInParty,
			currentNumOverdue: timeRemaining <= 0 ? this.state.currentNumOverdue - numInParty : 0
		});
	};

	handleMoveParty = (id, numOfNewPeople, currentListArray, listDestinationArray) => {
		//Returns the party
		let filteredParty = currentListArray.filter(p => {
			return p.id === id;
		});

		let filteredCurrentListArray = currentListArray.filter(p => {
			return p.id !== id;
		});

		//Takes existing party list and adds new party
		let newlistDestinationArray = [...listDestinationArray, ...filteredParty];

		//Sets state for --Num of pople in the room --
		this.setState({
			currentOccupancy: Number(this.state.currentOccupancy) + Number(numOfNewPeople),
			currentNumOfReservations: Number(this.state.currentNumOfReservations) - Number(numOfNewPeople),
			listOfParties: newlistDestinationArray,
			listOfReservations: filteredCurrentListArray
		});
	};

	handleCheckReservation = (id, numOfNewPeople) => {
		console.log('Checked In' + id);
		//Returns the party
		let party = this.state.listOfReservations.filter(party => {
			return party.id === id;
		});

		let newReservationList = this.state.listOfReservations.filter(party => {
			return party.id !== id;
		});

		//Sets party reservation to false
		let newTimes = this.handleGetTimeStartTimeEnd();
		party[0].isReservation = false;
		party[0].timeStart = newTimes.timeStart;
		party[0].timeEnd = newTimes.timeEnd;

		//Takes existing party list and adds new party
		let newPartyList = [...this.state.listOfParties, ...party];
		let numOfUpcoming = party[0].isUpcomingReservation ? Number(numOfNewPeople) : 0;
		//Sets state for --Num of pople in the room --
		this.setState({
			currentOccupancy: Number(this.state.currentOccupancy) + Number(numOfNewPeople),
			currentNumOfReservations: Number(this.state.currentNumOfReservations) - Number(numOfNewPeople),
			currentNumOfUpcomingReservations: this.state.currentNumOfUpcomingReservations - numOfUpcoming,
			listOfParties: newPartyList,
			listOfReservations: newReservationList
		});

		if (party[0].isUpcomingReservation) {
			party[0].isUpcomingReservation = false;
		}

		// this.updateCurrentPartyLists()
	};

	updateCurrentPartyLists = (party, numOfNewPeople, isReservation) => {
		if (!isReservation) {
			let newPartyList = [...this.state.listOfParties, ...party];

			this.setState({
				currentOccupancy: Number(this.state.currentOccupancy) + Number(numOfNewPeople),
				listOfParties: newPartyList,
				modalIsOpen: false
			});
		} else {
			let newPartyList = [...this.state.listOfReservations, ...party];
			this.setState({
				currentNumOfReservations: Number(this.state.currentNumOfReservations) + Number(numOfNewPeople),

				listOfReservations: newPartyList,
				modalIsOpen: false
			});
		}
	};

	updatePartyData = (id, targetKey, value) => {
		let party = this.getActiveParty(id);
		party[0][targetKey] = value;
		return party;
	};

	getActiveParty = id => {
		let party;

		let p1 = this.state.listOfParties.filter(party => {
			return party.id === id;
		});

		let p2 = this.state.listOfReservations.filter(party => {
			return party.id === id;
		});

		if (typeof p1[0] !== typeof undefined) {
			party = p1;
		}
		if (typeof p2[0] !== typeof undefined) {
			party = p2;
		}

		return party;
	};

	handleEditModalToggle = id => {
		this.handleModalToggle();
		this.setState({
			isEditMode: !this.state.isEditMode,
			currentPartyId: id || null
		});
	};

	handleTestMode = () => {
		if (this.state.countDownSpeed === 110) {
			this.setState({
				countDownSpeed: 60000
			});
		}
		if (this.state.countDownSpeed === 60000) {
			this.setState({
				countDownSpeed: 110
			});
		}
	};

	calcCurrentNumOfSpotsLeft = numInParty => {
		let filteredNumOfSpotsLeft__LIST = this.state.listOfParties.filter(party => {
			return party.isOverdue === true;
		});
		let numOfOverdue = this.getNumPeopleInList(filteredNumOfSpotsLeft__LIST, 'numberInParty');
		this.setState({
			currentNumOverdue: numOfOverdue
		});
	};

	getNumPeopleInList = (array, key) => {
		let numOfPeopleInList = 0;
		console.log('asdasd');
		for (let i = 0; i < array.length; i++) {
			numOfPeopleInList += array[i].numberInParty;
		}
		return numOfPeopleInList;
	};

	render() {
		const addUser = (
			<div id="number-of-people-container">
				<AddParty updateCurrentPartyLists={this.updateCurrentPartyLists} />
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
							listOfParties={this.state.listOfParties}
						/>
					</div>
					<div id="cattery-body-col">
						<ListOfParties
							countDownSpeed={this.state.countDownSpeed}
							title="Current Occupancy"
							currentOccupancy={this.state.currentOccupancy}
							listArray={this.state.listOfParties}
							onClick_remove={this.handleRemoveParty}
							onClick_checkReservation={this.handleCheckReservation}
							handleUpdateTimes={this.handleUpdateTimes}
							updatePartyData={this.updatePartyData}
							handleEditModalToggle={this.handleEditModalToggle}
							calcCurrentNumOfSpotsLeft={this.calcCurrentNumOfSpotsLeft}
							updateCurrentPartyLists={this.updateCurrentPartyLists}
						/>
						<ListOfParties
							countDownSpeed={this.state.countDownSpeed}
							title="Upcoming Reservations"
							currentOccupancy={this.state.currentNumOfReservations}
							listArray={this.state.listOfReservations}
							onClick_remove={this.handleRemoveParty}
							onClick_checkReservation={this.handleCheckReservation}
							handleUpdateTimes={this.handleUpdateTimes}
							updatePartyData={this.updatePartyData}
							handleEditModalToggle={this.handleEditModalToggle}
							calcCurrentNumOfSpotsLeft={this.calcCurrentNumOfSpotsLeft}
							updateCurrentPartyLists={this.updateCurrentPartyLists}
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Cattery;
