import { Injectable } from '@nestjs/common';
import { onConnect } from '../events';
import { Theme } from './theme';
import { ChatClient } from '../client/client';
import { ChatSocket } from '../socket-handlers/iSocket';

@Injectable()
export class ChatThemesService {
  private themes: [Theme] = [new Theme('demsvsreps', ['democrats', 'republicans'])];

  constructor() {
    onConnect.subscribe((Socket: ChatSocket) =>
      this.pushClientToTheme(new ChatClient(Socket)),
    );
  }

  get getThemes() {
    return this.themes;
  }

  createNewTheme(name: string, parties: [string, string]) {
    this.themes.push(new Theme(name, parties));
  }

  getThemeByName(name: string) {
    return this.themes.filter(theme => theme.themeName === name)[0];
  }

  removeTheme(name: string) {
    const selectedTheme = this.getThemeByName(name);
    selectedTheme.dispose();
    this.themes.splice(this.themes.indexOf(selectedTheme), 1);
  }

  pushClientToTheme(client: ChatClient) {
    const { requestedTheme } = client;
    const theme = this.getThemeByName(requestedTheme);
    if (theme) {
      theme.pushClientToRelevantParty(client);
    } else {
      client.disconnect();
    }
  }
}
