import { Test, TestingModule } from '@nestjs/testing';
import { LalamoveController } from './lalamove.controller';
import { LalamoveService } from './lalamove.service';

describe('LalamoveController', () => {
  let controller: LalamoveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LalamoveController],
      providers: [LalamoveService],
    }).compile();

    controller = module.get<LalamoveController>(LalamoveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
