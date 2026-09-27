/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Code2, Cpu, Box, Palette, Layers, Sparkles, Orbit } from 'lucide-react';
import { productData } from '../data/productData';

export default function TechSection() {
  const iconHelper: Record<string, React.ReactNode> = {
    'React 19': <Code2 className="w-5 h-5 text-neutral-900" />,
    TypeScript: <Layers className="w-5 h-5 text-neutral-900" />,
    'Three.js': <Orbit className="w-5 h-5 text-neutral-900" />,
    'React Three Fiber': <Box className="w-5 h-5 text-neutral-900" />,
    Drei: <Cpu className="w-5 h-5 text-neutral-900" />,
    'Framer Motion': <Sparkles className="w-5 h-5 text-neutral-900" />,
    'Tailwind CSS v4': <Palette className="w-5 h-5 text-neutral-900" />,
  };

  return (
    <section id="technology" className="py-16 sm:py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-3">
            <span>Engineering Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Zero Slop</span>
            <span aria-hidden="true">·</span>
            <span>Production Grade</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 font-['Space_Grotesk'] text-balance">
            Built with Modern Web Technologies
          </h2>

          <p className="text-base text-neutral-600 mt-4 leading-relaxed max-w-2xl text-balance">
            Proto3D marries declarative React component architecture with raw hardware-accelerated WebGL.
            Here is how each layer contributes to a seamless interactive 3D product showcase.
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {productData.technologies.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:border-neutral-300 hover:shadow-xs transition-all duration-150"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
                {iconHelper[tech.name] || <Code2 className="w-4 h-4 text-neutral-900" />}
              </div>

              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-base font-bold text-neutral-900 font-['Space_Grotesk']">
                  {tech.name}
                </h3>
                <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
                  {tech.role}
                </span>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed mt-2">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
