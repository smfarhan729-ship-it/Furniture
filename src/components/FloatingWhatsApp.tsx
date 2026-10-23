import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleChat = () => {
    const text = "Hello Shree Balaji Sofa! I would like to inquire about customized sofas, sofa beds, or cushion repair services.";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Friendly Tooltip */}
      {showTooltip && (
        <div className="relative bg-white text-[#1B382B] text-xs font-medium px-3.5 py-2 rounded-xl shadow-lg border border-[#E5DEC9] max-w-xs animate-fade-in flex items-center gap-2">
          <span>Need custom sofa advice? Chat with our master craftsman!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleChat}
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="font-semibold text-xs tracking-wide hidden sm:inline">
          WhatsApp Us (+91 77538 57076)
        </span>
      </button>
    </div>
  );
};
