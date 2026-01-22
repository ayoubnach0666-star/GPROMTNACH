import React from 'react';
import { X, Bell, ShieldCheck } from 'lucide-react';

interface JoinModalProps {
  onClose: () => void;
}

const JoinModal: React.FC<JoinModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in" onClick={onClose} />
      
      <div className="relative w-full max-md bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#FF9F1C]/10 rounded-2xl flex items-center justify-center text-[#FF9F1C] border border-[#FF9F1C]/20 shadow-[0_0_30px_rgba(255,159,28,0.2)]">
            <Bell size={32} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Community Hub</h2>
          <div className="space-y-4 text-[#CCCCCC] font-medium text-sm leading-relaxed">
            <p>
              G.PROMTNACH is a free, open-access Gemini prompt gallery. 
            </p>
            <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 flex items-center gap-3 text-left">
              <ShieldCheck className="text-[#FF9F1C] shrink-0" size={20} />
              <p className="text-[10px] font-bold uppercase tracking-widest leading-normal text-[#8B5E3C]">
                Community features including user profiles and favorites are currently in development.
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-[#FF9F1C] text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:brightness-110 transition-all active:scale-95"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default JoinModal;