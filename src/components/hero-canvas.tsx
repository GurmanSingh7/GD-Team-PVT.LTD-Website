"use client";

import { Float, MeshDistortMaterial, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function CoreObject() {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.18;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.28;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.45} floatIntensity={0.7}>
      <mesh ref={mesh} scale={1.5}>
        <icosahedronGeometry args={[1.2, 3]} />
        <MeshDistortMaterial
          color="#7dd3fc"
          distort={0.22}
          speed={1.7}
          roughness={0.18}
          metalness={0.72}
          emissive="#172554"
          emissiveIntensity={0.28}
        />
      </mesh>
    </Float>
  );
}

function Ring({ scale, speed }: { scale: number; speed: number }) {
  const mesh = useRef<Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = state.clock.elapsedTime * speed;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.25;
  });

  return (
    <mesh ref={mesh} scale={scale}>
      <torusGeometry args={[1.35, 0.01, 16, 160]} />
      <meshBasicMaterial color="#e879f9" transparent opacity={0.42} />
    </mesh>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.7]}>
        <ambientLight intensity={0.8} />
        <pointLight position={[3, 2, 4]} intensity={25} color="#67e8f9" />
        <pointLight position={[-4, -2, 3]} intensity={14} color="#e879f9" />
        <Stars radius={45} depth={22} count={650} factor={3.5} fade speed={0.45} />
        <group position={[1.4, 0.05, 0]}>
          <CoreObject />
          <Ring scale={1.22} speed={0.32} />
          <Ring scale={1.56} speed={-0.22} />
        </group>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
      </Canvas>
    </div>
  );
}

