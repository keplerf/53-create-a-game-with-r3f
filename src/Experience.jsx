import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import { Perf } from "r3f-perf";
import Level from "./Level.jsx";
import { Physics, Debug } from "@react-three/rapier";

export default function Experience() {
  return (
    <>
      <Perf position="left" />
      <OrbitControls makeDefault />

      <Physics>
        <Debug />
        <Lights />
        <Level />
      </Physics>
    </>
  );
}
