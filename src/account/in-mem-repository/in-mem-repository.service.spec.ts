import { Test, TestingModule } from '@nestjs/testing';
import { InMemRepositoryService } from './in-mem-repository.service';

describe('InMemRepositoryService', () => {
  let service: InMemRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemRepositoryService],
    }).compile();

    service = module.get<InMemRepositoryService>(InMemRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
