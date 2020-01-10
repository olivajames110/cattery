import React from 'react';

const Input = props => {
	return (
		<div class="input-container">
			<label>{props.label}</label>
			<input
				onChange={props.onChange}
				style={props.style}
				id={props.id}
				class={props.class}
				type={props.type}
				value={props.value}
				placeholder={props.placeholder}
			/>
		</div>
	);
};

export default Input;
