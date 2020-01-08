import React, { Component } from 'react';
import AddParty from './addParty/addParty';
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
		]
	};

	//sets Current Time  and Num of People in each array
	componentDidMount() {
		let currentTime = formatAMPM(new Date()).toUpperCase();
		function formatAMPM(date) {
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let ampm = hours >= 12 ? 'pm' : 'am';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			minutes = minutes < 10 ? '0' + minutes : minutes;
			let currentTime = hours + ':' + minutes + ' ' + ampm;
			return currentTime;
		}
		setInterval(this.getCurrentTime, 1000);

		this.setState({
			currentTime: currentTime
		});
	}

	getCurrentTime = () => {
		console.log('Current Time');
		let currentTime = formatAMPM(new Date()).toUpperCase();
		function formatAMPM(date) {
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let ampm = hours >= 12 ? 'pm' : 'am';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			minutes = minutes < 10 ? '0' + minutes : minutes;
			let currentTime = hours + ':' + minutes + ' ' + ampm;
			return currentTime;
		}
		this.setState({
			currentTime: currentTime
		});
	};

	//Modal Toggle
	handleModalToggle = () => {
		this.setState({
			modalIsOpen: !this.state.modalIsOpen
		});
	};

	//Removes Party from list
	handleRemoveParty = (id, numInParty, partyData) => {
		let updatedParties = this.state.listOfParties.filter(party => {
			return party.id !== id;
		});

		this.setState({
			listOfParties: updatedParties,
			currentNumOfPeople: this.state.currentNumOfPeople - numInParty
		});
	};

	handleMoveParty = (id, currentListArray, listDestinationArray) => {
		let party = this.state.currentListArray.filter(party => {
			return party.id === id;
		});
	};

	handleCheckReservation = (id, numOfNewPeople) => {
		console.log('Checked In' + id);
		let newReservationList = this.state.listOfReservations.filter(party => {
			return party.id !== id;
		});

		//Returns the party
		let party = this.state.listOfReservations.filter(party => {
			return party.id === id;
		});

		//Sets party reservation to false
		party[0].isReservation = false;
		console.log(JSON.stringify(party));

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

	render() {
		return (
			<div className="cattery-container">
				{this.state.modalIsOpen ? (
					<Modal click={this.handleModalToggle}>
						<div id="number-of-people-container">
							<AddParty updateCurrentPartyLists={this.updateCurrentPartyLists} />
						</div>
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
							<span className="open-spots">Active People</span>
						</div>
					</div>

					<PartySizeAvailability />
				</div>
				<div id="cattery-body-col">
					<ListOfParties
						title="Current Parties In Cattery"
						currentNumOfPeople={this.state.currentNumOfPeople}
						listArray={this.state.listOfParties}
						onClick={this.handleRemoveParty}
					/>
					<ListOfParties
						title="Upcoming Reservations"
						currentNumOfPeople={this.state.currentNumOfReservations}
						listArray={this.state.listOfReservations}
						onClick={this.handleCheckReservation}
					/>
				</div>
			</div>
		);
	}
}

export default Cattery;
