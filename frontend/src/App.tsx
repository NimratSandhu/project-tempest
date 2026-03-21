import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { LocationBanner } from './components/LocationBanner';
import { DealCard } from './components/DealCard';
import { RestaurantCard } from './components/RestaurantCard';
import { MenuSheet } from './components/MenuSheet';
import { useDeals } from './hooks/useDeals';
import { useRestaurants } from './hooks/useRestaurants';
import { api } from './api';
import type { Restaurant } from './types';

type RestaurantWithDistance = Restaurant & { distance: number };

export default function App() {
  const { deals, expiringSoon, loading: dealsLoading, refetch } = useDeals();
  const { restaurants, loading: restLoading } = useRestaurants();
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantWithDistance | null>(null);
  const [claimedDeals, setClaimedDeals] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleClaim = useCallback(
    async (dealId: number) => {
      if (claimedDeals.has(dealId)) return;
      try {
        const result = await api.claimDeal(dealId);
        setClaimedDeals((prev) => new Set([...prev, dealId]));
        showToast(`+${result.points_earned} pts! You have ${result.total_points} total`);
        refetch();
      } catch (e) {
        showToast(e instanceof Error ? e.message : 'Failed to claim');
      }
    },
    [claimedDeals, refetch],
  );

  return (
    <div className="min-h-screen bg-[#EFE9E3]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Hero */}
        <section>
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            Deals near you
          </motion.h1>
          <LocationBanner />
        </section>

        {/* Ending Soon — horizontal scroll */}
        {expiringSoon.length > 0 && (
          <section>
            <h2 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-base">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse inline-block" />
              Ending Soon
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4">
              {expiringSoon.map((deal) => (
                <div key={deal.id} className="min-w-[280px] snap-start">
                  <DealCard
                    deal={deal}
                    onClaim={handleClaim}
                    claimed={claimedDeals.has(deal.id)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Restaurants grid */}
        <section>
          <h2 className="font-semibold text-gray-700 mb-3 text-base">Restaurants</h2>
          {restLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-[#F9F8F6] rounded-2xl h-52 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {restaurants.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} onClick={setSelectedRestaurant} />
              ))}
            </div>
          )}
        </section>

        {/* All Deals grid */}
        {!dealsLoading && deals.length > 0 && (
          <section>
            <h2 className="font-semibold text-gray-700 mb-3 text-base">All Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deals.map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  onClaim={handleClaim}
                  claimed={claimedDeals.has(deal.id)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Menu Sheet */}
      <MenuSheet
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-2xl text-sm font-medium shadow-xl z-50 whitespace-nowrap"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
