const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
	console.log('New Connection');

	socket.on('get data', ({ data }, callback) => {
		console.log(data);
		// const error = 'error'
		if (error) {
			callback();
		}
	});

	socket.on('disconnect', () => {
		console.log('User disconnect');
	});
});

server.listen(PORT, () => console.log(`Server started on ${PORT}`));
