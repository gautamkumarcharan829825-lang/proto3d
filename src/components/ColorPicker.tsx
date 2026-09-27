/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ProductColor, MaterialFinish } from '../types/product';

interface ColorPickerProps {
  colors: ProductColor[];
  selectedColor: ProductColor;
  onSelectColor: (color: ProductColor) => void;
  finish: MaterialFinish;
  onSelectFinish: (finish: MaterialFinish) => void;
}

export default function ColorPicker({
  colors,
  selectedColor,
  onSelectColor,
  finish,
  onSelectFinish,
}: ColorPickerProps) {
  return (
    <div className="space-y-4">
      {/* Header and Current Color Name */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold tracking-wider uppercase text-neutral-500">
          Color Selection
        </label>
        <span className="text-xs font-medium text-neutral-900">
          {selectedColor.name}
        </span>
      </div>

      {/* Color Swatches */}
      <div
        role="radiogroup"
        aria-label="Product color choices"
        className="flex items-center gap-3"
      >
        {colors.map((color) => {
          const isSelected = selectedColor.id === color.id;
          return (
            <button
              key={color.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={color.name}
              onClick={() => onSelectColor(color)}
              className="relative p-1 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 transition-transform duration-150 hover:scale-110 active:scale-95"
            >
              {/* Outer Selection Ring */}
              {isSelected && (
                <motion.div
                  layoutId="color-ring"
                  className="absolute inset-0 rounded-full border-2 border-neutral-900"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}

              {/* Swatch Circle */}
              <div
                className="w-7 h-7 rounded-full shadow-inner border border-neutral-300/80 transition-shadow"
                style={{
                  backgroundColor: color.hex,
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Surface Material Finish Switcher */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold tracking-wider uppercase text-neutral-500">
            Material Finish
          </label>
          <span className="text-xs font-medium capitalize text-neutral-800">
            {finish} Anodization
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-200/80">
          {(['matte', 'metallic', 'satin'] as MaterialFinish[]).map((f) => {
            const isActive = finish === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => onSelectFinish(f)}
                className={`relative py-1.5 px-3 text-xs font-medium rounded-lg capitalize transition-colors duration-150 ${
                  isActive
                    ? 'text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="finish-pill"
                    className="absolute inset-0 bg-white rounded-lg"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
