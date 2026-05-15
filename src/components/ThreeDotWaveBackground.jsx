import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function DotWaveField({ paused }) {
  const pointsRef = useRef();
  const materialRef = useRef();

  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  const { positions, basePositions, count } = useMemo(() => {
    const rows = 58;
    const cols = 105;

    const positions = new Float32Array(rows * cols * 3);
    const basePositions = new Float32Array(rows * cols * 3);

    let index = 0;

    for (let row = 0; row < rows; row++) {
      const z = THREE.MathUtils.lerp(-8.5, 8.5, row / (rows - 1));

      for (let col = 0; col < cols; col++) {
        const x = THREE.MathUtils.lerp(-12.5, 12.5, col / (cols - 1));

        const distanceFromCenter = Math.abs(x) / 12.5;
        const sideCurve = -Math.pow(distanceFromCenter, 1.8) * 0.55;

        const y = sideCurve;

        positions[index] = x;
        positions[index + 1] = y;
        positions[index + 2] = z;

        basePositions[index] = x;
        basePositions[index + 1] = y;
        basePositions[index + 2] = z;

        index += 3;
      }
    }

    return {
      positions,
      basePositions,
      count: rows * cols,
    };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useEffect(() => {
    function handleMouseMove(event) {
      targetMouseRef.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      };
    }

    function handleScroll() {
      scrollRef.current = window.scrollY || 0;
    }

    handleScroll();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;

    const scroll = scrollRef.current;
    const fade = THREE.MathUtils.clamp(1 - scroll / 620, 0, 1);

    materialRef.current.opacity = paused ? 0.12 * fade : 0.38 * fade;

    if (paused) return;

    const time = state.clock.elapsedTime;
    const pos = pointsRef.current.geometry.attributes.position.array;

    mouseRef.current.x +=
      (targetMouseRef.current.x - mouseRef.current.x) * 0.045;
    mouseRef.current.y +=
      (targetMouseRef.current.y - mouseRef.current.y) * 0.045;

    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    const scrollWave = scroll * 0.00045;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      const x = basePositions[idx];
      const z = basePositions[idx + 2];

      const distance = Math.sqrt(x * x + z * z);

      const waveOne =
        Math.sin(x * 0.62 + z * 0.54 + time * 0.58 + scrollWave) * 0.34;

      const waveTwo =
        Math.cos(x * 0.34 - z * 0.68 + time * 0.42) * 0.22;

      const waveThree = Math.sin(distance * 0.58 - time * 0.55) * 0.14;

      const mouseWave =
        Math.sin(
          (x + mouseX * 3.5) * 0.55 +
            (z + mouseY * 2.8) * 0.55 +
            time
        ) * 0.11;

      pos[idx + 1] =
        basePositions[idx + 1] +
        waveOne +
        waveTwo +
        waveThree +
        mouseWave;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    pointsRef.current.position.z = -2.4;
    pointsRef.current.position.y = -1.15 - scroll * 0.00055;

    pointsRef.current.rotation.x =
      -0.95 + Math.sin(time * 0.12) * 0.02 + mouseY * 0.025;

    pointsRef.current.rotation.z = mouseX * 0.02;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        color="#ffffff"
        size={0.036}
        sizeAttenuation
        transparent
        opacity={0.38}
        depthWrite={false}
      />
    </points>
  );
}

function ThreeDotWaveBackground({ paused = false }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
      <Canvas
        camera={{
          position: [0, 2.7, 7.5],
          fov: 58,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.25]}
      >
        <fog attach="fog" args={["#000000", 5.5, 17]} />
        <DotWaveField paused={paused} />
      </Canvas>
    </div>
  );
}

export default ThreeDotWaveBackground;