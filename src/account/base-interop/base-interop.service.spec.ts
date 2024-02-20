import { Test, TestingModule } from '@nestjs/testing';
import { BaseInteropService } from './base-interop.service';

describe('BaseInteropService', () => {
  let service: BaseInteropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseInteropService],
    }).compile();

    service = module.get<BaseInteropService>(BaseInteropService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
