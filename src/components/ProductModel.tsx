/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ProductColor, MaterialFinish } from '../types/product';

interface ProductModelProps {
  color: ProductColor;
  finish: MaterialFinish;
  wireframe: boolean;
  explodedView: boolean;
  modelUrl?: string | null;
  onModelLoaded?: () => void;
}

// Error Boundary for GLTF loader
class GLTFErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode; onError?: () => void },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode; onError?: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('GLTF failed to load, falling back to procedural Proto X1 model:', error);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Sub-component for loading external GLTF / GLB models
function GLBModel({
  url,
  color,
  finish,
  wireframe,
  onLoaded,
}: {
  url: string;
  color: ProductColor;
  finish: MaterialFinish;
  wireframe: boolean;
  onLoaded?: () => void;
}) {
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    onLoaded?.();
  }, [onLoaded]);

  // Adjust materials whenever color, finish, or wireframe change
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
              mat.wireframe = wireframe;
              // If material looks like primary body or named appropriately
              const matName = mat.name.toLowerCase();
              if (
                matName.includes('custom') ||
                matName.includes('body') ||
                matName.includes('color') ||
                matName.includes('shell') ||
                matName.includes('case') ||
                matName === 'material' ||
                matName === ''
              ) {
                mat.color.set(color.threeColor);
                if (finish === 'metallic') {
                  mat.metalness = 0.9;
                  mat.roughness = 0.2;
                } else if (finish === 'matte') {
                  mat.metalness = 0.1;
                  mat.roughness = 0.65;
                } else {
                  // satin
                  mat.metalness = 0.6;
                  mat.roughness = 0.35;
                }
              }
              mat.needsUpdate = true;
            }
          });
        }
      }
    });
  }, [clonedScene, color, finish, wireframe]);

  return <primitive object={clonedScene} position={[0, -0.2, 0]} scale={1.2} />;
}

// Procedural High-Fidelity Studio Model (Proto X1)
export function ProceduralProductModel({
  color,
  finish,
  wireframe,
  explodedView,
}: {
  color: ProductColor;
  finish: MaterialFinish;
  wireframe: boolean;
  explodedView: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const leftCupRef = useRef<THREE.Group>(null);
  const rightCupRef = useRef<THREE.Group>(null);
  const leftDriverRef = useRef<THREE.Group>(null);
  const rightDriverRef = useRef<THREE.Group>(null);
  const leftCushionRef = useRef<THREE.Mesh>(null);
  const rightCushionRef = useRef<THREE.Mesh>(null);
  const leftCapRef = useRef<THREE.Group>(null);
  const rightCapRef = useRef<THREE.Group>(null);

  // Smooth exploded view progression interpolation
  const explodeFactor = useRef(0);

  useFrame((_, delta) => {
    const target = explodedView ? 1 : 0;
    explodeFactor.current = THREE.MathUtils.damp(explodeFactor.current, target, 4, delta);
    const f = explodeFactor.current;

    // Expand outer assemblies outward
    if (leftCupRef.current) leftCupRef.current.position.x = -1.25 - f * 0.45;
    if (rightCupRef.current) rightCupRef.current.position.x = 1.25 + f * 0.45;

    // Disassemble inner driver components along lateral axis
    if (leftDriverRef.current) leftDriverRef.current.position.x = -0.05 - f * 0.35;
    if (rightDriverRef.current) rightDriverRef.current.position.x = 0.05 + f * 0.35;

    // Cushions move toward the center/inward
    if (leftCushionRef.current) leftCushionRef.current.position.x = 0.22 + f * 0.3;
    if (rightCushionRef.current) rightCushionRef.current.position.x = -0.22 - f * 0.3;

    // Outer decorative caps drift outward
    if (leftCapRef.current) leftCapRef.current.position.x = -0.25 - f * 0.4;
    if (rightCapRef.current) rightCapRef.current.position.x = 0.25 + f * 0.4;
  });

  // Material parameters based on finish and selected color
  const metalnessValue =
    finish === 'metallic' ? 0.92 : finish === 'matte' ? 0.15 : 0.65;
  const roughnessValue =
    finish === 'metallic' ? 0.22 : finish === 'matte' ? 0.68 : 0.38;

  // Headband arch curve
  const archCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.18, 0.3, 0),
      new THREE.Vector3(-0.95, 1.2, 0),
      new THREE.Vector3(0, 1.45, 0),
      new THREE.Vector3(0.95, 1.2, 0),
      new THREE.Vector3(1.18, 0.3, 0),
    ]);
  }, []);

  const cushionCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.75, 1.25, 0),
      new THREE.Vector3(0, 1.42, 0),
      new THREE.Vector3(0.75, 1.25, 0),
    ]);
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.45, 0]} dispose={null}>
      {/* Headband Steel Arch */}
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[archCurve, 64, 0.075, 16, false]} />
        <meshStandardMaterial
          color="#C2C7CF"
          metalness={0.95}
          roughness={0.2}
          wireframe={wireframe}
        />
      </mesh>

      {/* Headband Ergonomic Padding */}
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[cushionCurve, 32, 0.11, 16, false]} />
        <meshStandardMaterial
          color="#18181B"
          roughness={0.85}
          metalness={0.1}
          wireframe={wireframe}
        />
      </mesh>

      {/* Left Ear Assembly */}
      <group ref={leftCupRef} position={[-1.25, 0.1, 0]}>
        {/* Gimbal Stem */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.5, 20]} />
          <meshStandardMaterial
            color="#A1A1AA"
            metalness={0.9}
            roughness={0.25}
            wireframe={wireframe}
          />
        </mesh>

        {/* Outer Yoke Fork */}
        <mesh position={[0, 0.05, 0]} rotation={[0, 0, Math.PI]} castShadow>
          <torusGeometry args={[0.5, 0.04, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#A1A1AA"
            metalness={0.9}
            roughness={0.25}
            wireframe={wireframe}
          />
        </mesh>

        {/* Main Acoustic Housing Shell (Customizable Material) */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.48, 0.5, 0.32, 64]} />
          <meshStandardMaterial
            color={color.threeColor}
            metalness={metalnessValue}
            roughness={roughnessValue}
            wireframe={wireframe}
          />
        </mesh>

        {/* Outer Chamfer Ring Accent */}
        <mesh position={[-0.14, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <torusGeometry args={[0.485, 0.025, 16, 48]} />
          <meshStandardMaterial
            color="#E4E4E7"
            metalness={0.95}
            roughness={0.15}
            wireframe={wireframe}
          />
        </mesh>

        {/* Outer Cap & Grill Group (animates on explode) */}
        <group ref={leftCapRef}>
          {/* Decorative Outer Dial Plate */}
          <mesh position={[-0.17, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.34, 0.34, 0.04, 32]} />
            <meshStandardMaterial
              color={color.threeColor}
              metalness={metalnessValue}
              roughness={roughnessValue}
              wireframe={wireframe}
            />
          </mesh>

          {/* Micro-perforated Acoustic Center Grill */}
          <mesh position={[-0.192, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.015, 32]} />
            <meshStandardMaterial
              color="#27272A"
              metalness={0.7}
              roughness={0.5}
              wireframe={wireframe}
            />
          </mesh>
        </group>

        {/* Internal Acoustic Driver Sub-assembly */}
        <group ref={leftDriverRef}>
          {/* Driver Mount Ring */}
          <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <ringGeometry args={[0.18, 0.38, 32]} />
            <meshStandardMaterial
              color="#3F3F46"
              metalness={0.8}
              roughness={0.3}
              wireframe={wireframe}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Beryllium Diaphragm Core */}
          <mesh position={[0.02, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <circleGeometry args={[0.16, 32]} />
            <meshStandardMaterial
              color="#F59E0B"
              metalness={0.95}
              roughness={0.15}
              wireframe={wireframe}
            />
          </mesh>
        </group>

        {/* Soft Memory Foam Ear Cushion */}
        <mesh
          ref={leftCushionRef}
          position={[0.22, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          castShadow
        >
          <torusGeometry args={[0.42, 0.15, 32, 48]} />
          <meshStandardMaterial
            color="#141416"
            roughness={0.9}
            metalness={0.05}
            wireframe={wireframe}
          />
        </mesh>
      </group>

      {/* Right Ear Assembly */}
      <group ref={rightCupRef} position={[1.25, 0.1, 0]}>
        {/* Gimbal Stem */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.5, 20]} />
          <meshStandardMaterial
            color="#A1A1AA"
            metalness={0.9}
            roughness={0.25}
            wireframe={wireframe}
          />
        </mesh>

        {/* Outer Yoke Fork */}
        <mesh position={[0, 0.05, 0]} rotation={[0, 0, Math.PI]} castShadow>
          <torusGeometry args={[0.5, 0.04, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#A1A1AA"
            metalness={0.9}
            roughness={0.25}
            wireframe={wireframe}
          />
        </mesh>

        {/* Main Acoustic Housing Shell (Customizable Material) */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.48, 0.5, 0.32, 64]} />
          <meshStandardMaterial
            color={color.threeColor}
            metalness={metalnessValue}
            roughness={roughnessValue}
            wireframe={wireframe}
          />
        </mesh>

        {/* Outer Chamfer Ring Accent */}
        <mesh position={[0.14, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <torusGeometry args={[0.485, 0.025, 16, 48]} />
          <meshStandardMaterial
            color="#E4E4E7"
            metalness={0.95}
            roughness={0.15}
            wireframe={wireframe}
          />
        </mesh>

        {/* Outer Cap & Grill Group (animates on explode) */}
        <group ref={rightCapRef}>
          {/* Decorative Outer Dial Plate */}
          <mesh position={[0.17, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.34, 0.34, 0.04, 32]} />
            <meshStandardMaterial
              color={color.threeColor}
              metalness={metalnessValue}
              roughness={roughnessValue}
              wireframe={wireframe}
            />
          </mesh>

          {/* Micro-perforated Acoustic Center Grill */}
          <mesh position={[0.192, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.015, 32]} />
            <meshStandardMaterial
              color="#27272A"
              metalness={0.7}
              roughness={0.5}
              wireframe={wireframe}
            />
          </mesh>

          {/* Tactile Rotary Crown Controller on Right Ear Cup */}
          <mesh position={[0.15, 0.38, 0.16]} rotation={[0.4, 0, -0.3]} castShadow>
            <cylinderGeometry args={[0.075, 0.075, 0.1, 24]} />
            <meshStandardMaterial
              color="#D4D4D8"
              metalness={0.95}
              roughness={0.2}
              wireframe={wireframe}
            />
          </mesh>

          {/* Status Power / Pairing LED (Emissive indicator) */}
          <mesh position={[0.18, -0.32, 0.1]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial
              color="#3B82F6"
              emissive="#2563EB"
              emissiveIntensity={1.8}
            />
          </mesh>
        </group>

        {/* Internal Acoustic Driver Sub-assembly */}
        <group ref={rightDriverRef}>
          {/* Driver Mount Ring */}
          <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <ringGeometry args={[0.18, 0.38, 32]} />
            <meshStandardMaterial
              color="#3F3F46"
              metalness={0.8}
              roughness={0.3}
              wireframe={wireframe}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Beryllium Diaphragm Core */}
          <mesh position={[-0.02, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <circleGeometry args={[0.16, 32]} />
            <meshStandardMaterial
              color="#F59E0B"
              metalness={0.95}
              roughness={0.15}
              wireframe={wireframe}
            />
          </mesh>
        </group>

        {/* Soft Memory Foam Ear Cushion */}
        <mesh
          ref={rightCushionRef}
          position={[-0.22, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          castShadow
        >
          <torusGeometry args={[0.42, 0.15, 32, 48]} />
          <meshStandardMaterial
            color="#141416"
            roughness={0.9}
            metalness={0.05}
            wireframe={wireframe}
          />
        </mesh>
      </group>
    </group>
  );
}

// Master Product Model component that switches gracefully between external GLTF or procedural model
export default function ProductModel({
  color,
  finish,
  wireframe,
  explodedView,
  modelUrl,
  onModelLoaded,
}: ProductModelProps) {
  const [hasGLBError, setHasGLBError] = useState(false);

  // If a custom model URL is provided and has not failed, attempt to load it
  if (modelUrl && !hasGLBError) {
    return (
      <GLTFErrorBoundary
        onError={() => setHasGLBError(true)}
        fallback={
          <ProceduralProductModel
            color={color}
            finish={finish}
            wireframe={wireframe}
            explodedView={explodedView}
          />
        }
      >
        <GLBModel
          url={modelUrl}
          color={color}
          finish={finish}
          wireframe={wireframe}
          onLoaded={onModelLoaded}
        />
      </GLTFErrorBoundary>
    );
  }

  // Otherwise, render the precision-engineered Proto X1 studio model
  return (
    <ProceduralProductModel
      color={color}
      finish={finish}
      wireframe={wireframe}
      explodedView={explodedView}
    />
  );
}
