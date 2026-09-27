/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductData } from '../types/product';

export const productData: ProductData = {
  id: 'proto-x1',
  name: 'Proto X1',
  tagline: 'Designed for the future.',
  subtitle: 'A precision-designed product engineered for modern users.',
  description:
    'Forged from aerospace-grade anodized aluminum with micro-perforated acoustic chambers. The Proto X1 pairs architectural purity with studio-grade sound reproduction, customizable tactile feedback, and seamless spatial acoustics.',
  category: 'Spatial Audio / Industrial Wearable',
  price: 1299,
  currency: '$',
  inStock: true,
  rating: 4.9,
  reviewsCount: 342,
  colors: [
    {
      id: 'black',
      name: 'Obsidian Black',
      hex: '#171717',
      threeColor: '#171717',
      accentColor: '#333333',
      roughness: 0.35,
      metalness: 0.85,
      description: 'Deep matte obsidian with bead-blasted anodized finish.',
    },
    {
      id: 'white',
      name: 'Arctic White',
      hex: '#F4F4F6',
      threeColor: '#EBECEF',
      accentColor: '#D1D5DB',
      roughness: 0.45,
      metalness: 0.25,
      description: 'Pristine satin white with ceramic-infused exterior coat.',
    },
    {
      id: 'silver',
      name: 'Lunar Silver',
      hex: '#CBD5E1',
      threeColor: '#C4CBD4',
      accentColor: '#94A3B8',
      roughness: 0.25,
      metalness: 0.95,
      description: 'Raw brushed aerospace aluminum with diamond-cut chamfers.',
    },
    {
      id: 'blue',
      name: 'Deep Cobalt',
      hex: '#1E3A8A',
      threeColor: '#1A365D',
      accentColor: '#3B82F6',
      roughness: 0.3,
      metalness: 0.75,
      description: 'Midnight metallic navy with deep spectral sapphire reflections.',
    },
    {
      id: 'red',
      name: 'Crimson Red',
      hex: '#991B1B',
      threeColor: '#881337',
      accentColor: '#EF4444',
      roughness: 0.3,
      metalness: 0.8,
      description: 'Vibrant racing crimson with anodized metallic depth.',
    },
  ],
  specs: [
    {
      label: 'Material',
      value: 'Premium Aluminum',
      detail: '6000-series aerospace alloy milled to 50-micron tolerance',
    },
    {
      label: 'Weight',
      value: '1.2 kg',
      detail: 'Gross set weight with travel dock; 285g ergonomic on-head weight',
    },
    {
      label: 'Finishing',
      value: 'Diamond Chamfers',
      detail: 'Micro-perforated acoustic relief vents and satin PVD coating',
    },
    {
      label: 'Driver Transducer',
      value: '40mm Beryllium',
      detail: 'Ultra-rigid low-mass diaphragms tuned from 5 Hz to 45 kHz',
    },
    {
      label: 'Connectivity',
      value: 'Lossless Wireless',
      detail: 'High-res audio streaming, USB-C 32-bit/384kHz DAC bypass',
    },
    {
      label: 'Battery Life',
      value: '48 Hours',
      detail: 'Fast charging gives 8 hours playback in 15 minutes',
    },
  ],
  features: [
    {
      id: 'interactive-360',
      title: 'Interactive 360°',
      subtitle: 'Complete Spatial Freedom',
      description:
        'Explore the product from every angle. Rotate effortlessly, orbit freely around precision chamfers, and discover every millimeter of industrial design.',
      metric: {
        value: '360°',
        label: 'Continuous Smooth Orbit',
      },
    },
    {
      id: 'realistic-rendering',
      title: 'Realistic Rendering',
      subtitle: 'Physically Based Shading',
      description:
        'Experience realistic studio lighting, diffuse environment maps, and soft ground contact shadows that respond faithfully to physical light physics.',
      metric: {
        value: 'PBR',
        label: 'Physical Shaders',
      },
    },
    {
      id: 'custom-colors',
      title: 'Custom Colors',
      subtitle: 'Instant Surface Metamorphosis',
      description:
        'Change product colors and material finishes in real time with instant GPU shader uniform updates—no loading screens or textures resetting.',
      metric: {
        value: '5+',
        label: 'Curated Anodized Tones',
      },
    },
    {
      id: 'responsive-experience',
      title: 'Responsive Experience',
      subtitle: 'Optimized Across All Screens',
      description:
        'Engineered for 60+ FPS interaction on desktop, tablet, and touch screens with adaptive render resolution and touch gestures.',
      metric: {
        value: '60 FPS',
        label: 'Fluid Hardware Accelerated',
      },
    },
  ],
  technologies: [
    {
      name: 'React 19',
      role: 'UI Architecture',
      description: 'Declarative component lifecycle and reactive customization state.',
      category: 'core',
    },
    {
      name: 'TypeScript',
      role: 'Type Integrity',
      description: 'Strict typing for geometries, materials, camera presets, and props.',
      category: 'core',
    },
    {
      name: 'Three.js',
      role: 'WebGL Engine',
      description: 'Underlying scene graphs, PBR materials, lights, and shadow maps.',
      category: 'graphics',
    },
    {
      name: 'React Three Fiber',
      role: 'Declarative 3D',
      description: 'React renderer for Three.js enabling reactive canvas management.',
      category: 'graphics',
    },
    {
      name: 'Drei',
      role: '3D Primitives',
      description: 'OrbitControls, ContactShadows, Environment, and GLTF asset loaders.',
      category: 'graphics',
    },
    {
      name: 'Framer Motion',
      role: 'Motion Design',
      description: 'Fluid interface entrances, smooth color tabs, and micro-interactions.',
      category: 'styling',
    },
    {
      name: 'Tailwind CSS v4',
      role: 'Styling Engine',
      description: 'Modern styling system with zero unnecessary CSS overhead.',
      category: 'styling',
    },
  ],
};
