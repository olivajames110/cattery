import React, { Component } from 'react';
import './css/partyCard.css';

class PartyCard extends Component {
	state = {
		name: this.props.party.name,
		description: this.props.party.description,
		numberInParty: this.props.party.numberInParty,
		timeStart: this.props.party.timeStart,
		timeEnd: this.props.party.timeEnd,
		timeRemaining: this.props.party.timeRemaining,
		isReservation: this.props.party.isReservation,
		paid: this.props.party.paid,
		width: this.props.party.width
	};

	handleCheckIn = () => {
		this.setState({
			isReservation: false
		});
	};

	handleComplete = () => {
		console.log('Complete');
	};

	handleFill = () => {
		this.setState({
			width: '100%'
		});
	};

	render() {
		const checkMark = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="checkmark"
				aria-hidden="true"
				focusable="false"
				data-prefix="fas"
				data-icon="check"
				class="svg-inline--fa fa-check fa-w-16"
				role="img"
				viewBox="0 0 512 512"
			>
				<path
					fill="currentColor"
					d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
				/>
			</svg>
		);

      const edit = (<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" viewBox="0 0 576 512"><path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"/></svg>)

		const dollarSign = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				focusable="false"
				data-prefix="fas"
				data-icon="dollar-sign"
				class="svg-inline--fa fa-dollar-sign fa-w-9"
				role="img"
				viewBox="0 0 288 512"
			>
				<path
					fill="currentColor"
					d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"
				/>
			</svg>
		);
		return (
			<div
				style={{
					backgroundColor: this.state.timeRemaining !== 0 ? '#fbfbfb' : '#ffbaba'
				}}
				className={`party-wrapper ${this.state.isReservation ? 'reservation' : ''}`}
			>
        <div className="details-container">
          <span className="edit-btn">
          {edit}
          </span>
					<div className="detail-row" id="name">
						Party Name: {this.state.name}
					</div>
					<div className="detail-row" id="description">
						<span className="details-title">Description:</span>
						<span className="details-value">{this.state.description}</span>
					</div>
					<div className="sub-details-container">
						<div className="detail-row" id="number-in-party">
							<span className="details-title">Size:</span>
							<span className="details-value">{this.state.numberInParty}</span>
						</div>
						<div className="detail-row" id="status">
							<span className="details-title">Status:</span>
							<span className="details-value">
								{this.state.isReservation ? 'Reservation' : 'In Room'}
							</span>
						</div>
						<div className="detail-row" id="payment">
							<span className="details-title">Paid:</span>
							<span style={{ color: this.state.paid ? '#6fa037' : '#c1c0c0' }} className="details-value">
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
							onClick={this.state.isReservation ? this.handleCheckIn : this.handleComplete}
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
