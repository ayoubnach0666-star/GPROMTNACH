
import React, { useState, useRef } from 'react';
import { X, Upload, Sparkles, Check } from 'lucide-react';
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
      description: 'Global Repository Asset',
      prompt: formData.prompt,
      shortPreview: formData.prompt.slice(0, 50) + '...',
      imageUrl: previewImage,
      category: formData.category,
      author: 'Creator',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tips: ['Optimized for Gemini']
    };

    onAdd(newPrompt);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl animate-in fade-in" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-[#0B0B0F] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-8 pb-0 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#FF9F1C]/10 rounded-xl flex items-center justify-center text-[#FF9F1C] border border-[#FF9F1C]/20">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter">Publish Asset</h2>
              <p className="text-[9px] text-[#8B5E3C] font-bold uppercase tracking-widest">Add to Core Gallery</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-600 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group relative h-48 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center gap-3 hover:border-[#FF9F1C]/30 hover:bg-[#FF9F1C]/5 transition-all cursor-pointer overflow-hidden"
          >
            {previewImage ? (
              <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
            ) : (
              <div className="flex flex-col items-center text-center">
                <Upload size={24} className="text-zinc-600 group-hover:text-[#FF9F1C] mb-2" />
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Upload Asset Image</p>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Asset Title</label>
              <input 
                required
                type="text"
                placeholder="Enter title..."
                className="w-full bg-white/5 border border-white/5 rounded-xl py-4 px-5 text-xs text-white focus:outline-none focus:border-[#FF9F1C]/50 transition-all placeholder:text-zinc-800"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Category</label>
              <select 
                className="w-full bg-white/5 border border-white/5 rounded-xl py-4 px-5 text-xs text-white focus:outline-none focus:border-[#FF9F1C]/50 transition-all appearance-none cursor-pointer"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as PromptCategory})}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Gemini Prompt</label>
            <textarea 
              required
              rows={4}
              placeholder="Paste full prompt engineering directive..."
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-5 text-xs text-zinc-400 focus:outline-none focus:border-[#FF9F1C]/50 transition-all resize-none placeholder:text-zinc-800"
              value={formData.prompt}
              onChange={e => setFormData({...formData, prompt: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#FF9F1C] text-black py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:brightness-110 transition-all active:scale-[0.98] shadow-xl shadow-orange-500/10 flex items-center justify-center gap-2"
          >
            <Check size={16} />
            Publish to Gallery
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPromptModal;
