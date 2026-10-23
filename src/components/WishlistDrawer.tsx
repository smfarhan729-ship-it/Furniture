import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { getProductImage } from '../utils/imageCatalog';

interface WishlistDrawerProps {
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ onSelectProduct }) => {
  const { wishlist, isWishlistOpen, closeWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: 1,
      selectedColor: product.colorVariants?.[0]?.name || 'Standard',
      selectedFabric: product.fabricOptions?.[0] || 'Royal Velvet',
      orientation: product.categoryId === 'cat-l-shape' ? 'Left-Hand Facing' : undefined,
      image: product.images?.[0] || 'product_l_shape_teal'
    });
    removeFromWishlist(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={closeWishlist}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col justify-between border-l border-[#E8DFC9]">
          {/* Header */}
          <div className="p-5 border-b border-[#E8DFC9] flex items-center justify-between bg-[#FAF6EE]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#B91C1C] fill-current" />
              <h2 className="font-serif text-lg font-bold text-[#1B382B]">
                Saved Favorites ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={closeWishlist}
              className="p-1.5 text-[#6B7280] hover:text-[#1B382B] rounded-lg hover:bg-[#EFE8D8] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF6EE] flex items-center justify-center text-[#8A7B69]">
                  <Heart className="w-8 h-8 opacity-40" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1B382B]">No Favorites Saved Yet</h3>
                  <p className="text-xs text-[#6B7280] mt-1 max-w-xs">
                    Tap the heart icon on any sofa, recliner, or bed to save it to your wishlist.
                  </p>
                </div>
                <button
                  onClick={closeWishlist}
                  className="px-5 py-2.5 bg-[#1B382B] text-[#FDFBF7] text-xs font-semibold rounded-lg hover:bg-[#142d22] cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              wishlist.map(product => (
                <div
                  key={product.id}
                  className="p-4 rounded-xl bg-white border border-[#E5DEC9] flex gap-4 shadow-xs"
                >
                  <img
                    src={getProductImage(product.images?.[0] || '', product.images?.[0])}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-[#FAF7F0] shrink-0 border border-[#EFE8D8] cursor-pointer"
                    onClick={() => {
                      onSelectProduct(product);
                      closeWishlist();
                    }}
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4
                          onClick={() => {
                            onSelectProduct(product);
                            closeWishlist();
                          }}
                          className="font-serif text-sm font-bold text-[#1B382B] line-clamp-1 hover:underline cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="text-[#9CA3AF] hover:text-[#DC2626] p-1 cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#8A7B69] mt-0.5">
                        {product.categoryName} · {product.seatingCapacity}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-bold text-sm text-[#1B382B] tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>

                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="px-3 py-1.5 bg-[#1B382B] text-white hover:bg-[#142d22] rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-4 border-t border-[#E8DFC9] bg-[#FAF6EE] text-center">
              <button
                onClick={closeWishlist}
                className="w-full py-3 bg-white text-[#1B382B] border border-[#D5C9B3] rounded-xl text-xs font-semibold hover:bg-[#FAF7F0] cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
