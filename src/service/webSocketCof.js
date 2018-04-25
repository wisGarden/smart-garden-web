import config from './config';

function wsPosConfig(cofObj) {
  const socket = new WebSocket(`${config.wsUrl}/fixedPos/${cofObj.file_uuid}/`);
  socket.onmessage = cofObj.onmessage;
  socket.onclose = cofObj.onclose;
  socket.onopen = e => {
    cofObj.onopen(e);
    socket.send(cofObj.send);
  };
}

export default { wsPosConfig }