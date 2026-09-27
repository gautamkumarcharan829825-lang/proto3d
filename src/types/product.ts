/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  threeColor: string;
  accentColor: string;
  roughness: number;
  metalness: number;
  description: string;
}

export type MaterialFinish = 'matte' | 'metallic' | 'satin';

export type CameraPreset = 'default' | 'front' | 'side' | 'top' | 'detail';

export type LightingPreset = 'studio' | 'dramatic' | 'warm';

export interface ProductSpecItem {
  label: string;
  value: string;
  detail?: string;
}

export interface ProductFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metric?: {
    value: string;
    label: string;
  };
}

export interface TechnologyItem {
  name: string;
  role: string;
  description: string;
  category: 'core' | 'graphics' | 'styling';
}

export interface ProductData {
  id: string;
  name: string;
  tagline: string;
  subtitle: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  specs: ProductSpecItem[];
  colors: ProductColor[];
  features: ProductFeature[];
  technologies: TechnologyItem[];
}
