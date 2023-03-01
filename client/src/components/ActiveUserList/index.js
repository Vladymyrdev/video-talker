import React from 'react';
import { connect } from 'react-redux';
import ActiveUserItem from '../ActiveUserItem';
import styles from './UserList.module.css';

function ActiveUseerList({ activeUsers }) {
	return (
		<div className={styles.container}>
			{activeUsers.map((user) => (
				<ActiveUserItem key={user.socketId} activeUser={user} />
			))}
		</div>
	);
}

const mapStateToProps = ({ dashboard }) => ({
	...dashboard,
});

export default connect(mapStateToProps)(ActiveUseerList);
