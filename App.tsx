import React, { useState, useMemo, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import PromptCard from './components/PromptCard';
import PromptDetailModal from './components/PromptDetailModal';
import AddPromptModal from './components/AddPromptModal';
import JoinModal from './components/JoinModal';
import Toast from './components/Toast';
import { MOCK_PROMPTS } from './constants';
import { AIPrompt, PromptCategory } from './types';
import { Sparkles, ArrowRight, Zap, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [prompts, setPrompts] = useState<AIPrompt[]>(MOCK_PROMPTS);
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory>(PromptCategory.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<AIPrompt | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddPrompt = (newPrompt: AIPrompt) => {
    setPrompts([newPrompt, ...prompts]);
    setIsAddModalOpen(false);
    showToast("Prompt published successfully!");
  };

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
    <div className={`min-h-screen flex flex-col transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onAddClick={() => setIsAddModalOpen(true)}
        onExploreClick={scrollToGallery}
        onJoinClick={() => setIsJoinModalOpen(true)}
      />
      
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-12 space-y-24 relative z-10">
        {/* Hero Section: Premium Dark Banner */}
        <section className="relative overflow-hidden pt-20 pb-32 px-4 text-center space-y-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-white/10 shadow-2xl animate-in slide-in-from-top-4 duration-700">
            <Sparkles size={16} className="text-[#FF9F1C]" />
            <span className="text-[11px] text-zinc-300 font-black uppercase tracking-[0.5em]">Global Gemini Repository</span>
          </div>
          
          <div className="space-y-8 max-w-5xl mx-auto relative group">
            <h2 className="text-7xl md:text-[10rem] font-black text-white tracking-tighter leading-[0.8] uppercase select-none relative inline-block">
              <span className="block drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]">Fuel your AI</span>
              <span className="relative inline-block text-[#FF9F1C] italic">
                Masterpieces.
                {/* Backlit LED Aura specifically for "Masterpieces" */}
                <span className="absolute inset-0 bg-[#FF9F1C] blur-[60px] opacity-20 -z-10 rounded-full scale-110 pointer-events-none animate-pulse" />
                <span className="absolute inset-0 text-[#FF9F1C] blur-[15px] opacity-40 select-none pointer-events-none">Masterpieces.</span>
              </span>
            </h2>
            <p className="text-[#CCCCCC] text-lg md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto animate-in fade-in duration-1000 pt-8">
              Curated Gemini prompt gallery engineered for high-fidelity image generation and professional AI workflows.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 pt-12">
            <button 
              onClick={scrollToGallery}
              className="bg-[#FF9F1C] text-black px-14 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:scale-105 hover:brightness-110 transition-all active:scale-95 shadow-[0_0_50px_rgba(255,159,28,0.25)] group"
            >
              Explore Core <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setIsJoinModalOpen(true)}
              className="glass border border-white/10 text-white px-14 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-white/5 transition-all active:scale-95"
            >
              Join Hub
            </button>
          </div>

          <div className="pt-24 animate-bounce opacity-40">
            <ChevronDown size={32} className="mx-auto text-zinc-600" />
          </div>
        </section>

        {/* Gallery Section */}
        <div id="gallery" ref={galleryRef} className="space-y-16 scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/5 pb-12">
             <div className="space-y-4">
                <h3 className="text-sm font-black text-white uppercase tracking-[0.6em] flex items-center gap-6">
                  <div className="w-12 h-[2px] bg-[#FF9F1C]" />
                  Core Library
                </h3>
                <p className="text-[#8B5E3C] text-[12px] font-bold uppercase tracking-widest pl-20">Optimized for Gemini 1.5 & Ultra</p>
             </div>
             <CategoryFilter 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />
          </div>

          {/* Prompt Grid: Clean 4-column layout */}
          {filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
              {filteredPrompts.map((prompt) => (
                <PromptCard 
                  key={prompt.id} 
                  prompt={prompt} 
                  onViewDetails={setSelectedPrompt} 
                  onCopy={() => showToast("Prompt copied to clipboard!")}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-52 space-y-10 glass rounded-[4rem]">
              <div className="w-24 h-24 bg-zinc-900/50 rounded-full flex items-center justify-center text-zinc-800 border border-white/5">
                 <Zap size={48} />
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-3xl font-black text-white uppercase tracking-tight">System Empty</h3>
                <p className="text-zinc-600 text-[11px] font-bold uppercase tracking-widest">Modified query yielded no results</p>
              </div>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory(PromptCategory.ALL); }}
                className="px-12 py-5 bg-[#FF9F1C] text-black rounded-full text-[11px] font-black uppercase tracking-widest hover:brightness-110 transition-all active:scale-95"
              >
                Reset Parameters
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-white/5 py-32 px-10 mt-32 bg-black/60 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF9F1C]/30 to-transparent" />
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-20 text-center md:text-left">
          <div className="space-y-8">
            <div className="flex items-center justify-center md:justify-start gap-5">
              <div className="w-12 h-12 bg-[#FF9F1C] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,159,28,0.3)]">
                <Zap className="text-black fill-black" size={24} />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white uppercase">G.<span className="text-[#FF9F1C]">PROMTNACH</span></span>
            </div>
            <p className="text-[#8B5E3C] text-[11px] font-bold uppercase tracking-[0.5em] max-w-sm leading-loose">
              ENGINEERED BY CREATORS FOR THE NEXT WAVE OF AI ARTISTS.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-zinc-700 text-[11px] font-black uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-[#FF9F1C] transition-colors">Documentation</a>
            <a href="#" className="hover:text-[#FF9F1C] transition-colors">Privacy Core</a>
            <a href="#" className="hover:text-[#FF9F1C] transition-colors">Community</a>
            <a href="#" className="hover:text-[#FF9F1C] transition-colors">Discord</a>
          </div>
        </div>
      </footer>

      {/* Modals, Toasts & Popups */}
      {selectedPrompt && (
        <PromptDetailModal 
          prompt={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)} 
          onCopy={() => showToast("Prompt copied to clipboard!")}
        />
      )}

      {isAddModalOpen && (
        <AddPromptModal 
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddPrompt}
        />
      )}

      {isJoinModalOpen && (
        <JoinModal 
          onClose={() => setIsJoinModalOpen(false)}
        />
      )}

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
};

export default App;