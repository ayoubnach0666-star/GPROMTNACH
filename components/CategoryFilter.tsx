import React from 'react';
import { PromptCategory } from '../types';

interface CategoryFilterProps {
  selectedCategory: PromptCategory;
  setSelectedCategory: (category: PromptCategory) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, setSelectedCategory }) => {
  const categories = Object.values(PromptCategory);

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all ${
            selectedCategory === cat
              ? 'bg-[#8B5E3C] border-[#FF9F1C]/50 text-white shadow-lg shadow-orange-900/20'
              : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-[#8B5E3C] hover:text-zinc-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;