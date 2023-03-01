import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUsername } from '../../store/actions/dashboardActions';
import { registerNewUser } from '../../utils/wss/wssConnection';
import styles from './Login.module.css';

function Login({ saveUsername }) {
	const [username, setUsername] = useState('');
	const history = useHistory();

	const handleSetUsername = (event) => {
		setUsername(event.target.value);
	};

	const handleSubmitButtonPressed = () => {
		saveUsername(username);
		registerNewUser(username);
		history.push('/dashboard');
	};

	return (
		<div className={styles.container}>
			<div className={styles.login__container}>
				<img width={100} src="/images/preview.png" alt="preview" />
				<h1>VIDEO TALKER</h1>
				<p>Get on Board</p>
				<input
					type="text"
					placeholder="Enter your name"
					value={username}
					onChange={handleSetUsername}
				/>
				<button onClick={handleSubmitButtonPressed}>
					Start using Video Talker
				</button>
			</div>
		</div>
	);
}

const mapActionsToProps = (dispatch) => {
	return {
		saveUsername: (username) => dispatch(setUsername(username)),
	};
};

export default connect(null, mapActionsToProps)(Login);
