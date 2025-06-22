// VideoToCanvas.jsx
import React, { useState, useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MapControls, Mask, useMask } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import "./VideoToCanvas.css";
import confetti from "canvas-confetti";
import image from "./image.png";

// scene assets
import { Babe } from "./babe";
import { Crib } from "./crib";
import { Heart } from "./heart";
import { Ily } from "./ily";
import { Brooklyn } from "./brooklyn";
import { Osaka } from "./osaka";
import { Im } from "./im";

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
  const [design, setDesign] = useState(1);

  /** trigger a confetti burst at the middle of the screen */
  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
    });

    if (balloon < 120) {
      setBalloon(balloon + 20);
      setDesign(design + 1);
    } else {
      setBalloon(60);
      setDesign(1);
    }
  }, [balloon]);

  const BalloonDesign = (props) => {
    switch (design) {
      case 1:
        return <Ily {...props} />;
      case 2:
        return <Im {...props} />;
      case 3:
        return <Osaka {...props} />;
      default:
        return <Brooklyn {...props} position={[20, 50, 0]}/>;
    }
  };

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
              camera={{ position: [0, 500, 5], near: 0.1, far: 7000 }}
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
                maxDistance={800}
              />

              {/* heart-clipped flat map */}

              <Crib position={[165, 0, -14]} rotation={[0, 1.56, 0]} />

              {/* other models */}
              <Babe position={[-165, -80, 0]} />
              <MouseFollower yaw={0.2} pitch={0.2}>
                {/* Ily acts as the trigger: onClick → confetti burst */}
                <BalloonDesign
                  position={[20, 30, 0]}
                  scale={[balloon, balloon, balloon]}
                  onClick={fireConfetti}
                  onPointerMissed={(e) => e.stopPropagation()}
                />
                {/* <Ily
                  position={[20, 20, -14]}
                  scale={[balloon, balloon, balloon]}
                  onClick={fireConfetti}
                  onPointerMissed={(e) => e.stopPropagation()}
                /> */}
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
