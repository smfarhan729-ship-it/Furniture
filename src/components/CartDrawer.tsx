import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { getProductImage } from '../utils/imageCatalog';
import { StoreSettings } from '../types';

interface CartDrawerProps {
  settings: StoreSettings;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ settings, onProceedToCheckout }) => {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = settings.freeDeliveryThreshold || 15000;
  const differenceToFree = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col justify-between border-l border-[#E8DFC9]">
          {/* Header */}
          <div className="p-5 border-b border-[#E8DFC9] flex items-center justify-between bg-[#FAF6EE]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1B382B]" />
              <h2 className="font-serif text-lg font-bold text-[#1B382B]">
                Your Furniture Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#6B7280] hover:text-[#1B382B] rounded-lg hover:bg-[#EFE8D8] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="bg-[#1B382B] text-white px-4 py-2 text-xs flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
              {differenceToFree > 0 ? (
                <span>Add ₹{differenceToFree.toLocaleString('en-IN')} more for free Surat delivery</span>
              ) : (
                <span className="text-[#34D399] font-semibold">✓ You unlocked FREE delivery in Surat!</span>
              )}
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF6EE] flex items-center justify-center text-[#8A7B69]">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1B382B]">Your Bag is Empty</h3>
                  <p className="text-xs text-[#6B7280] mt-1 max-w-xs">
                    Explore our handcrafted sofas, convertible sofa beds, or customize your preferred design.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-5 py-2.5 bg-[#1B382B] text-[#FDFBF7] text-xs font-semibold rounded-lg hover:bg-[#142d22] cursor-pointer"
                >
                  Start Browsing
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.productId}-${item.selectedColor}-${item.selectedFabric}-${index}`}
                  className="p-4 rounded-xl bg-white border border-[#E5DEC9] flex gap-4 shadow-xs"
                >
                  <img
                    src={getProductImage(item.image, item.image)}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover bg-[#FAF7F0] shrink-0 border border-[#EFE8D8]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm font-bold text-[#1B382B] line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-[#9CA3AF] hover:text-[#DC2626] p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant Specs */}
                      <div className="text-[11px] text-[#8A7B69] space-y-0.5 mt-0.5">
                        {item.selectedFabric && <div>Fabric: <span className="text-[#1B382B] font-medium">{item.selectedFabric}</span></div>}
                        {item.selectedColor && <div>Shade: <span className="text-[#1B382B] font-medium">{item.selectedColor}</span></div>}
                        {item.orientation && <div>Orientation: <span className="text-[#1B382B] font-medium">{item.orientation}</span></div>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-bold text-sm text-[#1B382B] tabular-nums">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D5C9B3] rounded-md bg-[#FAF7F0] overflow-hidden text-xs">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="px-2 py-0.5 font-bold text-[#4B5563] hover:bg-white cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-bold text-[#1B382B] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="px-2 py-0.5 font-bold text-[#4B5563] hover:bg-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E8DFC9] bg-[#FAF6EE] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6B7280]">
                  <span>Subtotal:</span>
                  <span className="font-bold text-[#1B382B] text-sm tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Surat Delivery &amp; Assembly:</span>
                  <span className="text-[#059669] font-semibold">
                    {subtotal >= freeDeliveryThreshold ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#8A7B69] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1B382B]" />
                  <span>10-Year Wood Frame Warranty Included</span>
                </div>
              </div>

              <button
                onClick={() => {
                  closeCart();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-[#1B382B] text-[#FDFBF7] hover:bg-[#142d22] font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={closeCart}
                className="w-full text-center text-xs font-medium text-[#6B7280] hover:text-[#1B382B] cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
