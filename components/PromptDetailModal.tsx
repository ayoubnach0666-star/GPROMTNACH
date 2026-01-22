import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { AIPrompt } from '../types';

interface PromptDetailModalProps {
  prompt: AIPrompt;
  onClose: () => void;
  onCopy?: () => void;
}

const PromptDetailModal: React.FC<PromptDetailModalProps> = ({ prompt, onClose, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark Overlay with Blur */}
      <div 
        className="absolute inset-0 bg-[#0B0B0F]/80 backdrop-blur-xl animate-in fade-in duration-500" 
        onClick={onClose} 
      />
      
      {/* Modal Content: Minimal Premium Tech Aesthetic */}
      <div className="relative w-full max-w-2xl bg-[#0B0B0F] border border-white/5 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-400">
        
        {/* Header Branding */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF9F1C]/40 to-transparent" />

        {/* Close Interaction */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 text-zinc-600 hover:text-white bg-black/40 rounded-full transition-all hover:rotate-90"
        >
          <X size={24} />
        </button>

        <div className="p-10 flex flex-col gap-8">
          {/* Header Identity */}
          <div className="text-center space-y-4 pt-4">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none">
              {prompt.title}
            </h2>
            <div className="flex items-center justify-center gap-4">
               <span className="bg-[#8B5E3C]/10 text-[#8B5E3C] text-[10px] font-black uppercase tracking-[0.4em] px-5 py-2 rounded-full border border-[#8B5E3C]/20">
                {prompt.category}
              </span>
            </div>
          </div>

          {/* Central Showcase Image */}
          <div className="w-full aspect-square md:aspect-video rounded-[2rem] overflow-hidden bg-black flex items-center justify-center border border-white/5 relative group">
            <img 
              src={prompt.imageUrl} 
              alt={prompt.title} 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Prompt Asset Data: Large Textarea Style Box */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 max-h-48 overflow-y-auto no-scrollbar focus-within:border-[#FF9F1C]/40 transition-colors">
                <p className="text-[#CCCCCC] text-sm font-medium leading-relaxed italic select-all">
                  "{prompt.prompt}"
                </p>
              </div>
              <div className="absolute -top-3 left-8 px-4 py-1 bg-[#0B0B0F] border border-white/5 rounded-full">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Gemini Directive</span>
              </div>
            </div>

            {/* Primary Action: Orange Copy Button */}
            <button 
              onClick={handleCopy}
              className={`w-full py-6 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-4 transition-all active:scale-[0.98] shadow-2xl ${
                copied 
                  ? 'bg-white text-black' 
                  : 'bg-[#FF9F1C] text-black hover:brightness-110 shadow-[0_0_30px_rgba(255,159,28,0.3)]'
              }`}
            >
              {copied ? <Check size={20} className="animate-in zoom-in" /> : <Copy size={20} />}
              {copied ? 'Directive Copied' : 'Copy Prompt'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetailModal;