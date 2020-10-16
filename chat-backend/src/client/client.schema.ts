import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { ChatClient } from './client';
export type ClientDocument = Client & Document;


// The schema of the user add/remove fields
@Schema()
export class Client {
  @Prop({ required: true, type: 'string' })
  ip: string;

  @Prop()
  name: string;

  @Prop(raw({ lat: { type: String }, lon: { type: String } }))
  location: Record<string, any>;

  @Prop()
  theme: string;

  @Prop()
  party: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);


/*
*
* The main function to save user data
*
*/
export function createUserEntryInDB(
  client: ChatClient,
  model: Model<ClientDocument>,
) {
  const clientData = new model({
    ip: client.chatSocket.handshake.address,
    location: { lat: null, lon: null },
    name: client.name,
    theme: client.requestedTheme,
    party: client.requestedParty,
  });
  clientData.save(); // saves the created user to the database
}
