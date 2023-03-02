import React, { useEffect } from 'react';
import ActiveUserList from '../../components/ActiveUserList';
import DirectCall from '../../components/DirectCall';
import * as webRTCHandler from '../../utils/webRTC/webRTCHandler';
import styles from './Dashboard.module.css';

function Dashboard() {
  useEffect(() => {
    webRTCHandler.getLocalStream();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.flexbox}>
        <div className={styles.main}>
          <DirectCall />
        </div>
        <div className={styles.left}>
          <ActiveUserList />
        </div>
      </div>
      <div className={styles.header}>
        header
        <div className={styles.logo}>
          <img width={100} src="/images/preview.png" alt="logo" />
          <span>VIDEO TALKER</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
