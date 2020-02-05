import React from 'react';
import Cattery from './components/cattery';
import './App.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

let test = [
	{
		description           : null,
		reservationTime       : null,
		id                    : 2.758276184647954,
		isReservation         : false,
		isOverdue             : false,
		isUpcomingReservation : false,
		isOverlap             : false,
		name                  : null,
		numberInParty         : 4,
		paid                  : true,
		rowNum                : 1,
		times                 : { minute: 36, hour: 11, start: '11:36 AM', end: '12:36 PM', timeStamp: 1580920560 }
	},
	{
		description           : null,
		reservationTime       : null,
		id                    : 1.9791307559099702,
		isReservation         : false,
		isOverdue             : false,
		isUpcomingReservation : false,
		isOverlap             : false,
		name                  : null,
		numberInParty         : 2,
		paid                  : true,
		rowNum                : 1,
		times                 : { minute: 36, hour: 11, start: '11:36 AM', end: '12:36 PM', timeStamp: 1580920560 }
	}
];

const App = () => {
	const [ parties, setParties ] = useState('JIMMY');
	const ENDPOINT = 'localhost:5000';

	useEffect(
		() => {
			// socket.emit('join', { name });
			setParties(test);
			socket = io(ENDPOINT);
			console.log(socket);
			socket.emit('get data', { data: 'data' });

			return () => {
				socket.emit('disconnect');
			};
		},
		[ ENDPOINT ]
	);
	return (
		<div className="App">
			<Cattery parties={test} />
		</div>
	);
};

export default App;
