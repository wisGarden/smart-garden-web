import config from './config';

function wsPosConfig(confObj) {
  const socket = new WebSocket(`${config.wsUrl}/fixedPos/${confObj.file_uuid}/`);
  socket.onmessage = confObj.onmessage;
  socket.onclose = confObj.onclose;
  socket.onopen = e => {
    confObj.onopen(e);
    socket.send(confObj.send);
  };
  return socket;
}

function wsPosLiveConfig(confObj) {
  const socket = new WebSocket(`${config.wsUrl}/fixedPos/livePos/`);
  socket.onmessage = confObj.onmessage;
  socket.onclose = confObj.onclose;
  socket.onopen = e => {
    confObj.onopen(e);
    socket.send(confObj.send);
  };
  return socket;
}

function wsAreaConfig(confObj) {
  const socket = new WebSocket(`${config.wsUrl}/fixedArea/${confObj.file_uuid}/`);
  socket.onmessage = confObj.onmessage;
  socket.onclose = confObj.onclose;
  socket.onopen = e => {
    confObj.onopen(e);
    socket.send(confObj.send);
  };
  return socket;
}

function wsAreaLiveConfig(confObj) {
  const socket = new WebSocket(`${config.wsUrl}/fixedArea/liveArea/`);
  socket.onmessage = confObj.onmessage;
  socket.onclose = confObj.onclose;
  socket.onopen = e => {
    confObj.onopen(e);
    socket.send(confObj.send);
  };
  return socket;
}

export default { wsPosConfig, wsAreaConfig, wsPosLiveConfig, wsAreaLiveConfig }