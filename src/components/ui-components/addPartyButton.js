import React from 'react';
import AddParty from '../cattery/addParty/addParty';
import { plusIcon } from '../../utils/icons/icons';

const AddPartyButton = (props) => {
	return (
		<span onClick={props.handleModalToggle} className="modal-btn">
			<span className="text"> ADD PARTY</span>
			<span className="btn"> {plusIcon}</span>
		</span>
	);
};

export default AddPartyButton;
