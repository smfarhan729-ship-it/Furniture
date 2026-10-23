import React, { useState } from 'react';
import { ShoppingBag, Search, Phone, ShieldCheck, Menu, X, SlidersHorizontal, Heart, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { StoreSettings } from '../types';

interface HeaderProps {
  settings: StoreSettings;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  activeSection,
  onNavigate,
  onOpenSearch,
  onOpenAdmin,
  onOpenWishlist
}) => {
  const { totalItems, openCart } = useCart();
  const { totalWishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8DFC9] transition-all">
      {/* Top Notification Bar - Responsive layout preventing squished text & overflow on all mobile screens */}
      <div className="bg-[#1B382B] text-[#F3E8D0] px-3 sm:px-4 py-1.5 sm:py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-1.5 md:gap-4">
          {/* Top row on Mobile, Left side on Desktop */}
          <div className="flex items-center justify-between md:justify-start gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="font-semibold text-[#D4AF37] text-[11px] sm:text-xs tracking-wide">
                Surat Residential Workshop
              </span>
            </div>

            {/* Desktop secondary notices */}
            <div className="hidden md:flex items-center gap-3 text-xs opacity-90">
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>Free Doorstep Delivery in Surat over ₹15,000</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>10-Year Solid Wood Frame Warranty</span>
            </div>

            {/* Mobile Actions: Direct Call & Staff Portal button (finger-friendly & never squished) */}
            <div className="flex md:hidden items-center gap-2 shrink-0">
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-1 text-[11px] font-semibold text-white hover:text-[#D4AF37] bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded transition-colors"
                title="Call Workshop Directly"
              >
                <Phone className="w-3 h-3 text-[#D4AF37]" />
                <span>Call</span>
              </a>
              <button
                type="button"
                onClick={onOpenAdmin}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#D4AF37] hover:text-white bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 px-2 py-0.5 rounded transition-colors cursor-pointer"
                title="Staff & Owner Portal"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Staff Portal</span>
              </button>
            </div>
          </div>

          {/* Desktop Right items: Phone + Staff Portal */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-medium">{settings.phone}</span>
            </a>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-[#D4AF37] hover:underline cursor-pointer opacity-90 hover:opacity-100 flex items-center gap-1 font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Staff Portal</span>
            </button>
          </div>

          {/* Mobile Secondary Row: Free Delivery Notice (Separated row so no horizontal overflow or crowding!) */}
          <div className="flex md:hidden items-center justify-between text-[10px] text-[#E2D6C0] border-t border-white/10 pt-1">
            <span className="truncate">🚚 Free Doorstep Delivery in Surat over ₹15,000</span>
            <span className="text-[#D4AF37] font-medium shrink-0 ml-1.5">Shop 33, Dindoli</span>
          </div>
        </div>
      </div>

      {/* Main Navigation - 3-Zone Responsive Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="text-left group cursor-pointer flex-1 min-w-0 pr-1 sm:pr-2"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-serif text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-[#1B382B] group-hover:text-[#2E180E] transition-colors truncate block">
              Shree Balaji Sofa &amp; Furniture
            </span>
          </div>
          <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#8A7B69] font-medium truncate hidden min-[480px]:block">
            Custom Sofas · Recliners · Cushion Repair · Dindoli, Surat
          </div>
        </button>

        {/* Zone 2: 4–5 single-line clean text navigation links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#374151]">
          <button
            type="button"
            onClick={() => handleNav('catalog')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              activeSection === 'catalog'
                ? 'text-[#1B382B] border-[#1B382B] font-semibold'
                : 'text-[#4B5563] border-transparent hover:text-[#1B382B]'
            }`}
          >
            Sofas &amp; Beds
          </button>

          <button
            type="button"
            onClick={() => handleNav('custom-builder')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              activeSection === 'custom-builder'
                ? 'text-[#1B382B] border-[#1B382B] font-semibold'
                : 'text-[#4B5563] border-transparent hover:text-[#1B382B]'
            }`}
          >
            Custom Sofa Builder
          </button>

          <button
            type="button"
            onClick={() => handleNav('repairs')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              activeSection === 'repairs'
                ? 'text-[#1B382B] border-[#1B382B] font-semibold'
                : 'text-[#4B5563] border-transparent hover:text-[#1B382B]'
            }`}
          >
            Cushion Repair &amp; Foam
          </button>

          <button
            type="button"
            onClick={() => handleNav('fabrics')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              activeSection === 'fabrics'
                ? 'text-[#1B382B] border-[#1B382B] font-semibold'
                : 'text-[#4B5563] border-transparent hover:text-[#1B382B]'
            }`}
          >
            Fabric Guide (₹/Meter)
          </button>

          <button
            type="button"
            onClick={() => handleNav('workshop-video')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              activeSection === 'workshop-video'
                ? 'text-[#1B382B] border-[#1B382B] font-semibold'
                : 'text-[#4B5563] border-transparent hover:text-[#1B382B]'
            }`}
          >
            Workshop Mechanism
          </button>

          <button
            type="button"
            onClick={() => handleNav('location')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
              activeSection === 'location'
                ? 'text-[#1B382B] border-[#1B382B] font-semibold'
                : 'text-[#4B5563] border-transparent hover:text-[#1B382B]'
            }`}
          >
            Visit Workshop
          </button>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search furniture catalog"
            className="p-2 sm:p-2.5 text-[#374151] hover:text-[#1B382B] hover:bg-[#F3EFE6] rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            type="button"
            onClick={onOpenWishlist}
            aria-label="Wishlist saved favorites"
            className="relative p-2 sm:p-2.5 text-[#374151] hover:text-[#B91C1C] hover:bg-[#F3EFE6] rounded-full transition-colors cursor-pointer"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {totalWishlist > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#B91C1C] text-white text-[10px] sm:text-[11px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#FDFBF7]">
                {totalWishlist}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={openCart}
            aria-label="Shopping bag"
            className="relative p-2 sm:p-2.5 text-[#1B382B] hover:bg-[#F3EFE6] rounded-full transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#1B382B] text-[#F3E8D0] text-[10px] sm:text-[11px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#FDFBF7]">
                {totalItems}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNav('custom-builder')}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#FDFBF7] bg-[#1B382B] hover:bg-[#152e23] rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Customize</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-1.5 sm:p-2 text-[#374151] hover:text-[#1B382B] lg:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFC9] bg-[#FDFBF7] px-4 pt-3 pb-6 space-y-2 max-h-[calc(100vh-6rem)] overflow-y-auto">
          {/* Quick Staff & Call Bar inside Drawer */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#E8DFC9]">
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-1.5 py-2 bg-[#1B382B] text-white rounded-lg text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Call Workshop</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-1.5 py-2 bg-[#FAF6EE] text-[#1B382B] border border-[#D5C9B3] rounded-lg text-xs font-bold cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Staff Portal</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleNav('catalog')}
            className="block w-full text-left py-2.5 px-3 rounded-md text-sm font-medium text-[#1B382B] hover:bg-[#F3EFE6]"
          >
            Sofas &amp; Beds Catalog
          </button>
          <button
            type="button"
            onClick={() => handleNav('custom-builder')}
            className="block w-full text-left py-2.5 px-3 rounded-md text-sm font-medium text-[#1B382B] hover:bg-[#F3EFE6]"
          >
            Interactive Custom Sofa Builder
          </button>
          <button
            type="button"
            onClick={() => handleNav('repairs')}
            className="block w-full text-left py-2.5 px-3 rounded-md text-sm font-medium text-[#1B382B] hover:bg-[#F3EFE6]"
          >
            Sofa Cushion Repair &amp; 40D Foam
          </button>
          <button
            type="button"
            onClick={() => handleNav('fabrics')}
            className="block w-full text-left py-2.5 px-3 rounded-md text-sm font-medium text-[#1B382B] hover:bg-[#F3EFE6]"
          >
            Fabric Options &amp; Rates (₹/Meter)
          </button>
          <button
            type="button"
            onClick={() => handleNav('workshop-video')}
            className="block w-full text-left py-2.5 px-3 rounded-md text-sm font-medium text-[#1B382B] hover:bg-[#F3EFE6]"
          >
            Workshop Mechanism &amp; Frame Integrity
          </button>
          <button
            type="button"
            onClick={() => handleNav('reviews')}
            className="block w-full text-left py-2.5 px-3 rounded-md text-sm font-medium text-[#1B382B] hover:bg-[#F3EFE6]"
          >
            Customer Reviews ({settings.googleRating}★ Google Rating)
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenWishlist();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded-md text-sm font-medium text-[#1B382B] hover:bg-[#F3EFE6] flex items-center justify-between"
          >
            <span>Saved Favorites (Wishlist)</span>
            {totalWishlist > 0 && (
              <span className="bg-[#B91C1C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {totalWishlist}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => handleNav('location')}
            className="block w-full text-left py-2.5 px-3 rounded-md text-sm font-medium text-[#1B382B] hover:bg-[#F3EFE6]"
          >
            Workshop Location (Shop 33, Pavilion Plaza, Dindoli)
          </button>
          <div className="pt-2 border-t border-[#E8DFC9]">
            <a
              href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Hello Shree Balaji Sofa, I want to inquire about custom sofas and workshop demonstration.")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white font-semibold rounded-lg text-sm shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Workshop Directly</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
