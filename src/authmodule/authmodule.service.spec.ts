import { Test, TestingModule } from '@nestjs/testing';
import { AuthmoduleService } from './authmodule.service';

describe('AuthmoduleService', () => {
  let service: AuthmoduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthmoduleService],
    }).compile();

    service = module.get<AuthmoduleService>(AuthmoduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
