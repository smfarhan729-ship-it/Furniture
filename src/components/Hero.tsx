import React from 'react';
import { Star, Shield, ArrowRight, Sparkles, CheckCircle2, Play } from 'lucide-react';
import { getProductImage } from '../utils/imageCatalog';

interface HeroProps {
  onExplore: () => void;
  onCustomize: () => void;
  onWatchVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onCustomize, onWatchVideo }) => {
  return (
    <section className="relative overflow-hidden bg-[#FDFBF7] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Kicker - Zero-Pill Unboxed Text */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#6B5A43] uppercase">
              <span className="flex items-center gap-1 text-[#D4AF37]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </span>
              <span>5.0 Rating (18 Google Reviews)</span>
              <span aria-hidden="true" className="text-[#C4B7A5]">·</span>
              <span className="text-[#1B382B]">Dindoli, Surat Workshop</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B382B] leading-[1.15] text-balance">
              Comfort Crafted Around You.
            </h1>

            <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl leading-relaxed">
              Bespoke residential sofas, motorized recliners, and pull-out sofa beds made in our Surat workshop to your exact room size, cushion firmness, and fabric choice. Zero middlemen markups.
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-[#374151]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1B382B] shrink-0" />
                <span>Solid Sal &amp; Teak Hardwood Skeleton</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1B382B] shrink-0" />
                <span>40D Sleepwell High Resilience Foam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1B382B] shrink-0" />
                <span>10-Year Wood Structural Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1B382B] shrink-0" />
                <span>Free Doorstep Delivery in Surat</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExplore}
                className="px-6 py-3.5 text-sm font-semibold text-[#FDFBF7] bg-[#1B382B] hover:bg-[#142d22] rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
              >
                <span>Explore Sofas &amp; Beds</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onCustomize}
                className="px-6 py-3.5 text-sm font-semibold text-[#1B382B] bg-[#F4EFE6] hover:bg-[#EAE2D2] border border-[#D5C9B3] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Customize Your Sofa</span>
              </button>

              <button
                onClick={onWatchVideo}
                className="px-4 py-3.5 text-sm font-medium text-[#4B5563] hover:text-[#1B382B] flex items-center gap-2 cursor-pointer transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#EAE2D2] flex items-center justify-center text-[#1B382B]">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Workshop Video</span>
              </button>
            </div>
          </div>

          {/* Right Column: Featured Product Card / Architectural Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-[#FAF6EE] border border-[#E8DFC9] shadow-xl p-3 sm:p-4 group">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EFE9DE]">
                <img
                  src={getProductImage('product_l_shape_teal')}
                  alt="The Royale L-Shaped Sectional Sofa handcrafted by Shree Balaji Sofa"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#1B382B]/90 backdrop-blur-sm text-[#F3DC9B] text-xs font-semibold px-3 py-1 rounded">
                  Flagship Sectional
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#1B382B]">
                    The Royale L-Shaped Sectional (7-Seater)
                  </h3>
                  <span className="font-semibold text-lg text-[#1B382B] tabular-nums">
                    ₹42,500
                  </span>
                </div>
                <p className="text-xs text-[#6B7280]">
                  Hand-quilted diamond perimeter, 40D Sleepwell foam, solid seasoned Sal wood frame.
                </p>
                <div className="flex items-center justify-between text-xs text-[#8A7B69] pt-2 border-t border-[#E8DFC9]">
                  <span>Available in 50+ Custom Fabrics</span>
                  <button
                    onClick={onExplore}
                    className="font-semibold text-[#1B382B] hover:underline cursor-pointer"
                  >
                    View Details &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column KPI Trust Strip below hero */}
        <div className="mt-14 pt-10 border-t border-[#E8DFC9] grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1B382B] tabular-nums">
              5.0 ★
            </div>
            <div className="text-xs font-semibold text-[#374151]">18 Google Reviews</div>
            <div className="text-xs text-[#6B7280]">Verified customer feedback in Surat</div>
          </div>

          <div className="space-y-1">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1B382B] tabular-nums">
              50+
            </div>
            <div className="text-xs font-semibold text-[#374151]">Designer Fabrics</div>
            <div className="text-xs text-[#6B7280]">Velvet, Boucle, Linen &amp; Suede</div>
          </div>

          <div className="space-y-1">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1B382B] tabular-nums">
              40D
            </div>
            <div className="text-xs font-semibold text-[#374151]">Sleepwell HR Foam</div>
            <div className="text-xs text-[#6B7280]">Zero sagging guaranteed for 10 yrs</div>
          </div>

          <div className="space-y-1">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1B382B] tabular-nums">
              7-10 Days
            </div>
            <div className="text-xs font-semibold text-[#374151]">Direct Workshop Delivery</div>
            <div className="text-xs text-[#6B7280]">Free in Surat PIN codes (394210)</div>
          </div>
        </div>
      </div>
    </section>
  );
};
