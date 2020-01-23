import React, { Component } from "react";
import TimeKeeper from "react-timekeeper";
import "./css/timeKeeperCSS/timeKeeper.css";
import { pencil } from "../../../utils/icons/icons";

class TimePicker extends Component {
  state = {
    isOpen: true,
    timeStart: null,
    timeEnd: null
  };

  handleUpdateTime = time => {
    console.log(time.formatted.toString().toUpperCase());
    let endMeridiem;
    if (time.hour <= 12) {
      endMeridiem = " PM";
    } else {
      endMeridiem = " PM";
    }

    let endTime = `${time.hour + 1}:${("0" + time.minute).slice(
      -2
    )}${endMeridiem}`;
    this.setState({
      timeStart: time.formatted.toString().toUpperCase(),
      // timeStart: time.formatted,
      timeEnd: endTime
    });
  };

  toggleOpenTimeKeeper = () => {
    this.setState({
      isOpen: !this.state.isOpen
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
        <TimeKeeper
          time={this.state.timeStart}
          onChange={newTime => this.handleUpdateTime(newTime)}
        />
      </div>
    );

    return (
      <div className="time-input-container">
        {this.state.isOpen ? timePickerContainer : editContainer}
      </div>
    );
  }
}

export default TimePicker;
