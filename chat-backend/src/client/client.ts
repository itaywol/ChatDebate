import {
  ChatSocket,
  FormattedMatchResponse,
} from '../socket-handlers/iSocket';

export interface BasicClientInfo {
  id: string;
  name: string;
}

export class ChatClient {
  private info: BasicClientInfo;
  private socket: ChatSocket;

  constructor(socket: ChatSocket) {
    this.socket = socket;
    this.info = { id: socket.id, name: socket.handshake.query.name };
  }

  get name() {
    return this.info.name;
  }

  get id() {
    return this.info.id;
  }

  get requestedTheme() {
    return this.socket.handshake.query.theme;
  }

  get requestedParty() {
    return this.socket.handshake.query.party;
  }

  get chatSocket() {
    return this.socket;
  }

  disconnect() {
    return this.socket.disconnect();
  }

  leaveAll() {
    return this.socket.leaveAll();
  }

  joinRoom(room: string) {
    this.socket.join(room);
  }

  welcomeMessage(otherMembers: ChatClient[]) {
    const response: FormattedMatchResponse = {
      participants: otherMembers.map(member => ({
        id: member.id,
        name: member.name,
      })),
    };
    this.chatSocket.emit('match', response);
  }
}
