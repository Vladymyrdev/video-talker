import store from '../../store/store';
import {
  callStates,
  setCallerUsername,
  setCallingDialogVisible,
  setCallRejected,
  setCallState,
  setLocalStream,
} from '../../store/actions/callActions';
import * as wss from '../wss/wssConnection';

const preOfferAnswers = {
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE',
};

const defaultConstrains = {
  video: true,
  audio: true,
};

const configuration = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:13902',
    },
  ],
};

let connectedUserSocketId;
let peerConnection;

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      store.dispatch(setCallState(callStates.CALL_AVAILABLE));
      createPeerConnection();
    })
    .catch((error) => {
      console.log(error);
    });
};

const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(configuration);
  const localStream = store.getState().call.localStream;

  for (const track of localStream.getTrack()) {
    peerConnection.addTrack(track, localStream);
  }

  peerConnection.ontrack = ({ stream: [stream] }) => {
    //dispatch
  };

  peerConnection.onicecandidate = (event) => {
    // send
  };
};

export const callToOtherUser = (calleeDetails) => {
  connectedUserSocketId = calleeDetails.socketId;
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setCallingDialogVisible(true));
  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: store.getState().dashboard.username,
    },
  });
};

export const handlePreOffer = (data) => {
  if (checkIfCallIsPossible()) {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallerUsername(data.callerUsername));
    store.dispatch(setCallState(callStates.CALL_REQUESTED));
  } else {
    wss.sendPreOfferAnswer({
      callerSocketId: data.callerSocketId,
      answer: preOfferAnswers.CALL_NOT_AVAILABLE,
    });
  }
};

export const acceptIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_ACCEPTED,
  });
};

export const rejectIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED,
  });
  resetCallData();
};

export const handlePreOfferAnswer = (data) => {
  store.dispatch(setCallingDialogVisible(false));

  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    sendOffer();
  } else {
    let rejectionReason;

    if (data.answer == preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = 'Callee is not able to pick up the call right now';
    } else {
      rejectionReason = 'Call rejected by the callee';
    }

    store.dispatch(
      setCallRejected({
        rejected: true,
        reason: rejectionReason,
      }),
    );
    resetCallData();
  }
};

const sendOffer = async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  wss.sendWebRTCOffer({
    calleeSocketId: connectedUserSocketId,
    offer,
  });
};

export const handleOffer = async (data) => {
  await peerConnection.setRemoteDescription(data.offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  wss.sendWebRTCAnswer({
    callerSocketId: connectedUserSocketId,
    answer,
  });
};

export const handleAnswer = async (data) => {
  await peerConnection.setRemoteDescription(data.answer);
};

export const checkIfCallIsPossible = () => {
  if (
    store.getState().call.localStream === null ||
    store.getState().call.callState !== callStates.CALL_AVAILABLE
  ) {
    return false;
  } else {
    return true;
  }
};

export const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};
