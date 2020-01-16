import React, { Component } from 'react';
import TimeKeeper from 'react-timekeeper';
import './css/timeKeeperCSS/timeKeeper.css';
import { pencil } from '../../../utils/icons/icons';

class TimePicker extends Component {
	state = {
		isOpen: true,
		timeStart: '12:00',
		timeEnd: null,
		reservationTime: null
	};

	handleUpdateTime = time => {
		console.log(time.formatted.toString().toUpperCase());
		let endMeridiem;
		if (time.hour <= 12) {
			endMeridiem = ' PM';
		} else {
			endMeridiem = ' PM';
		}

		let endTime = `${time.hour + 1}:${('0' + time.minute).slice(-2)}${endMeridiem}`;
		this.setState({
			reservationTime: time.formatted.toString().toUpperCase(),
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

	handleOpenTimeKeeper = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};

	render() {
		const editContainer = (
			<div className="edit-container">
				<span id='title' className="reservation-time">Reservation Time:</span>
				<span id='time' className="reservation-time">{this.state.timeStart} </span>
				<button onClick={this.handleOpenTimeKeeper} className="save-btn">
					{pencil}
				</button>
			</div>
		);

		const timePickerContainer = (
			<div className="time-picker-container">
				<TimeKeeper
					time={this.time}
					onChange={newTime => this.handleUpdateTime(newTime)}
					doneButton={newTime => (
						<div
							style={{ textAlign: 'center', padding: '10px 0' }}
							onClick={() => alert('new time is now', newTime.formatted12)}
						>
							Close
						</div>
					)}
				/>
				<button onClick={this.handleOpenTimeKeeper} className="save-btn">
					{this.state.reservationTime === null || this.state.timeStart === null ? 'Save' : 'Edit'}
				</button>
			</div>
		);

		return <div className="time-input-container">{this.state.isOpen ? timePickerContainer : editContainer}</div>;
	}
}

export default TimePicker;
