"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

// ─── Steam particle ───────────────────────────────────────────

function SteamParticle({
  offset,
  speed,
  x,
}: {
  offset: number;
  speed: number;
  x: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.y = -0.4 + ((t * 0.35) % 1.8);
    ref.current.position.x = x + Math.sin(t * 1.4) * 0.12;
    (ref.current.material as THREE.MeshStandardMaterial).opacity = 0.18 - (((t * 0.35) % 1.8) / 1.8) * 0.18;
  });
  return (
    <mesh ref={ref} position={[x, -0.4, 0.1]}>
      <sphereGeometry args={[0.07, 8, 8]} />
      <meshStandardMaterial
        color="#f5ede0"
        transparent
        opacity={0.15}
        roughness={1}
      />
    </mesh>
  );
}

// ─── Inner 3D Scene ───────────────────────────────────────────

function HeroScene() {
  const plateRef = useRef<THREE.Mesh>(null);
  const glassRef = useRef<THREE.Group>(null);
  const herb1Ref = useRef<THREE.Mesh>(null);
  const herb2Ref = useRef<THREE.Mesh>(null);
  const herb3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll =
      typeof document !== "undefined"
        ? Math.max(document.body.scrollHeight - window.innerHeight, 1)
        : 1;
    const progress = scrollY / maxScroll;

    // Plate slow rotation
    if (plateRef.current) {
      plateRef.current.rotation.y = t * 0.08;
    }

    // Wine glass gentle sway
    if (glassRef.current) {
      glassRef.current.rotation.z = Math.sin(t * 0.6) * 0.04;
    }

    // Floating herbs drift
    if (herb1Ref.current) {
      herb1Ref.current.position.y = 1.2 + Math.sin(t * 0.7) * 0.18;
      herb1Ref.current.rotation.z = t * 0.4;
    }
    if (herb2Ref.current) {
      herb2Ref.current.position.y = 0.8 + Math.sin(t * 0.5 + 1.2) * 0.2;
      herb2Ref.current.rotation.z = -t * 0.3;
    }
    if (herb3Ref.current) {
      herb3Ref.current.position.y = 1.5 + Math.sin(t * 0.9 + 2.5) * 0.15;
      herb3Ref.current.rotation.y = t * 0.5;
    }

    // Scroll-driven camera drift
    state.camera.position.y = progress * -1.5;
  });

  return (
    <>
      {/* Warm restaurant lighting */}
      <ambientLight intensity={0.3} color="#ffe4c4" />
      <directionalLight position={[4, 8, 4]} intensity={1.1} color="#fff3e0" />
      <pointLight position={[-3, 2, 2]} color="#ff8c42" intensity={0.6} />
      {/* Candle warm glow from below */}
      <pointLight position={[2.4, -1.5, 1.5]} color="#ff6b2b" intensity={0.9} />

      {/* ── Dinner plate ── */}
      <group position={[0, -0.6, 0]}>
        {/* Plate base */}
        <mesh ref={plateRef} rotation={[Math.PI * 0.05, 0, 0]}>
          <cylinderGeometry args={[1.75, 1.6, 0.07, 64]} />
          <meshStandardMaterial
            color="#faf6f0"
            metalness={0.1}
            roughness={0.35}
          />
        </mesh>
        {/* Plate rim ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.72, 0.07, 16, 80]} />
          <meshStandardMaterial
            color="#e8dccb"
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
        {/* Food item — herb garnish disk in centre */}
        <mesh position={[0, 0.06, 0]} rotation={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.55, 0.5, 0.06, 32]} />
          <meshStandardMaterial color="#6b8e5a" roughness={0.9} />
        </mesh>
      </group>

      {/* Steam rising above plate */}
      <SteamParticle offset={0} speed={1.0} x={-0.18} />
      <SteamParticle offset={1.1} speed={0.85} x={0.05} />
      <SteamParticle offset={2.3} speed={1.2} x={0.22} />
      <SteamParticle offset={0.7} speed={0.95} x={-0.08} />

      {/* ── Wine glass (right side) ── */}
      <group ref={glassRef} position={[2.8, -0.1, -1.2]}>
        {/* Bowl (cone) */}
        <mesh position={[0, 0.55, 0]}>
          <coneGeometry args={[0.42, 0.85, 32, 1, true]} />
          <meshPhysicalMaterial
            color="#c8e6c9"
            transparent
            opacity={0.35}
            roughness={0.05}
            metalness={0}
            transmission={0.6}
            thickness={0.4}
          />
        </mesh>
        {/* Rim top of bowl */}
        <mesh position={[0, 0.97, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.018, 12, 40]} />
          <meshStandardMaterial color="#a5d6a7" roughness={0.2} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 1.2, 12]} />
          <meshPhysicalMaterial
            color="#e0f0e0"
            transparent
            opacity={0.5}
            roughness={0.05}
          />
        </mesh>
        {/* Base */}
        <mesh position={[0, -0.88, 0]}>
          <cylinderGeometry args={[0.3, 0.28, 0.045, 32]} />
          <meshPhysicalMaterial
            color="#e0f0e0"
            transparent
            opacity={0.55}
            roughness={0.1}
          />
        </mesh>
        {/* Wine fill */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.3, 0.05, 0.5, 32]} />
          <meshStandardMaterial
            color="#8b1a1a"
            transparent
            opacity={0.7}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* ── Candle (left side) ── */}
      <group position={[-2.6, -0.4, -1.0]}>
        {/* Candle body */}
        <mesh>
          <cylinderGeometry args={[0.14, 0.14, 1.1, 20]} />
          <meshStandardMaterial color="#fdfaf3" roughness={0.9} />
        </mesh>
        {/* Flame */}
        <Float speed={4} floatIntensity={0.15} rotationIntensity={0.1}>
          <mesh position={[0, 0.65, 0]}>
            <sphereGeometry args={[0.085, 12, 12]} />
            <meshStandardMaterial
              color="#ffb347"
              emissive="#ff6000"
              emissiveIntensity={2.5}
              roughness={1}
            />
          </mesh>
        </Float>
      </group>

      {/* ── Floating herbs / olives ── */}
      {/* Olive/herb 1 — elongated, deep green */}
      <mesh
        ref={herb1Ref}
        position={[-1.8, 1.2, -0.5]}
        scale={[0.14, 0.22, 0.14]}
      >
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#4a7c3f" roughness={0.85} />
      </mesh>
      {/* Herb sprig 2 — lighter green, wider */}
      <mesh
        ref={herb2Ref}
        position={[1.4, 0.8, -0.8]}
        scale={[0.2, 0.12, 0.12]}
      >
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#7cad5f" roughness={0.9} />
      </mesh>
      {/* Herb 3 — tiny, accent */}
      <mesh ref={herb3Ref} position={[-0.5, 1.5, 0.6]} scale={[0.1, 0.16, 0.1]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial color="#557a42" roughness={0.8} />
      </mesh>
    </>
  );
}

// ─── Fallback gradient ────────────────────────────────────────

function HeroFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 60% 40%, #4a1a0f 0%, #2d1b10 50%, #1a0c07 100%)",
      }}
    />
  );
}

// ─── Public export ────────────────────────────────────────────

export default function ThreeHeroScene() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <HeroFallback />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Suspense fallback={<HeroFallback />}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 52 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: "transparent" }}
          aria-hidden="true"
        >
          <HeroScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
