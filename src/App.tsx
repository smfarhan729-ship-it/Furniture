import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { api } from './services/api';
import { Product, Category, FabricOption, Review, StoreSettings, Order } from './types';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryBar } from './components/CategoryBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomSofaBuilder } from './components/CustomSofaBuilder';
import { RepairServiceSection } from './components/RepairServiceSection';
import { FabricGuideSection } from './components/FabricGuideSection';
import { WorkshopVideoSection } from './components/WorkshopVideoSection';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { LocationSection } from './components/LocationSection';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { PolicyModal } from './components/PolicyModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AdminPortal } from './components/Admin/AdminPortal';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const defaultSettings: StoreSettings = {
  businessName: "Shree Balaji Sofa & Furniture",
  phone: "+91 77538 57076",
  whatsapp: "917753857076",
  email: "shreebalajisurats@gmail.com",
  address: "Shop 33, Pavilion Plaza, Near Mark Point, Dindoli, Surat, Gujarat, India — PIN 394210",
  pincode: "394210",
  city: "Surat",
  hours: "Monday – Sunday: 9:30 AM – 9:00 PM",
  googleMapsUrl: "https://maps.google.com/?q=Pavilion+Plaza+Dindoli+Surat",
  justdialUrl: "https://jsdl.in/RSL-UIZ1791942689",
  googleRating: 5.0,
  googleReviewCount: 18,
  freeDeliveryThreshold: 15000,
  defaultDeliveryFee: 1200,
  gstPercentage: 0,
  enableCod: true,
  enableUpi: true,
  enableGateway: true,
  upiId: "7753857076@upi"
};

function StorefrontContent() {
  const { addToCart } = useCart();
  const { openWishlist } = useWishlist();

  // App Data
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [fabrics, setFabrics] = useState<FabricOption[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Navigation & Filtering
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<'terms' | 'privacy' | 'delivery' | 'refund' | 'warranty' | null>(null);

  // Load Data from API
  const loadData = async () => {
    try {
      const [s, c, p, f, r] = await Promise.all([
        api.getSettings(),
        api.getCategories(),
        api.getProducts(),
        api.getFabrics(),
        api.getReviews()
      ]);
      setSettings(s);
      setCategories(c);
      setProducts(p);
      setFabrics(f);
      setReviews(r);
    } catch (err) {
      console.error("Failed to load store data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'catalog') {
      const el = document.getElementById('catalog');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'custom-builder') {
      const el = document.getElementById('custom-builder');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'repairs') {
      const el = document.getElementById('repairs');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'fabrics') {
      const el = document.getElementById('fabrics');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'workshop-video') {
      const el = document.getElementById('workshop-video');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'reviews') {
      const el = document.getElementById('reviews');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'location') {
      const el = document.getElementById('location');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Buy Now direct flow
  const handleBuyNow = (
    product: Product,
    selectedColor: string,
    selectedFabric: string,
    orientation?: string,
    quantity: number = 1
  ) => {
    addToCart({
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity,
      selectedColor,
      selectedFabric,
      orientation: orientation as any,
      image: product.images?.[0] || 'product_l_shape_teal'
    });
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Filtered & Sorted Products
  const displayedProducts = products
    .filter(p => selectedCategory === 'all' || p.categoryId === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'popular') return (b.ratings?.count || 0) - (a.ratings?.count || 0);
      return 0;
    });

  // Local Business SEO Schema (JSON-LD)
  const schemaOrgData = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "Shree Balaji Sofa & Furniture",
    "image": "https://lh3.googleusercontent.com/p/AF1QipN",
    "telephone": "+91 77538 57076",
    "url": window.location.origin,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop 33, Pavilion Plaza, Near Mark Point, Dindoli",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "postalCode": "394210",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.1611",
      "longitude": "72.8800"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "18"
    },
    "priceRange": "₹₹ - ₹₹₹",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "09:30",
      "closes": "21:00"
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1E21] flex flex-col font-sans selection:bg-[#E8DFC9] selection:text-[#1B382B]">
      {/* Structured SEO Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
      />

      {/* Main Header */}
      <Header
        settings={settings}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
        onOpenWishlist={openWishlist}
      />

      {/* Hero Section */}
      <Hero
        onExplore={() => handleNavigate('catalog')}
        onCustomize={() => handleNavigate('custom-builder')}
        onWatchVideo={() => handleNavigate('workshop-video')}
      />

      {/* Category Bar */}
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={catId => setSelectedCategory(catId)}
      />

      {/* Product Catalog Section */}
      <section id="catalog" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Catalog Subheader & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#E8DFC9] gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B382B]">
              {selectedCategory === 'all'
                ? 'All Handcrafted Sofas & Furniture'
                : categories.find(c => c.id === selectedCategory)?.name || 'Catalog'}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              Showing {displayedProducts.length} models manufactured in Surat with seasoned wood &amp; 40D Sleepwell foam.
            </p>
          </div>

          {/* Sort Controller */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <ArrowUpDown className="w-4 h-4 text-[#8A7B69]" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-xs font-semibold p-2 rounded-lg border border-[#D5C9B3] bg-white text-[#1B382B] cursor-pointer focus:outline-[#1B382B]"
            >
              <option value="default">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
          {displayedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={p => setSelectedProduct(p)}
              whatsappNumber={settings.whatsapp}
            />
          ))}
        </div>
      </section>

      {/* Interactive Custom Sofa Configurator */}
      <CustomSofaBuilder whatsappNumber={settings.whatsapp} />

      {/* Workshop Video & Pull-out Bed Demonstration */}
      <WorkshopVideoSection settings={settings} />

      {/* Sofa Repair & 40D Foam Service Section */}
      <RepairServiceSection whatsappNumber={settings.whatsapp} />

      {/* Upholstery & Fabric Pricing Guide (Page 99 Data) */}
      <FabricGuideSection fabrics={fabrics} whatsappNumber={settings.whatsapp} />

      {/* Verified Google Reviews */}
      <GoogleReviewsSection
        reviews={reviews}
        justdialUrl={settings.justdialUrl}
        googleRating={settings.googleRating}
        googleReviewCount={settings.googleReviewCount}
        onReviewAdded={newRev => setReviews([newRev, ...reviews])}
      />

      {/* Workshop Location & Visit Section */}
      <LocationSection settings={settings} />

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenPolicy={p => setActivePolicy(p)}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
      />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp whatsappNumber={settings.whatsapp} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        settings={settings}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Slide-over Wishlist Drawer */}
      <WishlistDrawer
        onSelectProduct={p => setSelectedProduct(p)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        whatsappNumber={settings.whatsapp}
        onBuyNow={handleBuyNow}
      />

      {/* Indian Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        settings={settings}
        onOrderSuccess={order => {
          setIsCheckoutOpen(false);
          setConfirmedOrder(order);
        }}
      />

      {/* Order Success & Printable Receipt Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        settings={settings}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={p => setSelectedProduct(p)}
      />

      {/* Policies Modal */}
      <PolicyModal
        policyType={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* Protected Admin Portal */}
      {isAdminPortalOpen && (
        <AdminPortal
          onClose={() => setIsAdminPortalOpen(false)}
          settings={settings}
          onSettingsUpdate={newS => setSettings(newS)}
          onRefreshData={loadData}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <StorefrontContent />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
