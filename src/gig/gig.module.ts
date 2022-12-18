import { Module } from '@nestjs/common';
import { GigService } from './gig.service';
import { GigController } from './gig.controller';

@Module({
  controllers: [GigController],
  providers: [GigService]
})
export class GigModule {}
