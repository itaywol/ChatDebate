import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Client } from '../clients/clients.service';
import { interval } from 'rxjs';
import { throwIfEmpty } from 'rxjs/operators';
import { ChatSocket } from '../webrtc-chat.gateway';
import { Server } from 'socket.io';

export interface DebateTheme {
  name: string;
  partyNames: [string, string];
  partyQueues: [Client[], Client[]];
}

@Injectable()
export class RoomsService {
  private Debates: DebateTheme[] = [
    { name: 'demsvsreps', partyNames: ['dems', 'reps'], partyQueues: [[], []] },
  ];

  get getDebateThemes() {
    return this.Debates;
  }

  public createTheme(name: string, partyNames: [string, string]) {
    this.Debates.push({ name, partyNames, partyQueues: [[], []] });
  }

  public closeThemeByIndex(themeIndex: number): void {
    this.Debates.splice(themeIndex, 1);
  }

  public getThemeByName(name: string): DebateTheme {
    return this.Debates?.filter(debateTheme => debateTheme.name === name)[0];
  }

  public static getThemeOtherParty(party: string, theme: DebateTheme): string {
    return theme?.partyNames?.filter(themeParty => themeParty !== party)[0];
  }

  public static getClientsQueueByParty(
    party: string,
    debateTheme: DebateTheme,
  ): Client[] {
    const partyIndex = debateTheme.partyNames.indexOf(party);
    if (partyIndex === -1) throw 'Tried to get clients of undefined party';
    return debateTheme.partyQueues[partyIndex];
  }

  public pushClientToQueueByThemeAndParty(
    theme: DebateTheme,
    party: string,
    client: Client,
  ) {
    RoomsService.getClientsQueueByParty(party, theme).push(client);
  }

  public unshiftFromOtherParty(theme: DebateTheme, party: string): Client {
    const otherParty = RoomsService.getThemeOtherParty(party, theme);
    const clientsQueue = RoomsService.getClientsQueueByParty(otherParty, theme);
    return clientsQueue.splice(0, 1)[0];
  }

  public matchClients() {
    interval(5000).subscribe(() => {
      this.Debates.map(debateTheme => {
        const { partyQueues } = debateTheme;
        if (partyQueues[0].length && partyQueues[1].length) {
          let amountToRemoveFromQueues = 0;
          partyQueues[0].map((client, index) => {
            const leftQueueClient = client.clientSocket;
            const rightQueueClient = partyQueues[1][index]?.clientSocket;
            this.mergeClient(leftQueueClient, rightQueueClient);
            amountToRemoveFromQueues++;
          });
          partyQueues[0].splice(0, amountToRemoveFromQueues);
          partyQueues[1].splice(0, amountToRemoveFromQueues);
        }
      });
    });
  }

  public mergeClient(client1: ChatSocket, client2: ChatSocket) {
    client1.leaveAll();
    client2.leaveAll();
    const newPrivateRoom = uuidv4();
    client1.join(newPrivateRoom);
    client2.join(newPrivateRoom);
    client1
      .to(newPrivateRoom)
      .emit('message', {sender:client1.handshake.query.name,body:'Hey there my name is ' + client1.handshake.query.name});
    client2
      .to(newPrivateRoom)
      .emit('message', {sender:client2.handshake.query.name,body:'Hey there my name is ' + client2.handshake.query.name});
  }

  public removeClient(client: ChatSocket) {
    this.Debates.map(debate => {
      debate.partyQueues.map(queue => {
        const clientToRemove = queue.filter(
          clientNominee => clientNominee.clientID === client.conn.id,
        )[0];
        const indexOf = queue.indexOf(clientToRemove);

        if (indexOf !== -1) {
          queue.splice(indexOf, 1);
        }
      });
    });

  }
  public notifyDisconnection(server:Server,client:ChatSocket) {
    server.to(Object.keys(client.rooms)[0]).emit("disconnect")
  }
}
