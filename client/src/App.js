import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connectWithWebSocket } from './utils/wss/wssConnection';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
	useEffect(() => {
		connectWithWebSocket();
	}, []);

	return (
		<Router>
			<Switch>
				<Route path="/dashboard">
					<Dashboard />
				</Route>
				<Route path="/">
					<Login />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
