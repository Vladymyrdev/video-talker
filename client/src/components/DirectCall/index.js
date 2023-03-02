import React from 'react';
import { connect } from 'react-redux';
import IncommingCallDialog from '../IncommingCallDialog';
import LocalVideoView from '../LocalVideoView';
import RemoteVideoView from '../RemoteVideoView';
import CallRejectedDialog from '../CallRejectedDialog';
import CallingDialog from '../CallingDialog';
import { callStates, setCallRejected } from '../../store/actions/callActions';

function DirectCall({
  localStream,
  remoteStream,
  callState,
  callerUsername,
  callingDialogVisible,
  callRejected,
  hideCallRejectedDialog,
}) {
  console.log(callState);
  return (
    <div>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
      {callRejected.rejected && (
        <CallRejectedDialog
          reason={callRejected.reason}
          hideCallRejectedDialog={hideCallRejectedDialog}
        />
      )}
      {callState === callStates.CALL_REQUESTED && (
        <IncommingCallDialog callerUsername={callerUsername} />
      )}
      {callingDialogVisible && <CallingDialog />}
    </div>
  );
}

function mapStoreStateToProps({ call }) {
  return {
    ...call,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideCallRejectedDialog: (callRejectedDetails) => dispatch(setCallRejected(callRejectedDetails)),
  };
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall);
