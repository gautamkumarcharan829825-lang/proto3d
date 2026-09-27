/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, Html } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import ProductModel from './ProductModel';
import {
  ProductColor,
  MaterialFinish,
  CameraPreset,
  LightingPreset,
} from '../types/product';

interface ProductViewerProps {
  color: ProductColor;
  finish: MaterialFinish;
  lighting: LightingPreset;
  cameraPreset: CameraPreset;
  autoRotate: boolean;
  wireframe: boolean;
  explodedView: boolean;
  modelUrl?: string | null;
  onCanvasReady?: () => void;
}

// Camera choreography controller
function CameraRig({
  preset,
  controlsRef,
}: {
  preset: CameraPreset;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(2.6, 1.5, 3.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    switch (preset) {
      case 'front':
        targetPos.current.set(0, 0.2, 3.8);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 'side':
        targetPos.current.set(3.8, 0.2, 0.1);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 'top':
        targetPos.current.set(0, 4.4, 0.1);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 'detail':
        targetPos.current.set(1.4, 0.5, 1.5);
        targetLookAt.current.set(0.6, 0.1, 0);
        break;
      case 'default':
      default:
        targetPos.current.set(2.6, 1.5, 3.2);
        targetLookAt.current.set(0, 0, 0);
        break;
    }

    if (controlsRef.current) {
      controlsRef.current.target.copy(targetLookAt.current);
    }
  }, [preset, controlsRef]);

  useFrame((_, delta) => {
    // Smooth camera damping to preset
    camera.position.lerp(targetPos.current, 3.5 * delta);
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return null;
}

// Sleek loading screen for 3D experience
function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-200/80 min-w-[240px]">
        <div className="w-10 h-10 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin mb-3" />
        <span className="text-sm font-semibold text-neutral-900 tracking-tight">
          Loading 3D Experience...
        </span>
        <span className="text-xs text-neutral-500 mt-1">
          Initializing physical shaders & geometry
        </span>
      </div>
    </Html>
  );
}

// Lighting setup based on selected lighting preset
function SceneLights({ mode }: { mode: LightingPreset }) {
  if (mode === 'dramatic') {
    return (
      <>
        <ambientLight intensity={0.4} />
        {/* Crisp directional key light */}
        <directionalLight
          position={[5, 8, 4]}
          intensity={2.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        {/* High contrast sharp rim light */}
        <directionalLight position={[-4, 3, -4]} intensity={2.8} color="#93C5FD" />
        <pointLight position={[0, -2, 2]} intensity={0.5} />
      </>
    );
  }

  if (mode === 'warm') {
    return (
      <>
        <ambientLight intensity={0.7} color="#FEF3C7" />
        {/* Warm key light */}
        <directionalLight
          position={[4, 6, 4]}
          intensity={1.8}
          color="#FDE68A"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        {/* Soft amber fill light */}
        <directionalLight position={[-4, 2, -2]} intensity={1.2} color="#FDBA74" />
        <pointLight position={[0, 4, 0]} intensity={0.6} color="#FFFBEB" />
      </>
    );
  }

  // Standard Studio Lighting (Default)
  return (
    <>
      <ambientLight intensity={0.8} />
      {/* Key Light */}
      <directionalLight
        position={[4, 7, 5]}
        intensity={1.7}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      {/* Fill Light (Soft cool fill from opposite side) */}
      <directionalLight position={[-5, 4, -3]} intensity={1.1} color="#E0E7FF" />
      {/* Rim light from behind for silhouette pop */}
      <directionalLight position={[0, 4, -5]} intensity={1.4} color="#FFFFFF" />
      <pointLight position={[0, 3, 2]} intensity={0.4} />
    </>
  );
}

export default function ProductViewer({
  color,
  finish,
  lighting,
  cameraPreset,
  autoRotate,
  wireframe,
  explodedView,
  modelUrl,
  onCanvasReady,
}: ProductViewerProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [webglError, setWebglError] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full min-h-[440px] md:min-h-[580px] lg:min-h-[660px] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-[#F8F9FA]">
      {/* Subtle background radial aura tuned to the active color */}
      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none opacity-40 blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color.accentColor}25 0%, transparent 65%)`,
        }}
      />

      {webglError ? (
        <div className="p-8 text-center bg-white rounded-2xl shadow-lg border border-neutral-200 max-w-md">
          <p className="font-semibold text-neutral-900 mb-2">WebGL Notice</p>
          <p className="text-sm text-neutral-600 mb-4">{webglError}</p>
          <button
            onClick={() => setWebglError(null)}
            className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Retry WebGL Context
          </button>
        </div>
      ) : (
        <Canvas
          shadows
          camera={{ position: [2.6, 1.5, 3.2], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              setWebglError('WebGL context was lost. Attempting to restore...');
            });
            gl.domElement.addEventListener('webglcontextrestored', () => {
              setWebglError(null);
            });
            onCanvasReady?.();
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Lighting Rig */}
          <SceneLights mode={lighting} />

          {/* Camera Animation Rig */}
          <CameraRig preset={cameraPreset} controlsRef={controlsRef} />

          {/* Interactive Orbit Controls */}
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.06}
            minDistance={1.6}
            maxDistance={6.5}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 2 + 0.05} // Prevent camera clipping beneath floor
            autoRotate={autoRotate}
            autoRotateSpeed={2.0}
            makeDefault
          />

          {/* 3D Model with Floating suspension */}
          <Suspense fallback={<CanvasLoader />}>
            <Float
              speed={autoRotate ? 0 : 1.2}
              rotationIntensity={autoRotate ? 0 : 0.15}
              floatIntensity={autoRotate ? 0 : 0.25}
            >
              <ProductModel
                color={color}
                finish={finish}
                wireframe={wireframe}
                explodedView={explodedView}
                modelUrl={modelUrl}
              />
            </Float>

            {/* Soft Real-time Ground Contact Shadow */}
            <ContactShadows
              position={[0, -1.25, 0]}
              opacity={0.65}
              scale={8}
              blur={2.4}
              far={4}
              resolution={1024}
              color="#09090B"
            />
          </Suspense>
        </Canvas>
      )}

      {/* Floating Canvas Hint / Badge */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-xs text-xs font-medium text-neutral-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>360° Interactive Canvas · Drag to Orbit · Scroll to Zoom</span>
        </div>
      </div>
    </div>
  );
}
