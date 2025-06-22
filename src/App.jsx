import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

import { Experience } from "./components/Experience";
import { Suspense } from "react";
import Landing from './components/Landing'

function App() {
  return ( 
  <Landing />
    // <Canvas shadows camera={{ position: [5, 0, 40], fov: 20 }}>
    //   <color attach="background" args={["#8be5ef"]} />
    //   <fog attach="fog" args={["white",20 , 1]} />
    //   <Suspense>
    //     <Physics debug>
         
    //     </Physics>
    //   </Suspense>
    // </Canvas>
  );
}

export default App;
