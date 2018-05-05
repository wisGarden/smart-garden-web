import config from './config';

function wsPosConfig(confObj) {
  const socket = new WebSocket(`${config.wsUrl}/fixedPos/${confObj.file_uuid}/`);
  socket.onmessage = confObj.onmessage;
  socket.onclose = confObj.onclose;
  socket.onopen = e => {
    confObj.onopen(e);
    socket.send(confObj.send);
  };
}

function wsAreaConfig(confObj) {
  const socket = new WebSocket(`${config.wsUrl}/fixedArea/${confObj.file_uuid}/`);
  socket.onmessage = confObj.onmessage;
  socket.onclose = confObj.onclose;
  socket.onopen = e => {
    confObj.onopen(e);
    socket.send(confObj.send);
  };
}

export default { wsPosConfig, wsAreaConfig }