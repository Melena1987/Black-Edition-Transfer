
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface BookingRequest {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
  serviceType: 'transfer' | 'disposition';
  hours?: number;
}
