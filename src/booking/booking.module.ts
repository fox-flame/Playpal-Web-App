import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService,UserService]
})
export class BookingModule {}
