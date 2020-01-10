import React, { Component } from 'react';
import AddParty from './addParty/addParty';
import EditParty from './editParty/editParty';
import ListOfParties from './listOfParties/listOfParties';
import PartySizeAvailability from './partySizeAvailability/partySizeAvailability';
import Modal from '../../utils/modal/modal';
import './css/cattery.css';
import { clockIcon, usersIcon, plusIcon } from '../../utils/icons/icons';
// Todo

// -- Complete functionality
// -- Move complete to new section (undo btn in place of complete)
// -- Party size availability functionality
// -- Add 5 min button

//house timer here
class Cattery extends Component {
	state = {
		modalIsOpen: false,
		currentNumOfPeople: 0,
		currentNumOfReservations: 0,
		currentTime: '2:10 PM',
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
		let currentTime = formatAMPM(new Date());
		function formatAMPM(date) {
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let ampm = hours >= 12 ? 'pm' : 'am';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			minutes = minutes < 10 ? '0' + minutes : minutes;
			let currentTime = hours + ':' + minutes + '' + ampm;
			return currentTime;
		}
		setInterval(this.getCurrentTime, 1000);

		this.setState({
			currentTime: currentTime
		});
	}

	getCurrentTime = () => {
		console.log('Current Time');
		let currentTime = formatAMPM(new Date());
		function formatAMPM(date) {
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let ampm = hours >= 12 ? 'pm' : 'am';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			minutes = minutes < 10 ? '0' + minutes : minutes;
			let currentTime = hours + ':' + minutes + '' + ampm;
			return currentTime;
		}

		for (let i = 0; i < this.state.listOfReservations.length; i++) {
			let party = this.state.listOfReservations;
			party[i].reservationIsReady = true;
			if (party[i].timeStart === currentTime) {
				this.handleMoveParty(
					party[i].id,
					party[i].numberInParty,
					this.state.listOfReservations,
					this.state.listOfParties
				);
			}
		}

		this.setState({
			currentTime: currentTime
		});
	};

	handleGetTimeStartTimeEnd = id => {
		let startTime = formatAMPM(new Date(), 0);
		let endTime = formatAMPM(new Date(), 1);
		function formatAMPM(date, hourOffset, minOffset) {
			let hours = date.getHours() + hourOffset;
			let minutes = date.getMinutes();
			let ampm = hours >= 12 ? 'pm' : 'am';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			minutes = minutes < 10 ? '0' + minutes : minutes;
			let startTime = hours + ':' + minutes + '' + ampm;
			return startTime;
		}

		let timeStartTimeEnd = {
			timeStart: startTime,
			timeEnd: endTime
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
			modalIsOpen: !this.state.modalIsOpen
		});
	};

	//Removes Party from list
	handleRemoveParty = (id, numInParty, isReservation) => {
		let updatedParties = this.state.listOfParties.filter(party => {
			return party.id !== id;
		});

		this.setState({
			listOfParties: updatedParties,
			currentNumOfPeople: this.state.currentNumOfPeople - numInParty
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
			currentNumOfPeople: Number(this.state.currentNumOfPeople) + Number(numOfNewPeople),
			currentNumOfReservations: Number(this.state.currentNumOfReservations) - Number(numOfNewPeople),
			listOfParties: newlistDestinationArray,
			listOfReservations: filteredCurrentListArray
		});
	};

	handleCheckReservation = (id, numOfNewPeople, isReservation) => {
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
		console.log(JSON.stringify(party));
		console.log(newTimes);

		//Takes existing party list and adds new party
		let newPartyList = [...this.state.listOfParties, ...party];

		//Sets state for --Num of pople in the room --
		this.setState({
			currentNumOfPeople: Number(this.state.currentNumOfPeople) + Number(numOfNewPeople),
			currentNumOfReservations: Number(this.state.currentNumOfReservations) - Number(numOfNewPeople),
			listOfParties: newPartyList,
			listOfReservations: newReservationList
		});

		// this.updateCurrentPartyLists()
	};

	updateCurrentPartyLists = (party, numOfNewPeople, isReservation) => {
		if (!isReservation) {
			let newPartyList = [...this.state.listOfParties, ...party];
			this.setState({
				currentNumOfPeople: Number(this.state.currentNumOfPeople) + Number(numOfNewPeople),
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

	handleEditModal = id => {
		this.handleModalToggle();
		this.setState({
			isEditMode: !this.state.isEditMode
		});
	};

	render() {
		const addUser = (
			<div id="number-of-people-container">
				<AddParty updateCurrentPartyLists={this.updateCurrentPartyLists} />
			</div>
		);

		return (
			<div className="cattery-container">
				{this.state.modalIsOpen ? (
					<Modal click={this.handleModalToggle}>
						{!this.state.isEditMode ? (
							addUser
						) : (
							<EditParty party={'party'} updatePartyData={this.updatePartyData} />
						)}
					</Modal>
				) : (
					<span onClick={this.handleModalToggle} className="modal-btn">
						<span className="text"> ADD PARTY</span>
						<span className="btn"> {plusIcon}</span>
					</span>
				)}
				<div id="cattery-panel-col">
					<div id="time-and-people-container">
						<div id="current-time-wrapper" className="container">
							<span className="icon">{clockIcon}</span>
							<div className="primary-value">{this.state.currentTime}</div>
						</div>
						<div id="current-number-of-people-wrapper">
							<span className="icon">{usersIcon}</span>

							<span className="primary-value  number-in-cattery">{this.state.currentNumOfPeople}</span>
							<span className="open-spots">Spots Left</span>
						</div>
					</div>

					<PartySizeAvailability />
				</div>
				<div id="cattery-body-col">
					<ListOfParties
						title="Current Parties In Cattery"
						currentNumOfPeople={this.state.currentNumOfPeople}
						listArray={this.state.listOfParties}
						onClick_remove={this.handleRemoveParty}
						onClick_checkReservation={this.handleCheckReservation}
						handleUpdateTimes={this.handleUpdateTimes}
						updatePartyData={this.updatePartyData}
						handleEditModal={this.handleEditModal}
					/>
					<ListOfParties
						title="Upcoming Reservations"
						currentNumOfPeople={this.state.currentNumOfReservations}
						listArray={this.state.listOfReservations}
						onClick_remove={this.handleRemoveParty}
						onClick_checkReservation={this.handleCheckReservation}
						handleUpdateTimes={this.handleUpdateTimes}
						updatePartyData={this.updatePartyData}
						handleEditModal={this.handleEditModal}
					/>
				</div>
			</div>
		);
	}
}

export default Cattery;
