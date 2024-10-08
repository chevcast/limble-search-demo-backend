const io = require('socket.io');

const serverAddress = 'ws://localhost:3000';

let client;

function createWebSocket() {
  client = new WebSocket(serverAddress);

  client.on('open', () => {
    console.log('WebSocket connection opened');
  });

  client.on('message', (message) => {
    console.log('Received message:', message);
  });
}

createWebSocket();
