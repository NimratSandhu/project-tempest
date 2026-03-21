import { useState, useEffect } from 'react';
import { api } from '../api';
import { haversineDistance } from '../utils/haversine';
import type { Restaurant } from '../types';

// Mock location: Union Square, San Francisco
const MOCK_LAT = 37.7879;
const MOCK_LNG = -122.4075;

type RestaurantWithDistance = Restaurant & { distance: number };

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<RestaurantWithDistance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .getRestaurants()
      .then((data) => {
        if (!cancelled) {
          const withDistance: RestaurantWithDistance[] = data.map((r) => ({
            ...r,
            distance: haversineDistance(
              MOCK_LAT,
              MOCK_LNG,
              parseFloat(r.latitude),
              parseFloat(r.longitude),
            ),
          }));
          withDistance.sort((a, b) => a.distance - b.distance);
          setRestaurants(withDistance);
        }
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    restaurants,
    loading,
    error,
    userLocation: { lat: MOCK_LAT, lng: MOCK_LNG },
  };
}
