import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../../lib/seo';
import { Order } from '../../types';
import { CheckCircle2, Printer, Truck, ArrowRight, ShieldCheck, PhoneCall, Copy, Check } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('ckd_orders') || '[]');
    const found = stored.find((o: Order) => o.id === id);
    if (found) {
      setOrder(found);
    } else {
      // Mock fallback if navigated directly with ID
      setOrder({
        id: id || 'CKD-89412',
        createdAt: new Date().toISOString(),
        customer: {
          fullName: 'Valued Patient',
          email: 'patient@example.com',
          phone: '0300-1234567',
          city: 'Lahore',
          province: 'Punjab',
          addressLine1: 'Residential Address, Lahore'
        },
        items: [],
        subtotal: 1700,
        deliveryFee: 0,
        discount: 0,
        total: 1700,
        paymentMethod: 'cod',
        paymentStatus: 'Cash on Delivery',
        orderStatus: 'Confirmed',
        trackingNumber: `EXP-PK-${id || 'CKD-89412'}`,
        estimatedDelivery: '2 to 3 Business Days',
        trackingUpdates: []
      });
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyId = () => {
    if (order && navigator.clipboard) {
      navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!order) return null;

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title={`Order Confirmed ${order.id} | CKD Pharma Pakistan`}
        description="Your CKD Pharma over-the-counter medicine order is confirmed and scheduled for cold-chain pharmaceutical dispatch."
        canonicalPath={`/order-confirmation/${order.id}`}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Success Banner */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#0E2A2B]/10 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#E6F3F2] text-[#0F5E5A] flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9" strokeWidth={1.5} />
          </div>

          <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block">
            ORDER DISPATCH INITIATED
          </span>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
            Thank you for trusting CKD Pharma.
          </h1>

          <p className="text-xs sm:text-sm text-[#5B6B6C] max-w-md mx-auto leading-relaxed">
            Your healthcare shipment has been verified and registered with our Kot Lakhpat central dispatch center in Lahore.
          </p>

          {/* Order Reference Box */}
          <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#0E2A2B]/8 max-w-sm mx-auto flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] text-[#5B6B6C] uppercase tracking-wider block">
                Order Tracking ID
              </span>
              <strong className="text-base font-mono font-bold text-[#0E2A2B]">
                {order.id}
              </strong>
            </div>

            <button
              onClick={handleCopyId}
              className="px-3 py-1.5 rounded-lg border border-[#0E2A2B]/15 text-xs font-semibold hover:bg-white text-[#0E2A2B] flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#0F5E5A]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Quick Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#0E2A2B]/8 text-left text-xs">
            <div>
              <span className="text-[10px] text-[#5B6B6C] block">Payment Method</span>
              <strong className="text-[#0E2A2B] font-semibold uppercase">{order.paymentMethod}</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#5B6B6C] block">Payment Status</span>
              <strong className="text-[#0F5E5A] font-semibold">{order.paymentStatus}</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#5B6B6C] block">Estimated Delivery</span>
              <strong className="text-[#0E2A2B] font-semibold">{order.estimatedDelivery}</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#5B6B6C] block">Total Amount</span>
              <strong className="text-[#0E2A2B] font-bold tabular-nums">Rs. {order.total.toLocaleString()}</strong>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={`/track-order?id=${order.id}`}
              className="px-6 py-2.5 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0A4542] flex items-center gap-2"
            >
              <Truck className="w-4 h-4" strokeWidth={1.5} />
              <span>Track Order Live</span>
            </Link>

            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-lg border border-[#0E2A2B]/20 text-[#0E2A2B] text-xs font-semibold hover:bg-[#FAF8F4] flex items-center gap-2"
            >
              <Printer className="w-4 h-4" strokeWidth={1.5} />
              <span>Print Tax Invoice</span>
            </button>

            <Link
              to="/shop"
              className="px-5 py-2.5 rounded-lg text-[#5B6B6C] hover:text-[#0E2A2B] text-xs font-semibold"
            >
              Continue to Store
            </Link>
          </div>
        </div>

        {/* Courier & Delivery Notice */}
        <div className="mt-8 p-6 rounded-2xl bg-white border border-[#0E2A2B]/8 text-xs text-[#5B6B6C] space-y-2">
          <div className="font-bold text-[#0E2A2B] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0F5E5A]" />
            <span>Important Delivery Instructions for Courier Receipt</span>
          </div>
          <p className="leading-relaxed">
            A confirmation SMS with your real-time tracking link has been dispatched to <strong>{order.customer.phone}</strong>. For Cash on Delivery orders, please ensure exact currency notes are prepared at the delivery address upon courier arrival.
          </p>
          <div className="pt-2 text-[11px] text-[#0F5E5A] flex items-center gap-1 font-semibold">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Need assistance? Contact our Customer Helpdesk at 0800-253-2273 (Toll Free).</span>
          </div>
        </div>
      </div>
    </div>
  );
};
