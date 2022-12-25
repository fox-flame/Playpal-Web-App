import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
  apiKey: 'AIzaSyDtDdYDmPCIL71n77x-L0HvM3RbilIAMhA',
  authDomain: 'play-pal-a1403.firebaseapp.com',
  projectId: 'play-pal-a1403',
  storageBucket: 'play-pal-a1403.appspot.com',
  messagingSenderId: '752586541921',
  appId: '1:752586541921:web:50d36804b26ad08ed09320',
  measurementId: 'G-F3XBGRBZWB',
};

const NEST_LOGGING = false;
async function bootstrap() {
  const opts: NestApplicationOptions = {};
  if (!NEST_LOGGING) {
    opts.logger = false;
  }
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.CLIENT_EMAIL,
      projectId: process.env.PROJECT_ID,
    } as Partial<admin.ServiceAccount>),
    databaseURL: '',
  });

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
export default admin;

bootstrap();
