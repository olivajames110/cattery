import React from 'react';

const Input = props => {
	return (
		<div id="input-container">
			<label>{props.label}</label>
			<input
				onChange={props.onChange}
				style={props.style}
				id={props.id}
				type={props.type}
				value={props.value}
				placeholder={props.placeholder}
			/>
		</div>
	);
};

export default Input;
