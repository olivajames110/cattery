import React, { Component, Fragment } from 'react';
import EditParty from './cattery/editParty/editParty';
import ListOfParties from './cattery/listOfParties/listOfParties';
import PartySizeAvailability from './cattery/partySizeAvailability/partySizeAvailability';
import Modal from '../utils/modal/modal';
import Header from './ui-components/header';
import AddUser from './ui-components/addUser';
import AddPartyButton from './ui-components/addPartyButton';
import { handleGetTimes, sortArrayByKey } from '../utils/helpers/helpers';
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

		this.setState({
			times : times
		});
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
				this.modifyStateNum(party[i].numberInParty, 'currentNumOfUpcomingReservations');
			}

			// -- Move party if timeStart is equal to currentTime
			if (party[i].times.start === this.state.times.currentTime && party[i].rowNum !== 1) {
				party[i].isUpcomingReservation = true;
				this.handleMoveParty(party[i].id, 1);
				// this.modifyStateNum(party[i].numberInParty, 'currentNumOfUpcomingReservations');
			}
		}

		this.setState({
			times : times
		});
	};

	// -----Shared
	handleAddParty = (party, numOfNewPeople, isReservation) => {
		if (isReservation) {
			this.modifyStateNum(numOfNewPeople, 'currentNumOfReservations');
		} else {
			//   this.modifyStateNum(numOfNewPeople, "currentOccupancy");
			this.modifyCurrentOccupancy(numOfNewPeople, false);
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
		// let filteredArray = this.state.parties.filter(party => {
		//   return party.id !== id;
		// });

		let filteredParty = this.getFilteredParty(id);
		// console.dir(filteredParty[0]);

		//------->

		//Sets party reservation to false
		let newTimes = handleGetTimes();
		console.log(newTimes);

		filteredParty[0].rowNum = 1;
		filteredParty[0].isReservation = false;
		filteredParty[0].times.start = newTimes.start;
		filteredParty[0].times.end = newTimes.end;
		let numOfUpcoming = filteredParty[0].isUpcomingReservation ? Number(numOfNewPeople) : 0;
		this.handleMoveParty(id, 1);
		// this.modifyStateNum(numOfNewPeople, "currentOccupancy")
		this.modifyCurrentOccupancy(numOfNewPeople, false);
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
		// this.modifyStateNum(numInParty, "currentOccupancy", true);
		this.modifyCurrentOccupancy(numInParty, true);
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

	// Updates start/end times
	handleUpdateTimes = (id) => {
		let newTimes = handleGetTimes();
		let filteredParty = this.getFilteredParty(id);
		filteredParty[0].times.start = newTimes.times.start;
		filteredParty[0].times.end = newTimes.times.end;
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
					countDownSpeed={this.state.countDownSpeed}
					handleTestMode={this.handleTestMode}
					currentOccupancy={this.state.currentOccupancy}
					currentNumOfUpcomingReservations={this.state.currentNumOfUpcomingReservations}
					currentNumOverdue={this.state.currentNumOverdue}
					totalGuests={this.state.totalGuests}
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
