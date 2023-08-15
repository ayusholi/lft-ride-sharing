import { Ride } from './ride.entity';
import { RequestRide, Status } from './../utils/types';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride)
    private rideRepository: Repository<Ride>,
  ) {}

  async calculateRideData(rideData: RequestRide) {
    // Todo: Calculate Estimated Trip Time and Estimated Trip Cost
    // for now lets assume the estimated trip to be 30 mins
    // and trip cost to be 300 for all rides
    // But since we are using seconds in the estimated_time
    // we'll multiply it by 60 which is 30*60 = 1800

    const newRide = new Ride();
    newRide.ride_start_coordinates = rideData.ride_start_coordinates;
    newRide.ride_end_coordinates = rideData.ride_end_coordinates;
    newRide.ride_start_address = rideData.ride_start_address;
    newRide.ride_end_address = rideData.ride_end_address;
    newRide.customer_id = rideData.customer_id;
    newRide.rider_id = rideData.rider_id;
    newRide.status = Status.REQUESTED;
    newRide.estimated_time = 1800; // 30 min * 60sec
    newRide.ride_cost = 300;
    newRide.discount = 0;
    newRide.total_cost = 0;

    return newRide;
  }

  async createRideData(ride: Ride) {
    return this.rideRepository.create(ride);
  }
}
