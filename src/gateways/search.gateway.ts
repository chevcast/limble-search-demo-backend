import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
// import { Server } from 'ws';

@Injectable()
@WebSocketGateway({ transports: ['websocket'] })
export class SearchGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('initialized');
  }

  handleConnection(client: any) {
    const { sockets } = this.server.sockets;
    console.log(`Client id: ${client.id} connected`);
    console.log(`Number of connected clients ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client id: ${client.id} disconnected`);
  }
}
