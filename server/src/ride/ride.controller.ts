import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RideService } from './ride.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ride')
export class RideController {
  constructor(private rideService: RideService) {}

  @UseGuards(JwtAuthGuard)
  @Post('book-ride')
  async bookRide(@Request() req) {
    const rideData = await this.rideService.calculateRideData(req.body);
    return this.rideService.createRideData(rideData);
  }
}
