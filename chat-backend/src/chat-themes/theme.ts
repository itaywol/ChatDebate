import { ChatClient } from '../client/client';
import { v4 as uuidv4 } from 'uuid';
import { interval, Subscription } from 'rxjs';
import { EnvironmentService } from '../environment.service';
import { onDisconnect } from '../events';
import { ChatSocket } from '../socket-handlers/iSocket';

enum PartySides {
  left = 0,
  right = 1,
}
export class Theme {
  private name: string;
  private parties: [string, string];
  private clients: [ChatClient[], ChatClient[]] = [[], []];
  private matchingObservable: Subscription;

  constructor(name: string, partyNames: [string, string]) {
    this.name = name;
    this.parties = partyNames;
    this.clients = [[], []];

    this.listen();
    onDisconnect.subscribe((Socket: ChatSocket) =>
      this.removeClientFromQueue(new ChatClient(Socket)),
    );
  }

  get themeName() {
    return this.name;
  }

  listen() {
    this.matchingObservable = interval(
      EnvironmentService.MATCHING_INTERVAL,
    ).subscribe(() => this.match());
  }

  dispose() {
    this.matchingObservable.unsubscribe();
  }

  changeThemeName(name: string) {
    this.name = name;
  }

  partyName(side: PartySides) {
    return this.parties[side];
  }

  oppositeParty(party: string) {
    if (this.parties.length < 2)
      throw new Error('Theme doesnt own the requested party');
    return this.parties.filter(p => party !== p)[0];
  }

  getPartySide(party: string): ChatClient[] {
    const partyNameIndex = this.parties.indexOf(party);
    switch (partyNameIndex) {
      case -1:
        throw 'Party not found while trying to get pary side';
      case 0:
        return this.clients[0];
      case 1:
        return this.clients[1];
    }
  }

  changePartyNames(parties: [string, string]) {
    this.parties = parties;
  }

  pushClientToRelevantParty(client: ChatClient) {
    try {
      const partySide = this.getPartySide(client.requestedParty);
      partySide.push(client);
    } catch (err) {
      client.disconnect();
    }
  }

  removeClientFromQueue(client: ChatClient) {
    const partySide = this.getPartySide(client.requestedParty);
    const clientIndex = partySide.indexOf(client);
    if (clientIndex != -1) partySide.splice(clientIndex, 1);
  }

  removeClientsFromQueue(clients: ChatClient[]) {
    clients.map(client => this.removeClientFromQueue(client));
  }

  requeClient(client: ChatClient) {
    const partySide = this.getPartySide(client.requestedParty);
    this.removeClientFromQueue(client);
    partySide.push(client);
  }

  mergeClients(clients: ChatClient[]) {
    const room = uuidv4();
    clients.map(client => {
      client.leaveAll();
      client.joinRoom(room);
      client.welcomeMessage(
        clients.filter(otherClient => client.id !== otherClient.id),
      );
    });
  }

  popFromQueue(clientsQueue: ChatClient[]) {
    return clientsQueue.splice(0, 1)[0];
  }

  match() {
    if (this.clients[0]?.length > 0 && this.clients[1]?.length > 0) {
      const shortestQueue = Math.min(
        this.clients[0].length,
        this.clients[1].length,
      );
      for (let index = 0; index < shortestQueue; index++) {
        let members = [
          this.popFromQueue(this.clients[0]),
          this.popFromQueue(this.clients[1]),
        ];

        members = members.filter(member => member.chatSocket.connected);

        if (members.length === 2) this.mergeClients(members);
        else members.map(member => this.requeClient(member));
      }
    }
  }
}
