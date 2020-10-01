import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { remove as _remove } from 'lodash';

export interface Client {
  clientSocket: Socket;
  clientID: string;
  debateType: string;
  debateParty: string;
}

@Injectable()
export class ClientsService {
  public clients: Client[] = [];

  private static shallowClientsCompare(
    client1: Partial<Client>,
    client2: Partial<Client>,
    fieldsMatch = 1,
  ) {
    let matches = 0;
    Object.values(client1).map(values1 => {
      Object.values(client2).map(values2 => {
        if (values1 == values2) matches++;
      });
    });

    return matches >= fieldsMatch;
  }

  public pushClient(client: Client) {
    this.clients.push(client);
  }
  public popClient() {
    return this.clients.pop();
  }

  public findClientById(client: string) {
    return this.clients.filter(nominee => nominee.clientID === client);
  }

  public pickRandomClientByCriteria(client: Partial<Client>) {
    const filtered = this.clients.map(nominee => {
      if( ClientsService.shallowClientsCompare(nominee, client)) {
          return nominee
      }
    });
    const length = filtered.length;
    const pick = Math.floor(Math.random() * length - 1);

    return filtered[pick];
  }

  public removeClient(client: Partial<Client>) {
    _remove(this.clients, clientNominee =>
      ClientsService.shallowClientsCompare(
        clientNominee,
        client,
        Object.keys(client).length,
      ),
    );
  }
}
