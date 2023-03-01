const express = require('express');
const socket = require('socket.io');

const PORT = 5000;

const app = express();

const server = app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

const io = socket(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

let peers = [];

const broadcastEventTypes = {
	ACTIVE_USERS: 'ACTIVE_USERS',
	GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS',
};

io.on('connection', (socket) => {
	socket.emit('connection', null);

	socket.on('register-new-user', (data) => {
		peers.push({
			username: data.username,
			socketId: data.socketId,
		});

		io.sockets.emit('broadcast', {
			event: broadcastEventTypes.ACTIVE_USERS,
			activeUsers: peers,
		});
	});

	socket.on('disconnect', () => {
		peers = peers.filter((peer) => peer.socketId !== socket.id);
		io.sockets.emit('broadcast', {
			event: broadcastEventTypes.ACTIVE_USERS,
			activeUsers: peers,
		});
	});
});
