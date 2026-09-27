/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import {
  RotateCw,
  RefreshCw,
  Layers,
  Sun,
  Eye,
  Camera,
  Upload,
  Box,
} from 'lucide-react';
import {
  CameraPreset,
  LightingPreset,
} from '../types/product';

interface ProductControlsProps {
  cameraPreset: CameraPreset;
  onSelectCameraPreset: (preset: CameraPreset) => void;
  onResetCamera: () => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  wireframe: boolean;
  onToggleWireframe: () => void;
  explodedView: boolean;
  onToggleExplodedView: () => void;
  lighting: LightingPreset;
  onSelectLighting: (lighting: LightingPreset) => void;
  customModelName: string | null;
  onLoadCustomModel: (file: File) => void;
  onResetToDefaultModel: () => void;
}

export default function ProductControls({
  cameraPreset,
  onSelectCameraPreset,
  onResetCamera,
  autoRotate,
  onToggleAutoRotate,
  wireframe,
  onToggleWireframe,
  explodedView,
  onToggleExplodedView,
  lighting,
  onSelectLighting,
  customModelName,
  onLoadCustomModel,
  onResetToDefaultModel,
}: ProductControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onLoadCustomModel(file);
    }
  };

  const cameraAngles: { id: CameraPreset; label: string }[] = [
    { id: 'default', label: 'Perspective' },
    { id: 'front', label: 'Front' },
    { id: 'side', label: 'Profile' },
    { id: 'top', label: 'Top' },
    { id: 'detail', label: 'Acoustic Core' },
  ];

  return (
    <div className="space-y-4 pt-2">
      {/* Camera Angles & Reset View */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-neutral-500">
            <Camera className="w-3.5 h-3.5" />
            <span>Camera Angles</span>
          </div>
          <button
            type="button"
            onClick={onResetCamera}
            className="flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer py-0.5 px-2 rounded-md hover:bg-neutral-100"
            title="Reset camera to default view"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset View</span>
          </button>
        </div>

        <div className="grid grid-cols-5 gap-1 p-1 bg-neutral-100 rounded-xl border border-neutral-200/80">
          {cameraAngles.map((angle) => {
            const isActive = cameraPreset === angle.id;
            return (
              <button
                key={angle.id}
                type="button"
                onClick={() => onSelectCameraPreset(angle.id)}
                className={`py-1 px-1.5 text-xs font-medium rounded-lg text-center truncate transition-colors duration-150 ${
                  isActive
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {angle.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feature Toggles: Auto Rotate, Exploded View, Wireframe */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold tracking-wider uppercase text-neutral-500">
            3D View Modes
          </label>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Turntable Auto Rotate */}
          <button
            type="button"
            onClick={onToggleAutoRotate}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium transition-all duration-150 cursor-pointer ${
              autoRotate
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span>360° Spin</span>
          </button>

          {/* Exploded Disassembly View */}
          <button
            type="button"
            onClick={onToggleExplodedView}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium transition-all duration-150 cursor-pointer ${
              explodedView
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Exploded</span>
          </button>

          {/* Wireframe Mesh Mode */}
          <button
            type="button"
            onClick={onToggleWireframe}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium transition-all duration-150 cursor-pointer ${
              wireframe
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Wireframe</span>
          </button>
        </div>
      </div>

      {/* Lighting Rig Environment Preset */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-neutral-500">
            <Sun className="w-3.5 h-3.5" />
            <span>Studio Lighting</span>
          </div>
          <span className="text-xs font-medium capitalize text-neutral-800">
            {lighting} Environment
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-200/80">
          {(['studio', 'dramatic', 'warm'] as LightingPreset[]).map((mode) => {
            const isActive = lighting === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => onSelectLighting(mode)}
                className={`py-1.5 px-2 text-xs font-medium rounded-lg capitalize transition-colors duration-150 ${
                  isActive
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {mode}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom GLB/GLTF Model Loader (Bonus capability) */}
      <div className="pt-2 border-t border-neutral-200">
        <input
          ref={fileInputRef}
          type="file"
          accept=".glb,.gltf"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-neutral-500" />
            <div>
              <p className="text-xs font-semibold text-neutral-800">
                {customModelName ? `Model: ${customModelName}` : 'Model: Proto X1 Studio'}
              </p>
              <p className="text-[11px] text-neutral-500">
                Load custom GLB or use default
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {customModelName ? (
              <button
                type="button"
                onClick={onResetToDefaultModel}
                className="text-xs font-medium text-red-600 hover:text-red-700 py-1 px-2 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
              >
                Reset Model
              </button>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 py-1 px-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                <span>Upload .glb</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
