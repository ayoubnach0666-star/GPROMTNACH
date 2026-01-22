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
      className="group relative glass-card rounded-[2.5rem] overflow-hidden transition-all duration-700 cursor-pointer hover:border-[#FF9F1C]/40 hover:shadow-[#FF9F1C]/10"
      onClick={() => onViewDetails(prompt)}
    >
      {/* High-Contrast Image View with pop effect */}
      <div className="p-3">
        <div className="aspect-[4/5] overflow-hidden relative rounded-[2rem] shadow-2xl">
          <img 
            src={prompt.imageUrl} 
            alt={prompt.title} 
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          />
          {/* Layering Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
          
          {/* Classification Badge (Floating on Image) */}
          <div className="absolute top-6 left-6">
            <span className="bg-black/40 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full border border-[#8B5E3C]/40 shadow-lg">
              {prompt.category}
            </span>
          </div>

          {/* Quick Interaction: Orange Copy Action */}
          <div className="absolute top-6 right-6 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
             <button 
              onClick={handleCopy}
              className={`w-12 h-12 rounded-[1rem] flex items-center justify-center transition-all shadow-2xl ${
                copied 
                  ? 'bg-white text-black scale-110' 
                  : 'bg-[#FF9F1C] text-black hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(255,159,28,0.4)]'
              }`}
            >
              {copied ? <Check size={20} /> : <Copy size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Asset Metadata Body */}
      <div className="px-8 pb-8 pt-2 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-black text-xl tracking-tighter group-hover:text-[#FF9F1C] transition-colors uppercase leading-tight truncate mr-2">
            {prompt.title}
          </h3>
          <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-white/5 text-zinc-700 group-hover:text-[#FF9F1C] group-hover:border-[#FF9F1C]/30 transition-all">
            <ExternalLink size={12} />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-zinc-900 border border-white/10 overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${prompt.author}`} alt="author" className="w-full h-full opacity-70" />
          </div>
          <span className="text-[9px] text-[#8B5E3C] font-bold uppercase tracking-[0.3em]">@{prompt.author}</span>
        </div>
      </div>
      
      {/* Subtle Highlight Reflection on Hover */}
      <div className="absolute top-0 left-[-100%] w-full h-[200%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 pointer-events-none group-hover:left-[100%] transition-all duration-1000" />
    </div>
  );
};

export default PromptCard;