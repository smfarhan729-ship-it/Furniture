import React, { useState } from 'react';
import { Order, StoreSettings } from '../types';
import { X, Printer, Download, MessageCircle, Check, FileText, Copy } from 'lucide-react';
import { printReceipt, downloadReceiptHtml, getReceiptWhatsAppText } from '../utils/receiptGenerator';

interface ReceiptModalProps {
  order: Order | null;
  settings: StoreSettings;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, settings, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!order) return null;

  const handleDownload = () => {
    downloadReceiptHtml(order, settings);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      printReceipt(order, settings);
    }
  };

  const handleCopyText = async () => {
    try {
      const text = getReceiptWhatsAppText(order, settings);
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch {
      // Fallback
      downloadReceiptHtml(order, settings);
    }
  };

  const handleShareWhatsApp = () => {
    const text = getReceiptWhatsAppText(order, settings);
    const targetPhone = order.customer.phone.replace(/[^0-9]/g, '') || settings.whatsapp;
    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E8DFC9] overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        {/* Modal Action Header */}
        <div className="p-4 sm:p-5 bg-[#1B382B] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37] text-[#1B382B] flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold block">
                Official Workshop Receipt &amp; Tax Invoice
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold">
                Tax Invoice #{order.id}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
            aria-label="Close receipt"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar on Top */}
        <div className="p-3 bg-[#FAF6EE] border-b border-[#E8DFC9] flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="px-3 py-2 bg-white text-[#1B382B] border border-[#D5C9B3] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#F3EFE6] cursor-pointer shadow-xs min-h-[38px]"
            >
              <Printer className="w-3.5 h-3.5 text-[#1B382B]" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleCopyText}
              className="px-3 py-2 bg-white text-[#1B382B] border border-[#D5C9B3] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#F3EFE6] cursor-pointer shadow-xs min-h-[38px]"
            >
              {copySuccess ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5 text-[#C5A059]" />}
              <span>{copySuccess ? 'Copied!' : 'Copy Receipt'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-2 bg-[#1B382B] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#142d22] cursor-pointer shadow-xs min-h-[38px]"
            >
              {downloadSuccess ? <Check className="w-3.5 h-3.5 text-[#34D399]" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadSuccess ? 'Saved!' : 'Save HTML'}</span>
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="px-3 py-2 bg-[#25D366] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#20ba59] cursor-pointer shadow-xs min-h-[38px]"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </button>
          </div>
          <div className="text-[11px] text-[#8A7B69] hidden sm:block">
            Official proof for delivery &amp; 10-Yr warranty
          </div>
        </div>

        {/* Printable Receipt Paper View (Scrollable on small phones) */}
        <div id="printable-receipt" className="p-4 sm:p-6 overflow-y-auto space-y-4 bg-white text-xs text-[#1F2937]">
          {/* Shop Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b-2 border-[#1B382B]">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1B382B]">
                {settings.businessName}
              </h2>
              <div className="text-[11px] font-semibold text-[#8A7B69] uppercase tracking-wider mt-0.5">
                Direct Workshop Manufacturer &amp; Custom Furniture
              </div>
              <div className="text-[11px] text-[#4B5563] mt-1 leading-relaxed">
                {settings.address}<br />
                Phone: <strong className="text-[#1B382B]">{settings.phone}</strong> · Hours: {settings.hours}
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-[10px] text-[#8A7B69] uppercase font-bold block">Invoice Number</span>
              <span className="font-mono text-sm sm:text-base font-bold text-[#1B382B]">{order.id}</span>
              <div className="text-[11px] text-[#6B7280] mt-0.5">Date: {formattedDate}</div>
            </div>
          </div>

          {/* Customer & Order Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-[#FAF7F0] border border-[#EAE3D2] rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#1B382B] block border-b border-[#E5DEC9] pb-1 mb-1">
                Billed &amp; Delivered To
              </span>
              <div className="font-bold text-sm text-[#1B382B]">{order.customer.name}</div>
              <div className="text-[#4B5563]">Phone: <strong>{order.customer.phone}</strong></div>
              {order.customer.email && <div className="text-[#6B7280]">Email: {order.customer.email}</div>}
              <div className="text-[#374151] pt-1 leading-relaxed">
                {order.customer.address}, {order.customer.city}, {order.customer.state} — PIN {order.customer.pincode}
              </div>
              {order.customer.landmark && (
                <div className="text-[#8A7B69] text-[11px]">Landmark: {order.customer.landmark}</div>
              )}
            </div>

            <div className="p-3 bg-[#FAF7F0] border border-[#EAE3D2] rounded-xl space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#1B382B] block border-b border-[#E5DEC9] pb-1 mb-1">
                Order &amp; Payment Breakdown
              </span>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Order Status:</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ECFDF5] text-[#047857]">
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Payment Method:</span>
                <span className="font-semibold text-[#1B382B]">{order.payment.method}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Payment Status:</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  order.payment.status === 'VERIFIED'
                    ? 'bg-[#ECFDF5] text-[#065F46]'
                    : 'bg-[#FEF3C7] text-[#92400E]'
                }`}>
                  {order.payment.status}
                </span>
              </div>
              {order.payment.transactionRef && (
                <div className="text-[11px] text-[#8A7B69]">
                  Ref / UTR: <span className="font-mono">{order.payment.transactionRef}</span>
                </div>
              )}
              {order.customer.notes && (
                <div className="text-[11px] text-[#B45309] italic pt-1 border-t border-[#EAE3D2]">
                  Note: {order.customer.notes}
                </div>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-[#E5DEC9] rounded-xl overflow-hidden">
            <div className="bg-[#1B382B] text-white p-2.5 text-[11px] font-bold grid grid-cols-12 gap-2">
              <span className="col-span-1 text-center">#</span>
              <span className="col-span-7">Item Description</span>
              <span className="col-span-2 text-center">Qty</span>
              <span className="col-span-2 text-right">Amount</span>
            </div>
            <div className="divide-y divide-[#F3EFE6] bg-white">
              {order.items.map((it, idx) => (
                <div key={idx} className="p-2.5 grid grid-cols-12 gap-2 items-center text-xs">
                  <span className="col-span-1 text-center text-[#8A7B69] font-semibold">{idx + 1}</span>
                  <div className="col-span-7">
                    <span className="font-bold text-[#1B382B] block">{it.name}</span>
                    <span className="text-[11px] text-[#6B7280]">
                      {it.selectedFabric && `Fabric: ${it.selectedFabric}`}
                      {it.selectedColor && ` · Shade: ${it.selectedColor}`}
                      {it.orientation && ` · ${it.orientation}`}
                    </span>
                  </div>
                  <span className="col-span-2 text-center font-medium text-[#374151]">{it.quantity}</span>
                  <span className="col-span-2 text-right font-bold text-[#1B382B] tabular-nums">
                    ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals & Guarantee */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
            <div className="border-l-2 border-[#D4AF37] pl-3 text-[11px] text-[#6B7280] space-y-1">
              <div className="font-bold text-[#1B382B]">10-Year Warranty &amp; Workshop Care:</div>
              <div>• Solid seasoned Sal/Teak hardwood frame guarantee.</div>
              <div>• Sleepwell 40D Virgin HR foam anti-sagging policy.</div>
              <div>• Direct Surat workshop doorstep inspection support.</div>
            </div>

            <div className="w-full sm:w-64 bg-[#FAF7F0] p-3 rounded-xl border border-[#E5DEC9] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6B7280]">
                <span>Subtotal:</span>
                <span className="tabular-nums font-semibold">₹{order.pricing.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>Delivery:</span>
                <span className="text-[#059669] font-semibold">
                  {order.pricing.deliveryFee === 0 ? 'FREE' : `₹${order.pricing.deliveryFee.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#1B382B] pt-1.5 border-t border-[#E5DEC9]">
                <span>Total Amount:</span>
                <span className="tabular-nums">₹{order.pricing.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 bg-[#FAF6EE] border-t border-[#E8DFC9] flex justify-end gap-2 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-[#4B5563] border border-[#D5C9B3] rounded-lg text-xs font-semibold hover:bg-gray-50 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-[#1B382B] text-white rounded-lg text-xs font-semibold hover:bg-[#142d22] cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
