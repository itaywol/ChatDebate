import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { remove as _remove } from 'lodash';

export interface Client {
  clientSocket: Socket;
  clientID: string;
  debateParty: string;
  name:string
}

@Injectable()
export class ClientsService {


}
