import React from 'react';
import { callToOtherUser } from '../../utils/webRTC/webRTCHandler';
import styles from './UserItem.module.css';

function ActiveUserItem({ activeUser }) {
  const handleListItemPressed = () => {
    callToOtherUser(activeUser);
  };

  return (
    <div className={styles.container} onClick={handleListItemPressed}>
      <div>
        <img width={50} src="/images/userAvatar.png" alt="avatar" />
      </div>
      <span>{activeUser.username}</span>
    </div>
  );
}

export default ActiveUserItem;
