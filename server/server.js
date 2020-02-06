const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let SERVER_DUMMY = {
	name : 'SERVER',
	id   : 1
};

io.on('connection', (socket) => {
	console.log('New Connection');

	socket.on('client_send', (clientState) => {
		// console.log(clientState);

		socket.broadcast.emit('server_send', [ ...clientState ]);
		// callback(server_data);
	});
	// socket.emit("party data", SERVER_DUMMY);
	// socket.emit("client_recieve", {
	// 	server_data
	// })

	socket.on('disconnect', () => {
		console.log('User disconnect');
	});
});

server.listen(PORT, () => console.log(`Server started on ${PORT}`));
