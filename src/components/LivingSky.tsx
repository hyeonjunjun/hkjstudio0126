import { Canvas, useFrame } from "@react-three/fiber";
import { Sky, Cloud, Stars, Sparkles } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

// Mouse Interactivity
function CameraRig() {
    useFrame((state) => {
        // Soft Parallax
        // Determine mouse pos (-1 to 1)
        const x = state.pointer.x;
        const y = state.pointer.y;

        // Lerp camera position slightly
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 2, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 2, 0.05);
        state.camera.lookAt(0, 0, -50);
    });
    return null;
}

// Zelda Breath of the Wild Style Sunset
function BotWSunset() {
    // Rotating particles (Embers/Pollen)
    const sparksRef = useRef<any>(null);
    useFrame((state) => {
        if (sparksRef.current) {
            sparksRef.current.rotation.y += 0.002;
            sparksRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 2;
        }
    });

    return (
        <group>
            {/* THE SKY: Deep Vibrant Sunset */}
            {/* Rayleigh 0.5 = Blue, 4 = Sunset. Mie = Haze */}
            <Sky
                distance={450000}
                sunPosition={[-100, 10, -100]} // Low Horizon
                inclination={0.6}
                azimuth={0.25}
                turbidity={8}
                rayleigh={4}
                mieCoefficient={0.05}
                mieDirectionalG={0.7}
            />

            {/* VOLUMETRIC CLOUDS: Stylized Fluffy Pink/Orange */}
            <group position={[0, -5, -40]}>
                {/* Main Cloud Bank (Warm White/Pink) */}
                <Cloud position={[-20, 10, 0]} speed={0.05} opacity={0.8} segments={30} bounds={[30, 10, 10]} scale={2} color="#ffe4d9" />
                <Cloud position={[20, 5, -10]} speed={0.05} opacity={0.6} segments={30} bounds={[30, 10, 10]} scale={2} color="#ffad7a" />

                {/* Foreground Wisps (Gold) */}
                <Cloud position={[0, -5, 20]} speed={0.1} opacity={0.4} segments={20} bounds={[50, 5, 5]} scale={1.5} color="#ff6b35" />
            </group>

            {/* AMBIENT LIGHTING: Warm Sunset Glow */}
            <ambientLight intensity={1} color="#553344" />
            <pointLight position={[-100, 10, -100]} intensity={2} color="#ffaa00" />

            {/* STARS: Fading in (Twilight) */}
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

            {/* PARTICLES: Floating Embers */}
            <group ref={sparksRef}>
                <Sparkles
                    count={100}
                    scale={30}
                    size={6}
                    speed={0.4}
                    opacity={0.8}
                    color="#ffcc00"
                    position={[0, 5, -20]}
                    noise={1}
                />
            </group>
        </group>
    );
}

export default function LivingSky() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#1a0b1a] transition-colors duration-1000">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <Suspense fallback={null}>
                    <CameraRig />
                    <BotWSunset />
                </Suspense>
            </Canvas>
        </div>
    );
}
