import React, { Component } from 'react';
import Input from '../../../utils/input/input';
import TimeKeeper from 'react-timekeeper';
import { plusIcon } from '../../../utils/icons/icons';
import './css/addParty.css';

class AddParty extends Component {
	state = {
		id: null,
		name: null,
		description: null,
		numberInParty: 1,
		paid: true,
		timeStart: null,
		timeEnd: null,
		isReservation: false,
		reservationTime: null,
		reservationIsReady: null
	};

	componentDidMount() {
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

		this.setState({
			timeStart: startTime,
			timeEnd: endTime,
			id: Math.random() * 10
		});
	}

	addParty = (party, numOfNewPeople, isReservation) => {
		this.props.updateCurrentPartyLists(party, numOfNewPeople, isReservation);
	};

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
		console.log(time);
		let endMeridiem;
		if (time.hour <= 12) {
			endMeridiem = 'pm';
		} else {
			endMeridiem = 'am';
		}

		let endTime = `${time.hour + 1}:${('0' + time.minute).slice(-2)}${endMeridiem}`;
		this.setState({
			reservationTime: `${time.formattedSimple}${time.meridiem}`,
			// timeStart: time.formatted,
			timeEnd: endTime
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

	handleUpdateNumOfPeople = num => {
		this.setState({ numberInParty: num });
	};

	onInputChange = e => {
		if (e.target.id === 'numberInParty') {
			let inputs = document.querySelectorAll('.btn-radio input');
			console.log(inputs[2]);
			inputs.forEach(input => (input.checked = false));
		}
		console.log(e.target.id);
		console.log(e.target.value);
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	render() {
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
					<TimeKeeper onChange={newTime => this.handleUpdateTime(newTime)} />
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
				<div className="input-container-wrapper">
					<Input
						className="input-container"
						onChange={this.onInputChange}
						id="name"
						label="Party Name:"
						type="text"
					/>
					<div className="input-container">
						<label>
							Description
							<textarea onChange={this.onInputChange} value={this.state.value} id="description" />
						</label>
					</div>
					<div id="num-of-people" className="input-container">
						<label>Select # of People in Party:</label>
						<div className="select-option-container">
							<div className="radio-container">
								<label
									onClick={() => {
										this.handleUpdateNumOfPeople(1);
									}}
									for="radio-1"
									class="btn-radio"
								>
									<input type="radio" id="radio-1" name="radio-grp" />
									<svg width="20px" height="20px" viewBox="0 0 20 20">
										<circle cx="10" cy="10" r="9"></circle>
										<path
											d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z"
											class="inner"
										></path>
										<path
											d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z"
											class="outer"
										></path>
									</svg>
									<span>1</span>
								</label>
							</div>
							<div className="radio-container">
								<label
									onClick={() => {
										this.handleUpdateNumOfPeople(2);
									}}
									for="radio-2"
									class="btn-radio"
								>
									<input type="radio" id="radio-2" name="radio-grp" />
									<svg width="20px" height="20px" viewBox="0 0 20 20">
										<circle cx="10" cy="10" r="9"></circle>
										<path
											d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z"
											class="inner"
										></path>
										<path
											d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z"
											class="outer"
										></path>
									</svg>
									<span>2</span>
								</label>
							</div>
							<div className="radio-container">
								<label
									onClick={() => {
										this.handleUpdateNumOfPeople(3);
									}}
									for="radio-3"
									class="btn-radio"
								>
									<input type="radio" id="radio-3" name="radio-grp" />
									<svg width="20px" height="20px" viewBox="0 0 20 20">
										<circle cx="10" cy="10" r="9"></circle>
										<path
											d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z"
											class="inner"
										></path>
										<path
											d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z"
											class="outer"
										></path>
									</svg>
									<span>3</span>
								</label>
							</div>
							<div className="radio-container">
								<label
									onClick={() => {
										this.handleUpdateNumOfPeople(4);
									}}
									for="radio-4"
									class="btn-radio"
								>
									<input type="radio" id="radio-4" name="radio-grp" />
									<svg width="20px" height="20px" viewBox="0 0 20 20">
										<circle cx="10" cy="10" r="9"></circle>
										<path
											d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z"
											class="inner"
										></path>
										<path
											d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z"
											class="outer"
										></path>
									</svg>
									<span>4</span>
								</label>
							</div>
							<div className="radio-container">
								<label
									onClick={() => {
										this.handleUpdateNumOfPeople(5);
									}}
									for="radio-5"
									class="btn-radio"
								>
									<input type="radio" id="radio-5" name="radio-grp" />
									<svg width="20px" height="20px" viewBox="0 0 20 20">
										<circle cx="10" cy="10" r="9"></circle>
										<path
											d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z"
											class="inner"
										></path>
										<path
											d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z"
											class="outer"
										></path>
									</svg>
									<span>5</span>
								</label>
							</div>

							<select onChange={this.onInputChange} id="numberInParty" valuename="number-of-people">
								<option value="" disabled selected>
									6+
								</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
							</select>
						</div>
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
						onClick={() => this.addParty([this.state], this.state.numberInParty, this.state.isReservation)}
						className="input-container-button"
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
