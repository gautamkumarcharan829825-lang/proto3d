/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { productData } from '../data/productData';
import { ProductColor, MaterialFinish } from '../types/product';
import ColorPicker from './ColorPicker';

interface ProductInfoProps {
  selectedColor: ProductColor;
  onSelectColor: (color: ProductColor) => void;
  finish: MaterialFinish;
  onSelectFinish: (finish: MaterialFinish) => void;
}

export default function ProductInfo({
  selectedColor,
  onSelectColor,
  finish,
  onSelectFinish,
}: ProductInfoProps) {
  const [isOrdered, setIsOrdered] = useState(false);
  const [showSpecsDrawer, setShowSpecsDrawer] = useState(false);

  const handleOrder = () => {
    setIsOrdered(true);
    setTimeout(() => setIsOrdered(false), 3000);
  };

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      {/* Product Title and Header Metadata */}
      <div>
        {/* Unboxed Metadata Line with typographic separators */}
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
          <span>{productData.category}</span>
          <span aria-hidden="true">·</span>
          <span>In Stock</span>
          <span aria-hidden="true">·</span>
          <span>Ships in 24h</span>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 font-['Space_Grotesk']">
            {productData.name}
          </h1>
          <span className="text-2xl lg:text-3xl font-bold text-neutral-900 tabular-nums">
            {productData.currency}
            {productData.price.toLocaleString()}
          </span>
        </div>

        <p className="text-sm font-medium text-neutral-600 mt-1">
          {productData.tagline}
        </p>
        <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
          {productData.subtitle}
        </p>
      </div>

      {/* Embedded Color & Finish Switcher */}
      <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs">
        <ColorPicker
          colors={productData.colors}
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
          finish={finish}
          onSelectFinish={onSelectFinish}
        />
      </div>

      {/* Key Specifications Grid */}
      <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500">
            Engineered Specifications
          </span>
          <button
            type="button"
            onClick={() => setShowSpecsDrawer(!showSpecsDrawer)}
            className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900 cursor-pointer"
          >
            <span>{showSpecsDrawer ? 'Hide Details' : 'All Specs'}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                showSpecsDrawer ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-neutral-50 rounded-xl">
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
              Material
            </span>
            <span className="text-xs font-semibold text-neutral-900 mt-0.5 block">
              Premium Aluminum
            </span>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl">
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
              Weight
            </span>
            <span className="text-xs font-semibold text-neutral-900 mt-0.5 block tabular-nums">
              1.2 kg (Travel Kit)
            </span>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl">
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
              Driver
            </span>
            <span className="text-xs font-semibold text-neutral-900 mt-0.5 block">
              40mm Beryllium
            </span>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl">
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
              Battery Life
            </span>
            <span className="text-xs font-semibold text-neutral-900 mt-0.5 block tabular-nums">
              48 Hours Playback
            </span>
          </div>
        </div>

        {/* Expandable Extended Specs */}
        <AnimatePresence>
          {showSpecsDrawer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden pt-2 border-t border-neutral-100"
            >
              <div className="space-y-2 text-xs">
                {productData.specs.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start justify-between py-1 border-b border-neutral-100/80 last:border-0"
                  >
                    <span className="text-neutral-500">{item.label}</span>
                    <div className="text-right">
                      <span className="font-medium text-neutral-900">
                        {item.value}
                      </span>
                      {item.detail && (
                        <p className="text-[11px] text-neutral-400 mt-0.5 max-w-[200px]">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Purchase / Action CTA Area */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={handleOrder}
          className="w-full relative flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.99]"
        >
          {isOrdered ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 text-emerald-300"
            >
              <Check className="w-4 h-4" />
              <span>Configuration Reserved · Welcome to Proto3D</span>
            </motion.div>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>
                Order {selectedColor.name} · {productData.currency}
                {productData.price.toLocaleString()}
              </span>
            </>
          )}
        </button>

        {/* Guarantees and Trust Points */}
        <div className="grid grid-cols-2 gap-2 text-xs text-neutral-500 pt-1">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-neutral-700" />
            <span>Complimentary Global Air Delivery</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
            <span>3-Year Studio Hardware Warranty</span>
          </div>
        </div>
      </div>
    </div>
  );
}
