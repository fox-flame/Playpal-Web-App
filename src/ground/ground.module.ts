import { Module } from '@nestjs/common';
import { GroundService } from './ground.service';
import { GroundController } from './ground.controller';

@Module({
  controllers: [GroundController],
  providers: [GroundService],
})
export class GroundModule {}
