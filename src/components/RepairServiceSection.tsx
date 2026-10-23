import React, { useState } from 'react';
import { Wrench, CheckCircle2, MessageCircle, ShieldCheck, Clock, Send, Check } from 'lucide-react';
import { api } from '../services/api';
import { getProductImage } from '../utils/imageCatalog';

interface RepairServiceSectionProps {
  whatsappNumber: string;
}

export const RepairServiceSection: React.FC<RepairServiceSectionProps> = ({ whatsappNumber }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [seatingCount, setSeatingCount] = useState('3 Seater');
  const [issueType, setIssueType] = useState<'SAG_REPAIR' | 'FOAM_REPLACE' | 'FULL_REUPHOLSTERY' | 'FRAME_REPAIR'>('FOAM_REPLACE');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !address) return;

    setLoading(true);
    try {
      await api.submitRepair({
        customerName,
        customerPhone,
        issueType,
        seatingCount,
        sofaAge: "3-5 Years",
        address,
        pincode: "394210",
        description
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRepair = () => {
    const text = `Hello Shree Balaji Sofa, I want to inquire about sofa repair / cushion replacement in Surat.
• Sofa Size: ${seatingCount}
• Issue: ${issueType}
• Address: ${address || 'Dindoli / Surat area'}
• Details: ${description || 'Sagging foam needs replacement'}
Name: ${customerName || 'Customer'}
Phone: ${customerPhone || 'Shared on WhatsApp'}

Can you share the inspection time and cost estimate?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="repairs" className="py-16 bg-[#FDFBF7] border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Workshop Explanations & Diagram (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold text-[#8A7B69] uppercase tracking-wider">
              Surat On-Site &amp; Workshop Service
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B382B]">
              Sofa Cushion Repair &amp; 40D Sleepwell Foam Replacement
            </h2>

            <p className="text-sm sm:text-lg text-[#4B5563] leading-relaxed">
              Don&apos;t discard your solid wood sofa frame because the cushions have sunken! Our master artisans replace fatigued foam with <strong>virgin 40D Sleepwell High Resilience foam</strong>, retighten bottom elastic webbing, and re-stitch outer upholstery.
            </p>

            {/* Service Diagram Card */}
            <div className="rounded-2xl overflow-hidden border border-[#E8DFC9] shadow-sm bg-white p-2">
              <img
                src={getProductImage('service_cushion_repair')}
                alt="Sofa cushion foam replacement and anti-sagging repair diagram"
                className="w-full h-auto rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Repair Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E5DEC9] space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1B382B]">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                  <span>48-Hour Turnaround</span>
                </div>
                <p className="text-[11px] text-[#6B7280]">
                  Pickup and doorstep return service across Surat, Dindoli, Althan, &amp; Vesu.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E5DEC9] space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1B382B]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Save Up to 70%</span>
                </div>
                <p className="text-[11px] text-[#6B7280]">
                  Revive your favorite sofa for a fraction of the cost of buying new.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E5DEC9] space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1B382B]">
                  <Wrench className="w-4 h-4 text-[#C5A059]" />
                  <span>From ₹1,450 / Seat</span>
                </div>
                <p className="text-[11px] text-[#6B7280]">
                  Honest per-seat pricing with authentic Sleepwell warranty.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Repair Booking / Enquiry Form (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DEC9] shadow-md space-y-6">
            <div>
              <div className="text-xs font-bold text-[#1B382B] uppercase tracking-wider">
                Book Inspection / Get Quote
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1B382B] mt-1">
                Request Sofa Cushion Service
              </h3>
              <p className="text-xs text-[#6B7280] mt-1">
                Our craftsman will evaluate your sofa and provide an exact rate estimate.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1B382B] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Shah"
                    className="w-full text-xs p-3 rounded-lg border border-[#D5C9B3] focus:outline-[#1B382B] bg-[#FDFBF7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B382B] mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full text-xs p-3 rounded-lg border border-[#D5C9B3] focus:outline-[#1B382B] bg-[#FDFBF7]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B382B] mb-1">
                      Sofa Seating Count
                    </label>
                    <select
                      value={seatingCount}
                      onChange={e => setSeatingCount(e.target.value)}
                      className="w-full text-xs p-3 rounded-lg border border-[#D5C9B3] focus:outline-[#1B382B] bg-[#FDFBF7]"
                    >
                      <option value="3 Seater">3 Seater</option>
                      <option value="5 Seater (3+1+1)">5 Seater (3+1+1)</option>
                      <option value="L-Shape (6-8 Seater)">L-Shape Sectional</option>
                      <option value="Recliner Single/Twin">Recliner</option>
                      <option value="Dining Chairs (Set)">Dining Chairs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B382B] mb-1">
                      Service Required
                    </label>
                    <select
                      value={issueType}
                      onChange={e => setIssueType(e.target.value as any)}
                      className="w-full text-xs p-3 rounded-lg border border-[#D5C9B3] focus:outline-[#1B382B] bg-[#FDFBF7]"
                    >
                      <option value="FOAM_REPLACE">New 40D Foam</option>
                      <option value="SAG_REPAIR">Sagging &amp; Springs</option>
                      <option value="FULL_REUPHOLSTERY">Full Re-Upholstery</option>
                      <option value="FRAME_REPAIR">Wood Frame Repair</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B382B] mb-1">
                    Your Address in Surat *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Society/Flat, Area (e.g. Dindoli / Vesu / Althan)"
                    className="w-full text-xs p-3 rounded-lg border border-[#D5C9B3] focus:outline-[#1B382B] bg-[#FDFBF7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B382B] mb-1">
                    Describe Condition (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="e.g. Foam has become soft and sunk in middle, need firm support"
                    className="w-full text-xs p-3 rounded-lg border border-[#D5C9B3] focus:outline-[#1B382B] bg-[#FDFBF7]"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#1B382B] text-white hover:bg-[#142d22] font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? 'Submitting...' : 'Submit Repair Request'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppRepair}
                    className="w-full py-2.5 bg-[#25D366] text-white hover:bg-[#20ba59] font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Chat Directly on WhatsApp</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 rounded-xl bg-[#FAF6EE] border border-[#E5DEC9] text-center space-y-3">
                <div className="w-10 h-10 bg-[#047857] text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1B382B]">
                  Repair Request Received!
                </h4>
                <p className="text-xs text-[#6B7280]">
                  Thank you, {customerName}. Our workshop supervisor will contact you at <strong>{customerPhone}</strong> to schedule your sofa inspection.
                </p>
                <button
                  onClick={handleWhatsAppRepair}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white text-xs font-semibold rounded-lg"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send Photos on WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
