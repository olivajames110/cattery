import React, { Component } from 'react';
import Input from '../../../utils/input/input';
import TimeKeeper from 'react-timekeeper';

import './css/addParty.css';
let personn = [
	{
		name: 'Carll',
		description: '1 person with black shirt, red hat',
		numberInParty: 2,
		paid: true,
		status: 'In Room',
		timeRemaining: 60,
		timeStart: '2:10',
		timeEnd: '3:10',
		isReservation: false
	}
];

class AddParty extends Component {
	state = {
		id: null,
		name: null,
		description: null,
		numberInParty: 1,
		paid: true,
		status: null,
		timeRemaining: 60,
		timeStart: null,
		timeEnd: null,
		isReservation: false,
		reservationTime: null,
		width: '100%'
	};

	componentDidMount() {
		let startTime = formatAMPM(new Date(), 0);
		let endTime = formatAMPM(new Date(), 1);
		function formatAMPM(date, hourOffset, minOffset) {
			let hours = date.getHours() + hourOffset;
			let minutes = date.getMinutes();
			let ampm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			minutes = minutes < 10 ? '0' + minutes : minutes;
			let startTime = hours + ':' + minutes + '' + ampm;
			return startTime;
		}

		this.setState({
			timeStart: startTime,
			timeEnd: endTime,
			id: Math.random() * 10
		});
	}

	addParty = (num, people) => {
		this.props.updateCurrentNumOfPeople(num, people);
	};

	// handleGetTime = () => {
	// 	let currentTime = formatAMPM(new Date()).toUpperCase();
	// 	function formatAMPM(date) {
	// 		let hours = date.getHours();
	// 		let minutes = date.getMinutes();
	// 		let ampm = hours >= 12 ? 'pm' : 'am';
	// 		hours = hours % 12;
	// 		hours = hours ? hours : 12; // the hour '0' should be '12'
	// 		minutes = minutes < 10 ? '0' + minutes : minutes;
	// 		let currentTime = hours + ':' + minutes + ' ' + ampm;
	// 		return currentTime;
	// 	}
	// 	this.setState({});
	// };\

	handleUpdateWalkIn = () => {
		this.setState({ isReservation: false });
	};
	handleUpdateReservation = () => {
		this.setState({ isReservation: true });
	};

	handleUpdatePaymentYes = () => {
		this.setState({ paid: true });
	};
	handleUpdatePaymentNo = () => {
		this.setState({ paid: false });
	};

	handleUpdateTime = time => {
		this.setState({
			reservationTime: time
		});
	};

	handleSaveTime = () => {
		if (this.state.timeStart === null) {
			this.setState({
				timeStart: this.state.reservationTime
			});
		} else {
			this.setState({
				timeStart: null
			});
		}
	};

	onInputChange = e => {
		console.log(e.target.id);
		console.log(e.target.value);
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	render() {
		const plusIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				focusable="false"
				data-prefix="fas"
				data-icon="plus"
				class="svg-inline--fa fa-plus fa-w-14"
				role="img"
				viewBox="0 0 448 512"
			>
				<path
					fill="currentColor"
					d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
				/>
			</svg>
		);

		const styles_absBnt = {
			padding: ' 8px 0',

			position: 'absolute',
			bottom: '-30px',
			width: '100%',
			boxShadow: '0 3px 11px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.15)'
		};

		const styles_normalBnt = {
			// backgroundColor: 'red'
		};

		const styles = {
			right: '60px',
			top: '10px'
		};
		const styles2 = {
			right: '-50px',
			top: '-240px'
		};
		const timeInputs = (
			<div style={this.state.timeStart === null ? styles2 : styles} className="time-input-container">
				{this.state.timeStart === null ? (
					<TimeKeeper onChange={newTime => this.handleUpdateTime(newTime.formatted12)} />
				) : (
					<span className="current-time">{this.state.timeStart}</span>
				)}
				<button
					style={this.state.timeStart === null ? styles_absBnt : styles_normalBnt}
					onClick={this.handleSaveTime}
					className="save-btn"
				>
					{this.state.timeStart === null ? 'Save' : 'Edit'}
				</button>
			</div>
		);

		return (
			<div id="add-people-container">
				<h2>Add Party</h2>
				<div id="input-container-wrapper">
					<Input onChange={this.onInputChange} id="name" label="Party Name:" type="text" />
					<div id="input-container">
						<label>
							Description
							<textarea onChange={this.onInputChange} value={this.state.value} id="description" />
						</label>
					</div>
					<div id="input-container">
						<label>Select # of People in Party:</label>
						<select onChange={this.onInputChange} id="numberInParty" valuename="number-of-people">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
						</select>
					</div>
					<div id="walkIn-res__container">
						<span className="title">Party Type</span>
						<div className="walkIn-res__wrapper">
							<span
								onClick={this.handleUpdateWalkIn}
								id="walk-on"
								className={`walkIn-res__btn ${!this.state.isReservation ? 'active' : ''}`}
							>
								Walk-In
							</span>
							<span
								onClick={this.handleUpdateReservation}
								id="reservation"
								className={`walkIn-res__btn ${this.state.isReservation ? 'active' : ''}`}
							>
								Reservation
							</span>
						</div>
						{!this.state.isReservation ? '' : timeInputs}
					</div>
					<div id="payment-container">
						<span className="title">Payment</span>
						<div className="walkIn-res__wrapper">
							<span
								onClick={this.handleUpdatePaymentYes}
								id="paid__yes"
								className={`walkIn-res__btn ${this.state.paid ? 'active' : ''}`}
							>
								Paid
							</span>
							<span
								onClick={this.handleUpdatePaymentNo}
								id="paid__no"
								className={`walkIn-res__btn ${!this.state.paid ? 'active' : ''}`}
							>
								Not Paid
							</span>
						</div>
					</div>

					<div
						onClick={() => this.addParty(this.state.numberInParty, [this.state])}
						id="input-container-button"
					>
						<span>Add Party</span>
						<span>{plusIcon}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default AddParty;
