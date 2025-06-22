// VideoToCanvas.jsx
import React, { useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, KeyboardControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import "./VideoToCanvas.css"; // ← add this line
import { Head3 } from "./head3";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Eye } from "./eye";
import { Experience } from "./Experience";
import { Babe } from "./babe";
import { Crib } from "./crib";

function MouseFollower({ children, yaw = 1, pitch = 1 }) {
  const ref = useRef();

  useFrame(({ pointer }) => {
    if (!ref.current) return;

    // pointer.x  -1 ⟶ 1  (left ⟶ right)
    // pointer.y  -1 ⟶ 1  (bottom ⟶ top)
    ref.current.rotation.y = pointer.x * Math.PI * yaw; // turn head LEFT/RIGHT
    ref.current.rotation.x = -pointer.y * Math.PI * pitch; // look   UP/DOWN
  });

  return <group ref={ref}>{children}</group>;
}
function Mouse() {
  const { mouse } = useThree();

  return useFrame(() => {
    console.log(mouse.x, mouse.y, mouse.z);
  });
}
export default function Landing() {
  const [started, setStarted] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <div className="wrapper">
      {/* Start button */}
      {/* {!started && (
        <button className="start-btn" onClick={() => setStarted(true)}>
          Start
        </button>
      )} */}

      <AnimatePresence>
        {/* Video stage */}
        {/* {started && !showCanvas && (
          <motion.video
            key="video"
            className="video-full"
            src="/vid.mp4"
            autoPlay
            onEnded={() => setShowCanvas(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4 }}
          />
        )} */}

        {/* 3-D canvas stage */}
        {/* {showCanvas && ( */}
        <motion.div
          key="canvas"
          className="canvas-wrapper"
          initial={{ opacity: 4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Canvas camera={{ position: [0, 500, 5] }}>
            <ambientLight intensity={2} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={0.9}
              castShadow
              color={"#EAECED"}
            />
            <Mouse />
            <Crib position={[165, 0, -14]} rotation={[0, 1.56, 0]} />
            <Babe position={[-165, -80, 0]} />
            <MouseFollower yaw={0.2} pitch={0.2}></MouseFollower>
            {/* <Experience /> */}
            {/* <Box /> */}
            <OrbitControls
              makeDefault // tells r3f to use these controls for the active camera
              enableDamping // smooth motion
              dampingFactor={0.13}
              // optional limits
              minPolarAngle={1} // stop at “ground level”
              maxPolarAngle={Math.PI / 2} // no flipping under the scene
            />
          </Canvas>
        </motion.div>
        {/* )} */}
      </AnimatePresence>
    </div>
  );
}
