import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCartStore, FREE_DELIVERY_THRESHOLD } from '../../lib/cart-store';
import { useI18n } from '../../lib/i18n';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getDeliveryFee,
    getTotal
  } = useCartStore();
  const { t } = useI18n();
  const drawerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0E2A2B]/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          ref={drawerRef}
          className="w-screen max-w-md bg-[#FAF8F4] shadow-2xl flex flex-col border-l border-[#0E2A2B]/10 animate-in slide-in-from-right duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Cart Drawer"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#0E2A2B]/8 flex items-center justify-between bg-[#FAF8F4]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0F5E5A]" strokeWidth={1.5} />
              <h2 className="text-lg font-serif-editorial font-bold text-[#0E2A2B]">
                Your Healthcare Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-[#5B6B6C] hover:text-[#0E2A2B] rounded-lg hover:bg-[#0E2A2B]/5 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-[#E6F3F2]/60 border-b border-[#0F5E5A]/10">
            {amountToFreeDelivery > 0 ? (
              <p className="text-xs text-[#0F5E5A] font-medium">
                Add <span className="font-bold">Rs. {amountToFreeDelivery.toLocaleString()}</span> more for <span className="underline">Free Nationwide Delivery</span>
              </p>
            ) : (
              <p className="text-xs text-[#0F5E5A] font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0F5E5A]" strokeWidth={1.5} />
                <span>You have qualified for <strong>Free Nationwide Delivery</strong>!</span>
              </p>
            )}
            <div className="w-full bg-[#0F5E5A]/15 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-[#0F5E5A] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#0E2A2B]/5 flex items-center justify-center text-[#5B6B6C]">
                  <ShoppingBag className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-[#0E2A2B]">Your bag is currently empty</h3>
                  <p className="text-xs text-[#5B6B6C] max-w-xs mx-auto">
                    Explore our DRAP-licensed vitamins, bone nutrition, and over-the-counter wellness essentials.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/shop/catalog');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0A4542] transition-colors"
                >
                  <span>Explore OTC Essentials</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-lg border border-[#0E2A2B]/8 bg-white/60 hover:bg-white transition-colors"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-18 h-18 object-cover rounded-md bg-[#FAF8F4] border border-[#0E2A2B]/6 shrink-0"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/shop/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="text-xs font-bold text-[#0E2A2B] hover:text-[#0F5E5A] line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-[#5B6B6C] hover:text-red-600 p-0.5 transition-colors"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#5B6B6C] mt-0.5">
                        {item.product.packSize}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#0E2A2B]/5">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#0E2A2B]/12 rounded-md bg-[#FAF8F4]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-[#0E2A2B] hover:bg-[#0E2A2B]/8 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" strokeWidth={1.5} />
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums text-[#0E2A2B]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-[#0E2A2B] hover:bg-[#0E2A2B]/8 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#0E2A2B] tabular-nums">
                          Rs. {((item.product.price || 0) * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#0E2A2B]/8 bg-[#FAF8F4] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5B6B6C]">
                  <span>{t.subtotal}</span>
                  <span className="tabular-nums font-medium text-[#0E2A2B]">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#5B6B6C]">
                  <span>{t.deliveryFee}</span>
                  <span className="tabular-nums font-medium">
                    {deliveryFee === 0 ? (
                      <span className="text-[#0F5E5A] font-semibold">FREE</span>
                    ) : (
                      `Rs. ${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0E2A2B] pt-2 border-t border-[#0E2A2B]/8">
                  <span>{t.total}</span>
                  <span className="tabular-nums text-[#0F5E5A]">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/checkout');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-sm font-semibold hover:bg-[#0A4542] transition-colors shadow-xs group"
                >
                  <span>{t.checkout}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </button>
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="w-full text-center py-2 text-xs font-medium text-[#5B6B6C] hover:text-[#0E2A2B] transition-colors"
                >
                  View Full Cart Page
                </Link>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-[#5B6B6C]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F5E5A]" strokeWidth={1.5} />
                <span>Cash on Delivery & Secure Electronic Payments</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
