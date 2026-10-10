import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../../lib/seo';
import { useCartStore, FREE_DELIVERY_THRESHOLD } from '../../lib/cart-store';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  ArrowLeft,
  X 
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getDeliveryFee,
    getDiscount,
    getTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; text: string } | null>(null);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const discount = getDiscount();
  const total = getTotal();
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ success: res.success, text: res.message });
    if (res.success) setCouponInput('');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title="Shopping Cart | CKD Pharma Pakistan"
        description="Review your over-the-counter medicine order, apply promotional coupons, and proceed to nationwide doorstep delivery in Pakistan."
        canonicalPath="/cart"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'OTC Store', url: '/shop' },
          { name: 'Bag', url: '/cart' }
        ]}
      />

      <section className="pt-8 pb-12 gradient-calm border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
              YOUR HEALTHCARE ORDER
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl font-normal text-[#0E2A2B]">
              Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)} Items)
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {items.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-[#0E2A2B]/8 max-w-xl mx-auto p-8 space-y-4 shadow-xs">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0E2A2B]/5 flex items-center justify-center text-[#5B6B6C]">
                <ShoppingBag className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-bold text-[#0E2A2B]">Your shopping bag is empty</h2>
              <p className="text-xs text-[#5B6B6C]">
                Explore our certified bone supplements, cold & flu relief, and digestive remedies.
              </p>
              <div className="pt-2">
                <Link
                  to="/shop/catalog"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0A4542] transition-colors"
                >
                  <span>Explore OTC Catalog</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Line Items (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Free delivery bar */}
                <div className="p-4 rounded-xl bg-[#E6F3F2]/70 border border-[#0F5E5A]/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#0F5E5A]">
                    <span>
                      {amountToFreeDelivery > 0
                        ? `Add Rs. ${amountToFreeDelivery.toLocaleString()} more for Free Nationwide Delivery`
                        : 'You have earned Free Delivery nationwide!'}
                    </span>
                    <span className="tabular-nums font-mono">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-[#0F5E5A]/15 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0F5E5A] h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>

                {/* Items */}
                <div className="bg-white rounded-2xl border border-[#0E2A2B]/10 overflow-hidden shadow-xs divide-y divide-[#0E2A2B]/8">
                  {items.map((item) => (
                    <div key={item.product.id} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 object-contain rounded-xl bg-[#FAF8F4] border border-[#0E2A2B]/8 p-2 shrink-0"
                        />
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase text-[#0F5E5A]">
                            {item.product.category}
                          </span>
                          <Link to={`/shop/product/${item.product.slug}`} className="font-bold text-sm text-[#0E2A2B] hover:text-[#0F5E5A] block">
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-[#5B6B6C]">{item.product.packSize}</p>
                          <p className="text-xs font-bold text-[#0E2A2B] tabular-nums">
                            Rs. {item.product.price?.toLocaleString()} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#0E2A2B]/15 rounded-lg bg-[#FAF8F4]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2.5 py-1.5 text-[#0E2A2B] hover:bg-[#0E2A2B]/5"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                          <span className="px-3 text-xs font-bold tabular-nums text-[#0E2A2B]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2.5 py-1.5 text-[#0E2A2B] hover:bg-[#0E2A2B]/5"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right min-w-[90px]">
                          <div className="text-sm font-bold text-[#0E2A2B] tabular-nums">
                            Rs. {((item.product.price || 0) * item.quantity).toLocaleString()}
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1.5 text-[#5B6B6C] hover:text-red-600 rounded-md"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    to="/shop/catalog"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F5E5A] hover:underline"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>

              {/* Order Summary (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#0E2A2B]/10 shadow-xs space-y-6">
                  <h3 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                    Order Summary
                  </h3>

                  {/* Coupon Box */}
                  <div className="space-y-2 pt-2 border-t border-[#0E2A2B]/8">
                    <span className="text-xs font-semibold text-[#0E2A2B] flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#0F5E5A]" />
                      <span>Promotional Code</span>
                    </span>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#E6F3F2] border border-[#0F5E5A]/20 text-xs text-[#0F5E5A]">
                        <span>Code <strong>{appliedCoupon}</strong> Applied</span>
                        <button onClick={removeCoupon} className="p-1 hover:text-[#0E2A2B]" aria-label="Remove coupon">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Try CKD10 or WELCOME200"
                          className="flex-1 text-xs px-3 py-2 rounded-lg border border-[#0E2A2B]/15 uppercase font-mono outline-none focus:border-[#0F5E5A]"
                        />
                        <button
                          type="submit"
                          className="px-3 py-2 bg-[#0E2A2B] text-white text-xs font-semibold rounded-lg hover:bg-[#0F5E5A]"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    {couponMessage && (
                      <p className={`text-[11px] ${couponMessage.success ? 'text-green-700' : 'text-red-600'}`}>
                        {couponMessage.text}
                      </p>
                    )}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-2.5 text-xs pt-4 border-t border-[#0E2A2B]/8">
                    <div className="flex justify-between text-[#5B6B6C]">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#0E2A2B] tabular-nums">
                        Rs. {subtotal.toLocaleString()}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-[#0F5E5A]">
                        <span>Discount Savings</span>
                        <span className="font-semibold tabular-nums">
                          - Rs. {discount.toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-[#5B6B6C]">
                      <span>Estimated Delivery (Pakistan)</span>
                      <span className="font-semibold tabular-nums">
                        {deliveryFee === 0 ? <strong className="text-[#0F5E5A]">FREE</strong> : `Rs. ${deliveryFee}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-bold text-[#0E2A2B] pt-4 border-t border-[#0E2A2B]/10">
                      <span>Total Amount</span>
                      <span className="font-serif-editorial text-2xl text-[#0F5E5A] tabular-nums">
                        Rs. {total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full py-3.5 px-4 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0A4542] transition-colors flex items-center justify-center gap-2 group shadow-sm"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                  </button>

                  <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#5B6B6C]">
                    <ShieldCheck className="w-4 h-4 text-[#0F5E5A]" strokeWidth={1.5} />
                    <span>Cash on Delivery (COD) · JazzCash · Easypaisa</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
