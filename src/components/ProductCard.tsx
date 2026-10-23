import React from 'react';
import { Product } from '../types';
import { getProductImage } from '../utils/imageCatalog';
import { ShoppingBag, Sparkles, MessageCircle, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  whatsappNumber: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  whatsappNumber
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
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
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Hello Shree Balaji Sofa! I am interested in "${product.name}" (SKU: ${product.sku}, ₹${product.price.toLocaleString('en-IN')}). Can you please share details regarding fabric colors and delivery to my area?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-xl border border-[#E5DEC9] overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Product Image Stage */}
        <div className="relative aspect-[4/3] bg-[#FAF7F2] overflow-hidden">
          <img
            src={getProductImage(product.images?.[0] || '', product.images?.[0])}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Minimalist Single Metadata Kicker (Anti-Slop Zero-Pill) */}
          <div className="absolute top-3 left-3">
            {product.hasPullOutMechanism ? (
              <span className="text-[11px] font-semibold tracking-wider text-[#1B382B] bg-[#FDFBF7]/90 px-2 py-0.5 rounded shadow-xs">
                PULL-OUT BED
              </span>
            ) : product.isCustomizable ? (
              <span className="text-[11px] font-semibold tracking-wider text-[#1B382B] bg-[#FDFBF7]/90 px-2 py-0.5 rounded shadow-xs">
                CUSTOMIZABLE
              </span>
            ) : null}
          </div>

          {/* Wishlist Heart Button */}
          <button
            onClick={handleToggleWishlist}
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full shadow-xs transition-all cursor-pointer hover:scale-110"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'text-[#DC2626] fill-current' : 'text-[#6B7280]'}`} />
          </button>

          {/* Quick WhatsApp Action Button */}
          <button
            onClick={handleWhatsAppEnquiry}
            title="Inquire on WhatsApp"
            className="absolute bottom-3 right-3 p-2 bg-[#25D366] text-white rounded-full shadow-md opacity-90 hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-2">
          {/* Category & Seating */}
          <div className="flex items-center gap-2 text-xs text-[#8A7B69] font-medium">
            <span>{product.categoryName}</span>
            <span aria-hidden="true">·</span>
            <span>{product.seatingCapacity}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base font-bold text-[#1B382B] line-clamp-1 group-hover:text-[#C5A059] transition-colors">
            {product.name}
          </h3>

          {/* Key Specs */}
          <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Color preview dots */}
          {product.colorVariants && product.colorVariants.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[11px] text-[#9CA3AF] mr-1">Shades:</span>
              {product.colorVariants.slice(0, 4).map((c, i) => (
                <span
                  key={i}
                  title={c.name}
                  className="w-3.5 h-3.5 rounded-full border border-gray-300"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {product.colorVariants.length > 4 && (
                <span className="text-[10px] text-[#6B7280]">+{product.colorVariants.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Price & Action Row */}
      <div className="p-4 pt-2 border-t border-[#F3EFE6] flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-lg text-[#1B382B] tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#9CA3AF] line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <div className="text-[10px] text-[#6B7280]">Includes 10-Yr Frame Warranty</div>
        </div>

        {product.inStock === false ? (
          <span className="text-[11px] font-semibold text-[#DC2626] bg-[#FEE2E2] px-2.5 py-1 rounded-md">
            Out of Stock
          </span>
        ) : (
          <button
            onClick={handleQuickAdd}
            className="p-2.5 bg-[#1B382B] text-[#FDFBF7] hover:bg-[#142d22] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title="Add to Shopping Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        )}
      </div>
    </div>
  );
};
