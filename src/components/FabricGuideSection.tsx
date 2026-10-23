import React, { useState } from 'react';
import { FabricOption } from '../types';
import { Sparkles, MessageCircle, Info, ShieldCheck, Sun } from 'lucide-react';

interface FabricGuideSectionProps {
  fabrics: FabricOption[];
  whatsappNumber: string;
}

export const FabricGuideSection: React.FC<FabricGuideSectionProps> = ({ fabrics, whatsappNumber }) => {
  const [selectedFabric, setSelectedFabric] = useState<FabricOption | null>(fabrics[0] || null);

  const handleInquireFabric = (fab: FabricOption) => {
    const text = `Hello Shree Balaji Sofa, I am interested in exploring swatches for "${fab.category}" (${fab.name}, ₹${fab.pricePerMeter}/meter). Do you have shade cards available at your Dindoli workshop?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="fabrics" className="py-16 bg-[#FAF6EE] border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-[#8A7B69] uppercase tracking-wider mb-1">
              Workshop Sourcing Transparency
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B382B]">
              Sofa Fabric Price &amp; Life Guide
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] mt-2">
              Choose the right fabric for your lifestyle and usage. Real per-meter pricing and lifespan estimates sourced directly from our certified mill suppliers.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#E5DEC9] text-xs text-[#1B382B] space-y-1 shrink-0">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Right Fabric = Long Sofa Life</span>
            </div>
            <div className="text-[#6B7280]">Over 500+ swatch shades available at workshop</div>
          </div>
        </div>

        {/* Fabric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fabrics.map(fab => {
            const isSelected = selectedFabric?.id === fab.id;
            return (
              <div
                key={fab.id}
                onClick={() => setSelectedFabric(fab)}
                className={`bg-white rounded-xl border p-5 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#1B382B] shadow-md ring-1 ring-[#1B382B]'
                    : 'border-[#E5DEC9] hover:border-[#C5A059] hover:shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  {/* Category Title & Life Badge */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A7B69]">
                        {fab.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#1B382B]">
                        {fab.name}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-[#1B382B] bg-[#FAF6EE] px-2.5 py-1 rounded border border-[#E8DFC9] tabular-nums">
                      {fab.durability}
                    </span>
                  </div>

                  {/* Rate Per Meter */}
                  <div className="p-3 rounded-lg bg-[#FAF7F0] border border-[#EFE8D8] flex items-center justify-between">
                    <span className="text-xs text-[#6B7280]">Per-Meter Rate:</span>
                    <span className="font-bold text-base text-[#1B382B] tabular-nums">
                      ₹{fab.pricePerMeter.toLocaleString('en-IN')} / meter
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    {fab.description}
                  </p>

                  {/* Best Used For */}
                  <div className="text-[11px] text-[#6B7280] space-y-1 pt-1">
                    <div><strong className="text-[#1B382B]">Texture:</strong> {fab.texturePattern}</div>
                    <div><strong className="text-[#1B382B]">Ideal For:</strong> {fab.popularFor}</div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-4 border-t border-[#F3EFE6] flex items-center justify-between">
                  <span className="text-[10px] text-[#8A7B69]">
                    High Rub Count (40,000+ Martindale)
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInquireFabric(fab);
                    }}
                    className="p-2 text-[#25D366] hover:bg-[#F0FDF4] rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                    title="Inquire about this fabric"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Inquire</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
