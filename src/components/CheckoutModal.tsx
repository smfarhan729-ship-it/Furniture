import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { OrderCustomer, Order, StoreSettings } from '../types';
import { api } from '../services/api';
import { X, ShieldCheck, QrCode, CreditCard, Banknote, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { getProductImage } from '../utils/imageCatalog';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: StoreSettings;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  settings,
  onOrderSuccess
}) => {
  const { cart, subtotal, clearCart } = useCart();

  const [customer, setCustomer] = useState<OrderCustomer>({
    name: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '394210',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'ONLINE_GATEWAY'>('COD');
  const [upiUtr, setUpiUtr] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pendingGatewayOrder, setPendingGatewayOrder] = useState<Order | null>(null);
  const [isGatewaySandboxOpen, setIsGatewaySandboxOpen] = useState(false);
  const [gatewaySimulating, setGatewaySimulating] = useState(false);

  if (!isOpen) return null;

  // Compute delivery fee
  const isSurat = customer.pincode.startsWith('394') || customer.pincode.startsWith('395');
  const freeThreshold = settings.freeDeliveryThreshold || 15000;
  let deliveryFee = 0;
  if (subtotal < freeThreshold) {
    deliveryFee = isSurat ? 500 : (settings.defaultDeliveryFee || 1200);
  }

  const taxGst = Math.round(subtotal * ((settings.gstPercentage || 0) / 100));
  const grandTotal = subtotal + deliveryFee + taxGst;

  const handleSimulateSuccessfulPayment = async () => {
    if (!pendingGatewayOrder) return;
    setGatewaySimulating(true);
    try {
      const verifyRes = await api.verifyPayment(
        pendingGatewayOrder.id,
        'ONLINE_GATEWAY',
        `RAZORPAY_TEST_${Date.now()}`
      );
      clearCart();
      setIsGatewaySandboxOpen(false);
      onOrderSuccess(verifyRes.order || { ...pendingGatewayOrder, payment: { ...pendingGatewayOrder.payment, status: 'VERIFIED' } });
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment verification simulation failed.');
      setIsGatewaySandboxOpen(false);
    } finally {
      setGatewaySimulating(false);
    }
  };

  const handleCancelGatewayPayment = () => {
    setIsGatewaySandboxOpen(false);
    setErrorMessage('Online payment simulation was cancelled. Order remains pending or you may choose Cash on Delivery.');
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Field validation
    if (!customer.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const cleanPhone = customer.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!customer.address.trim()) {
      setErrorMessage('Please enter your complete delivery address.');
      return;
    }
    if (!customer.pincode.trim() || customer.pincode.length !== 6) {
      setErrorMessage('Please enter a valid 6-digit PIN code.');
      return;
    }

    if (cart.length === 0) {
      setErrorMessage('Your cart is empty.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        customer,
        items: cart,
        paymentMethod,
        transactionRef: paymentMethod === 'UPI' ? upiUtr : undefined
      };

      const res = await api.createOrder(payload);
      if (res.success && res.order) {
        if (paymentMethod === 'ONLINE_GATEWAY') {
          setPendingGatewayOrder(res.order);
          setIsGatewaySandboxOpen(true);
        } else {
          clearCart();
          onOrderSuccess(res.order);
        }
      } else {
        setErrorMessage('Failed to place order. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Server error while confirming order.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E8DFC9] overflow-hidden my-6">
        {/* Header */}
        <div className="p-5 bg-[#FAF6EE] border-b border-[#E8DFC9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#1B382B]" />
            <h2 className="font-serif text-lg font-bold text-[#1B382B]">
              Secure Checkout · Shree Balaji Sofa
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B7280] hover:text-[#1B382B] rounded-lg hover:bg-[#EFE8D8] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 max-h-[82vh] overflow-y-auto">
          {/* Customer & Delivery Details (lg:col-span-7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-[#E8DFC9]">
            <div>
              <h3 className="font-serif text-base font-bold text-[#1B382B] mb-1">
                1. Delivery &amp; Contact Details
              </h3>
              <p className="text-xs text-[#6B7280]">
                We manufacture and deliver right to your doorstep in Surat and South Gujarat.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#1B382B] mb-1">
                  Full Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={customer.name}
                  onChange={e => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="e.g. Rameshchandra Patel"
                  className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white focus:outline-[#1B382B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1B382B] mb-1">
                    WhatsApp Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white focus:outline-[#1B382B]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1B382B] mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={e => setCustomer({ ...customer, email: e.target.value })}
                    placeholder="customer@email.com"
                    className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white focus:outline-[#1B382B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1B382B] mb-1">
                  Complete Delivery Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={customer.address}
                  onChange={e => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="Flat/House No., Building/Society Name, Road"
                  className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white focus:outline-[#1B382B]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#1B382B] mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={customer.pincode}
                    onChange={e => setCustomer({ ...customer, pincode: e.target.value })}
                    placeholder="394210"
                    className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white focus:outline-[#1B382B]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1B382B] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={e => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white focus:outline-[#1B382B]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1B382B] mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={customer.state}
                    onChange={e => setCustomer({ ...customer, state: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white focus:outline-[#1B382B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1B382B] mb-1">
                  Delivery Notes / Floor / Lift Availability
                </label>
                <input
                  type="text"
                  value={customer.notes}
                  onChange={e => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="e.g. 3rd Floor with service elevator, please deliver on Saturday"
                  className="w-full p-2.5 rounded-lg border border-[#D5C9B3] bg-white focus:outline-[#1B382B]"
                />
              </div>
            </div>

            {/* Payment Options */}
            <div className="pt-4 border-t border-[#E8DFC9] space-y-3">
              <h3 className="font-serif text-base font-bold text-[#1B382B]">
                2. Select Payment Method
              </h3>

              <div className="space-y-2 text-xs">
                {/* Cash on Delivery */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  paymentMethod === 'COD' ? 'border-[#1B382B] bg-[#FAF6EE] ring-1 ring-[#1B382B]' : 'border-[#E5DEC9] bg-white'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="mt-0.5 text-[#1B382B]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-semibold text-[#1B382B]">
                      <Banknote className="w-4 h-4 text-[#047857]" />
                      <span>Cash on Delivery / Workshop Payment</span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">
                      Pay after inspection upon doorstep delivery &amp; assembly in Surat.
                    </p>
                  </div>
                </label>

                {/* Instant UPI Payment */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  paymentMethod === 'UPI' ? 'border-[#1B382B] bg-[#FAF6EE] ring-1 ring-[#1B382B]' : 'border-[#E5DEC9] bg-white'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="mt-0.5 text-[#1B382B]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-semibold text-[#1B382B]">
                      <QrCode className="w-4 h-4 text-[#1B382B]" />
                      <span>Instant UPI (Google Pay / PhonePe / Paytm / BHIM)</span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">
                      Pay directly to business VPA: <strong>{settings.upiId}</strong>
                    </p>

                    {paymentMethod === 'UPI' && (
                      <div className="mt-3 p-3 rounded-lg bg-white border border-[#E5DEC9] space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span>UPI ID: <strong>{settings.upiId}</strong></span>
                          <span className="text-[#059669] font-bold">Verified Merchant</span>
                        </div>
                        <input
                          type="text"
                          value={upiUtr}
                          onChange={e => setUpiUtr(e.target.value)}
                          placeholder="Enter 12-digit UPI UTR / Ref Number (if already paid)"
                          className="w-full text-xs p-2 rounded border border-[#D5C9B3]"
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* Online Payment Gateway */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  paymentMethod === 'ONLINE_GATEWAY' ? 'border-[#1B382B] bg-[#FAF6EE] ring-1 ring-[#1B382B]' : 'border-[#E5DEC9] bg-white'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'ONLINE_GATEWAY'}
                    onChange={() => setPaymentMethod('ONLINE_GATEWAY')}
                    className="mt-0.5 text-[#1B382B]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-semibold text-[#1B382B]">
                      <CreditCard className="w-4 h-4 text-[#1B382B]" />
                      <span>Cards &amp; NetBanking (Razorpay Verified Gateway)</span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">
                      Supports Visa, MasterCard, RuPay, and all major Indian banks.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary Column (lg:col-span-5) */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#FAF6EE] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold text-[#1B382B]">
                Order Items ({cart.length})
              </h3>

              {/* Items scroll */}
              <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-3 text-xs bg-white p-2.5 rounded-lg border border-[#E5DEC9]">
                    <img
                      src={getProductImage(item.image, item.image)}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#1B382B] truncate">{item.name}</div>
                      <div className="text-[10px] text-[#8A7B69]">
                        Qty: {item.quantity} · {item.selectedFabric} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                      </div>
                      <div className="font-semibold text-[#1B382B] mt-0.5 tabular-nums">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 pt-4 border-t border-[#E8DFC9] text-xs">
                <div className="flex justify-between text-[#6B7280]">
                  <span>Items Subtotal:</span>
                  <span className="font-semibold text-[#1B382B] tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Surat Delivery:</span>
                  <span className="font-semibold text-[#059669]">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toLocaleString('en-IN')}`}
                  </span>
                </div>
                {taxGst > 0 && (
                  <div className="flex justify-between text-[#6B7280]">
                    <span>GST ({settings.gstPercentage}%):</span>
                    <span className="font-semibold text-[#1B382B] tabular-nums">
                      ₹{taxGst.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#1B382B] pt-2 border-t border-[#E8DFC9]">
                  <span>Total Amount:</span>
                  <span className="font-serif text-xl text-[#1B382B] tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#1B382B] hover:bg-[#142d22] text-[#FDFBF7] font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>{submitting ? 'Confirming Order with Workshop...' : `Place Order · ₹${grandTotal.toLocaleString('en-IN')}`}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6B7280]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                <span>Direct Workshop Guarantee · 10-Yr Structural Frame Warranty</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* PAYMENT GATEWAY TEST MODE / SANDBOX MODAL */}
      {isGatewaySandboxOpen && pendingGatewayOrder && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#D5C9B3] p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#E8DFC9] pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#1B382B]" />
                <h3 className="font-serif text-base font-bold text-[#1B382B]">
                  Razorpay Payment Sandbox (Test Mode)
                </h3>
              </div>
              <span className="text-[10px] bg-[#FEF3C7] text-[#92400E] font-bold px-2 py-0.5 rounded">
                SIMULATION
              </span>
            </div>

            <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#E5DEC9] space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Order ID:</span>
                <span className="font-mono font-bold text-[#1B382B]">{pendingGatewayOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Payable Amount:</span>
                <span className="font-bold text-[#1B382B] text-sm tabular-nums">
                  ₹{pendingGatewayOrder.pricing.total.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Merchant:</span>
                <span className="font-semibold text-[#1B382B]">Shree Balaji Sofa &amp; Furniture</span>
              </div>
            </div>

            <div className="p-3 bg-[#EFF6FF] rounded-xl border border-[#BFDBFE] text-[11px] text-[#1E40AF] space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                <span>Test Environment Notice</span>
              </div>
              <p>
                This safe simulation verifies order fulfillment and payment callback handlers without charging real cards or bank accounts.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                disabled={gatewaySimulating}
                onClick={handleSimulateSuccessfulPayment}
                className="w-full py-3 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{gatewaySimulating ? 'Processing Test Verification...' : 'Simulate Successful Payment'}</span>
              </button>

              <button
                type="button"
                disabled={gatewaySimulating}
                onClick={handleCancelGatewayPayment}
                className="w-full py-2.5 bg-white hover:bg-[#F3EFE6] text-[#DC2626] border border-[#FECACA] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>Simulate Payment Failure / Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
