import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentService } from './environment.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(EnvironmentService.PORT);
}
bootstrap();
