import React from 'react';
import Cattery from './components/cattery';
import './App.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const App = () => {
	const [ socketState, setSocketState ] = useState([]);
	const [ partyState, setPartyState ] = useState([]);
	const ENDPOINT = 'https://cattery-server.herokuapp.com/';
	//cors

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.on('server_send', (server_data) => {
			setSocketState(server_data);
			console.log(server_data);
		});
		return () => {
			socket.emit('disconnect');
		};
	}, []);

	useEffect(
		() => {
			setPartyState([ ...socketState ]);
		},
		[ socketState ]
	);

	//make update state component. From here emit new state to socket/server.
	let updateCatteryState = (state) => {
		setPartyState(state);
		// setSocketState(state);
		socket.emit('client_send', [ ...state ]);
		console.log('update statee');
		// socket.emit('client_send', newState);
	};

	return (
		<div className="App">
			<Cattery updateCatteryState={updateCatteryState} parties={partyState} />
		</div>
	);
};

export default App;
