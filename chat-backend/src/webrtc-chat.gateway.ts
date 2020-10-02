import {
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { EnvironmentService } from './environment.service';
import { Socket, Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { interval, Observable, Subject } from 'rxjs';
import { ClientsService, Client } from './clients/clients.service';
import { RoomsService, DebateTheme } from './rooms/rooms.service';
import { takeUntil } from 'rxjs/operators';

export interface ChatSocket extends Socket {
  handshake: {
    query: {
      name: string;
      room: string;
      party: 'dems' | 'reps';
    };
    headers: any;
    time: any;
    address: any;
    xdomain: any;
    issued: any;
    url: any;
    secure: any;
  };
}

@WebSocketGateway(EnvironmentService.WS_PORT, { namespace: 'chat' })
export class WebrtcChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private clientsService: ClientsService,
    private roomsService: RoomsService,
  ) {
    this.roomsService.matchClients();
  }

  @WebSocketServer() server: Server;

  handleConnection(@ConnectedSocket() client: ChatSocket) {
    const { room, party, name } = client?.handshake?.query;
    if (!room || !party || !name) {
      client.disconnect();
      return;
    }

    const debateTheme: DebateTheme = this.roomsService.getThemeByName(room);
    if (!debateTheme) {
      client.disconnect();
      return;
    }

    const {
      conn: { id },
    } = client;
    const createClient: Client = {
      clientID: id,
      clientSocket: client,
      debateParty: party,
      name: name,
    };

    this.roomsService.pushClientToQueueByThemeAndParty(
      debateTheme,
      party,
      createClient,
    );
  }

  handleDisconnect(@ConnectedSocket() client: ChatSocket) {
    this.roomsService.removeClient(client);
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: ChatSocket,
    @MessageBody() payload: string,
  ) {
    const {
      handshake: {
        query: { name },
      },
    } = client;

    this.server
      .to(Object.keys(client.rooms)[0])
      .emit('message', { sender: name, body: payload });

    return { sender: name, body: payload };
  }
  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: ChatSocket,
    @MessageBody() payload: string,
  ) {
    const {
      handshake: {
        query: { name },
      },
    } = client;
    this.server
      .to(Object.keys(client.rooms)[0])
      .emit('typing', { name, payload: `${name} is typing` });
    return `${name} is typing`;
  }
}
