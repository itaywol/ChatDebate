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
import { RoomsService } from './rooms/rooms.service';
import {takeUntil} from "rxjs/operators"

export interface ChatSocket extends Socket {
  handshake: {
    query: {
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
  constructor(private clientsService: ClientsService) {}

  @WebSocketServer() server: Server;

  handleConnection(@ConnectedSocket() client: ChatSocket) {
    if (!client.handshake.query.party || !client.handshake.query.room) {
      console.log(client.handshake.query);
      client.disconnect();
      return;
    }

    this.clientsService.pushClient({
      clientID: client.conn.id,
      clientSocket: client,
      debateParty: client.handshake.query.party,
      debateType: client.handshake.query.room,
    });

    const stopSearchObersvable:Subject<any> = new Subject()

    interval(1000).pipe(takeUntil(stopSearchObersvable)).subscribe(() => {
      const otherClient:Client = this.clientsService.pickRandomClientByCriteria({
        debateType: client.handshake.query.room,
        debateParty: RoomsService.GetRoomOtherParty(
          client.handshake.query.party,
        ),
      });

      if(otherClient) {
        client.leaveAll()
        otherClient.clientSocket.leaveAll();
        const roomName = RoomsService.generateRoom()

        client.join(roomName)
        otherClient.clientSocket.join(roomName)
        client.to(roomName).emit("message","welcome my name is"+client.conn.id)
        otherClient.clientSocket.to(roomName).emit("message","welcome my name is"+otherClient.clientSocket.conn.id)
        stopSearchObersvable.next(true)
      }
    });
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.clientsService.removeClient({ clientID: client.conn.id });
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: string,
  ): string {
    return 'hey';
  }
}
