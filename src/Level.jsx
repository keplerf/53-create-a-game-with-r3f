import React, { useRef, useState } from "react";
import { Physics, Debug, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

THREE.ColorManagement.legacyMode = false;
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Matwerial = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Matwerial = new THREE.MeshStandardMaterial({
  color: "greenyellow",
});
const obstacleMatwerial = new THREE.MeshStandardMaterial({
  color: "orangered",
});
const wallMatwerial = new THREE.MeshStandardMaterial({
  color: "slategrey",
});

function BlockStart({ position = [0, 0, 0] }) {
  return (
    <mesh
      geometry={boxGeometry}
      position={position}
      material={floor1Matwerial}
      scale={[4, 0.3, 4]}
      receiveShadow
    />
  );
}

function BlockSpiner({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [speed] = useState(
    () => (Math.random() + 0.5) * (Math.random() < 0.5 ? -1 : 1)
  );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current.setNextKinematicRotation(rotation);
  });
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        position={[0, 0, 0]}
        material={floor2Matwerial}
        scale={[4, 0.3, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMatwerial}
          scale={[3.5, 0.3, 0.3]}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
}

const Level = () => {
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      <BlockSpiner position={[0, 0, 4]} />
      <BlockSpiner position={[0, 0, 8]} />
    </>
  );
};
export default Level;
