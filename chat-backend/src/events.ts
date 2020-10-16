import { Subject } from 'rxjs';
import { ChatSocket } from './socket-handlers/iSocket';
export const onConnect:Subject<ChatSocket> = new Subject<ChatSocket>()
export const onDisconnect:Subject<ChatSocket> = new Subject<ChatSocket>()
export const onMessage:Subject<{Socket:ChatSocket,payload:string}> = new Subject<{Socket:ChatSocket,payload:string}>()
export const onTyping:Subject<ChatSocket> = new Subject<ChatSocket>()