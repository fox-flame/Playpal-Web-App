import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FirebaseService],
})
export class AuthModule {}
