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
	const [ socketState, setSocketState ] = useState(DUMMY_ARRAY);
	const [ clientState, setClientState ] = useState(DUMMY_ARRAY);
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
	const fixed = {
		position : 'fixed',
		width    : 100
	};

	let addTestUser = () => {
		let num = clientState.length + 1;
		let DUMMY_USER = {
			name : 'Client',
			id   : num
		};
		let newState = [ ...clientState, DUMMY_USER ];
		setClientState(newState);
	};

	// socket = io(ENDPOINT);
	// socket.on("client_recieve", ({ server_data }) => {
	//     console.log(server_data);
	// });

	useEffect(
		() => {
			socket = io(ENDPOINT);

			socket.emit('client_send', clientState);

			socket.on('server_send', (server_data) => {
				setSocketState(server_data);
				console.log(socketState);
			});
			// socket.on("client_recieve", ({ server_data }) => {
			//     console.log(server_data);
			//     // setParties(server_data);
			// });
			// socket.emit('join', { name });
			// console.log("Socket: " + socket);
			// console.dir(parties);

			return () => {
				socket.emit('disconnect');
			};
		},
		[ ENDPOINT, clientState ]
	);

	return (
		<div className="App">
			<div onClick={addTestUser} style={btnStyles}>
				Send Request
			</div>
			<Cattery parties={DUMMY_ARRAY} />
		</div>
	);
};

export default App;
