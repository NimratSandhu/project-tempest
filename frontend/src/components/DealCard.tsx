import { motion } from 'framer-motion';
import { Tag, Clock } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import type { Deal } from '../types';

interface Props {
  deal: Deal;
  onClaim: (dealId: number) => void;
  claimed?: boolean;
}

const TWENTY_FOUR_HOURS = 24 * 60 * 60;

export function DealCard({ deal, onClaim, claimed = false }: Props) {
  const isExpiringSoon = deal.time_remaining > 0 && deal.time_remaining < TWENTY_FOUR_HOURS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-[#F9F8F6] rounded-2xl p-4 shadow-sm border border-[#D9CFC7] flex flex-col gap-3"
    >
      {deal.restaurant_image_url && (
        <img
          src={deal.restaurant_image_url}
          alt={deal.restaurant_name}
          className="w-full h-36 object-cover rounded-xl"
        />
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-[#C9B59C] font-medium uppercase tracking-wide truncate">
            {deal.restaurant_name}
          </p>
          <h3 className="font-semibold text-gray-800 mt-0.5 leading-snug">{deal.title}</h3>
        </div>
        <span className="shrink-0 bg-[#C9B59C] text-white text-xs font-bold px-2 py-1 rounded-full">
          -{deal.discount_percentage}%
        </span>
      </div>

      {deal.description && (
        <p className="text-sm text-gray-500 leading-relaxed">{deal.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 line-through text-sm">${deal.original_price}</span>
          <span className="text-gray-800 font-bold text-base">${deal.deal_price}</span>
        </div>

        {isExpiringSoon && (
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-red-500" />
            <CountdownTimer expirationTime={deal.expiration_time} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Tag size={12} />
          {deal.claim_count} claimed
        </span>
        <button
          onClick={() => onClaim(deal.id)}
          disabled={claimed}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            claimed
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-[#C9B59C] text-white hover:bg-[#b8a389] active:scale-95'
          }`}
        >
          {claimed ? 'Claimed ✓' : 'Claim Deal'}
        </button>
      </div>
    </motion.div>
  );
}
