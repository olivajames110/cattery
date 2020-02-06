import React from 'react';
import Cattery from './components/cattery';
import './App.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

let DUMMY_ARRAY = [
	{
		name : 'CLIENT',
		id   : 1
	}
];

const App = () => {
	// const [ parties, setParties ] = useState(DUMMY_ARRAY);

	const [ catteryState, setcatteryState ] = useState(DUMMY_ARRAY);
	const ENDPOINT = 'localhost:5000';
	const btnStyles = {
		position        : 'fixed',
		width           : 100,
		height          : 80,
		textAlign       : 'center',
		backgroundColor : '#ffb310',
		display         : 'flex',
		placeItems      : 'center',
		bottom          : '50px',
		right           : '50px',
		cursor          : 'pointer',
		zIndex          : 100000
	};

	let addTestUser = () => {
		let num = catteryState.length + 1;

		let DUMMY_USER = {
			name : 'Client',
			id   : num
		};
		let newState = [ ...catteryState, DUMMY_USER ];
		socket.emit('client_send', newState);
	};

	useEffect(() => {
		socket = io(ENDPOINT);
		console.log(socket);

		socket.on('server_send', (server_data) => {
			setcatteryState(server_data);
			console.log(server_data);
		});
		return () => {
			socket.emit('disconnect');
		};
	}, []);

	//make update state component. From here emit new state to socket/server.
	let updateCatteryState = (state) => {
		socket.emit('client_send', newState);
	};

	return (
		<div className="App">
			<div onClick={addTestUser} style={btnStyles}>
				Send Request
			</div>
			<Cattery parties={catteryState} />
		</div>
	);
};

export default App;
