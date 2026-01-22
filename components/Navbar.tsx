
import React from 'react';
import { Search, Zap, Plus } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAdmin?: boolean;
  onAddClick: () => void;
  onExploreClick: () => void;
  onJoinClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, isAdmin = false, onAddClick, onExploreClick, onJoinClick }) => {
  return (
    <nav className="sticky top-0 z-50 glass px-6 py-5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer w-fit" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 bg-[#FF9F1C] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,159,28,0.3)] group-hover:scale-110 transition-transform duration-500">
            <Zap className="text-black fill-black" size={20} />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-white uppercase hidden lg:block">
            G.<span className="text-[#FF9F1C]">PROMTNACH</span>
          </h1>
        </div>

        {/* Search Bar - Hidden on small mobile */}
        <div className="relative group hidden md:block">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#FF9F1C] transition-colors" size={16} />
          <input
            type="text"
            placeholder="Search prompt library..."
            className="w-full bg-zinc-950/50 border border-white/5 rounded-full py-3 pl-14 pr-6 text-xs text-zinc-200 focus:outline-none focus:border-[#FF9F1C]/40 focus:ring-1 focus:ring-[#FF9F1C]/10 transition-all placeholder:text-zinc-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 md:gap-6">
          <button 
            onClick={onExploreClick}
            className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
          >
            Explore
          </button>
          
          {isAdmin && (
            <button 
              onClick={onAddClick}
              className="p-3 glass rounded-xl text-zinc-500 hover:text-[#FF9F1C] transition-all active:scale-90 animate-in fade-in"
              title="Publish Asset"
            >
              <Plus size={20} />
            </button>
          )}
          
          <button 
            onClick={onJoinClick}
            className="bg-[#FF9F1C] text-black px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-xl shadow-orange-500/10"
          >
            Join
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
