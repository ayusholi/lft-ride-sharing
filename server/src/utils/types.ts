export type RequestRide = {
  ride_start_coordinates: string;
  ride_end_coordinates: string;
  ride_start_address: string;
  ride_end_address: string;
  customer_id: number;
  rider_id: number;
};

export enum Status {
  REQUESTED = 'requested',
  PROCESSING = 'processing',
  ACCEPTED = 'accepted',
  CANCELLED = 'cancelled',
  ABORTED = 'aborted',
}
