export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string; // Django DecimalField serializes as string
  category: string;
}

export interface Menu {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  items: MenuItem[];
}

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  latitude: string; // DecimalField -> string
  longitude: string;
  address: string;
  image_url: string;
  cuisine_type: string;
  menus: Menu[];
  distance?: number; // computed on frontend via Haversine
}

export interface Deal {
  id: number;
  restaurant: number; // FK id
  restaurant_name: string;
  restaurant_image_url: string;
  title: string;
  description: string;
  discount_percentage: string;
  original_price: string;
  deal_price: string;
  expiration_time: string; // ISO 8601 datetime
  is_active: boolean;
  claim_count: number;
  time_remaining: number; // seconds, computed by serializer at request time
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  points: number;
  claim_count: number;
}

export interface ClaimResponse {
  message: string;
  points_earned: number;
  total_points: number;
}
