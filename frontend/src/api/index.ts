import type { Restaurant, Deal, UserProfile, ClaimResponse } from '../types';

const BASE_URL = '/api';

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export const api = {
  getRestaurants: () => fetchJSON<Restaurant[]>('/restaurants/'),
  getRestaurant: (id: number) => fetchJSON<Restaurant>(`/restaurants/${id}/`),
  getDeals: () => fetchJSON<Deal[]>('/deals/'),
  getExpiringSoonDeals: () => fetchJSON<Deal[]>('/deals/?expiring_soon=true'),
  getUserProfile: () => fetchJSON<UserProfile>('/users/me/'),

  claimDeal: async (dealId: number): Promise<ClaimResponse> => {
    const res = await fetch(`${BASE_URL}/claims/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deal: dealId }),
    });
    if (!res.ok) {
      const err = await res.json() as { error?: string };
      throw new Error(err.error ?? 'Failed to claim');
    }
    return res.json() as Promise<ClaimResponse>;
  },
};
