import { Test, TestingModule } from '@nestjs/testing';
import { GigService } from './gig.service';

describe('GigService', () => {
  let service: GigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GigService],
    }).compile();

    service = module.get<GigService>(GigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
