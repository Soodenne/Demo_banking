import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { app, credential } from "firebase-admin";
import * as admin from "firebase-admin";
async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(require('../config/admin-key.json')),
  });
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
