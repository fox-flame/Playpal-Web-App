import { Test, TestingModule } from '@nestjs/testing';
import { GroundController } from './ground.controller';
import { GroundService } from './ground.service';

describe('GroundController', () => {
  let controller: GroundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroundController],
      providers: [GroundService],
    }).compile();

    controller = module.get<GroundController>(GroundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
