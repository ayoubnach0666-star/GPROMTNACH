import React, { useState, useRef } from 'react';
import { X, Upload, Sparkles, Image as ImageIcon, Check } from 'lucide-react';
import { AIPrompt, PromptCategory } from '../types';

interface AddPromptModalProps {
  onClose: () => void;
  onAdd: (prompt: AIPrompt) => void;
}

const AddPromptModal: React.FC<AddPromptModalProps> = ({ onClose, onAdd }) => {
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
      description: 'Community-contributed core asset',
      prompt: formData.prompt,
      shortPreview: formData.prompt.slice(0, 50) + '...',
      imageUrl: previewImage,
      category: formData.category,
      author: 'Admin',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tips: ['Optimized for Gemini Ultra v1.5', 'Tested at 1024x1024']
    };

    onAdd(newPrompt);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl animate-in fade-in" onClick={onClose} />
      
      <div className="relative w-full max-w-xl glass border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-10 pb-0 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-[#FF9F1C]/10 rounded-2xl flex items-center justify-center text-[#FF9F1C] border border-[#FF9F1C]/20">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Admin Console</h2>
              <p className="text-[10px] text-[#8B5E3C] font-bold uppercase tracking-widest">Publish to core repository</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 text-zinc-600 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          {/* Upload Box */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group relative h-56 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-[#FF9F1C]/40 hover:bg-[#FF9F1C]/5 transition-all cursor-pointer overflow-hidden"
          >
            {previewImage ? (
              <div className="w-full h-full relative">
                <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Replace Asset</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-600 group-hover:text-[#FF9F1C] group-hover:scale-110 transition-all mb-4">
                  <Upload size={28} />
                </div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Select Global Asset</p>
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

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-1">Asset Identity</label>
              <input 
                required
                type="text"
                placeholder="Name of asset"
                className="w-full glass border border-white/10 rounded-2xl py-5 px-6 text-xs text-white focus:outline-none focus:border-[#FF9F1C]/50 transition-all placeholder:text-zinc-800"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-1">Classification</label>
              <select 
                className="w-full glass border border-white/10 rounded-2xl py-5 px-6 text-xs text-white focus:outline-none focus:border-[#FF9F1C]/50 transition-all appearance-none cursor-pointer"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as PromptCategory})}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-1">Gemini Directive</label>
            <textarea 
              required
              rows={5}
              placeholder="Paste full prompt engineering directive here..."
              className="w-full glass border border-white/10 rounded-[2rem] py-5 px-6 text-xs text-[#CCCCCC] focus:outline-none focus:border-[#FF9F1C]/50 transition-all resize-none placeholder:text-zinc-800 leading-relaxed"
              value={formData.prompt}
              onChange={e => setFormData({...formData, prompt: e.target.value})}
            />
          </div>

          <div className="flex gap-4 pt-6">
             <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-5 border border-white/10 text-zinc-500 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white/5 hover:text-white transition-all"
            >
              Discard
            </button>
            <button 
              type="submit"
              className="flex-[2] bg-[#FF9F1C] text-black py-5 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:brightness-110 transition-all active:scale-[0.98] shadow-2xl shadow-orange-500/20 flex items-center justify-center gap-3"
            >
              <Check size={16} />
              Publish Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPromptModal;