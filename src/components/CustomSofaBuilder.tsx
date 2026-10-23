import React, { useState } from 'react';
import { Sparkles, MessageCircle, Check, Send, Calculator } from 'lucide-react';
import { api } from '../services/api';

interface CustomSofaBuilderProps {
  whatsappNumber: string;
}

export const CustomSofaBuilder: React.FC<CustomSofaBuilderProps> = ({ whatsappNumber }) => {
  const [sofaType, setSofaType] = useState('L-Shaped 7-Seater Sectional');
  const [basePrice, setBasePrice] = useState(38000);
  const [fabric, setFabric] = useState('Royal Velvet');
  const [fabricCost, setFabricCost] = useState(4500);
  const [foamGrade, setFoamGrade] = useState('40D Sleepwell High Resilience');
  const [foamCost, setFoamCost] = useState(3200);
  const [hydraulicStorage, setHydraulicStorage] = useState(false);
  const [cupHolders, setCupHolders] = useState(false);
  const [diamondQuilt, setDiamondQuilt] = useState(true);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customDimensions, setCustomDimensions] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Compute live estimate
  const addOnsTotal = (hydraulicStorage ? 3500 : 0) + (cupHolders ? 1200 : 0) + (diamondQuilt ? 2000 : 0);
  const estimatedPrice = basePrice + fabricCost + foamCost + addOnsTotal;

  const handleSofaTypeChange = (type: string, price: number) => {
    setSofaType(type);
    setBasePrice(price);
  };

  const handleFabricChange = (fab: string, cost: number) => {
    setFabric(fab);
    setFabricCost(cost);
  };

  const handleFoamChange = (foam: string, cost: number) => {
    setFoamGrade(foam);
    setFoamCost(cost);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    setLoading(true);
    try {
      await api.submitQuote({
        customerName,
        customerPhone,
        sofaType,
        seatingCapacity: sofaType,
        fabric,
        foamGrade,
        estimatedPrice,
        notes: `Dimensions: ${customDimensions || 'Standard'}. Add-ons: ${hydraulicStorage ? 'Hydraulic Storage, ' : ''}${cupHolders ? 'Cup Holders, ' : ''}${diamondQuilt ? 'Diamond Quilt' : ''}`
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppInstantQuote = () => {
    const text = `Hello Shree Balaji Sofa, I created a custom sofa configuration on your website:
• Model: ${sofaType}
• Fabric: ${fabric}
• Foam: ${foamGrade}
• Features: ${hydraulicStorage ? 'Storage Box, ' : ''}${cupHolders ? 'Cup Holders, ' : ''}${diamondQuilt ? 'Diamond Quilted Arms' : 'Plain'}
• Estimated Price: ₹${estimatedPrice.toLocaleString('en-IN')}
${customDimensions ? `• My Room Size: ${customDimensions}\n` : ''}
Customer Name: ${customerName || 'Customer'}
Phone: ${customerPhone || 'Shared via WhatsApp'}

Can you confirm this quote and send fabric color samples?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="custom-builder" className="py-16 bg-[#FAF6EE] border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-[#8A7B69] uppercase tracking-wider mb-1">
            Bespoke Tailoring Service
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B382B]">
            Interactive Custom Sofa Builder
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] mt-2">
            Configure your dream sofa to your living room&apos;s exact layout. Choose seating style, fabric tier, foam density, and storage features with transparent direct-workshop cost estimates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Configurator Form (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DEC9] shadow-sm">
            {/* Step 1: Seating Model */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#1B382B] uppercase tracking-wider">
                  Step 1: Choose Seating Style &amp; Size
                </span>
                <span className="text-xs text-[#8A7B69]">Solid Wood Frame</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'L-Shaped 7-Seater Sectional', price: 38000, desc: 'Large Living Hall' },
                  { name: 'L-Shaped 5-Seater Sectional', price: 32000, desc: 'Medium Apartment' },
                  { name: 'Convertible Pull-Out Sofa Bed', price: 26000, desc: 'Guest Room Favorite' },
                  { name: '3-Seater Classic Sofa', price: 22000, desc: 'Compact & Modern' },
                  { name: '2-Seater Lounge Sofa', price: 16000, desc: 'Balcony or Bedroom' },
                  { name: 'Twin Cinema Recliner Suite', price: 48000, desc: 'Motorized Comfort' },
                ].map(item => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleSofaTypeChange(item.name, item.price)}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      sofaType === item.name
                        ? 'border-[#1B382B] bg-[#FAF6EE] shadow-xs ring-1 ring-[#1B382B]'
                        : 'border-[#E5DEC9] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <div className="font-semibold text-xs text-[#1B382B]">{item.name}</div>
                    <div className="text-[11px] text-[#6B7280] mt-0.5">{item.desc}</div>
                    <div className="text-xs font-bold text-[#1B382B] mt-2 tabular-nums">
                      From ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Upholstery Fabric Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#1B382B] uppercase tracking-wider">
                  Step 2: Upholstery Fabric (Per-Meter Rate Guide)
                </span>
                <span className="text-xs text-[#8A7B69]">From Verified Rates</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Royal Velvet', cost: 4500, rate: '₹700 - ₹1,200/m', life: '8-12 Years' },
                  { name: 'Nordic Boucle', cost: 6500, rate: '₹800 - ₹1,500/m', life: '8-12 Years' },
                  { name: 'Natural Textured Linen', cost: 3500, rate: '₹600 - ₹1,000/m', life: '6-10 Years' },
                  { name: 'Soft Chenille', cost: 4500, rate: '₹700 - ₹1,200/m', life: '7-11 Years' },
                  { name: 'Matte Micro-Suede', cost: 3500, rate: '₹600 - ₹1,000/m', life: '6-10 Years' },
                  { name: 'Premium Vegan Leatherette', cost: 7500, rate: '₹1,000 - ₹2,000/m', life: '10-15 Years' },
                ].map(item => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleFabricChange(item.name, item.cost)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      fabric === item.name
                        ? 'border-[#1B382B] bg-[#FAF6EE] shadow-xs ring-1 ring-[#1B382B]'
                        : 'border-[#E5DEC9] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <div className="font-semibold text-xs text-[#1B382B]">{item.name}</div>
                    <div className="text-[10px] text-[#059669] font-medium">{item.rate}</div>
                    <div className="text-[10px] text-[#6B7280]">Life: {item.life}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Foam Density & Cushion Core */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#1B382B] uppercase tracking-wider">
                  Step 3: Cushion Firmness &amp; Foam Grade
                </span>
                <span className="text-xs text-[#059669] font-medium">Anti-Sag Guarantee</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: '32D Standard Medium Firm', cost: 0, desc: 'Balanced support for standard family use' },
                  { name: '40D Sleepwell High Resilience', cost: 3200, desc: 'Recommended: 10-Yr anti-sagging resilience' },
                  { name: '40D HR + Memory Foam Topper', cost: 5500, desc: 'Ultra-luxurious cloud plush seating' }
                ].map(item => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleFoamChange(item.name, item.cost)}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      foamGrade === item.name
                        ? 'border-[#1B382B] bg-[#FAF6EE] shadow-xs ring-1 ring-[#1B382B]'
                        : 'border-[#E5DEC9] hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <div className="font-semibold text-xs text-[#1B382B]">{item.name}</div>
                    <div className="text-[11px] text-[#6B7280] mt-1">{item.desc}</div>
                    <div className="text-xs font-bold text-[#1B382B] mt-2">
                      {item.cost === 0 ? 'Included' : `+₹${item.cost.toLocaleString('en-IN')}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Add-on Features */}
            <div>
              <span className="block text-xs font-bold text-[#1B382B] uppercase tracking-wider mb-3">
                Step 4: Custom Add-Ons &amp; Storage
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-start gap-3 p-3 rounded-xl border border-[#E5DEC9] bg-[#FAF7F0] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hydraulicStorage}
                    onChange={e => setHydraulicStorage(e.target.checked)}
                    className="mt-1 text-[#1B382B] rounded"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-[#1B382B] block">Under-Chaise Storage</span>
                    <span className="text-[#6B7280] text-[11px]">Hydraulic gas lift (+₹3,500)</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-[#E5DEC9] bg-[#FAF7F0] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cupHolders}
                    onChange={e => setCupHolders(e.target.checked)}
                    className="mt-1 text-[#1B382B] rounded"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-[#1B382B] block">Brass Cup Holders</span>
                    <span className="text-[#6B7280] text-[11px]">Pair built into arm (+₹1,200)</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-[#E5DEC9] bg-[#FAF7F0] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={diamondQuilt}
                    onChange={e => setDiamondQuilt(e.target.checked)}
                    className="mt-1 text-[#1B382B] rounded"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-[#1B382B] block">Diamond Quilted Sides</span>
                    <span className="text-[#6B7280] text-[11px]">Signature Balaji look (+₹2,000)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 5: Optional Dimensions */}
            <div>
              <label className="block text-xs font-semibold text-[#1B382B] mb-1">
                Your Specific Living Room Dimensions (Optional):
              </label>
              <input
                type="text"
                value={customDimensions}
                onChange={e => setCustomDimensions(e.target.value)}
                placeholder="e.g. Wall A: 10 ft, Wall B: 7 ft, or need L-shape on right side"
                className="w-full text-xs p-3 rounded-lg border border-[#D5C9B3] focus:outline-[#1B382B] bg-[#FDFBF7]"
              />
            </div>
          </div>

          {/* Right Column: Live Estimate & Enquiry Submission (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="bg-[#1B382B] text-[#FDFBF7] p-6 rounded-2xl shadow-xl space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#D4AF37] tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>Transparent Workshop Estimate</span>
              </div>

              {/* Estimate Breakdown */}
              <div className="space-y-2 text-xs border-y border-white/10 py-4">
                <div className="flex justify-between text-[#E5E7EB]">
                  <span>{sofaType}:</span>
                  <span className="tabular-nums">₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#E5E7EB]">
                  <span>{fabric}:</span>
                  <span className="tabular-nums">+₹{fabricCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#E5E7EB]">
                  <span>{foamGrade}:</span>
                  <span className="tabular-nums">+₹{foamCost.toLocaleString('en-IN')}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-[#E5E7EB]">
                    <span>Custom Add-Ons:</span>
                    <span className="tabular-nums">+₹{addOnsTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#E5E7EB] pt-1">
                  <span>Surat Delivery &amp; Assembly:</span>
                  <span className="text-[#34D399] font-medium">FREE</span>
                </div>
              </div>

              {/* Total Estimated Price */}
              <div>
                <div className="text-xs text-[#D1D5DB]">Estimated Total (Approx):</div>
                <div className="font-serif text-3xl font-bold text-[#F3DC9B] tabular-nums mt-0.5">
                  ₹{estimatedPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-[#9CA3AF] mt-1">
                  Final exact rate confirmed after fabric selection at workshop.
                </div>
              </div>

              {/* Quick WhatsApp Action */}
              <button
                type="button"
                onClick={handleWhatsAppInstantQuote}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send Configuration to WhatsApp</span>
              </button>

              {/* Save Quote to Database Form */}
              {!submitted ? (
                <form onSubmit={handleSubmit} className="pt-2 border-t border-white/10 space-y-3">
                  <div className="text-xs font-semibold text-[#D4AF37]">
                    Or Request Workshop Callback:
                  </div>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full text-xs p-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="WhatsApp Phone Number"
                    className="w-full text-xs p-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-white text-[#1B382B] hover:bg-[#F3EFE6] font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? 'Saving...' : 'Save & Request Quote'}</span>
                  </button>
                </form>
              ) : (
                <div className="p-3 rounded-lg bg-white/10 border border-white/20 text-center text-xs text-[#34D399] font-medium space-y-1">
                  <Check className="w-4 h-4 mx-auto text-[#34D399]" />
                  <div>Quote received! Our master craftsman will call you shortly.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
