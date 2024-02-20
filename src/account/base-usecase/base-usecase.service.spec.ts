import { Test, TestingModule } from '@nestjs/testing';
import { BaseUseCaseService } from './base-usecase.service';

describe('BaseUsecaseService', () => {
  let service: BaseUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseUseCaseService],
    }).compile();

    service = module.get<BaseUseCaseService>(BaseUseCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
