import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { getProductImage } from '../utils/imageCatalog';
import { X, ShoppingBag, Zap, MessageCircle, ShieldCheck, Truck, RefreshCw, Check, Ruler, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  whatsappNumber: string;
  onBuyNow: (product: Product, selectedColor: string, selectedFabric: string, orientation?: string, quantity?: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  whatsappNumber,
  onBuyNow
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Standard');
  const [selectedFabric, setSelectedFabric] = useState('Royal Velvet');
  const [orientation, setOrientation] = useState<'Left-Hand Facing' | 'Right-Hand Facing'>('Left-Hand Facing');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setSelectedColor(product.colorVariants?.[0]?.name || 'Standard');
      setSelectedFabric(product.fabricOptions?.[0] || 'Royal Velvet');
      setOrientation('Left-Hand Facing');
      setQuantity(1);
      setAddedNotice(false);
    }
  }, [product?.id]);

  if (!product) return null;

  const isFavorite = isInWishlist(product.id);

  const images = product.images && product.images.length > 0 ? product.images : ['product_l_shape_teal'];
  const currentImageKey = images[selectedImageIndex] || images[0];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity,
      selectedColor,
      selectedFabric,
      orientation: product.categoryId === 'cat-l-shape' ? orientation : undefined,
      image: currentImageKey
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNowClick = () => {
    onBuyNow(
      product,
      selectedColor,
      selectedFabric,
      product.categoryId === 'cat-l-shape' ? orientation : undefined,
      quantity
    );
  };

  const handleWhatsAppChat = () => {
    const text = `Hello Shree Balaji Sofa, I am inquiring about "${product.name}" (SKU: ${product.sku}).
Price: ₹${product.price.toLocaleString('en-IN')}
Selected Color: ${selectedColor}
Selected Fabric: ${selectedFabric}
${product.categoryId === 'cat-l-shape' ? `Orientation: ${orientation}\n` : ''}
Could you please share fabric swatches and delivery estimate to my address?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E8DFC9] overflow-hidden my-8">
        {/* Action Buttons: Wishlist & Close */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(product)}
            aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
            className="p-2.5 bg-white/80 hover:bg-white text-[#374151] rounded-full shadow-sm transition-colors cursor-pointer"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'text-[#DC2626] fill-current' : 'text-[#6B7280]'}`} />
          </button>
          <button
            onClick={onClose}
            aria-label="Close product details"
            className="p-2.5 bg-white/80 hover:bg-white text-[#374151] rounded-full shadow-sm hover:text-[#1B382B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual Gallery (lg:col-span-6) */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#FAF6EE] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E8DFC9]">
            <div className="space-y-4">
              {/* Main Image Stage */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-[#E5DEC9] shadow-sm">
                <img
                  src={getProductImage(currentImageKey, currentImageKey)}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all"
                  referrerPolicy="no-referrer"
                />

                {product.hasPullOutMechanism && (
                  <div className="absolute top-3 left-3 bg-[#1B382B] text-[#F3DC9B] text-xs font-semibold px-3 py-1 rounded">
                    Dual Function: Sofa to Bed
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        selectedImageIndex === idx ? 'border-[#1B382B] shadow-sm scale-105' : 'border-[#E5DEC9] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={getProductImage(img, img)}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dimensional Schematic Callout */}
            <div className="mt-6 p-4 rounded-xl bg-white border border-[#E5DEC9] space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1B382B]">
                <Ruler className="w-4 h-4 text-[#C5A059]" />
                <span>Exact Dimensions &amp; Seating Clearance</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-[#4B5563]">
                <div className="bg-[#FAF7F0] p-2 rounded">
                  <div className="font-bold text-[#1B382B] tabular-nums">{product.dimensions.lengthInches}&quot;</div>
                  <div className="text-[10px] text-[#8A7B69]">Length</div>
                </div>
                <div className="bg-[#FAF7F0] p-2 rounded">
                  <div className="font-bold text-[#1B382B] tabular-nums">{product.dimensions.widthInches}&quot;</div>
                  <div className="text-[10px] text-[#8A7B69]">Width</div>
                </div>
                <div className="bg-[#FAF7F0] p-2 rounded">
                  <div className="font-bold text-[#1B382B] tabular-nums">{product.dimensions.heightInches}&quot;</div>
                  <div className="text-[10px] text-[#8A7B69]">Height</div>
                </div>
              </div>
              <p className="text-[11px] text-[#8A7B69] italic text-center pt-1">
                Need custom dimensions for your specific living room? We build made-to-measure.
              </p>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (lg:col-span-6) */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-6">
            <div>
              {/* Category, SKU, and Rating */}
              <div className="flex items-center gap-2 text-xs text-[#8A7B69] font-medium uppercase tracking-wider">
                <span>{product.categoryName}</span>
                <span aria-hidden="true">·</span>
                <span>SKU: {product.sku}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B382B] mt-1">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-bold text-2xl sm:text-3xl text-[#1B382B] tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-[#9CA3AF] line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-semibold text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded">
                  Direct Workshop Price
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {product.description}
            </p>

            {/* Material Specifications */}
            <div className="space-y-2 py-3 border-y border-[#E8DFC9] text-xs">
              <div className="flex justify-between">
                <span className="text-[#8A7B69]">Frame Skeleton:</span>
                <span className="font-medium text-[#1B382B] text-right">{product.materials.frame}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A7B69]">Cushion Foam:</span>
                <span className="font-medium text-[#1B382B] text-right">{product.materials.foam}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A7B69]">Leg Support:</span>
                <span className="font-medium text-[#1B382B] text-right">{product.materials.legs}</span>
              </div>
            </div>

            {/* Configuration Options */}
            <div className="space-y-4">
              {/* Color Shade Selection */}
              {product.colorVariants && product.colorVariants.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-[#1B382B] mb-1.5">
                    Select Shade: <span className="font-normal text-[#6B7280]">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colorVariants.map(c => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? 'border-[#1B382B] bg-[#1B382B] text-white shadow-xs'
                            : 'border-[#E5DEC9] bg-white text-[#374151] hover:bg-[#F3EFE6]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fabric Type Selection */}
              {product.fabricOptions && product.fabricOptions.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-[#1B382B] mb-1.5">
                    Upholstery Fabric Tier:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.fabricOptions.map(f => (
                      <button
                        key={f}
                        onClick={() => setSelectedFabric(f)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
                          selectedFabric === f
                            ? 'border-[#1B382B] bg-[#FAF6EE] text-[#1B382B] font-semibold'
                            : 'border-[#E5DEC9] bg-white text-[#4B5563] hover:bg-[#F3EFE6]'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* L-Shape Orientation (If applicable) */}
              {product.categoryId === 'cat-l-shape' && (
                <div>
                  <label className="block text-xs font-semibold text-[#1B382B] mb-1.5">
                    Chaise Lounge Orientation (Facing the Sofa):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setOrientation('Left-Hand Facing')}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                        orientation === 'Left-Hand Facing'
                          ? 'border-[#1B382B] bg-[#1B382B] text-white'
                          : 'border-[#E5DEC9] bg-white text-[#4B5563] hover:bg-[#F3EFE6]'
                      }`}
                    >
                      Left-Hand Facing (LHF)
                    </button>
                    <button
                      onClick={() => setOrientation('Right-Hand Facing')}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                        orientation === 'Right-Hand Facing'
                          ? 'border-[#1B382B] bg-[#1B382B] text-white'
                          : 'border-[#E5DEC9] bg-white text-[#4B5563] hover:bg-[#F3EFE6]'
                      }`}
                    >
                      Right-Hand Facing (RHF)
                    </button>
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-semibold text-[#1B382B]">Quantity:</span>
                <div className="flex items-center border border-[#D5C9B3] rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm font-bold text-[#4B5563] hover:bg-[#F3EFE6] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-[#1B382B] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm font-bold text-[#4B5563] hover:bg-[#F3EFE6] cursor-pointer"
                  >
                    +
                  </button>
                </div>
                {product.inStock === false ? (
                  <span className="text-xs text-[#DC2626] font-semibold bg-[#FEE2E2] px-2 py-0.5 rounded flex items-center gap-1">
                    Out of Stock
                  </span>
                ) : (
                  <span className="text-xs text-[#059669] font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Ready for Crafting
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.inStock === false}
                  className={`w-full py-3 font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm ${
                    product.inStock === false
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#1B382B] text-[#FDFBF7] hover:bg-[#142d22] cursor-pointer'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{product.inStock === false ? 'Out of Stock' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={handleBuyNowClick}
                  disabled={product.inStock === false}
                  className={`w-full py-3 font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm ${
                    product.inStock === false
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#D4AF37] text-[#1B382B] hover:bg-[#c49f28] cursor-pointer'
                  }`}
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{product.inStock === false ? 'Unavailable' : 'Buy Now'}</span>
                </button>
              </div>

              {/* WhatsApp Customization Enquiry */}
              <button
                onClick={handleWhatsAppChat}
                className="w-full py-2.5 bg-[#25D366] text-white hover:bg-[#20ba59] font-medium text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Discuss Customization on WhatsApp</span>
              </button>

              {addedNotice && (
                <div className="text-center text-xs font-medium text-[#047857] bg-[#ECFDF5] py-2 rounded-lg border border-[#A7F3D0]">
                  ✓ Added to cart! Open shopping bag to checkout.
                </div>
              )}
            </div>

            {/* Trust and Delivery Details */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E8DFC9] text-[11px] text-[#6B7280]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#1B382B] shrink-0" />
                <span>Free delivery in Surat (PIN 394210)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1B382B] shrink-0" />
                <span>10-Yr Structural Wood Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
