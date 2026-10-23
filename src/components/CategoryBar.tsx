import React from 'react';
import { Category } from '../types';

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="border-b border-[#E8DFC9] bg-[#FAF7F0] sticky top-20 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar scroll-smooth">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#1B382B] text-[#FDFBF7] shadow-sm'
                : 'bg-white text-[#4B5563] border border-[#E5DEC9] hover:bg-[#F3EFE6] hover:text-[#1B382B]'
            }`}
          >
            All Products
          </button>

          {categories.filter(c => c.isActive).map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#1B382B] text-[#FDFBF7] font-semibold shadow-sm'
                    : 'bg-white text-[#4B5563] border border-[#E5DEC9] hover:bg-[#F3EFE6] hover:text-[#1B382B]'
                }`}
              >
                <span>{cat.name}</span>
                {cat.itemCount > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-[#F3DC9B] text-[#1B382B] font-bold'
                        : 'bg-[#F3EFE6] text-[#6B7280]'
                    }`}
                  >
                    {cat.itemCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
