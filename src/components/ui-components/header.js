import React from 'react';
import { clockIcon } from '../../utils/icons/icons';
import SpotsAvailable from './spotsAvailable';

const Header = (props) => {
	return (
		<div id="time-and-people-container">
			<div id="current-time" className="container">
				<span className="icon">{clockIcon}</span>
				<div className="primary-value">
					{props.currentTime}
					{props.countDownSpeed === 110 ? <div className="test-mode">Test Mode</div> : ''}
				</div>
			</div>
			<SpotsAvailable
				parties={props.parties}
				currentOccupancy={props.currentOccupancy}
				currentNumOfUpcomingReservations={props.currentNumOfUpcomingReservations}
				currentNumOverdue={props.currentNumOverdue}
				handleSendToServer={props.handleSendToServer}
			/>
			<div id="current-occupancy" className="container">
				<span className="primary-value  number-in-cattery">
					<span>{props.totalGuests}</span>
				</span>
				<span className="open-spots">Total Guests Today</span>
			</div>
		</div>
	);
};

export default Header;
