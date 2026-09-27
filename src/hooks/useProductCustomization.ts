/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { productData } from '../data/productData';
import {
  ProductColor,
  MaterialFinish,
  CameraPreset,
  LightingPreset,
} from '../types/product';

export function useProductCustomization() {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    productData.colors[0] // Obsidian Black default
  );
  const [finish, setFinish] = useState<MaterialFinish>('metallic');
  const [lighting, setLighting] = useState<LightingPreset>('studio');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('default');
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [explodedView, setExplodedView] = useState<boolean>(false);
  const [customModelUrl, setCustomModelUrl] = useState<string | null>(null);
  const [customModelName, setCustomModelName] = useState<string | null>(null);
  const [isCanvasReady, setIsCanvasReady] = useState<boolean>(false);

  const handleSelectColor = useCallback((color: ProductColor) => {
    setSelectedColor(color);
  }, []);

  const handleSelectFinish = useCallback((newFinish: MaterialFinish) => {
    setFinish(newFinish);
  }, []);

  const handleSelectLighting = useCallback((newLighting: LightingPreset) => {
    setLighting(newLighting);
  }, []);

  const handleSelectPreset = useCallback((preset: CameraPreset) => {
    setCameraPreset(preset);
  }, []);

  const handleResetCamera = useCallback(() => {
    setCameraPreset('default');
  }, []);

  const toggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => !prev);
  }, []);

  const toggleWireframe = useCallback(() => {
    setWireframe((prev) => !prev);
  }, []);

  const toggleExplodedView = useCallback(() => {
    setExplodedView((prev) => !prev);
  }, []);

  const handleLoadCustomModel = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setCustomModelUrl(url);
    setCustomModelName(file.name);
  }, []);

  const handleResetToDefaultModel = useCallback(() => {
    if (customModelUrl) {
      URL.revokeObjectURL(customModelUrl);
    }
    setCustomModelUrl(null);
    setCustomModelName(null);
  }, [customModelUrl]);

  return {
    selectedColor,
    setSelectedColor: handleSelectColor,
    finish,
    setFinish: handleSelectFinish,
    lighting,
    setLighting: handleSelectLighting,
    cameraPreset,
    setCameraPreset: handleSelectPreset,
    resetCamera: handleResetCamera,
    autoRotate,
    toggleAutoRotate,
    wireframe,
    toggleWireframe,
    explodedView,
    toggleExplodedView,
    customModelUrl,
    customModelName,
    loadCustomModel: handleLoadCustomModel,
    resetToDefaultModel: handleResetToDefaultModel,
    isCanvasReady,
    setIsCanvasReady,
  };
}

export type ProductCustomizationReturn = ReturnType<typeof useProductCustomization>;
