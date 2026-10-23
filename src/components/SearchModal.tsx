import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';
import { getProductImage } from '../utils/imageCatalog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E8DFC9] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 bg-white border-b border-[#E8DFC9] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8A7B69] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search sofas, sofa-cum-beds, recliners, fabric rates..."
            className="w-full text-sm text-[#1B382B] placeholder-gray-400 focus:outline-none bg-transparent"
          />
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-xs text-[#8A7B69]">
              Type to search: &ldquo;L-Shaped&rdquo;, &ldquo;Sofa Bed&rdquo;, &ldquo;Recliner&rdquo;, &ldquo;Velvet&rdquo;, or &ldquo;Cushion&rdquo;
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#8A7B69]">
              No furniture matching &ldquo;{query}&rdquo;. You can customize your desired model with our builder!
            </div>
          ) : (
            filtered.map(prod => (
              <div
                key={prod.id}
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E5DEC9] hover:bg-[#FAF6EE] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={getProductImage(prod.images?.[0] || '', prod.images?.[0])}
                    alt={prod.name}
                    className="w-12 h-12 rounded-lg object-cover bg-[#FAF7F0]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#1B382B] group-hover:text-[#C5A059] transition-colors">
                      {prod.name}
                    </h4>
                    <span className="text-[11px] text-[#8A7B69]">
                      {prod.categoryName} · SKU: {prod.sku}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-[#1B382B] tabular-nums">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#8A7B69] group-hover:text-[#1B382B] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
