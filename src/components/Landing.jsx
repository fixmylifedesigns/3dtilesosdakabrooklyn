// VideoToCanvas.jsx
import React, { useState, useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MapControls, Mask, useMask } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import "./VideoToCanvas.css";
import * as THREE from "three";
import confetti from "canvas-confetti";
import image from "./image.png";

// scene assets
import { Babe } from "./babe";
import { Crib } from "./crib";
import { Heart } from "./heart";
import { Ily } from "./ily";

/** HeartMask — stencil mask helper */
function HeartMask({ children, y = 0.01 }) {
  const heartShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 2.5);
    s.bezierCurveTo(0, 2.5, -2, 0, -5, 0);
    s.bezierCurveTo(-13, 0, -13, 8, -13, 8);
    s.bezierCurveTo(-13, 14, -7, 19, 0, 24);
    s.bezierCurveTo(7, 19, 13, 14, 13, 8);
    s.bezierCurveTo(13, 8, 13, 0, 5, 0);
    s.bezierCurveTo(2, 0, 0, 2.5, 0, 2.5);
    return s;
  }, []);
  const stencil = useMask(1);
  return (
    <>
      <Mask id={1}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
          <shapeGeometry args={[heartShape]} />
          <meshBasicMaterial colorWrite={false} depthWrite={false} />
        </mesh>
      </Mask>
      <group {...stencil}>{children}</group>
    </>
  );
}

/** MouseFollower — turns a group based on pointer delta */
function MouseFollower({ children, yaw = 1, pitch = 1 }) {
  const ref = useRef();
  useFrame(({ pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = pointer.x * Math.PI * yaw;
    ref.current.rotation.x = -pointer.y * Math.PI * pitch;
  });
  return <group ref={ref}>{children}</group>;
}

export default function Landing() {
  const [started, setStarted] = useState(false);
  const [balloon, setBalloon] = useState(60);

  /** trigger a confetti burst at the middle of the screen */
  const fireConfetti = useCallback(() => {
    if (balloon < 120) {
      setBalloon(balloon + 20);
    } else {
      setBalloon(60);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
      });
    }
  }, [balloon]);

  return (
    <div className="wrapper">
      <AnimatePresence mode="wait">
        {/* ---- INTRO CARD ---- */}
        {!started && (
          <motion.div
            key="intro-card"
            className="intro-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={image} alt="us" className="intro-img" />
            <p className="intro-text">
              いつもそばにいてくれてありがとう。これからもずっと一緒だよ。
            </p>
            <motion.button
              className="start-btn cute"
              onClick={() => setStarted(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              はじめよう♡
            </motion.button>
          </motion.div>
        )}

        {/* ---- CANVAS STAGE ---- */}
        {started && (
          <motion.div
            key="canvas-stage"
            className="canvas-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Canvas
              camera={{ position: [0, 500, 5] }}
              rotation={[0, 1.56, 0]}
              gl={{ stencil: true }}
            >
              {/* lighting */}
              <ambientLight intensity={2} />
              <directionalLight
                position={[5, 5, 5]}
                intensity={0.9}
                castShadow
                color="#EAECED"
              />

              {/* controls */}
              <MapControls />
              <OrbitControls
                makeDefault
                enableDamping
                dampingFactor={0.13}
                minPolarAngle={1}
                maxPolarAngle={Math.PI / 2}
              />

              {/* heart-clipped flat map */}
              <HeartMask y={0.05}>
                <Crib position={[165, 0, -14]} rotation={[0, 1.56, 0]} />
              </HeartMask>

              {/* other models */}
              <Babe position={[-165, -80, 0]} />
              <MouseFollower yaw={0.2} pitch={0.2}>
                {/* Ily acts as the trigger: onClick → confetti burst */}
                <Ily
                  position={[20, 20, -14]}
                  scale={[balloon, balloon, balloon]}
                  onClick={fireConfetti}
                  onPointerMissed={(e) => e.stopPropagation()}
                />
              </MouseFollower>

              {/* decorative hearts */}
              <Heart
                color="#ff7373"
                position={[-5, 4, -14]}
                scale={[30, 30, 30]}
              />
              <Heart
                color="#ff7373"
                position={[45, 8, 15]}
                scale={[30, 30, 30]}
              />
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
