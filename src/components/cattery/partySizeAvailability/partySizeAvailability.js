import React, { Component } from 'react';
import './css/partySizeAvailability.css';
import PartySizeRow from './partySizeRow/partySizeRow';
class PartySizeAvailability extends Component {
	state = {};
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
		return (
			<div id="party-size-availability-container">
				<h2>Party Size Availability</h2>
				<PartySizeRow />
				<div id="party-size1" className="party-size-wrapper">
					<div className="party-size">1</div>
					<div className="next-available-time">{checkMark}</div>
				</div>
				<div id="party-size1" className="party-size-wrapper">
					<div className="party-size">2</div>
					<div className="next-available-time">{checkMark}</div>
				</div>
				<div id="party-size1" className="party-size-wrapper">
					<div className="party-size">3</div>
					<div className="next-available-time">{checkMark}</div>
				</div>
				<div id="party-size1" className="party-size-wrapper">
					<div className="party-size">4</div>
					<div className="next-available-time">{checkMark}</div>
				</div>
				<div id="party-size1" className="party-size-wrapper">
					<div className="party-size">5</div>
					<div className="next-available-time">{checkMark}</div>
				</div>
				<div id="party-size6" className="party-size-wrapper">
					<div className="party-size">6</div>
					<div className="next-available-time">{checkMark}</div>
				</div>
				<div id="party-size7" className="party-size-wrapper">
					<div className="party-size">7</div>
					<div className="next-available-time">{checkMark}</div>
				</div>
				<div id="party-size8" className="party-size-wrapper">
					<div className="party-size">8</div>
					<div className="next-available-time">{checkMark}</div>
				</div>
				<div id="party-size9" className="party-size-wrapper">
					<div className="party-size">9</div>
					<div className="next-available-time">{checkMark}</div>
				</div>
				<div id="party-size10" className="party-size-wrapper">
					<div className="party-size">10</div>
					<div className="next-available-time">2:20PM</div>
				</div>
				<div id="party-size11" className="party-size-wrapper">
					<div className="party-size">11</div>
					<div className="next-available-time">2:20PM</div>
				</div>
				<div id="party-size12" className="party-size-wrapper">
					<div className="party-size">12</div>
					<div className="next-available-time">2:20PM</div>
				</div>
				<div id="party-size6" className="party-size-wrapper">
					<div className="party-size">13</div>
					<div className="next-available-time">2:20PM</div>
				</div>
				<div id="party-size6" className="party-size-wrapper">
					<div className="party-size">14</div>
					<div className="next-available-time">2:20PM</div>
				</div>
				<div id="party-size6" className="party-size-wrapper">
					<div className="party-size">15</div>
					<div className="next-available-time">2:20PM</div>
				</div>
			</div>
		);
	}
}

export default PartySizeAvailability;
