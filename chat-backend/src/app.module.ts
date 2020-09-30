import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebrtcChatGateway } from './webrtc-chat.gateway';

@Module({
  controllers: [AppController],
  providers: [AppService, WebrtcChatGateway],
})
export class AppModule {}
