/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, RotateCw, ZoomIn, Palette, Sparkles } from 'lucide-react';
import ProductViewer from './ProductViewer';
import ProductControls from './ProductControls';
import ProductInfo from './ProductInfo';
import { ProductCustomizationReturn } from '../hooks/useProductCustomization';

interface HeroProps {
  customization: ProductCustomizationReturn;
  onExploreClick: () => void;
}

export default function Hero({ customization, onExploreClick }: HeroProps) {
  const {
    selectedColor,
    setSelectedColor,
    finish,
    setFinish,
    lighting,
    setLighting,
    cameraPreset,
    setCameraPreset,
    resetCamera,
    autoRotate,
    toggleAutoRotate,
    wireframe,
    toggleWireframe,
    explodedView,
    toggleExplodedView,
    customModelUrl,
    customModelName,
    loadCustomModel,
    resetToDefaultModel,
    setIsCanvasReady,
  } = customization;

  return (
    <section id="product-showcase" className="relative pt-6 pb-16 lg:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Hero Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
          {/* Natural unboxed kicker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-3"
          >
            <span>Real-time WebGL Engine</span>
            <span aria-hidden="true">·</span>
            <span>Spatial Industrial Design</span>
            <span aria-hidden="true">·</span>
            <span>Interactive PBR Showcase</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 font-['Space_Grotesk'] text-balance"
          >
            Experience Products in 3D
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed max-w-2xl mx-auto text-balance"
          >
            Explore every detail. Rotate, zoom and customize your product in real time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-6"
          >
            <button
              type="button"
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-all duration-150 cursor-pointer shadow-sm hover:shadow active:scale-98"
            >
              <span>Explore Product</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={toggleAutoRotate}
              className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-xl border transition-all duration-150 cursor-pointer ${
                autoRotate
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50 shadow-2xs'
              }`}
            >
              <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
              <span>{autoRotate ? 'Stop Turntable' : 'Auto Turntable'}</span>
            </button>
          </motion.div>
        </div>

        {/* Core Showcase Stage (Split Layout: 3D Product Canvas & Product Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left/Main Column: 3D Viewport & View Controls (lg:col-span-7 or 8) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-4"
          >
            {/* 3D Canvas Container */}
            <div className="relative w-full flex-1 rounded-3xl border border-neutral-200/90 bg-white p-2 sm:p-4 shadow-sm overflow-hidden">
              <ProductViewer
                color={selectedColor}
                finish={finish}
                lighting={lighting}
                cameraPreset={cameraPreset}
                autoRotate={autoRotate}
                wireframe={wireframe}
                explodedView={explodedView}
                modelUrl={customModelUrl}
                onCanvasReady={() => setIsCanvasReady(true)}
              />
            </div>

            {/* Quick Interactive Tooling Bar Beneath Canvas */}
            <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-2xs">
              <ProductControls
                cameraPreset={cameraPreset}
                onSelectCameraPreset={setCameraPreset}
                onResetCamera={resetCamera}
                autoRotate={autoRotate}
                onToggleAutoRotate={toggleAutoRotate}
                wireframe={wireframe}
                onToggleWireframe={toggleWireframe}
                explodedView={explodedView}
                onToggleExplodedView={toggleExplodedView}
                lighting={lighting}
                onSelectLighting={setLighting}
                customModelName={customModelName}
                onLoadCustomModel={loadCustomModel}
                onResetToDefaultModel={resetToDefaultModel}
              />
            </div>
          </motion.div>

          {/* Right Column: Product Information & Customization Hub (lg:col-span-5 or 4) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 xl:col-span-4"
          >
            <ProductInfo
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              finish={finish}
              onSelectFinish={setFinish}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
