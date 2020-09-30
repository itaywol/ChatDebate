import { Test, TestingModule } from '@nestjs/testing';
import { WebrtcChatGateway } from './webrtc-chat.gateway';

describe('WebrtcChatGateway', () => {
  let gateway: WebrtcChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebrtcChatGateway],
    }).compile();

    gateway = module.get<WebrtcChatGateway>(WebrtcChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
