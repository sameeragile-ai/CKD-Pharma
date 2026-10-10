import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SEO } from '../../lib/seo';
import { useCartStore } from '../../lib/cart-store';
import { paymentAdapters } from '../../lib/payments';
import { PaymentMethodId, Order, CustomerInfo } from '../../types';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  AlertCircle,
  Building 
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, getDeliveryFee, getDiscount, getTotal, clearCart } = useCartStore();

  const subtotal = getSubtotal();
  const baseDeliveryFee = getDeliveryFee();
  const discount = getDiscount();

  // Multi-step indicator
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [province, setProvince] = useState('Punjab');
  const [city, setCity] = useState('Lahore');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [notes, setNotes] = useState('');

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('cod');

  // Gateway payload mock
  const [jazzCashNumber, setJazzCashNumber] = useState('');
  const [easyPaisaNumber, setEasyPaisaNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Pakistani Provinces and Major Cities
  const provinces = [
    'Punjab',
    'Sindh',
    'Khyber Pakhtunkhwa',
    'Balochistan',
    'Islamabad Capital Territory',
    'Azad Jammu & Kashmir',
    'Gilgit-Baltistan'
  ];

  const cityOptions: Record<string, string[]> = {
    'Punjab': ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Sialkot', 'Bahawalpur', 'Sargodha', 'Sheikhupura', 'Jhelum', 'Kasur'],
    'Sindh': ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah', 'Mirpur Khas'],
    'Khyber Pakhtunkhwa': ['Peshawar', 'Mardan', 'Abbottabad', 'Swat', 'Nowshera', 'Dera Ismail Khan'],
    'Balochistan': ['Quetta', 'Gwadar', 'Turbat', 'Khuzdar', 'Hub'],
    'Islamabad Capital Territory': ['Islamabad'],
    'Azad Jammu & Kashmir': ['Muzaffarabad', 'Mirpur', 'Rawalakot', 'Kotli'],
    'Gilgit-Baltistan': ['Gilgit', 'Skardu', 'Hunza']
  };

  // Pakistani phone validation (03XX-XXXXXXX or 03XXXXXXXXX)
  const validatePakistaniPhone = (value: string) => {
    const clean = value.replace(/[-\s]/g, '');
    const regex = /^03[0-9]{9}$/;
    if (!regex.test(clean)) {
      setPhoneError('Please enter a valid Pakistani mobile number starting with 03 (e.g. 0300-1234567)');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const deliveryCost = deliveryMethod === 'express' ? baseDeliveryFee + 150 : baseDeliveryFee;
  const finalTotal = Math.max(0, subtotal + deliveryCost - discount);

  // Step 1 to Step 2
  const handleProceedToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Please complete all contact fields.');
      return;
    }
    if (!validatePakistaniPhone(phone)) return;
    setErrorMsg('');
    setCurrentStep(2);
  };

  // Step 2 to Step 3
  const handleProceedToDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressLine1.trim() || !city.trim() || !province.trim()) {
      setErrorMsg('Please complete your full street delivery address.');
      return;
    }
    setErrorMsg('');
    setCurrentStep(3);
  };

  // Step 3 to Step 4
  const handleProceedToPayment = () => {
    setErrorMsg('');
    setCurrentStep(4);
  };

  // Complete Order
  const handleFinalOrder = async () => {
    setIsProcessing(true);
    setErrorMsg('');

    try {
      const orderId = `CKD-${Math.floor(10000 + Math.random() * 90000)}`;
      const customer: CustomerInfo = {
        fullName,
        email,
        phone,
        province,
        city,
        addressLine1,
        addressLine2,
        notes
      };

      const newOrder: Order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        customer,
        items,
        subtotal,
        deliveryFee: deliveryCost,
        discount,
        total: finalTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid',
        orderStatus: 'Confirmed',
        trackingNumber: `EXP-PK-${orderId}`,
        estimatedDelivery: deliveryMethod === 'express' ? 'Tomorrow, Next Business Day' : '2 to 3 Business Days',
        trackingUpdates: [
          {
            title: 'Order Confirmed & Placed',
            description: 'Your order was registered and forwarded to Kot Lakhpat central dispensary.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            completed: true
          },
          {
            title: 'Pharmacist Quality Assurance Inspection',
            description: 'Verifying batch expiration integrity and packaging seals.',
            timestamp: 'Pending',
            completed: false
          },
          {
            title: 'Dispatched via Temperature-Controlled Logistics',
            description: 'En route with cold-chain courier partner.',
            timestamp: 'Scheduled',
            completed: false
          },
          {
            title: 'Out for Doorstep Delivery',
            description: 'Rider reaching your address.',
            timestamp: 'Scheduled',
            completed: false
          }
        ]
      };

      // Call payment gateway adapter
      const adapter = paymentAdapters[paymentMethod];
      const payload: Record<string, unknown> = {
        jazzCashMobileNumber: jazzCashNumber,
        easyPaisaMobileNumber: easyPaisaNumber,
        cardNumber
      };

      const result = await adapter.processPayment(newOrder, payload);

      if (result.success) {
        // Store recent order in localStorage for confirmation & tracking lookup
        const storedOrders = JSON.parse(localStorage.getItem('ckd_orders') || '[]');
        storedOrders.unshift(newOrder);
        localStorage.setItem('ckd_orders', JSON.stringify(storedOrders));

        clearCart();
        navigate(`/order-confirmation/${orderId}`);
      } else {
        setErrorMsg(result.gatewayMessage || 'Payment authorization failed.');
      }
    } catch (err: any) {
      setErrorMsg('An error occurred during order dispatch. Please check details.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] pt-40 pb-20 text-center px-4">
        <h1 className="text-2xl font-bold font-serif-editorial text-[#0E2A2B]">No items in checkout</h1>
        <p className="text-xs text-[#5B6B6C] mt-2">Please add over-the-counter products from our store first.</p>
        <Link to="/shop/catalog" className="mt-4 inline-block px-5 py-2.5 rounded-lg bg-[#0F5E5A] text-white text-xs font-semibold">
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title="Secure Checkout | CKD Pharma Pakistan"
        description="Complete your order for DRAP-certified over-the-counter essentials. Cash on Delivery, JazzCash, Easypaisa, and Card payments across Pakistan."
        canonicalPath="/checkout"
      />

      <section className="pt-6 pb-10 gradient-calm border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
                ENCRYPTED PATIENT CHECKOUT
              </span>
              <h1 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
                Complete Your Healthcare Order
              </h1>
            </div>

            {/* Stepper indicator */}
            <div className="flex items-center gap-2 text-xs">
              <span className={`px-2.5 py-1 rounded font-semibold ${currentStep === 1 ? 'bg-[#0E2A2B] text-white' : 'bg-white text-[#5B6B6C]'}`}>
                1. Contact
              </span>
              <span className="text-[#0E2A2B]/30">→</span>
              <span className={`px-2.5 py-1 rounded font-semibold ${currentStep === 2 ? 'bg-[#0E2A2B] text-white' : 'bg-white text-[#5B6B6C]'}`}>
                2. Address
              </span>
              <span className="text-[#0E2A2B]/30">→</span>
              <span className={`px-2.5 py-1 rounded font-semibold ${currentStep === 3 ? 'bg-[#0E2A2B] text-white' : 'bg-white text-[#5B6B6C]'}`}>
                3. Delivery
              </span>
              <span className="text-[#0E2A2B]/30">→</span>
              <span className={`px-2.5 py-1 rounded font-semibold ${currentStep === 4 ? 'bg-[#0F5E5A] text-white' : 'bg-white text-[#5B6B6C]'}`}>
                4. Payment
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-[#0E2A2B]/10 shadow-xs space-y-6">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* STEP 1: Contact Information */}
              {currentStep === 1 && (
                <form onSubmit={handleProceedToShipping} className="space-y-4">
                  <div>
                    <h2 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                      Step 1: Patient & Contact Details
                    </h2>
                    <p className="text-xs text-[#5B6B6C] mt-1">
                      We require this to confirm order dispatch via SMS and deliver courier tracking links.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Asad Siddiqui"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                        Email Address (for Digital Tax Invoice) *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="asad@example.com"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                        Pakistani Mobile Number (for Courier SMS Verification) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (phoneError) validatePakistaniPhone(e.target.value);
                        }}
                        onBlur={() => validatePakistaniPhone(phone)}
                        placeholder="0300-1234567"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                      />
                      {phoneError ? (
                        <p className="text-[11px] text-red-600 mt-1">{phoneError}</p>
                      ) : (
                        <p className="text-[10px] text-[#5B6B6C] mt-1">Format: 03XX-XXXXXXX (Jazz, Telenor, Zong, Ufone)</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0A4542] transition-colors flex items-center gap-2"
                    >
                      <span>Continue to Delivery Address</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Pakistani Shipping Address */}
              {currentStep === 2 && (
                <form onSubmit={handleProceedToDelivery} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                        Step 2: Pakistani Delivery Address
                      </h2>
                      <p className="text-xs text-[#5B6B6C] mt-1">
                        Doorstep shipment via temperature-monitored pharmaceutical logistics.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-[#5B6B6C] hover:text-[#0E2A2B] flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                          Province / Territory *
                        </label>
                        <select
                          value={province}
                          onChange={(e) => {
                            const newProv = e.target.value;
                            setProvince(newProv);
                            setCity(cityOptions[newProv]?.[0] || 'Other');
                          }}
                          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] outline-none"
                        >
                          {provinces.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                          City / District *
                        </label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] outline-none"
                        >
                          {(cityOptions[province] || []).map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                        Street Address & House / Apartment Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        placeholder="House #, Street #, Sector / Block, Colony"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                        Nearest Landmark / Area (Optional)
                      </label>
                      <input
                        type="text"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        placeholder="Near Jamia Mosque / Commercial Market"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                        Courier Delivery Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Ring bell or hand to reception"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-[#FAF8F4] text-[#0E2A2B] outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-medium text-[#5B6B6C] hover:text-[#0E2A2B]"
                    >
                      ← Back to Contact
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0A4542] transition-colors flex items-center gap-2"
                    >
                      <span>Continue to Delivery Method</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Delivery Method */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                        Step 3: Select Delivery Speed
                      </h2>
                      <p className="text-xs text-[#5B6B6C] mt-1">
                        All shipments are packed in insulated, tamper-evident security foil.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs text-[#5B6B6C] hover:text-[#0E2A2B] flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    {/* Standard */}
                    <label
                      onClick={() => setDeliveryMethod('standard')}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        deliveryMethod === 'standard'
                          ? 'border-[#0F5E5A] bg-[#E6F3F2]/50 ring-1 ring-[#0F5E5A]'
                          : 'border-[#0E2A2B]/10 hover:border-[#0E2A2B]/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          checked={deliveryMethod === 'standard'}
                          onChange={() => setDeliveryMethod('standard')}
                          className="text-[#0F5E5A] focus:ring-[#0F5E5A]"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#0E2A2B]">
                            Standard Nationwide Logistics (2–3 Business Days)
                          </div>
                          <div className="text-[11px] text-[#5B6B6C]">
                            Temperature-controlled road courier across all Pakistani cities.
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-[#0E2A2B]">
                        {baseDeliveryFee === 0 ? <span className="text-[#0F5E5A]">FREE</span> : `Rs. ${baseDeliveryFee}`}
                      </div>
                    </label>

                    {/* Express */}
                    <label
                      onClick={() => setDeliveryMethod('express')}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        deliveryMethod === 'express'
                          ? 'border-[#0F5E5A] bg-[#E6F3F2]/50 ring-1 ring-[#0F5E5A]'
                          : 'border-[#0E2A2B]/10 hover:border-[#0E2A2B]/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          checked={deliveryMethod === 'express'}
                          onChange={() => setDeliveryMethod('express')}
                          className="text-[#0F5E5A] focus:ring-[#0F5E5A]"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#0E2A2B]">
                            Priority Express Dispatch (Next Business Day)
                          </div>
                          <div className="text-[11px] text-[#5B6B6C]">
                            Guaranteed next-day delivery in Lahore, Karachi & Islamabad.
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-[#0E2A2B]">
                        Rs. {(baseDeliveryFee + 150).toLocaleString()}
                      </div>
                    </label>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs font-medium text-[#5B6B6C] hover:text-[#0E2A2B]"
                    >
                      ← Back to Address
                    </button>
                    <button
                      type="button"
                      onClick={handleProceedToPayment}
                      className="px-6 py-3 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0A4542] transition-colors flex items-center gap-2"
                    >
                      <span>Continue to Payment Method</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Payment Methods UI with Adapters */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                        Step 4: Select Payment Method
                      </h2>
                      <p className="text-xs text-[#5B6B6C] mt-1">
                        Cash on Delivery available nationwide; digital payment processed securely.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-xs text-[#5B6B6C] hover:text-[#0E2A2B] flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    {/* COD (Default) */}
                    <label
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#0F5E5A] bg-[#E6F3F2]/50 ring-1 ring-[#0F5E5A]'
                          : 'border-[#0E2A2B]/10 hover:border-[#0E2A2B]/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="text-[#0F5E5A]"
                        />
                        <Banknote className="w-5 h-5 text-[#0F5E5A]" strokeWidth={1.5} />
                        <div>
                          <div className="text-xs font-bold text-[#0E2A2B] flex items-center gap-2">
                            <span>Cash on Delivery (COD)</span>
                            <span className="text-[10px] bg-[#0F5E5A] text-white px-2 py-0.2 rounded font-semibold">
                              Most Popular
                            </span>
                          </div>
                          <div className="text-[11px] text-[#5B6B6C]">
                            Inspect parcel upon arrival and pay exact cash to rider.
                          </div>
                        </div>
                      </div>
                    </label>

                    {/* JazzCash */}
                    <div
                      className={`p-4 rounded-xl border transition-all ${
                        paymentMethod === 'jazzcash'
                          ? 'border-[#0F5E5A] bg-[#E6F3F2]/50 ring-1 ring-[#0F5E5A]'
                          : 'border-[#0E2A2B]/10 hover:border-[#0E2A2B]/20'
                      }`}
                    >
                      <label
                        onClick={() => setPaymentMethod('jazzcash')}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === 'jazzcash'}
                            onChange={() => setPaymentMethod('jazzcash')}
                            className="text-[#0F5E5A]"
                          />
                          <Smartphone className="w-5 h-5 text-[#0F5E5A]" strokeWidth={1.5} />
                          <div>
                            <div className="text-xs font-bold text-[#0E2A2B]">
                              JazzCash Mobile Account
                            </div>
                            <div className="text-[11px] text-[#5B6B6C]">
                              Instant debited wallet payment via MPIN prompt.
                            </div>
                          </div>
                        </div>
                      </label>
                      {paymentMethod === 'jazzcash' && (
                        <div className="mt-3 pt-3 border-t border-[#0F5E5A]/20">
                          <label className="block text-[11px] font-semibold text-[#0E2A2B] mb-1">
                            JazzCash Mobile Number
                          </label>
                          <input
                            type="tel"
                            value={jazzCashNumber || phone}
                            onChange={(e) => setJazzCashNumber(e.target.value)}
                            placeholder="0300-1234567"
                            className="w-full text-xs px-3 py-2 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B]"
                          />
                          <p className="text-[10px] text-[#5B6B6C] mt-1">
                            You will receive an authorization popup on your mobile phone.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Easypaisa */}
                    <div
                      className={`p-4 rounded-xl border transition-all ${
                        paymentMethod === 'easypaisa'
                          ? 'border-[#0F5E5A] bg-[#E6F3F2]/50 ring-1 ring-[#0F5E5A]'
                          : 'border-[#0E2A2B]/10 hover:border-[#0E2A2B]/20'
                      }`}
                    >
                      <label
                        onClick={() => setPaymentMethod('easypaisa')}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === 'easypaisa'}
                            onChange={() => setPaymentMethod('easypaisa')}
                            className="text-[#0F5E5A]"
                          />
                          <Smartphone className="w-5 h-5 text-[#0F5E5A]" strokeWidth={1.5} />
                          <div>
                            <div className="text-xs font-bold text-[#0E2A2B]">
                              Easypaisa Mobile Wallet
                            </div>
                            <div className="text-[11px] text-[#5B6B6C]">
                              Pay via Telenor Easypaisa app or USSD prompt.
                            </div>
                          </div>
                        </div>
                      </label>
                      {paymentMethod === 'easypaisa' && (
                        <div className="mt-3 pt-3 border-t border-[#0F5E5A]/20">
                          <label className="block text-[11px] font-semibold text-[#0E2A2B] mb-1">
                            Easypaisa Mobile Number
                          </label>
                          <input
                            type="tel"
                            value={easyPaisaNumber || phone}
                            onChange={(e) => setEasyPaisaNumber(e.target.value)}
                            placeholder="0345-1234567"
                            className="w-full text-xs px-3 py-2 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B]"
                          />
                        </div>
                      )}
                    </div>

                    {/* Debit / Credit Card */}
                    <div
                      className={`p-4 rounded-xl border transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#0F5E5A] bg-[#E6F3F2]/50 ring-1 ring-[#0F5E5A]'
                          : 'border-[#0E2A2B]/10 hover:border-[#0E2A2B]/20'
                      }`}
                    >
                      <label
                        onClick={() => setPaymentMethod('card')}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="text-[#0F5E5A]"
                          />
                          <CreditCard className="w-5 h-5 text-[#0F5E5A]" strokeWidth={1.5} />
                          <div>
                            <div className="text-xs font-bold text-[#0E2A2B]">
                              Credit / Debit Card (Visa, Mastercard, PayPak)
                            </div>
                            <div className="text-[11px] text-[#5B6B6C]">
                              Encrypted 3D-Secure 2.0 Pakistani bank gateway.
                            </div>
                          </div>
                        </div>
                      </label>
                      {paymentMethod === 'card' && (
                        <div className="mt-3 pt-3 border-t border-[#0F5E5A]/20 space-y-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-[#0E2A2B] mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="4242 •••• •••• 4242"
                              className="w-full text-xs px-3 py-2 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B]"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-semibold text-[#0E2A2B] mb-1">
                                Expiry (MM/YY)
                              </label>
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="12/28"
                                className="w-full text-xs px-3 py-2 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B]"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-[#0E2A2B] mb-1">
                                CVV / CVC
                              </label>
                              <input
                                type="password"
                                maxLength={4}
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                placeholder="•••"
                                className="w-full text-xs px-3 py-2 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-xs font-medium text-[#5B6B6C] hover:text-[#0E2A2B]"
                    >
                      ← Back to Delivery
                    </button>
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleFinalOrder}
                      className="px-8 py-3.5 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-bold hover:bg-[#0A4542] transition-colors flex items-center gap-2 shadow-md"
                    >
                      {isProcessing ? (
                        <span>Processing Order Dispatch...</span>
                      ) : (
                        <>
                          <span>Confirm & Place Order (Rs. {finalTotal.toLocaleString()})</span>
                          <Check className="w-4 h-4" strokeWidth={2} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Order Review (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#0E2A2B]/10 shadow-xs space-y-4">
                <h3 className="font-serif-editorial text-xl font-bold text-[#0E2A2B]">
                  Order Items ({items.reduce((s, i) => s + i.quantity, 0)})
                </h3>

                <div className="max-h-60 overflow-y-auto divide-y divide-[#0E2A2B]/8 text-xs">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={item.product.images[0]}
                          alt=""
                          className="w-10 h-10 object-contain rounded bg-[#FAF8F4] border p-0.5 shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-[#0E2A2B] truncate">{item.product.name}</div>
                          <div className="text-[10px] text-[#5B6B6C]">{item.quantity} × Rs. {item.product.price}</div>
                        </div>
                      </div>
                      <div className="font-bold text-[#0E2A2B] tabular-nums shrink-0">
                        Rs. {((item.product.price || 0) * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#0E2A2B]/10 space-y-2 text-xs">
                  <div className="flex justify-between text-[#5B6B6C]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#0E2A2B] tabular-nums">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#0F5E5A]">
                      <span>Discount</span>
                      <span className="font-semibold tabular-nums">- Rs. {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5B6B6C]">
                    <span>Delivery ({deliveryMethod})</span>
                    <span className="font-semibold tabular-nums">
                      {deliveryCost === 0 ? <strong className="text-[#0F5E5A]">FREE</strong> : `Rs. ${deliveryCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#0E2A2B] pt-2 border-t border-[#0E2A2B]/8">
                    <span>Payable Total</span>
                    <span className="text-[#0F5E5A] tabular-nums font-serif-editorial text-2xl">
                      Rs. {finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#0E2A2B]/8 text-[11px] text-[#5B6B6C] space-y-1">
                  <div className="font-semibold text-[#0E2A2B] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0F5E5A]" />
                    <span>DRAP Regulatory Guarantee</span>
                  </div>
                  <p>All medicines dispatched in original unbroken factory blister packaging with authentic batch certificate.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
