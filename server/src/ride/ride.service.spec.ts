import { Test, TestingModule } from '@nestjs/testing';
import { RideService } from './ride.service';
import { Ride } from './ride.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Status } from '../utils/types';

describe('RideService', () => {
  let rideService: RideService;
  let rideRepository: Repository<Ride>;

  const mockRideRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RideService, { provide: getRepositoryToken(Ride), useValue: mockRideRepository }],
    }).compile();

    rideService = module.get<RideService>(RideService);
    rideRepository = module.get<Repository<Ride>>(getRepositoryToken(Ride));

    // Reset mock function calls before each test
    jest.clearAllMocks();
  });

  describe('calculateRideData', () => {
    it('should calculate ride data based on input and return a new Ride object', async () => {
      const mockRideData = {
        ride_start_coordinates: '27.6834081,85.3463195,17.77z',
        ride_end_coordinates: '27.6834081,85.3463195,17.77z',
        ride_start_address: 'Start Address',
        ride_end_address: 'End Address',
        customer_id: 1,
        rider_id: 2,
      };

      const result = await rideService.calculateRideData(mockRideData);

      expect(result).toHaveProperty('ride_start_coordinates', mockRideData.ride_start_coordinates);
      expect(result).toHaveProperty('ride_end_coordinates', mockRideData.ride_end_coordinates);
      expect(result).toHaveProperty('ride_start_address', mockRideData.ride_start_address);
      expect(result).toHaveProperty('ride_end_address', mockRideData.ride_end_address);
      expect(result).toHaveProperty('customer_id', mockRideData.customer_id);
      expect(result).toHaveProperty('rider_id', mockRideData.rider_id);
      expect(result).toHaveProperty('status', Status.REQUESTED);
      expect(result).toHaveProperty('estimated_time', 1800);
      expect(result).toHaveProperty('ride_cost', 300);
    });
  });

  describe('createRideData', () => {
    it('should create a new Ride object in the repository', async () => {
      const mockRide = new Ride();

      mockRideRepository.create.mockReturnValue(mockRide);

      const result = await rideService.createRideData(mockRide);

      expect(result).toBe(mockRide);
      expect(mockRideRepository.create).toHaveBeenCalledWith(mockRide);
    });
  });
});
