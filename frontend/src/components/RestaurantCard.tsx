import { motion } from 'framer-motion';
import { MapPin, UtensilsCrossed } from 'lucide-react';
import type { Restaurant } from '../types';

type RestaurantWithDistance = Restaurant & { distance: number };

interface Props {
  restaurant: RestaurantWithDistance;
  onClick: (restaurant: RestaurantWithDistance) => void;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600';

export function RestaurantCard({ restaurant, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick(restaurant)}
      className="bg-[#F9F8F6] rounded-2xl overflow-hidden shadow-sm border border-[#D9CFC7] cursor-pointer"
    >
      <img
        src={restaurant.image_url || FALLBACK_IMAGE}
        alt={restaurant.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 text-sm leading-snug">{restaurant.name}</h3>
        <div className="flex items-center justify-between mt-1.5">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <UtensilsCrossed size={11} />
            {restaurant.cuisine_type}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#C9B59C] font-medium">
            <MapPin size={11} />
            {restaurant.distance} mi
          </span>
        </div>
      </div>
    </motion.div>
  );
}
