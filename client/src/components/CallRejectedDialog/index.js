import React, { useEffect } from 'react';
import styles from './CallRejectedDialog.module.css';

function CallRejectedDialog({ reason, hideCallRejectedDialog }) {
  useEffect(() => {
    setTimeout(() => {
      hideCallRejectedDialog({
        rejected: false,
        reason: '',
      });
    }, 4000);
  }, []);

  return (
    <div className={styles.call_rejected_dialog}>
      <span>{reason}</span>
    </div>
  );
}

export default CallRejectedDialog;
