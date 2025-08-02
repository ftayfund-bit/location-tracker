import { LocationData } from '../types/location';

export const LocationService = {
  async getCurrentLocation(): Promise<LocationData> {
    return {
      latitude: 0,
      longitude: 0,
      timestamp: new Date(),
      city: undefined,
      country: undefined,
      accuracy: undefined,
    };
  },
  formatCoordinates(lat: number, lng: number): string {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  },
};
