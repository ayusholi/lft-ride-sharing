import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockAppService = {
    healthCheck: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: mockAppService }],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);

    jest.clearAllMocks();
  });

  describe('healthCheck', () => {
    it('should return health check message and status code', () => {
      const mockHealthCheckResult = {
        message: 'Service is healthy',
        statusCode: 200,
      };

      mockAppService.healthCheck.mockReturnValue(mockHealthCheckResult);

      const result = appController.healthCheck();

      expect(result).toEqual(mockHealthCheckResult);
      expect(mockAppService.healthCheck).toHaveBeenCalled();
    });
  });
});
