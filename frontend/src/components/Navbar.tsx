import { MapPin, Zap } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-30 bg-[#EFE9E3]/80 backdrop-blur-md border-b border-[#D9CFC7]">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-[#C9B59C]" fill="currentColor" />
          <span className="font-bold text-gray-800 text-lg tracking-tight">Tempest</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={14} className="text-[#C9B59C]" />
          <span>San Francisco, CA</span>
        </div>
      </div>
    </nav>
  );
}
