import { Navigation } from 'lucide-react';

interface Props {
  locationName?: string;
}

export function LocationBanner({ locationName = 'San Francisco, CA' }: Props) {
  return (
    <div className="bg-[#C9B59C]/10 border border-[#C9B59C]/30 rounded-2xl p-4 flex items-center gap-3">
      <div className="p-2 bg-[#C9B59C] rounded-xl shrink-0">
        <Navigation size={16} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">Showing deals near</p>
        <p className="font-semibold text-gray-800">{locationName}</p>
      </div>
    </div>
  );
}
