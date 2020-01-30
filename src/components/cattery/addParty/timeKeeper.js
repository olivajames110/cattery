import React, { Component } from 'react';
import TimeKeeper from 'react-timekeeper';
import './css/timeKeeperCSS/timeKeeper.css';
import { pencil } from '../../../utils/icons/icons';
import * as moment from 'moment';

class TimePicker extends Component {
	state = {
		isOpen    : true,
		// timeStart : null,
		// timeEnd   : null,
		start     : null,
		end       : null,
		hour      : null,
		minute    : null,
		timeStamp : null
	};

	handleUpdateTime = (time) => {
		// console.log(time.formatted.toString().toUpperCase());
		// console.log(time);
		// console.log(time.hour);
		// console.log(time.minute);
		let formattedTime = time.formatted.toString().toUpperCase();
		let startTime = moment(formattedTime, 'h:mmA').format('h:mm A');
		let endTime = moment(formattedTime, 'h:mmA').add('hours', 1).format('h:mm A');
		let currentDate = moment().format('D-MM-YYYY').toString();
		let timeStamp = moment(`${currentDate} ${startTime}`, 'D-MM-YYYY h:mmA').unix();

		console.log(timeStamp);

		this.setState({
			start     : startTime,
			end       : endTime,
			hour      : time.hour24,
			minute    : time.minute,
			timeStamp : timeStamp
		});
	};

	toggleOpenTimeKeeper = () => {
		this.setState({
			isOpen : !this.state.isOpen
		});
	};

	updateData = () => {
		this.props.handleUpdateReservation(this.state);
		this.toggleOpenTimeKeeper();
	};

	render() {
		const editContainer = (
			<div className="edit-container">
				<span id="title" className="reservation-time">
					Reservation:
				</span>
				<span id="time" className="reservation-time">
					{this.state.timeStart}
				</span>
				<button onClick={this.toggleOpenTimeKeeper} className="save-btn">
					{pencil}
				</button>
			</div>
		);

		const timePickerContainer = (
			<div className="time-picker-container">
				<button onClick={this.updateData} className="save-btn">
					Save
				</button>
				<TimeKeeper time={this.state.timeStart} onChange={(newTime) => this.handleUpdateTime(newTime)} />
			</div>
		);

		return <div className="time-input-container">{this.state.isOpen ? timePickerContainer : editContainer}</div>;
	}
}

export default TimePicker;
