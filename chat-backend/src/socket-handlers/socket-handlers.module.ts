import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { SocketHandlersService } from './socket-handlers.service';
import {DataService} from "./data.service" 
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from '../client/client.schema';

@Module({ providers: [SocketHandlersService,ChatGateway,DataService],exports:[ChatGateway],imports:[
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
] })
export class SocketHandlersModule {}
