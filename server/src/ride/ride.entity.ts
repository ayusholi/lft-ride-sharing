// user.entity.ts
import { Status } from '../utils/types';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('ride_bookings')
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ride_start_coordinates: string;

  @Column()
  ride_end_coordinates: string;

  @Column()
  ride_start_address: string;

  @Column()
  ride_end_address: string;

  @Column()
  estimated_time: number;

  @Column()
  total_cost: number;

  @Column()
  discount: number;

  @Column()
  ride_cost: number;

  @CreateDateColumn()
  ride_start_time: Timestamp;

  @CreateDateColumn()
  ride_end_time: Timestamp;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.REQUESTED,
  })
  status: Status;

  @Column()
  customer_id: number;

  @Column()
  rider_id: number;

  @CreateDateColumn()
  created_at: Timestamp;

  @CreateDateColumn()
  updated_at: Timestamp;
}
