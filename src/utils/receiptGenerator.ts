import { Order, StoreSettings } from '../types';

export function generateReceiptHtml(order: Order, settings: StoreSettings): string {
  const dateFormatted = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const itemsRows = order.items.map((it, idx) => `
    <tr style="border-bottom: 1px solid #E5DEC9;">
      <td style="padding: 10px 8px; vertical-align: top; font-size: 13px; color: #1B382B; font-weight: 600;">${idx + 1}</td>
      <td style="padding: 10px 8px; vertical-align: top;">
        <div style="font-weight: 700; font-size: 14px; color: #1B382B;">${escapeHtml(it.name)}</div>
        <div style="font-size: 11px; color: #6B7280; margin-top: 2px;">
          SKU: ${escapeHtml(it.sku || 'SBSF-ORD')}
          ${it.selectedFabric ? ` · Fabric: <strong>${escapeHtml(it.selectedFabric)}</strong>` : ''}
          ${it.selectedColor ? ` · Shade: <strong>${escapeHtml(it.selectedColor)}</strong>` : ''}
          ${it.orientation ? ` · Orientation: <strong>${escapeHtml(it.orientation)}</strong>` : ''}
        </div>
      </td>
      <td style="padding: 10px 8px; text-align: center; vertical-align: top; font-size: 13px; color: #374151;">${it.quantity}</td>
      <td style="padding: 10px 8px; text-align: right; vertical-align: top; font-size: 13px; color: #374151;">₹${it.price.toLocaleString('en-IN')}</td>
      <td style="padding: 10px 8px; text-align: right; vertical-align: top; font-size: 13px; font-weight: 700; color: #1B382B;">₹${(it.price * it.quantity).toLocaleString('en-IN')}</td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Invoice #${order.id} - Shree Balaji Sofa & Furniture</title>
  <style>
    @page {
      size: A4;
      margin: 15mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1F2937;
      background: #FFFFFF;
      margin: 0;
      padding: 24px;
      line-height: 1.4;
    }
    .receipt-card {
      max-width: 800px;
      margin: 0 auto;
      border: 1px solid #D5C9B3;
      border-radius: 12px;
      padding: 32px;
      background: #FFFFFF;
    }
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #1B382B;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 800;
      color: #1B382B;
      letter-spacing: -0.5px;
      margin: 0 0 4px 0;
    }
    .brand-sub {
      font-size: 12px;
      color: #8A7B69;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .invoice-tag {
      text-align: right;
    }
    .invoice-title {
      font-size: 18px;
      font-weight: 800;
      color: #1B382B;
      text-transform: uppercase;
      margin: 0;
    }
    .invoice-num {
      font-family: monospace;
      font-size: 15px;
      font-weight: 700;
      color: #B45309;
      margin-top: 2px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px;
      font-size: 12px;
    }
    .meta-box {
      background: #FAF7F0;
      border: 1px solid #EAE3D2;
      border-radius: 8px;
      padding: 14px;
    }
    .meta-box-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: #1B382B;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
      border-bottom: 1px solid #E5DEC9;
      padding-bottom: 4px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    th {
      background: #1B382B;
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 10px 8px;
      text-align: left;
    }
    th:first-child { border-radius: 6px 0 0 6px; }
    th:last-child { border-radius: 0 6px 6px 0; }
    .summary-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 16px;
      gap: 24px;
    }
    .terms-box {
      flex: 1;
      font-size: 11px;
      color: #6B7280;
      border-left: 3px solid #D4AF37;
      padding-left: 12px;
    }
    .total-table {
      width: 280px;
      border-collapse: collapse;
      font-size: 13px;
    }
    .total-table td {
      padding: 6px 0;
    }
    .total-row {
      border-top: 2px solid #1B382B;
      font-size: 16px;
      font-weight: 800;
      color: #1B382B;
    }
    .status-badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      background: #ECFDF5;
      color: #065F46;
      border: 1px solid #A7F3D0;
    }
    .status-pending {
      background: #FEF3C7;
      color: #92400E;
      border-color: #FDE68A;
    }
    .footer-note {
      margin-top: 32px;
      padding-top: 16px;
      border-top: 1px dashed #D5C9B3;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #8A7B69;
    }
    @media print {
      body {
        padding: 0;
        background: transparent;
      }
      .receipt-card {
        border: none;
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="receipt-card">
    <div class="header-bar">
      <div>
        <h1 class="brand-title">${escapeHtml(settings.businessName)}</h1>
        <div class="brand-sub">Direct Workshop Manufacturer &amp; Custom Furniture</div>
        <div style="font-size: 12px; color: #4B5563; margin-top: 6px;">
          ${escapeHtml(settings.address)}<br/>
          Phone: <strong>${escapeHtml(settings.phone)}</strong> · Hours: ${escapeHtml(settings.hours)}
        </div>
      </div>
      <div class="invoice-tag">
        <h2 class="invoice-title">Tax Invoice / Work Order</h2>
        <div class="invoice-num">#${order.id}</div>
        <div style="font-size: 11px; color: #6B7280; margin-top: 4px;">Date: ${dateFormatted}</div>
      </div>
    </div>

    <div class="meta-grid">
      <div class="meta-box">
        <div class="meta-box-title">Customer &amp; Delivery Details</div>
        <div style="font-size: 13px; font-weight: 700; color: #1B382B;">${escapeHtml(order.customer.name)}</div>
        <div style="color: #4B5563; margin-top: 2px;">Phone: <strong>${escapeHtml(order.customer.phone)}</strong></div>
        ${order.customer.email ? `<div style="color: #6B7280;">Email: ${escapeHtml(order.customer.email)}</div>` : ''}
        <div style="color: #374151; margin-top: 4px; line-height: 1.4;">
          ${escapeHtml(order.customer.address)}, ${escapeHtml(order.customer.city)}, ${escapeHtml(order.customer.state)} — PIN ${escapeHtml(order.customer.pincode)}
        </div>
        ${order.customer.landmark ? `<div style="color: #8A7B69; font-size: 11px;">Landmark: ${escapeHtml(order.customer.landmark)}</div>` : ''}
      </div>

      <div class="meta-box">
        <div class="meta-box-title">Order &amp; Payment Status</div>
        <div style="margin-bottom: 6px;">
          <span style="color: #6B7280;">Order Status:</span>
          <span class="status-badge">${order.status}</span>
        </div>
        <div style="margin-bottom: 6px;">
          <span style="color: #6B7280;">Payment Method:</span>
          <strong>${order.payment.method}</strong>
        </div>
        <div style="margin-bottom: 6px;">
          <span style="color: #6B7280;">Payment Status:</span>
          <span class="status-badge ${order.payment.status === 'VERIFIED' ? '' : 'status-pending'}">
            ${order.payment.status}
          </span>
        </div>
        ${order.payment.transactionRef ? `<div style="font-size: 11px; color: #8A7B69;">Ref / UTR: ${escapeHtml(order.payment.transactionRef)}</div>` : ''}
        ${order.customer.notes ? `<div style="margin-top: 4px; font-size: 11px; color: #B45309; font-style: italic;">Notes: ${escapeHtml(order.customer.notes)}</div>` : ''}
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 30px;">#</th>
          <th>Item Description &amp; Customization</th>
          <th style="text-align: center; width: 60px;">Qty</th>
          <th style="text-align: right; width: 110px;">Rate</th>
          <th style="text-align: right; width: 120px;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>

    <div class="summary-section">
      <div class="terms-box">
        <div style="font-weight: 700; color: #1B382B; margin-bottom: 4px;">Terms of Craftsmanship &amp; Warranty:</div>
        <div>1. 10-Year structural frame guarantee on solid seasoned Sal/Teak wood.</div>
        <div>2. Sleepwell 40D Virgin High Resilience Foam replacement warranty.</div>
        <div>3. Doorstep inspection and white-glove assembly across Surat &amp; South Gujarat.</div>
        <div>4. For service assistance, contact workshop directly at ${escapeHtml(settings.phone)}.</div>
      </div>

      <table class="total-table">
        <tr>
          <td style="color: #6B7280;">Subtotal:</td>
          <td style="text-align: right; font-weight: 600;">₹${order.pricing.subtotal.toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td style="color: #6B7280;">Delivery &amp; Handling:</td>
          <td style="text-align: right; font-weight: 600; color: #059669;">
            ${order.pricing.deliveryFee === 0 ? 'FREE' : `₹${order.pricing.deliveryFee.toLocaleString('en-IN')}`}
          </td>
        </tr>
        ${order.pricing.discount && order.pricing.discount > 0 ? `
        <tr>
          <td style="color: #6B7280;">Discount Applied:</td>
          <td style="text-align: right; font-weight: 600; color: #DC2626;">-₹${order.pricing.discount.toLocaleString('en-IN')}</td>
        </tr>` : ''}
        <tr class="total-row">
          <td style="padding-top: 10px;">Total Amount:</td>
          <td style="padding-top: 10px; text-align: right; color: #1B382B;">₹${order.pricing.total.toLocaleString('en-IN')}</td>
        </tr>
      </table>
    </div>

    <div class="footer-note">
      <div>Thank you for choosing local Surat craftsmanship!</div>
      <div style="text-align: right;">
        <div style="font-weight: 700; color: #1B382B;">For Shree Balaji Sofa &amp; Furniture</div>
        <div style="font-size: 10px; margin-top: 2px;">Authorized Signatory</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Universally downloads the receipt as a standalone .html file.
 * Guaranteed to work in every browser, mobile webview, and sandbox without popup blockers.
 */
export function downloadReceiptHtml(order: Order, settings: StoreSettings): void {
  const html = generateReceiptHtml(order, settings);
  try {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Shree_Balaji_Receipt_${order.id}.html`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) {
        document.body.removeChild(a);
      }
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    }, 1000);
  } catch (err) {
    // Data URI fallback
    const encoded = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
    const a = document.createElement('a');
    a.href = encoded;
    a.download = `Shree_Balaji_Receipt_${order.id}.html`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) {
        document.body.removeChild(a);
      }
    }, 1000);
  }
}

/**
 * Isolated print helper that renders inside a hidden iframe or new tab, avoiding iframe sandbox locks.
 */
export function printReceipt(order: Order, settings: StoreSettings): void {
  const html = generateReceiptHtml(order, settings);
  
  try {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch {
          // Fallback to window print or download
          downloadReceiptHtml(order, settings);
        } finally {
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 3000);
        }
      }, 500);
      return;
    }
  } catch (err) {
    console.warn("Iframe print blocked, falling back to download:", err);
  }

  // Fallback
  downloadReceiptHtml(order, settings);
}

/**
 * Returns pre-formatted WhatsApp receipt text with full item breakdown.
 */
export function getReceiptWhatsAppText(order: Order, settings: StoreSettings): string {
  const itemsText = order.items.map(it => `• ${it.quantity}x ${it.name} (${it.selectedFabric || 'Standard'}${it.selectedColor ? `, ${it.selectedColor}` : ''}) - ₹${(it.price * it.quantity).toLocaleString('en-IN')}`).join('\n');
  return `*SHREE BALAJI SOFA & FURNITURE*\n` +
    `*Order Receipt #${order.id}*\n` +
    `--------------------------------\n` +
    `*Customer:* ${order.customer.name} (${order.customer.phone})\n` +
    `*Address:* ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}\n` +
    `*Payment:* ${order.payment.method} (${order.payment.status})\n` +
    `--------------------------------\n` +
    `*Items:*\n${itemsText}\n` +
    `--------------------------------\n` +
    `*Total:* ₹${order.pricing.total.toLocaleString('en-IN')}\n\n` +
    `Track status with our workshop: https://wa.me/${settings.whatsapp}?text=Order_${order.id}`;
}
