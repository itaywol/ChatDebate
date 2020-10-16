/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatClient } from '../client/client';
import { Client, ClientDocument, createUserEntryInDB } from '../client/client.schema';
import { onConnect, onDisconnect, onMessage } from '../events';
import { ChatSocket } from './iSocket';


/*
* Anything related to database data saving is handled here
*
*
*/
@Injectable()
export class DataService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {
    onConnect.subscribe(Socket => this.onConnect(Socket));
    onDisconnect.subscribe(Socket => this.onDisconnect(Socket));
    onMessage.subscribe(({ Socket, payload }) =>
      this.onMessage(Socket, payload),
    );
  }

  onConnect(Socket: ChatSocket) {
    const chatClient = new ChatClient(Socket);
    createUserEntryInDB(chatClient,this.clientModel)
  }

  onDisconnect(Socket: ChatSocket) {}

  onMessage(Socket: ChatSocket, payload: string) {}
}
