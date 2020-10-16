/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { onConnect, onDisconnect, onMessage, onTyping } from '../events';
import { ChatSocket, FormattedMessageResponse } from './iSocket';
import { ChatGateway } from './chat.gateway';
import { Server } from 'socket.io';
import { ChatClient } from '../client/client';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class SocketHandlersService {
  constructor(private chatGateway: ChatGateway) {
    onConnect.subscribe(Socket => this.onConnect(Socket));
    onDisconnect.subscribe(Socket => this.onDisconnect(Socket));
    onMessage.subscribe(({ Socket, payload }) =>
      this.onMessage(Socket, payload),
    );
    onTyping.subscribe(Socket => this.onTyping(Socket));
  }

  onConnect(Socket: ChatSocket) {
    this.disconnectOnMissingQueryParams(Socket);
  }

  onDisconnect(Socket: ChatSocket) {
    this.notifyDisconnection(this.chatGateway.getServer, Socket);
  }

  onMessage(Socket: ChatSocket, payload: string) {
    this.broadCastMessageToRoom(this.chatGateway.getServer, Socket, payload);
  }

  onTyping(Socket: ChatSocket) {
    this.broadCastTypingToRoom(this.chatGateway.getServer, Socket);
  }

  public disconnectOnMissingQueryParams(client: ChatSocket) {
    const { name, party, theme } = client.handshake.query;
    if (!name || !party || !theme) {
      client.disconnect();
    }
  }

  public notifyDisconnection(server: Server, client: ChatSocket) {
    server.to(Object.keys(client.rooms)[0]).emit('disconnect');
  }

  public broadCastMessageToRoom(
    server: Server,
    client: ChatSocket,
    payload: string,
  ) {
    const { name, id } = new ChatClient(client);
    const response: FormattedMessageResponse = {
      body: payload,
      sender: { id, name },
    };
    server.to(Object.keys(client.rooms)[0]).emit('message', response);
  }

  public broadCastTypingToRoom(server: Server, client: ChatSocket) {
    const { name, id } = new ChatClient(client);
    const response: FormattedMessageResponse = {
      body: `${name} is typing...`,
      sender: { name, id },
    };
    server.to(Object.keys(client.rooms)[0]).emit('typing', response);
    interval(5000)
      .pipe(take(1))
      .subscribe(() => {
        server.to(Object.keys(client.rooms)[0]).emit('stop-typing', {
          ...response,
          body: `${name} has stopped typing....`,
        });
      });
  }
}
