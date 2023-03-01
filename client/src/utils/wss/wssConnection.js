import socketClient from 'socket.io-client';
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/dashboardActions';

const API_URL = 'http://localhost:5000';

const broadcastEventTypes = {
	ACTIVE_USERS: 'ACTIVE_USERS',
	GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS',
};

let socket;

export const connectWithWebSocket = () => {
	socket = socketClient(API_URL);

	socket.on('connection', () => {
		console.log(socket.id);
	});

	socket.on('broadcast', (data) => {
		handleBroadcastEvent(data);
	});
};

export const registerNewUser = (username) => {
	socket.emit('register-new-user', {
		username,
		socketId: socket.id,
	});
};

const handleBroadcastEvent = (data) => {
	switch (data.event) {
		case broadcastEventTypes.ACTIVE_USERS:
			const activeUsers = data.activeUsers.filter(
				(user) => user.socketId !== socket.id
			);
			store.dispatch(dashboardActions.setActiveUsers(activeUsers));
			break;
		default:
			break;
	}
};
