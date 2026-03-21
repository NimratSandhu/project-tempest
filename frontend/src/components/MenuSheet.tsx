import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Restaurant } from '../types';

type RestaurantWithDistance = Restaurant & { distance?: number };

interface Props {
  restaurant: RestaurantWithDistance | null;
  onClose: () => void;
}

export function MenuSheet({ restaurant, onClose }: Props) {
  return (
    <AnimatePresence>
      {restaurant && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#F9F8F6] rounded-t-3xl max-h-[80vh] overflow-y-auto"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-[#D9CFC7] rounded-full" />
            </div>

            {/* Header */}
            <div className="sticky top-0 bg-[#F9F8F6] px-5 pt-3 pb-4 border-b border-[#D9CFC7]">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{restaurant.name}</h2>
                  <p className="text-sm text-[#C9B59C] font-medium mt-0.5">{restaurant.cuisine_type}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{restaurant.address}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-[#EFE9E3] transition-colors mt-1"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Menu content */}
            <div className="px-5 py-5 space-y-7">
              {restaurant.menus.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-8">No menu available yet.</p>
              )}
              {restaurant.menus
                .filter((m) => m.is_active)
                .map((menu) => (
                  <div key={menu.id}>
                    <h3 className="font-semibold text-[#C9B59C] uppercase text-xs tracking-widest mb-4">
                      {menu.name}
                    </h3>
                    <div className="space-y-4">
                      {menu.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start gap-4">
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                            {item.description && (
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                            <span className="inline-block mt-1 text-xs text-[#C9B59C] bg-[#C9B59C]/10 px-2 py-0.5 rounded-full">
                              {item.category}
                            </span>
                          </div>
                          <span className="shrink-0 font-semibold text-gray-700 text-sm">
                            ${item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
