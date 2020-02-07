import React from 'react';
import Cattery from './components/cattery';
import './App.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const App = () => {
	const [ socketState, setSocketState ] = useState([]);
	const [ partyState, setPartyState ] = useState([]);
	const ENDPOINT = 'localhost:5000';

	let addTestUser = () => {
		let newState = [ ...partyState, ...PARTY ];
		setPartyState(newState);
		socket.emit('client_send', newState);
	};

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
			<div onClick={addTestUser} style={btnStyles}>
				Send Request
			</div>
			<Cattery updateCatteryState={updateCatteryState} parties={partyState} />
		</div>
	);
};

export default App;

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

let PARTY = [
	{
		description           : null,
		reservationTime       : null,
		id                    : 0.9322715463474562,
		isReservation         : false,
		isOverdue             : false,
		isUpcomingReservation : false,
		isOverlap             : false,
		name                  : null,
		numberInParty         : 4,
		paid                  : true,
		rowNum                : 1,
		times                 : { minute: 34, hour: 19, start: '7:34 PM', end: '8:34 PM', timeStamp: 1581035640 }
	}
];

let DUMMY_PARTIES = [
	{
		description           : null,
		reservationTime       : null,
		id                    : 6.208690183377321,
		isReservation         : false,
		isOverdue             : false,
		isUpcomingReservation : false,
		isOverlap             : false,
		name                  : null,
		numberInParty         : 3,
		paid                  : true,
		rowNum                : 1,
		times                 : { minute: 34, hour: 19, start: '7:34 PM', end: '8:34 PM', timeStamp: 1581035640 }
	}
	// {
	//     description: null,
	//     reservationTime: null,
	//     id: 0.9322715463474562,
	//     isReservation: false,
	//     isOverdue: false,
	//     isUpcomingReservation: false,
	//     isOverlap: false,
	//     name: null,
	//     numberInParty: 4,
	//     paid: true,
	//     rowNum: 1,
	//     times: { minute: 34, hour: 19, start: "7:34 PM", end: "8:34 PM", timeStamp: 1581035640 }
	// }
];
