
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
        <section className="relative overflow-hidden pt-20 pb-32 px-4 text-center space-y-12">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass border border-white/10 shadow-2xl animate-in slide-in-from-top-4 duration-700">
            <Sparkles size={14} className="text-[#FF9F1C]" />
            <span className="text-[10px] text-zinc-300 font-black uppercase tracking-[0.4em]">Global Gemini Hub</span>
          </div>
          
          <div className="space-y-8 max-w-5xl mx-auto relative group">
            <h2 className="text-6xl md:text-[9rem] font-black text-white tracking-tighter leading-[0.85] uppercase select-none relative inline-block">
              <span className="block drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">The Prompt</span>
              <span className="relative inline-block text-[#FF9F1C] italic">
                Architect.
                <span className="absolute inset-0 bg-[#FF9F1C] blur-[60px] opacity-20 -z-10 rounded-full scale-110 pointer-events-none animate-pulse" />
                <span className="absolute inset-0 text-[#FF9F1C] blur-[10px] opacity-30 select-none pointer-events-none">Architect.</span>
              </span>
            </h2>
            <p className="text-[#CCCCCC] text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto animate-in fade-in duration-1000 pt-6">
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
            <button 
              onClick={() => setIsJoinModalOpen(true)}
              className="glass border border-white/10 text-white px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95"
            >
              Join Hub
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {filteredPrompts.map((prompt) => (
                <PromptCard 
                  key={prompt.id} 
                  prompt={prompt} 
                  onViewDetails={setSelectedPrompt} 
                  onCopy={() => showToast("Asset Copied")}
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
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory(PromptCategory.ALL); }}
                className="px-10 py-4 bg-[#FF9F1C] text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all active:scale-95"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-white/5 py-24 px-10 mt-32 bg-black/40 relative z-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-16 text-center md:text-left">
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-10 h-10 bg-[#FF9F1C] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Zap className="text-black fill-black" size={20} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">G.<span className="text-[#FF9F1C]">PROMTNACH</span></span>
            </div>
            <p className="text-[#8B5E3C] text-[9px] font-bold uppercase tracking-[0.4em] max-w-xs leading-loose">
              Engineered by creators for the next wave of generative AI.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-zinc-700 text-[10px] font-black uppercase tracking-widest">
            <a href="#" className="hover:text-[#FF9F1C] transition-colors">Docs</a>
            <a href="#" className="hover:text-[#FF9F1C] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#FF9F1C] transition-colors">Community</a>
            <a href="#" className="hover:text-[#FF9F1C] transition-colors">Discord</a>
          </div>
        </div>
      </footer>

      {selectedPrompt && (
        <PromptDetailModal 
          prompt={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)} 
          onCopy={() => showToast("Directive Copied")}
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
