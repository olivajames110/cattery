import React, { Component } from 'react';
import './editParty.css';
import { plusIcon } from '../../../utils/icons/icons';
import { updatePartyData } from '../../../utils/helpers/helpers';
class EditParty extends Component {
	state = {
		description : 'testttt'
	};

	onInputChange = (e) => {
		console.log(e.target.id);
		console.log(e.target.value);
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = () => {
		this.props.updatePartyData(this.props.partyId, 'description', this.state.description);
		this.props.handleEditModalToggle();
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

					<div onClick={() => this.handleSubmit()} className="input-container-button">
						<span>Add Description</span>
						<span>{plusIcon}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default EditParty;
