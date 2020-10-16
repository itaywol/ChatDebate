import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EnvironmentService } from 'src/environment.service';
import { onConnect } from 'src/events';
import { onDisconnect, onMessage, onTyping } from '../events';
import { ChatSocket } from './iSocket';

@WebSocketGateway(EnvironmentService.WS_PORT, { namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  get getServer() {
    return this.server;
  }

  handleConnection(@ConnectedSocket() client: ChatSocket) {
    onConnect.next(client);
  }

  handleDisconnect(@ConnectedSocket() client: ChatSocket) {
    onDisconnect.next(client);
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: ChatSocket,
    @MessageBody() payload: string,
  ) {
    onMessage.next({ Socket: client, payload });
  }

  @SubscribeMessage('typing')
  handleTyping(@ConnectedSocket() client: ChatSocket) {
    onTyping.next(client);
  }
}
