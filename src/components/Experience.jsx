import { Cylinder, OrbitControls } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { Torii } from "./torii";
import { Sunflower } from "./sunflower";
import { Island } from "./island";
import { Statue } from "./statue";
import { Column } from "./column";
import { Grass } from "./grass";
export const Experience = () => {
  const flowersPosition = [
    [1, 0.1, 3],
    [1.3, 0.1, 4],
    [-1, 0.1, 3],
    [-2.3, 0.2, 4],
    [1.5, 0.1, 3],
    [1.3, 0.1, 4.4],
    [4, -0.2, 3.3],
    [-2.3, 0.2, 3],

    [-1, 0.1, -3],
    [-1.3, 0.1, -4],
    [-1, 0.1, -3],
    [-3, -0.2, -4],
    [-1.5, 0.1, -3],
    [1.3, 0.1, -4.4],
    [-1, 0.1, 3],
    [-2.3, -0.1, -3],

    [-1, 0.1, -3],
    [-1.3, 0.1, -4],
    [-1, -0.1, -3],
    [-3, -0.1, -2],
    [-1.5, 0.1, -3],
    [1.3, -0.1, -4.4],
    [-1.3, -0.1, 4.4],
    [-2.3, -0.02, -1],

    [2, -0.1, -3],
    // [2.3, -0.1, -2],
    [4, -0.3, -3],
    // [-3, 0.2, -4],
    [-1.5, 0.1, -3],
    [1.3, 0.1, -4.4],
    [-1.3, 0.1, 4.4],
    [-2.3, 0.2, -1],
  ];

  return (
    <group scale={[0.4, 0.4, 0.4]}  position={[0, -0.1, 0]}><OrbitControls />
       <group scale={[0.1, 0.1, 0.1]}> 
      
      <ambientLight intensity={1} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        color={"#9e69da"}
      />
      <Torii
        scale={[16, 16, 16]}
        position={[0, 3.2, -4]}
        rotation-y={[1.25 * Math.PI]}
      />
      <Statue scale={[0.01, 0.01, 0.01]} position={[-1.3, 1.7, 1.2]} />
      <Island scale={[16, 16, 16]} position={[0, -8.8, 0]} />
      {flowersPosition.map((i) => (
        <Sunflower scale={[0.2, 0.2, 0.2]} position={[i[0], i[1], i[2]]} />
      ))}
      <Sunflower scale={[0.2, 0.2, 0.2]} position={[2, 0, 0]} />
      <Grass />
      <Column scale={[1, 1, 1]} position={[0, -0.06, 0]} />
      {/* <RigidBody colliders={false} type="fixed" position-y={-0.5}>
        <CylinderCollider args={[1 / 2, 5]} />
        <Cylinder scale={[5, 1, 5]} receiveShadow>
          <meshStandardMaterial color="white" />
        </Cylinder>
      </RigidBody> */}
    </group>
    </group>
   
  );
};
