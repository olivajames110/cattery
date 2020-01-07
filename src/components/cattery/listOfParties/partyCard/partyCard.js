import React, { Component } from 'react';
import './css/partyCard.css';
import { edit, checkMark, dollarSign } from '../../../../utils/icons/icons';

class PartyCard extends Component {
	state = {
		timeRemaining: 60,
		timeStart: this.props.party.timeStart,
		timeEnd: this.props.party.timeEnd,
		width: '0%',
		isReservation: this.props.party.isReservation
	};

	componentDidMount() {
		this.handleStartCountdown();
	}

	componentWillUnmount() {
		// use intervalId from the state to clear the interval
		console.log('Unmounted');
		// clearInterval(this.state.intervalId);
	}

	handleStartCountdown = () => {
		let timeStart = this.props.party.timeStart;

		let currentTime = setInterval(() => {
			let widthAmt = `${100 - 100 / (60 / this.state.timeRemaining)}%`;
			console.log(widthAmt);
			this.setState({
				timeRemaining: this.state.timeRemaining - 1,
				width: widthAmt
			});
		}, 60000);
	};

	handleCheckIn = () => {
		console.log('CHECKED IN');

		this.setState({
			isReservation: false
		});
	};

	handleComplete = () => {
		console.log('Complete');
		// this.handleStartCountdown();
	};

	handleFill = () => {
		this.setState({
			width: '100%'
		});
	};

	render() {
		return (
			<div
				style={{
					backgroundColor: this.state.timeRemaining >= 1 ? '#fbfbfb' : '#ffbaba'
				}}
				className={`party-wrapper ${this.state.isReservation ? 'reservation' : ''}`}
			>
				<div className="details-container">
					<span className="edit-btn">{edit}</span>
					<div className="detail-row" id="name">
						Party Name: {this.props.party.name}
					</div>
					<div className="detail-row" id="description">
						<span className="details-title">Description:</span>
						<span className="details-value">{this.props.party.description}</span>
					</div>
					<div className="sub-details-container">
						<div className="detail-row" id="number-in-party">
							<span className="details-title">Size:</span>
							<span className="details-value">{this.props.party.numberInParty}</span>
						</div>
						<div className="detail-row" id="status">
							<span className="details-title">Status:</span>
							<span className="details-value">
								{this.state.isReservation ? 'Reservation' : 'In Room'}
							</span>
						</div>
						<div className="detail-row" id="payment">
							<span className="details-title">Paid:</span>
							<span
								style={{ color: this.props.party.paid ? '#6fa037' : '#c1c0c0' }}
								className="details-value"
							>
								{dollarSign}
							</span>
						</div>
					</div>
				</div>
				<div className="time-remaining-cta-container">
					<div className="time-remaining-container">
						<span id="time-remaining">
							<span id="title">Time Left:</span>
							<span id="time">{this.state.timeRemaining}</span>
						</span>
						<div className="time-start-end-container">
							<div className="detail-row" id="time-start">
								<span className="details-title"> Start:</span>
								<span className="details-value"> {this.state.timeStart}</span>
							</div>
							<div className="detail-row" id="time-end">
								<span className="details-title"> End:</span>
								<span className="details-value"> {this.state.timeEnd}</span>
							</div>
						</div>
					</div>
					<div className="cta-container">
						<button
							onClick={
								this.state.isReservation
									? () => this.handleCheckIn()
									: () => this.props.onClick(this.props.party.id, this.props.party.numberInParty)
							}
							className="complete-btn"
						>
							<span>{this.state.isReservation ? 'Check-In' : 'Complete'}</span>
							<div style={{ width: this.state.width }} className="fill"></div>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default PartyCard;
