import { Test, TestingModule } from '@nestjs/testing';
import { GroundService } from './ground.service';

describe('GroundService', () => {
  let service: GroundService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroundService],
    }).compile();

    service = module.get<GroundService>(GroundService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
