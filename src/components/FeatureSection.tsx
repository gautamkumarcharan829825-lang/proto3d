/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  Rotate3d,
  Sparkles,
  Palette,
  Smartphone,
  Cpu,
  Shield,
  Layers,
  Activity,
} from 'lucide-react';
import { productData } from '../data/productData';

export default function FeatureSection() {
  const iconMap: Record<string, React.ReactNode> = {
    'interactive-360': <Rotate3d className="w-5 h-5 text-neutral-900" />,
    'realistic-rendering': <Sparkles className="w-5 h-5 text-neutral-900" />,
    'custom-colors': <Palette className="w-5 h-5 text-neutral-900" />,
    'responsive-experience': <Smartphone className="w-5 h-5 text-neutral-900" />,
  };

  return (
    <section id="features" className="py-16 sm:py-24 bg-white border-y border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-3">
            <span>Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Spatial Interaction</span>
            <span aria-hidden="true">·</span>
            <span>Next-Gen WebGL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 font-['Space_Grotesk'] text-balance">
            Engineered for Tactile Digital Exploration
          </h2>

          <p className="text-base text-neutral-600 mt-4 leading-relaxed max-w-2xl text-balance">
            Every curve, seam, and acoustic perforation of the Proto X1 is rendered
            in real time using physically based shaders calibrated for studio-grade realism.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productData.features.map((feature, index) => {
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col justify-between p-6 rounded-2xl bg-[#F8F9FA] border border-neutral-200 hover:border-neutral-300 transition-all duration-200 group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center mb-5 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    {iconMap[feature.id] || <Layers className="w-5 h-5 text-neutral-900" />}
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 font-['Space_Grotesk']">
                    {feature.title}
                  </h3>

                  <p className="text-xs font-medium text-neutral-500 mt-1">
                    {feature.subtitle}
                  </p>

                  <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {feature.metric && (
                  <div className="pt-6 mt-6 border-t border-neutral-200/70">
                    <span className="text-2xl font-bold text-neutral-900 tabular-nums block font-['Space_Grotesk']">
                      {feature.metric.value}
                    </span>
                    <span className="text-xs text-neutral-500 mt-0.5 block">
                      {feature.metric.label}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Deep Dive Engineering Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-neutral-900 text-white overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400 block mb-2">
                Acoustic Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk']">
                40mm Beryllium Transducer System
              </h3>
              <p className="text-sm text-neutral-300 mt-3 leading-relaxed max-w-xl">
                Beryllium offers the ideal stiffness-to-weight ratio, preventing modal breakup
                distortions across ultra-high frequencies. Combined with quad-directional hybrid ANC,
                the Proto X1 isolates every acoustic transient with uncompromised fidelity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t lg:border-t-0 lg:border-l border-neutral-800 pt-6 lg:pt-0 lg:pl-8">
              <div>
                <span className="text-2xl sm:text-3xl font-bold tabular-nums font-['Space_Grotesk'] text-white">
                  5 Hz–45 kHz
                </span>
                <span className="text-xs text-neutral-400 mt-1 block">
                  Ultra-wide Frequency
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold tabular-nums font-['Space_Grotesk'] text-white">
                  &lt; 0.05%
                </span>
                <span className="text-xs text-neutral-400 mt-1 block">
                  Total Harmonic Distortion
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold tabular-nums font-['Space_Grotesk'] text-white">
                  -42 dB
                </span>
                <span className="text-xs text-neutral-400 mt-1 block">
                  Hybrid ANC Attenuation
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold tabular-nums font-['Space_Grotesk'] text-white">
                  32-bit / 384k
                </span>
                <span className="text-xs text-neutral-400 mt-1 block">
                  Direct DAC Resolution
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
