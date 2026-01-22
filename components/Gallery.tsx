
import React, { useMemo, useRef } from 'react';
import CategoryFilter from './CategoryFilter';
import PromptCard from './PromptCard';
import { AIPrompt, PromptCategory } from '../types';
import { Sparkles, ArrowRight, Zap, ChevronDown } from 'lucide-react';

interface GalleryProps {
  prompts: AIPrompt[];
  searchQuery: string;
  onViewDetails: (prompt: AIPrompt) => void;
  onCopy: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ prompts, searchQuery, onViewDetails, onCopy }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<PromptCategory>(PromptCategory.ALL);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredPrompts = useMemo(() => {
    return prompts.filter((p) => {
      const matchesCategory = selectedCategory === PromptCategory.ALL || p.category === selectedCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, prompts]);

  return (
    <div className="max-w-[1400px] mx-auto w-full px-6 py-12 space-y-24">
      <section className="relative overflow-hidden pt-20 pb-32 px-4 text-center space-y-12 animate-in fade-in duration-700">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass border border-white/10 shadow-2xl">
          <Sparkles size={14} className="text-[#FF9F1C]" />
          <span className="text-[10px] text-zinc-300 font-black uppercase tracking-[0.4em]">Global Gemini Hub</span>
        </div>
        
        <div className="space-y-8 max-w-5xl mx-auto relative group">
          <h2 className="text-6xl md:text-[9rem] font-black text-white tracking-tighter leading-[0.85] uppercase select-none">
            <span className="block drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">The Prompt</span>
            <span className="relative inline-block text-[#FF9F1C] italic">Architect.</span>
          </h2>
          <p className="text-[#CCCCCC] text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto pt-6">
            Engineering the future of AI artistry through curated high-fidelity directives.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
          <button 
            onClick={scrollToGallery}
            className="bg-[#FF9F1C] text-black px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-widest flex items-center gap-4 hover:scale-105 hover:brightness-110 transition-all active:scale-95 shadow-[0_0_40px_rgba(255,159,28,0.2)] group"
          >
            Explore Core <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="pt-24 animate-bounce opacity-30">
          <ChevronDown size={28} className="mx-auto text-zinc-600" />
        </div>
      </section>

      <div id="gallery" ref={galleryRef} className="space-y-12 scroll-mt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
           <div className="space-y-3">
              <h3 className="text-[11px] font-black text-white uppercase tracking-[0.5em] flex items-center gap-4">
                <div className="w-10 h-[1px] bg-[#FF9F1C]" />
                Asset Gallery
              </h3>
              <p className="text-[#8B5E3C] text-[10px] font-bold uppercase tracking-widest pl-14">Optimized Core Intelligence</p>
           </div>
           <CategoryFilter 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
        </div>

        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 animate-in slide-in-from-bottom-10 duration-1000">
            {filteredPrompts.map((prompt) => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                onViewDetails={onViewDetails} 
                onCopy={onCopy}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 space-y-8 glass rounded-[3rem]">
            <Zap size={40} className="text-zinc-800" />
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Empty Registry</h3>
              <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">No results found for current query</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
