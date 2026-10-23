import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw, FileText, Lock } from 'lucide-react';

interface PolicyModalProps {
  policyType: 'terms' | 'privacy' | 'delivery' | 'refund' | 'warranty' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyType, onClose }) => {
  if (!policyType) return null;

  const contentMap = {
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      body: `
### 1. Business Identity
Shree Balaji Sofa & Furniture operates as a residential furniture workshop and customized furniture store situated at Shop 33, Pavilion Plaza, Near Mark Point, Dindoli, Surat, Gujarat — PIN 394210. Phone: +91 77538 57076.

### 2. Custom Manufacturing Contract
Every bespoke sofa and customized furniture item is made-to-order following approved specifications regarding length, depth, upholstery fabric type, and foam density. Customers are encouraged to inspect the raw wood frame and foam cushioning at our Dindoli workshop prior to final fabric tailoring.

### 3. Pricing & Taxes
All listed rates are in Indian Rupees (INR). Fixed catalog products reflect direct workshop pricing. Custom sizes and special imported fabric swatches are priced based on actual meters required.
      `
    },
    privacy: {
      title: 'Customer Privacy Policy',
      icon: Lock,
      body: `
### 1. Data Collection & Purpose
We collect your name, phone number, delivery address, and order specifications solely to manufacture, deliver, and service your furniture.

### 2. Payment Security
We do not store payment card details, UPI PINs, or banking passwords. All online payments are handled directly by certified Indian payment gateways (such as Razorpay and UPI providers) using encrypted server-to-server verification.

### 3. Zero Third-Party Sharing
Your contact information is strictly confidential and will never be sold, rented, or traded to marketing agencies or third parties.
      `
    },
    delivery: {
      title: 'Shipping & Delivery Policy',
      icon: Truck,
      body: `
### 1. Delivery Coverage
• **Surat Municipal Area**: Doorstep delivery and complimentary white-glove floor assembly available across Dindoli, Althan, Vesu, Adajan, Pal, Varachha, Katargam, and all Surat PIN codes (394210, 395001–395010).
• **Free Delivery Threshold**: All sofa orders valued at ₹15,000 or higher qualify for 100% Free Doorstep Delivery in Surat.
• **South Gujarat Inter-City**: Deliveries to Navsari, Bardoli, Ankleshwar, Bharuch, and Vapi are serviced via dedicated furniture transport with nominal logistics charges.

### 2. Estimated Manufacturing & Delivery Time
• Ready-to-ship catalog models: 3–5 business days.
• Custom-made L-shaped sectionals & pull-out sofa beds: 7–10 business days.
• Sofa cushion re-foaming repair: 48–72 hours turnaround.
      `
    },
    refund: {
      title: 'Cancellation & Refund Policy',
      icon: RotateCcw,
      body: `
### 1. Order Modification & Cancellation
Because customized furniture is built to order, cancellations or design modifications must be submitted within 24 hours of placing the order before hardwood cutting begins.

### 2. Quality Assurance & Transit Protection
Our delivery personnel unwrap and assemble the furniture inside your home. In the rare event of transit damage or manufacturing discrepancy against your approved dimensions, our craftsman will repair or replace the component free of charge on site.

### 3. Repair Satisfaction Guarantee
For sofa cushion re-foaming services, we provide a 100% comfort trial. If the cushion firmness does not match your requirement, we adjust the density at no additional labor cost.
      `
    },
    warranty: {
      title: '10-Year Wood Structural Warranty',
      icon: ShieldCheck,
      body: `
### 1. 10-Year Hardwood Frame Guarantee
All sofas manufactured by Shree Balaji Sofa & Furniture feature seasoned solid Sal and Teak hardwood skeletons, treated with anti-termite and anti-borer coatings. We provide a full 10-year structural warranty against frame cracking, bending, or joint failure.

### 2. 40D Sleepwell Foam Anti-Sag Warranty
Our premium 40D High Resilience Sleepwell foam cushions are warranted against premature sagging and sinkage for up to 10 years under standard residential usage.

### 3. Claiming Service
Call or WhatsApp us at +91 77538 57076 with your order number. Our service technician will inspect your sofa in Surat within 48 hours.
      `
    }
  };

  const selected = contentMap[policyType];
  const Icon = selected.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E8DFC9] overflow-hidden my-6">
        <div className="p-5 bg-[#FAF6EE] border-b border-[#E8DFC9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-[#1B382B]" />
            <h2 className="font-serif text-lg font-bold text-[#1B382B]">
              {selected.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B7280] hover:text-[#1B382B] rounded-lg hover:bg-[#EFE8D8] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto text-xs text-[#374151] space-y-4 leading-relaxed">
          {selected.body.split('### ').filter(Boolean).map((section, idx) => {
            const lines = section.split('\n');
            const title = lines[0];
            const text = lines.slice(1).join('\n');
            return (
              <div key={idx} className="space-y-1.5">
                <h3 className="font-bold text-sm text-[#1B382B]">{title}</h3>
                <div className="whitespace-pre-line text-[#4B5563]">{text.trim()}</div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-[#FAF6EE] border-t border-[#E8DFC9] text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1B382B] text-[#FDFBF7] text-xs font-semibold rounded-lg hover:bg-[#142d22] cursor-pointer"
          >
            Understood &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
