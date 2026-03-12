"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import { Float, MeshDistortMaterial, GradientTexture, Environment } from "@react-three/drei"
import * as THREE from "three"

function AnimatedBlob({ 
  position, 
  scale = 1, 
  color1, 
  color2, 
  speed = 1, 
  distort = 0.4,
  floatIntensity = 1
}: { 
  position: [number, number, number]
  scale?: number
  color1: string
  color2: string
  speed?: number
  distort?: number
  floatIntensity?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.2
      meshRef.current.rotation.y += 0.003 * speed
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2 * speed) * 0.1
    }
  })

  return (
    <Float 
      speed={2 * speed} 
      rotationIntensity={0.5} 
      floatIntensity={floatIntensity}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          distort={distort}
          speed={2 * speed}
          roughness={0.2}
          metalness={0.8}
        >
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={[color1, color2, color1]}
          />
        </MeshDistortMaterial>
      </mesh>
    </Float>
  )
}

function TorusKnotShape({ 
  position, 
  scale = 1, 
  color,
  speed = 1
}: {
  position: [number, number, number]
  scale?: number
  color: string
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * speed
      meshRef.current.rotation.y += 0.003 * speed
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusKnotGeometry args={[1, 0.3, 128, 32, 2, 3]} />
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  )
}

function RingShape({
  position,
  scale = 1,
  color,
  speed = 1
}: {
  position: [number, number, number]
  scale?: number
  color: string
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 * speed) * Math.PI * 0.25
      meshRef.current.rotation.y += 0.005 * speed
    }
  })

  return (
    <Float speed={2 * speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.15, 32, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.85}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  )
}

function SphereWire({
  position,
  scale = 1,
  color,
  speed = 1
}: {
  position: [number, number, number]
  scale?: number
  color: string
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002 * speed
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    }
  })

  return (
    <Float speed={1.8 * speed} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={color}
          wireframe
          roughness={0.3}
          metalness={0.7}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const count = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#38bdf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#38bdf8" />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#0ea5e9" />
      
      <Environment preset="night" />
      
      {/* Main central blob */}
      <AnimatedBlob
        position={[0, 0, -2]}
        scale={2.5}
        color1="#0ea5e9"
        color2="#38bdf8"
        speed={0.8}
        distort={0.5}
        floatIntensity={1.5}
      />
      
      {/* Secondary blobs */}
      <AnimatedBlob
        position={[-4, 2, -5]}
        scale={1.2}
        color1="#06b6d4"
        color2="#0891b2"
        speed={1.2}
        distort={0.4}
        floatIntensity={1}
      />
      
      <AnimatedBlob
        position={[4, -1.5, -4]}
        scale={1}
        color1="#0284c7"
        color2="#0369a1"
        speed={0.9}
        distort={0.35}
        floatIntensity={1.2}
      />
      
      {/* Torus knot */}
      <TorusKnotShape
        position={[-3, -2, -6]}
        scale={0.6}
        color="#38bdf8"
        speed={0.7}
      />
      
      {/* Rings */}
      <RingShape
        position={[3.5, 2.5, -5]}
        scale={1.3}
        color="#0ea5e9"
        speed={1}
      />
      
      <RingShape
        position={[-2, 3, -7]}
        scale={0.8}
        color="#06b6d4"
        speed={0.8}
      />
      
      {/* Wireframe spheres */}
      <SphereWire
        position={[5, -2, -8]}
        scale={1.5}
        color="#38bdf8"
        speed={0.6}
      />
      
      <SphereWire
        position={[-5, 1, -9]}
        scale={1.2}
        color="#0ea5e9"
        speed={0.5}
      />
      
      {/* Particle field */}
      <ParticleField />
    </>
  )
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50 pointer-events-none" />
    </div>
  )
}
