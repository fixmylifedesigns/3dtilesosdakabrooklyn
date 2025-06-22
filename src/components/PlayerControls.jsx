// PlayerControls.tsx
import { useThree, useFrame } from "@react-three/fiber";
import { PointerLockControls, useKeyboardControls } from "@react-three/drei";
import { useRef } from "react";
import { Vector3 } from "three";

export default function PlayerControls() {
  const { camera } = useThree();
  const keys = useKeyboardControls();
  const vel = useRef(new Vector3());
  const dir = useRef(new Vector3());
  const speed = 8; // metres-per-second walk speed

  useFrame((_, delta) => {
    // translate key state -> local direction vector
    const [forward, left, back, right] = keys;
    dir.current.set(right - left, 0, back - forward).normalize();

    // move only if a key is pressed
    if (dir.current.lengthSq() !== 0) {
      // get camera-relative unit vectors
      camera.getWorldDirection(vel.current); // “forward”
      vel.current.y = 0;
      vel.current.normalize();

      const rightVec = vel.current.clone().cross(camera.up);

      // combine forward / sideways
      const move = new Vector3()
        .addScaledVector(vel.current, -dir.current.z) // forward/back
        .addScaledVector(rightVec, dir.current.x); // left/right

      camera.position.addScaledVector(move, speed * delta);
    }
  });

  // click canvas to lock, Esc to release
  return <PointerLockControls makeDefault />; // drei wrapper around three.js controls
}
