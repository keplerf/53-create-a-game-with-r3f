import React from "react";
import { Physics, Debug } from "@react-three/rapier";

function BlockStart({ position = [0, 0, 0] }) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={[4, 0.2, 4]} />
      <meshStandardMaterial color="limegreen" />
    </mesh>
  );
}

const Level = () => {
  return (
    <>
      <BlockStart position={[2, 2, 2]} />
    </>
  );
};
export default Level;
