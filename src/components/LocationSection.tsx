import React from 'react';
import { MapPin, Phone, Clock, Navigation, MessageCircle, ExternalLink } from 'lucide-react';
import { StoreSettings } from '../types';

interface LocationSectionProps {
  settings: StoreSettings;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ settings }) => {
  const handleScheduleVisit = () => {
    const text = `Hello Shree Balaji Sofa, I would like to visit your workshop at Shop 33, Pavilion Plaza, Dindoli to see the sofa models and fabric swatches in person. What is a convenient time today?`;
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="location" className="py-16 bg-[#FDFBF7] border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Workshop Details & Contact */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-semibold text-[#8A7B69] uppercase tracking-wider mb-1">
                Visit Our Workshop &amp; Experience Center
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B382B]">
                Crafted Locally in Dindoli, Surat
              </h2>
              <p className="text-sm text-[#4B5563] mt-2 leading-relaxed">
                We invite you to visit our workshop where you can touch real fabric swatches, test cushion firmness on 32D and 40D Sleepwell foam, and see the solid wood joinery being constructed.
              </p>
            </div>

            {/* Address Card */}
            <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E5DEC9] space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1B382B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-[#1B382B] block">Workshop &amp; Store Address:</strong>
                  <p className="text-xs text-[#374151] mt-0.5 leading-relaxed">
                    Shop 33, Pavilion Plaza, Near Mark Point, Dindoli, Surat, Gujarat, India — PIN 394210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#1B382B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-[#1B382B] block">Direct Phone &amp; WhatsApp:</strong>
                  <a
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-xs font-semibold text-[#1B382B] hover:underline"
                  >
                    {settings.phone}
                  </a>
                  <span className="text-[11px] text-[#6B7280] block">
                    Available for sofa measurements &amp; video consultations
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#1B382B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-[#1B382B] block">Visiting &amp; Workshop Hours:</strong>
                  <p className="text-xs text-[#374151] mt-0.5">
                    {settings.hours} (Open All 7 Days)
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-[#1B382B] hover:bg-[#142d22] text-[#FDFBF7] font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Navigation className="w-4 h-4 text-[#D4AF37]" />
                <span>Get Google Maps Directions</span>
              </a>

              <button
                type="button"
                onClick={handleScheduleVisit}
                className="px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Schedule Workshop Visit</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Map Card Graphic */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-[#E5DEC9] bg-white shadow-lg p-2">
              <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-[#FAF6EE] flex flex-col justify-between p-6 border border-[#EFE8D8]">
                {/* Visual Roadmap Blueprint of Surat / Dindoli */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1B382B] uppercase tracking-wider">
                      Surat City Landmark Map
                    </span>
                    <span className="text-[11px] font-semibold text-[#047857] bg-[#ECFDF5] px-2.5 py-0.5 rounded">
                      Central Dindoli Hub
                    </span>
                  </div>

                  {/* Geometric Map Representation */}
                  <div className="relative h-44 w-full bg-[#EFE9DD] rounded-xl overflow-hidden p-4 flex items-center justify-center">
                    <svg className="w-full h-full opacity-60" viewBox="0 0 400 200" fill="none">
                      {/* Roads in Surat */}
                      <path d="M 0 50 Q 200 40 400 60" stroke="#FFF" strokeWidth="8"/>
                      <path d="M 0 140 Q 150 160 400 130" stroke="#FFF" strokeWidth="6"/>
                      <path d="M 120 0 L 150 200" stroke="#FFF" strokeWidth="6"/>
                      <path d="M 280 0 L 260 200" stroke="#FFF" strokeWidth="8"/>
                      <circle cx="270" cy="100" r="14" fill="#1B382B"/>
                    </svg>
                    
                    {/* Pin overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                      <div className="p-3 bg-[#1B382B] text-white rounded-full shadow-xl animate-bounce">
                        <MapPin className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                      <div className="mt-2 bg-white/95 px-3 py-1 rounded-md shadow-md text-xs font-bold text-[#1B382B]">
                        Shree Balaji Sofa &amp; Furniture
                      </div>
                      <div className="text-[10px] text-[#6B7280] font-medium bg-white/80 px-2 py-0.5 rounded mt-0.5">
                        Shop 33, Pavilion Plaza, Near Mark Point
                      </div>
                    </div>
                  </div>
                </div>

                {/* Surat Landmark Distances */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-3 border-t border-[#E8DFC9]">
                  <div className="p-2 bg-[#FAF7F0] rounded">
                    <div className="font-bold text-[#1B382B]">2 Mins</div>
                    <div className="text-[10px] text-[#6B7280]">From Mark Point</div>
                  </div>
                  <div className="p-2 bg-[#FAF7F0] rounded">
                    <div className="font-bold text-[#1B382B]">12 Mins</div>
                    <div className="text-[10px] text-[#6B7280]">From Althan Canal</div>
                  </div>
                  <div className="p-2 bg-[#FAF7F0] rounded">
                    <div className="font-bold text-[#1B382B]">18 Mins</div>
                    <div className="text-[10px] text-[#6B7280]">From Vesu Surat</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
