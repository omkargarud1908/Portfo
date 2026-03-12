"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useMemo, useEffect, useState } from "react"
import { Environment } from "@react-three/drei"
import * as THREE from "three"

// Hook to track scroll progress
function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(Math.min(1, Math.max(0, progress)))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollProgress
}

// Stylized PC Monitor
function PCMonitor({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Monitor Screen */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2.4, 1.5, 0.1]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screen Display */}
      <mesh position={[0, 0.3, 0.06]}>
        <boxGeometry args={[2.2, 1.3, 0.01]} />
        <meshStandardMaterial 
          color="#0ea5e9" 
          emissive="#0ea5e9" 
          emissiveIntensity={0.5}
          metalness={0.1}
          roughness={0.5}
        />
      </mesh>
      {/* Monitor Stand */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.3, 0.5, 0.2]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Monitor Base */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[1, 0.08, 0.6]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

// PC Tower/Case
function PCTower({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Main Case */}
      <mesh>
        <boxGeometry args={[0.8, 1.8, 1.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Front Panel */}
      <mesh position={[0.41, 0, 0]}>
        <boxGeometry args={[0.02, 1.6, 1.3]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Power LED */}
      <mesh position={[0.42, 0.6, 0.4]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial 
          color="#22c55e" 
          emissive="#22c55e" 
          emissiveIntensity={2}
        />
      </mesh>
      {/* Side Panel with glow */}
      <mesh position={[0, 0, 0.76]}>
        <boxGeometry args={[0.7, 1.5, 0.02]} />
        <meshStandardMaterial 
          color="#0ea5e9" 
          transparent 
          opacity={0.3}
          emissive="#0ea5e9"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

// Keyboard
function Keyboard({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1.8, 0.08, 0.6]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Key area */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.6, 0.02, 0.5]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

// Mouse
function Mouse({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <capsuleGeometry args={[0.12, 0.2, 8, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Electric Wire with current animation
function ElectricWire({ 
  points, 
  scrollProgress,
  delay = 0,
  color = "#0ea5e9"
}: { 
  points: THREE.Vector3[]
  scrollProgress: number
  delay?: number
  color?: string
}) {
  const tubeRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points)
  }, [points])

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.03, 8, false)
  }, [curve])

  // Particle positions along the curve for electricity effect
  const particleCount = 30
  const particlePositions = useMemo(() => {
    return new Float32Array(particleCount * 3)
  }, [])

  useFrame((state) => {
    if (particlesRef.current && scrollProgress > 0.01) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime
      
      // Adjusted progress with delay
      const adjustedProgress = Math.max(0, (scrollProgress - delay) * 1.5)
      
      for (let i = 0; i < particleCount; i++) {
        // Each particle moves along the curve based on scroll + time
        const t = ((i / particleCount) + time * 0.5 + adjustedProgress * 2) % 1
        const point = curve.getPoint(t)
        
        // Add some random offset for spark effect
        const spark = Math.sin(time * 10 + i) * 0.02
        
        positions[i * 3] = point.x + spark
        positions[i * 3 + 1] = point.y + spark
        positions[i * 3 + 2] = point.z + spark
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }

    // Glow intensity based on scroll
    if (tubeRef.current) {
      const material = tubeRef.current.material as THREE.MeshStandardMaterial
      const intensity = Math.min(1, scrollProgress * 3)
      material.emissiveIntensity = 0.2 + intensity * 0.8
    }
  })

  const adjustedProgress = Math.max(0, (scrollProgress - delay) * 1.5)
  const showParticles = scrollProgress > 0.01

  return (
    <group>
      {/* Wire tube */}
      <mesh ref={tubeRef} geometry={tubeGeometry}>
        <meshStandardMaterial
          color="#334155"
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>
      
      {/* Electric particles */}
      {showParticles && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={particlePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.08}
            color={color}
            transparent
            opacity={Math.min(1, adjustedProgress * 2)}
            sizeAttenuation
          />
        </points>
      )}
      
      {/* Glow orbs along the wire */}
      {showParticles && Array.from({ length: 5 }).map((_, i) => {
        const t = ((i / 5) + adjustedProgress * 2) % 1
        const point = curve.getPoint(t)
        return (
          <mesh key={i} position={[point.x, point.y, point.z]}>
            <sphereGeometry args={[0.05 + Math.sin(i) * 0.02, 8, 8]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={2}
              transparent
              opacity={0.8 * adjustedProgress}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Main connection hub (represents data center / network hub)
function ConnectionHub({ position, scrollProgress }: { position: [number, number, number], scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const glowIntensity = 0.3 + scrollProgress * 0.7

  return (
    <group ref={groupRef} position={position}>
      {/* Central sphere */}
      <mesh>
        <icosahedronGeometry args={[0.5, 2]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={glowIntensity}
          metalness={0.8}
          roughness={0.2}
          wireframe
        />
      </mesh>
      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={glowIntensity * 1.5}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={glowIntensity}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

// Floating data particles in background
function FloatingParticles({ scrollProgress }: { scrollProgress: number }) {
  const count = 150
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
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
        size={0.04}
        color="#38bdf8"
        transparent
        opacity={0.4 + scrollProgress * 0.3}
        sizeAttenuation
      />
    </points>
  )
}

// Scene component that receives scroll progress
function Scene({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()

  useFrame(() => {
    // Subtle camera movement based on scroll
    camera.position.z = 10 - scrollProgress * 2
    camera.position.y = scrollProgress * 1
  })

  // Define wire paths from various points to the PC
  const wirePoints = useMemo(() => ({
    // Wire from top-left hub to monitor
    wire1: [
      new THREE.Vector3(-6, 4, -3),
      new THREE.Vector3(-4, 3, -2),
      new THREE.Vector3(-2, 2, -1),
      new THREE.Vector3(-0.5, 0.5, 0),
    ],
    // Wire from top-right to PC tower
    wire2: [
      new THREE.Vector3(6, 3, -4),
      new THREE.Vector3(4, 2, -2),
      new THREE.Vector3(3, 0.5, -1),
      new THREE.Vector3(2, -0.5, 0),
    ],
    // Wire from bottom-left to keyboard
    wire3: [
      new THREE.Vector3(-5, -3, -5),
      new THREE.Vector3(-3, -2, -3),
      new THREE.Vector3(-1, -1.5, -1),
      new THREE.Vector3(0, -1, 0),
    ],
    // Wire from bottom-right to mouse
    wire4: [
      new THREE.Vector3(5, -4, -4),
      new THREE.Vector3(3, -2.5, -2),
      new THREE.Vector3(2, -1.5, -1),
      new THREE.Vector3(1.5, -1, 0),
    ],
    // Wire from center-back to PC tower
    wire5: [
      new THREE.Vector3(0, 5, -6),
      new THREE.Vector3(0.5, 3, -4),
      new THREE.Vector3(1, 1, -2),
      new THREE.Vector3(2, -0.2, 0),
    ],
    // Additional decorative wires
    wire6: [
      new THREE.Vector3(-7, 0, -8),
      new THREE.Vector3(-5, 1, -5),
      new THREE.Vector3(-3, 0.5, -2),
      new THREE.Vector3(-1, 0, 0),
    ],
  }), [])

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#38bdf8" />
      <pointLight position={[0, 0, 2]} intensity={0.5} color="#0ea5e9" />
      
      <Environment preset="night" />

      {/* PC Setup */}
      <PCMonitor position={[0, 0.5, 0]} />
      <PCTower position={[2.2, -0.2, 0]} />
      <Keyboard position={[0, -1, 0.8]} />
      <Mouse position={[1.5, -1, 0.8]} />

      {/* Connection Hubs at wire origins */}
      <ConnectionHub position={[-6, 4, -3]} scrollProgress={scrollProgress} />
      <ConnectionHub position={[6, 3, -4]} scrollProgress={scrollProgress} />
      <ConnectionHub position={[-5, -3, -5]} scrollProgress={scrollProgress} />
      <ConnectionHub position={[5, -4, -4]} scrollProgress={scrollProgress} />
      <ConnectionHub position={[0, 5, -6]} scrollProgress={scrollProgress} />
      <ConnectionHub position={[-7, 0, -8]} scrollProgress={scrollProgress} />

      {/* Electric Wires */}
      <ElectricWire points={wirePoints.wire1} scrollProgress={scrollProgress} delay={0} color="#0ea5e9" />
      <ElectricWire points={wirePoints.wire2} scrollProgress={scrollProgress} delay={0.05} color="#38bdf8" />
      <ElectricWire points={wirePoints.wire3} scrollProgress={scrollProgress} delay={0.1} color="#06b6d4" />
      <ElectricWire points={wirePoints.wire4} scrollProgress={scrollProgress} delay={0.15} color="#0ea5e9" />
      <ElectricWire points={wirePoints.wire5} scrollProgress={scrollProgress} delay={0.08} color="#38bdf8" />
      <ElectricWire points={wirePoints.wire6} scrollProgress={scrollProgress} delay={0.12} color="#06b6d4" />

      {/* Background particles */}
      <FloatingParticles scrollProgress={scrollProgress} />
    </>
  )
}

export function ThreeBackground() {
  const scrollProgress = useScrollProgress()

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: "transparent" }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60 pointer-events-none" />
    </div>
  )
}
