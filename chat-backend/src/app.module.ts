import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WebrtcChatGateway } from './webrtc-chat.gateway';
import { ClientsService } from './clients/clients.service';
import { RoomsService } from './rooms/rooms.service';

@Module({
  controllers: [],
  providers: [AppService, WebrtcChatGateway, ClientsService, RoomsService ],
})
export class AppModule {}
