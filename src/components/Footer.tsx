/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Box, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="about" className="bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-lg font-bold tracking-tight text-neutral-900 font-['Space_Grotesk']">
              <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                <Box className="w-4 h-4" />
              </div>
              <span>Proto3D</span>
            </div>
            <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
              Interactive 3D Product Showcase. Engineered with React Three Fiber, Drei,
              and physically based WebGL materials for modern spatial product presentation.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <a href="#product-showcase" className="hover:text-neutral-900 transition-colors">
                  Proto X1 Showcase
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-neutral-900 transition-colors">
                  Features & Optics
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-neutral-900 transition-colors">
                  3D Architecture
                </a>
              </li>
            </ul>
          </div>

          {/* Model & Asset Guidance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-3">
              3D Specifications
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-center gap-1.5">
                <span>Model:</span>
                <span className="font-mono text-xs text-neutral-800">public/models/product.glb</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>Format:</span>
                <span className="text-neutral-800">glTF 2.0 / Binary GLB</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>Shaders:</span>
                <span className="text-neutral-800">ACES Filmic PBR</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Proto3D. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-neutral-100"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
