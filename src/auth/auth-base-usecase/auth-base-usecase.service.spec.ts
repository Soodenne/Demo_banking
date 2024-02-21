import { Test, TestingModule } from '@nestjs/testing';
import { AuthBaseUsecaseService } from './auth-base-usecase.service';

describe('AuthBaseUsecaseService', () => {
  let service: AuthBaseUsecaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthBaseUsecaseService],
    }).compile();

    service = module.get<AuthBaseUsecaseService>(AuthBaseUsecaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
