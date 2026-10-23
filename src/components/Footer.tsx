import React from 'react';
import { StoreSettings } from '../types';
import { MapPin, Phone, Clock, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  settings: StoreSettings;
  onOpenPolicy: (policy: 'terms' | 'privacy' | 'delivery' | 'refund' | 'warranty') => void;
  onNavigate: (section: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenPolicy,
  onNavigate,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-[#15231B] text-[#D8D2C4] pt-14 pb-8 border-t border-[#293E32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Address Column (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F3E8D0]">
              Shree Balaji Sofa &amp; Furniture
            </h3>
            <p className="text-xs text-[#A89E8C] leading-relaxed max-w-sm">
              Residential furniture workshop and customized furniture store in Dindoli, Surat. Handcrafting bespoke L-shaped sofas, pull-out sofa beds, recliners, and 40D Sleepwell cushion replacements.
            </p>

            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-[#C8BEAB]">{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-[#F3E8D0] font-semibold hover:text-[#D4AF37] transition-colors"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-[#C8BEAB]">{settings.hours}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#F3E8D0] uppercase tracking-wider">
              Furniture Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#A89E8C]">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#F3E8D0] transition-colors cursor-pointer"
                >
                  L-Shaped Sectionals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop-video')}
                  className="hover:text-[#F3E8D0] transition-colors cursor-pointer"
                >
                  Convertible Sofa Beds (Pull-Out)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('custom-builder')}
                  className="hover:text-[#F3E8D0] transition-colors cursor-pointer"
                >
                  Interactive Custom Sofa Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('repairs')}
                  className="hover:text-[#F3E8D0] transition-colors cursor-pointer"
                >
                  Sofa Cushion Re-Foaming (40D Foam)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fabrics')}
                  className="hover:text-[#F3E8D0] transition-colors cursor-pointer"
                >
                  Upholstery Fabric Rates (₹/Meter)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location')}
                  className="hover:text-[#F3E8D0] transition-colors cursor-pointer"
                >
                  Visit Workshop in Dindoli
                </button>
              </li>
            </ul>
          </div>

          {/* Workshop Policies (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#F3E8D0] uppercase tracking-wider">
              Customer Policies &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs text-[#A89E8C]">
              <li>
                <button
                  onClick={() => onOpenPolicy('warranty')}
                  className="hover:text-[#F3E8D0] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>10-Year Solid Hardwood Frame Warranty</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('delivery')}
                  className="hover:text-[#F3E8D0] transition-colors cursor-pointer"
                >
                  Surat Doorstep Delivery &amp; Assembly Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('refund')}
                  className="hover:text-[#F3E8D0] transition-colors cursor-pointer"
                >
                  Cancellation &amp; Refund Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-[#F3E8D0] transition-colors cursor-pointer"
                >
                  Customer Privacy &amp; Payment Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-[#F3E8D0] transition-colors cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li className="pt-2">
                <a
                  href={settings.justdialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  <span>Verified 5.0★ Profile on Justdial &amp; Google</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Staff Access */}
        <div className="pt-8 border-t border-[#293E32] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7B69]">
          <div>
            &copy; {new Date().getFullYear()} Shree Balaji Sofa &amp; Furniture. All rights reserved. Surat, Gujarat, India.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-[#A89E8C] hover:text-[#D4AF37] transition-colors cursor-pointer font-medium"
            >
              Owner / Admin Panel
            </button>
            <span aria-hidden="true">·</span>
            <span>Handcrafted with precision in Surat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
