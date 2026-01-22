
import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { AIPrompt } from '../types';

interface PromptCardProps {
  prompt: AIPrompt;
  onViewDetails: (prompt: AIPrompt) => void;
  onCopy?: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onViewDetails, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="group relative glass-card rounded-[2.5rem] overflow-hidden transition-all duration-700 cursor-pointer hover:border-[#FF9F1C]/30 hover:shadow-[0_0_40px_rgba(255,159,28,0.1)] hover:scale-[1.02]"
      onClick={() => onViewDetails(prompt)}
    >
      <div className="p-3">
        <div className="aspect-[4/5] overflow-hidden relative rounded-[2rem] shadow-2xl">
          <img 
            loading="lazy"
            src={prompt.imageUrl} 
            alt={prompt.title} 
            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
          
          <div className="absolute top-5 left-5">
            <span className="bg-black/50 backdrop-blur-md text-[#8B5E3C] text-[8px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full border border-[#8B5E3C]/30">
              {prompt.category}
            </span>
          </div>

          <div className="absolute top-5 right-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
             <button 
              onClick={handleCopy}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all shadow-2xl ${
                copied 
                  ? 'bg-white text-black scale-110' 
                  : 'bg-[#FF9F1C] text-black hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(255,159,28,0.4)]'
              }`}
            >
              {copied ? <Check size={18} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>

      <div className="px-7 pb-8 pt-1 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-black text-lg tracking-tighter group-hover:text-[#FF9F1C] transition-colors uppercase leading-tight truncate">
            {prompt.title}
          </h3>
          <ExternalLink size={14} className="text-zinc-700 group-hover:text-[#FF9F1C] transition-colors" />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-zinc-900 border border-white/10 overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${prompt.author}`} alt="author" className="w-full h-full opacity-60" />
          </div>
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.2em]">@{prompt.author}</span>
        </div>
      </div>
      
      <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] pointer-events-none group-hover:left-[100%] transition-all duration-1000" />
    </div>
  );
};

export default PromptCard;
