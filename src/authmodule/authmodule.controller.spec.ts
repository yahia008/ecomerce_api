import { Test, TestingModule } from '@nestjs/testing';
import { AuthmoduleController } from './authmodule.controller';

describe('AuthmoduleController', () => {
  let controller: AuthmoduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthmoduleController],
    }).compile();

    controller = module.get<AuthmoduleController>(AuthmoduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
