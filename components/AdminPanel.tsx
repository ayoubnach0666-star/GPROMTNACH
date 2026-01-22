
import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Check, ChevronLeft } from 'lucide-react';
import { AIPrompt, PromptCategory } from '../types';
import { useNavigate } from 'react-router-dom';

interface AdminPanelProps {
  onAdd: (prompt: AIPrompt) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onAdd }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    prompt: '',
    category: PromptCategory.PORTRAIT
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = Object.values(PromptCategory).filter(c => c !== PromptCategory.ALL);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.prompt || !previewImage) return;

    const newPrompt: AIPrompt = {
      id: Date.now().toString(),
      title: formData.title,
      description: 'Global Repository Asset',
      prompt: formData.prompt,
      shortPreview: formData.prompt.slice(0, 50) + '...',
      imageUrl: previewImage,
      category: formData.category,
      author: 'Admin',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tips: ['Optimized for Gemini']
    };

    onAdd(newPrompt);
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-6 py-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="mb-12 flex items-center justify-between">
        <div className="space-y-2">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#8B5E3C] hover:text-[#FF9F1C] transition-colors mb-4"
          >
            <ChevronLeft size={14} /> Back to Hub
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FF9F1C]/10 rounded-2xl flex items-center justify-center text-[#FF9F1C] border border-[#FF9F1C]/20">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Publish Asset</h2>
              <p className="text-[10px] text-[#8B5E3C] font-bold uppercase tracking-widest">Secure Owner Environment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-[3rem] p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload Area */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group relative h-64 md:h-80 border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:border-[#FF9F1C]/30 hover:bg-[#FF9F1C]/5 transition-all cursor-pointer overflow-hidden shadow-inner bg-black/20"
          >
            {previewImage ? (
              <img src={previewImage} className="w-full h-full object-contain" alt="Preview" />
            ) : (
              <div className="flex flex-col items-center text-center p-8">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload size={28} className="text-zinc-600 group-hover:text-[#FF9F1C]" />
                </div>
                <p className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em]">Drop Asset Content or Click to Browse</p>
                <p className="text-[9px] text-zinc-700 mt-2 uppercase tracking-widest">Recommended: High Resolution PNG/JPG</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Asset Title</label>
              <input 
                required
                type="text"
                placeholder="Ex: Futuristic Tokyo Streetscape..."
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-6 text-sm text-white focus:outline-none focus:border-[#FF9F1C]/50 transition-all placeholder:text-zinc-800"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Category</label>
              <div className="relative">
                <select 
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-6 text-sm text-white focus:outline-none focus:border-[#FF9F1C]/50 transition-all appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as PromptCategory})}
                >
                  {categories.map(c => <option key={c} value={c} className="bg-[#0B0B0F]">{c}</option>)}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Gemini Directives</label>
            <textarea 
              required
              rows={6}
              placeholder="Enter full engineering prompt instructions here..."
              className="w-full bg-black/40 border border-white/5 rounded-3xl py-6 px-6 text-sm text-zinc-400 focus:outline-none focus:border-[#FF9F1C]/50 transition-all resize-none placeholder:text-zinc-800 font-medium leading-relaxed"
              value={formData.prompt}
              onChange={e => setFormData({...formData, prompt: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#FF9F1C] text-black py-6 rounded-full font-black uppercase text-xs tracking-[0.4em] hover:brightness-110 transition-all active:scale-[0.98] shadow-2xl shadow-orange-500/10 flex items-center justify-center gap-3 mt-4"
          >
            <Check size={20} />
            Publish to Core Registry
          </button>
        </form>
      </div>
    </div>
  );
};

const ChevronDown = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default AdminPanel;
