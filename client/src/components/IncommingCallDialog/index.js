import React from 'react';
import {
  acceptIncomingCallRequest,
  rejectIncomingCallRequest,
} from '../../utils/webRTC/webRTCHandler';
import styles from './IncommingCallDialog.module.css';

function IncommingCallDialog({ callerUsername }) {
  const handleAccept = () => {
    acceptIncomingCallRequest();
  };

  const handleReject = () => {
    rejectIncomingCallRequest();
  };

  return (
    <div className={styles.direct_call_dialog}>
      <span className={styles.direct_call_dialog_caller_name}>{callerUsername}</span>
      <div className={styles.direct_call_dialog_button_container}>
        <button className={styles.direct_call_dialog_accept_button} onClick={handleAccept}>
          Accept
        </button>
        <button className={styles.direct_call_dialog_reject_button} onClick={handleReject}>
          Reject
        </button>
      </div>
    </div>
  );
}

export default IncommingCallDialog;
