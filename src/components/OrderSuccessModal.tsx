import React, { useState } from 'react';
import { Order, StoreSettings } from '../types';
import { CheckCircle2, MessageCircle, X, Download, Eye, Clock, Copy, Check, MapPin } from 'lucide-react';
import { getProductImage } from '../utils/imageCatalog';
import { printReceipt, downloadReceiptHtml, getReceiptWhatsAppText } from '../utils/receiptGenerator';
import { ReceiptModal } from './ReceiptModal';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  settings: StoreSettings;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose, settings }) => {
  const [showFullReceipt, setShowFullReceipt] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!order) return null;

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      printReceipt(order, settings);
    }
  };

  const handleDownload = () => {
    downloadReceiptHtml(order, settings);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleCopy = async () => {
    try {
      const text = getReceiptWhatsAppText(order, settings);
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 3000);
    } catch {
      downloadReceiptHtml(order, settings);
    }
  };

  const handleWhatsAppUpdate = () => {
    const text = `Hello Shree Balaji Sofa, I placed Order #${order.id} on your website for ₹${order.pricing.total.toLocaleString('en-IN')}. Please update me on the production schedule.`;
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div id="order-success-modal" className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E8DFC9] overflow-hidden my-4 sm:my-6">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#1B382B] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#1B382B] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                Order Confirmed
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold">
                Thank You, {order.customer.name}!
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Order Details Header */}
          <div className="p-4 rounded-xl bg-white border border-[#E5DEC9] flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-[#8A7B69] uppercase font-bold block">Order Number</span>
              <span className="font-mono text-base font-bold text-[#1B382B]">{order.id}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#8A7B69] uppercase font-bold block">Order Status</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#047857]">
                {order.status}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#8A7B69] uppercase font-bold block">Payment</span>
              <span className="text-xs font-semibold text-[#1B382B]">
                {order.payment.method} ({order.payment.status})
              </span>
            </div>
          </div>

          {/* Workshop Manufacturing Progress Bar */}
          <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E5DEC9] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#1B382B]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span>Production Pipeline</span>
              </span>
              <span className="text-[#8A7B69]">Est. 7-10 Days Delivery</span>
            </div>
            {/* Steps */}
            <div className="grid grid-cols-4 gap-1 text-center text-[10px] pt-1">
              <div className="p-1.5 bg-[#1B382B] text-white rounded font-medium">1. Confirmed</div>
              <div className="p-1.5 bg-[#E2D9C5] text-[#1B382B] rounded font-medium">2. Wood Frame</div>
              <div className="p-1.5 bg-[#E2D9C5] text-[#1B382B] rounded font-medium">3. Upholstery</div>
              <div className="p-1.5 bg-[#E2D9C5] text-[#1B382B] rounded font-medium">4. Delivered</div>
            </div>
          </div>

          {/* Ordered Items Summary */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#1B382B]">
              Purchased Furniture
            </h3>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-3 bg-white p-3 rounded-xl border border-[#E5DEC9]">
                  <img
                    src={getProductImage(item.image, item.image)}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover bg-[#FAF7F0] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-[#1B382B]">{item.name}</h4>
                    <p className="text-[11px] text-[#6B7280]">
                      Qty: {item.quantity} · {item.selectedFabric} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                    </p>
                    <div className="font-bold text-xs text-[#1B382B] tabular-nums mt-0.5">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address & Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white border border-[#E5DEC9] space-y-1">
              <span className="font-bold text-[#1B382B] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Delivery Address</span>
              </span>
              <p className="text-[#374151] leading-relaxed pt-1">
                {order.customer.address}, {order.customer.city}, {order.customer.state} — PIN {order.customer.pincode}
              </p>
              <p className="text-[#8A7B69] pt-1">Phone: {order.customer.phone}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5DEC9] space-y-1.5">
              <span className="font-bold text-[#1B382B] block">Price Summary</span>
              <div className="flex justify-between text-[#6B7280]">
                <span>Subtotal:</span>
                <span className="tabular-nums">₹{order.pricing.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>Delivery Charge:</span>
                <span className="text-[#059669]">
                  {order.pricing.deliveryFee === 0 ? 'FREE' : `₹${order.pricing.deliveryFee.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#1B382B] pt-1 border-t border-[#E8DFC9]">
                <span>Total Paid / Due:</span>
                <span className="tabular-nums">₹{order.pricing.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-2 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setShowFullReceipt(true)}
                className="py-2.5 px-3 bg-[#1B382B] hover:bg-[#142d22] text-[#FDFBF7] rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[42px]"
              >
                <Eye className="w-4 h-4 text-[#D4AF37]" />
                <span>View &amp; Print Receipt</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="py-2.5 px-3 bg-[#FAF6EE] hover:bg-[#EFE7D7] text-[#1B382B] border border-[#D5C9B3] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[42px]"
              >
                <Download className="w-4 h-4 text-[#C5A059]" />
                <span>{downloadSuccess ? 'Receipt Saved!' : 'Download Receipt'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="py-2.5 px-3 bg-[#FAF6EE] hover:bg-[#EFE7D7] text-[#1B382B] border border-[#D5C9B3] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[42px]"
              >
                {copiedText ? <Check className="w-4 h-4 text-[#059669]" /> : <Copy className="w-4 h-4 text-[#C5A059]" />}
                <span>{copiedText ? 'Copied Details!' : 'Copy Invoice'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleWhatsAppUpdate}
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Track Production Schedule on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Standalone Full Receipt Modal */}
      {showFullReceipt && (
        <ReceiptModal
          order={order}
          settings={settings}
          onClose={() => setShowFullReceipt(false)}
        />
      )}
    </div>
  );
};
