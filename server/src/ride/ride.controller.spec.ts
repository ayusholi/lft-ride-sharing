import { Test, TestingModule } from '@nestjs/testing';
import { RideController } from './ride.controller';
import { RideService } from './ride.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

describe('RideController', () => {
  let rideController: RideController;
  let rideService: RideService;

  const mockRideService = {
    calculateRideData: jest.fn(),
    createRideData: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RideController],
      providers: [{ provide: RideService, useValue: mockRideService }],
    }).compile();

    rideController = module.get<RideController>(RideController);
    rideService = module.get<RideService>(RideService);

    // Reset mock function calls before each test
    jest.clearAllMocks();
  });

  describe('bookRide', () => {
    it('should book a ride and return ride data', async () => {
      const mockRequest = {
        body: {
          ride_start_coordinates: '27.6947917,85.3816236,16z',
          ride_end_coordinates: '27.6834081,85.3463195,17.77z',
          ride_start_address: 'Mulpani',
          ride_end_address: 'Tinkune',
          customer_id: 1,
          rider_id: 2,
        },
      };

      const mockRideData = {
        ride_start_coordinates: '27.6947917,85.3816236,16z',
        ride_end_coordinates: '27.6834081,85.3463195,17.77z',
        ride_start_address: 'Mulpani',
        ride_end_address: 'Tinkune',
        estimated_time: 1800,
        total_cost: 0,
        discount: 0,
        ride_cost: 300,
        status: 'requested',
        customer_id: 1,
        rider_id: 2,
      };

      mockRideService.calculateRideData.mockResolvedValue(mockRideData);
      mockRideService.createRideData.mockResolvedValue(mockRideData);

      const result = await rideController.bookRide(mockRequest);

      expect(result).toEqual(mockRideData);
      expect(mockRideService.calculateRideData).toHaveBeenCalledWith(mockRequest.body);
      expect(mockRideService.createRideData).toHaveBeenCalledWith(mockRideData);
    });
  });
});
