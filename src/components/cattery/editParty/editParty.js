import React, { Fragment, Component } from 'react';
import './editParty.css';
import { plusIcon } from '../../../utils/icons/icons';
class EditParty extends Component {
	state = {
		description: 'testttt'
	};

	onInputChange = e => {
		console.log(e.target.id);
		console.log(e.target.value);
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	render() {
		return (
			<div className="edit-party-container">
				<h2>Add Description</h2>
				<div className="input-container-wrapper">
					<div className="input-container">
						<label>
							Description
							<textarea onChange={this.onInputChange} value={this.state.value} id="description" />
						</label>
					</div>

					<div
						onClick={() => this.props.updatePartyData(this.props.id, 'description', this.state.description)}
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

export default EditParty;
