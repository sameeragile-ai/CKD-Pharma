import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../../lib/seo';
import { Order } from '../../types';
import { Search, Truck, CheckCircle2, Clock, MapPin, Package, ShieldCheck, AlertCircle } from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [orderId, setOrderId] = useState(initialId);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Default demo lookup if query param is set
  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  const handleSearch = (lookupId = orderId) => {
    setHasSearched(true);
    setErrorMsg('');

    const cleanId = lookupId.trim().toUpperCase();
    if (!cleanId) {
      setErrorMsg('Please enter an Order ID (e.g. CKD-78214)');
      setSearchedOrder(null);
      return;
    }

    const stored = JSON.parse(localStorage.getItem('ckd_orders') || '[]');
    const found = stored.find((o: Order) => o.id.toUpperCase() === cleanId);

    if (found) {
      setSearchedOrder(found);
    } else {
      // Demo simulated order for any sample ID requested by user
      setSearchedOrder({
        id: cleanId,
        createdAt: '2026-10-09T14:30:00.000Z',
        customer: {
          fullName: 'Muhammad Usman',
          email: 'usman.pk@example.com',
          phone: phoneNumber || '0301-8492011',
          city: 'Lahore',
          province: 'Punjab',
          addressLine1: 'House 42, Block C, Model Town, Lahore'
        },
        items: [],
        subtotal: 1850,
        deliveryFee: 0,
        discount: 0,
        total: 1850,
        paymentMethod: 'cod',
        paymentStatus: 'Cash on Delivery',
        orderStatus: 'Shipped',
        trackingNumber: `EXP-PK-${cleanId}`,
        estimatedDelivery: 'Tomorrow by 05:00 PM PKT',
        trackingUpdates: [
          {
            title: 'Order Received & Registered',
            description: 'Online OTC prescription logged at Kot Lakhpat central dispatch center.',
            timestamp: 'Yesterday 02:30 PM',
            completed: true
          },
          {
            title: 'Pharmacist Quality Assurance Inspection',
            description: 'Batch certificate verified; sealed in temperature-shielded outer container.',
            timestamp: 'Yesterday 05:15 PM',
            completed: true
          },
          {
            title: 'In Transit via Cold-Chain Fleet',
            description: 'Dispatched from central distribution hub towards Lahore regional transit hub.',
            timestamp: 'Today 08:45 AM',
            completed: true
          },
          {
            title: 'Out for Doorstep Delivery',
            description: 'Courier rider assigned for doorstep delivery and COD collection.',
            timestamp: 'Today 11:30 AM',
            completed: false
          }
        ]
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title="Track Nationwide Order | CKD Pharma Pakistan"
        description="Track your CKD Pharma medicine shipment across Pakistan using your Order ID and phone number. Real-time temperature-controlled courier tracking."
        canonicalPath="/track-order"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Track Order', url: '/track-order' }
        ]}
      />

      <section className="pt-8 pb-12 gradient-calm border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
              REAL-TIME LOGISTICS TELEMETRY
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl font-normal text-[#0E2A2B]">
              Track Your Healthcare Order
            </h1>
            <p className="text-sm text-[#5B6B6C]">
              Enter your CKD Order Reference (e.g. CKD-78214) or contact number to view shipment status and expected doorstep arrival.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Lookup Input Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#0E2A2B]/10 shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                  Order ID *
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. CKD-89412"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] font-mono outline-none focus:border-[#0F5E5A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                  Recipient Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="text-xs text-red-600 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              onClick={() => handleSearch()}
              className="w-full py-3 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0A4542] transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" strokeWidth={1.5} />
              <span>Track Shipment Status</span>
            </button>
          </div>

          {/* Results Display */}
          {hasSearched && searchedOrder && (
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#0E2A2B]/10 shadow-xs space-y-8 animate-in fade-in duration-300">
              {/* Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#0E2A2B]/8">
                <div>
                  <span className="text-xs text-[#5B6B6C] block">Shipment Status</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xl font-bold font-serif-editorial text-[#0E2A2B]">
                      {searchedOrder.orderStatus}
                    </span>
                    <span className="text-[10px] font-semibold bg-[#0F5E5A]/10 text-[#0F5E5A] px-2 py-0.5 rounded">
                      Cold Chain Active
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs">
                  <span className="text-[#5B6B6C] block">Expected Arrival:</span>
                  <strong className="text-[#0E2A2B] font-bold text-sm">{searchedOrder.estimatedDelivery}</strong>
                </div>
              </div>

              {/* Order Meta Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#FAF8F4] border border-[#0E2A2B]/8 text-xs">
                <div>
                  <span className="text-[10px] text-[#5B6B6C] block">Tracking Code</span>
                  <strong className="font-mono text-[#0E2A2B]">{searchedOrder.trackingNumber}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#5B6B6C] block">Recipient</span>
                  <strong className="text-[#0E2A2B]">{searchedOrder.customer.fullName}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#5B6B6C] block">Destination</span>
                  <strong className="text-[#0E2A2B]">{searchedOrder.customer.city}, {searchedOrder.customer.province}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#5B6B6C] block">Payment Due</span>
                  <strong className="text-[#0E2A2B] tabular-nums font-bold">
                    {searchedOrder.paymentMethod === 'cod' ? `Rs. ${searchedOrder.total} (COD)` : 'Paid Online'}
                  </strong>
                </div>
              </div>

              {/* Tracking Milestones Timeline */}
              <div className="space-y-6">
                <h3 className="font-serif-editorial text-xl font-bold text-[#0E2A2B]">
                  Chain-of-Custody Progress
                </h3>

                <div className="relative pl-6 sm:pl-8 border-l-2 border-[#0F5E5A]/30 space-y-8">
                  {searchedOrder.trackingUpdates.map((step, idx) => (
                    <div key={idx} className="relative group">
                      <div className={`absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full flex items-center justify-center ${
                        step.completed
                          ? 'bg-[#0F5E5A] text-white ring-4 ring-[#E6F3F2]'
                          : 'bg-white border-2 border-[#0E2A2B]/20 text-transparent'
                      }`}>
                        {step.completed && <CheckCircle2 className="w-3 h-3" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-baseline justify-between">
                          <h4 className={`text-xs font-bold ${step.completed ? 'text-[#0E2A2B]' : 'text-[#5B6B6C]'}`}>
                            {step.title}
                          </h4>
                          <span className="text-[11px] font-mono text-[#5B6B6C]">{step.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#5B6B6C] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Courier Support Help */}
              <div className="pt-4 border-t border-[#0E2A2B]/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5B6B6C]">
                <span>Dispatched from CKD Kot Lakhpat Central Plant</span>
                <a href="tel:08002532273" className="text-[#0F5E5A] font-semibold hover:underline">
                  Inquire with Logistics Dispatch: 0800-CKD-CARE
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
