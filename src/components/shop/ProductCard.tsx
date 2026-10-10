import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Lock, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../lib/cart-store';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { addItem } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.isOTC) return;

    setIsAdding(true);
    addItem(product, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const productUrl = product.isOTC ? `/shop/product/${product.slug}` : `/products/${product.slug}`;

  return (
    <div className="group relative bg-[#FAF8F4] rounded-xl border border-[#0E2A2B]/8 overflow-hidden card-hover-lift flex flex-col justify-between">
      {/* Product Image Slot */}
      <div className="relative aspect-square w-full bg-[#EBF0EE]/50 overflow-hidden flex items-center justify-center p-4">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#5B6B6C] bg-[#FAF8F4]/80 p-4 text-center">
            <span className="text-xs font-semibold">{product.name}</span>
            <span className="text-[10px] text-[#5B6B6C]/80 mt-1">{product.dosageForm}</span>
          </div>
        ) : (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply img-zoom-hover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}

        {/* Top Tag: Unboxed metadata */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-medium pointer-events-none">
          {product.isOTC ? (
            <span className="text-[#0F5E5A] bg-[#FAF8F4]/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-semibold border border-[#0F5E5A]/20">
              OTC Healthcare
            </span>
          ) : (
            <span className="text-amber-800 bg-amber-50/95 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-semibold border border-amber-200/50 flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" />
              <span>Rx · Prescription Only</span>
            </span>
          )}

          {product.bestseller && product.isOTC && (
            <span className="text-[#0E2A2B] bg-[#FAF8F4]/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-semibold border border-[#0E2A2B]/10">
              Popular
            </span>
          )}
        </div>

        {/* Hover Quick Action Slide-up with smooth easing */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex gap-2">
          {product.isOTC ? (
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isAdding || !product.inStock}
              className="flex-1 py-2.5 px-3 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0A4542] btn-action-transition cursor-pointer shadow-md flex items-center justify-center gap-1.5 focus-visible:outline-none"
              aria-label={`Add ${product.name} to cart`}
            >
              {isAdding ? (
                <>
                  <Check className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{product.inStock ? 'Quick Add' : 'Out of Stock'}</span>
                </>
              )}
            </button>
          ) : (
            <Link
              to={productUrl}
              className="flex-1 py-2.5 px-3 rounded-lg bg-[#0E2A2B] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0F5E5A] btn-action-transition cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>View Monograph</span>
            </Link>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between border-t border-[#0E2A2B]/6">
        <div>
          {/* Metadata line (Category · Dosage Form) */}
          <div className="text-[11px] text-[#5B6B6C] flex items-center gap-1.5 mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.dosageForm}</span>
          </div>

          <Link to={productUrl} className="block group-hover:text-[#0F5E5A] transition-colors cursor-pointer">
            <h3 className="font-semibold text-sm text-[#0E2A2B] line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#5B6B6C] line-clamp-1 mt-0.5 font-mono text-[11px]">
            {product.genericName}
          </p>

          <p className="text-[11px] text-[#5B6B6C]/80 mt-1">
            Pack: {product.packSize}
          </p>
        </div>

        {/* Pricing or Rx Disclaimer */}
        <div className="pt-3 mt-3 border-t border-[#0E2A2B]/5 flex items-baseline justify-between">
          {product.isOTC ? (
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-[#0E2A2B] tabular-nums">
                Rs. {product.price?.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-[#5B6B6C] line-through tabular-nums">
                  Rs. {product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs font-semibold text-amber-800">
              Institutional Supply Only
            </span>
          )}

          <Link
            to={productUrl}
            className="text-xs font-semibold text-[#0F5E5A] hover:text-[#0A4542] link-draw cursor-pointer"
          >
            <span>Details →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
