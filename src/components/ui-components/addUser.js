import React from 'react';
import AddParty from '../cattery/addParty/addParty';

const AddUser = (props) => {
	return (
		<div id="number-of-people-container">
			<AddParty handleAddParty={props.handleAddParty} />
		</div>
	);
};

export default AddUser;
