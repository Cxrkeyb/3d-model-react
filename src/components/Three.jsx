import { useRef, useState, useEffect } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { GLTFLoader } from "three-stdlib";
import { angleToRadians } from "../utils/angle";
import * as THREE from "three";
import useOptionsStore from "../store/options";

export const Three = () => {
  const orbitControlsRef = useRef();
  const glbRef = useRef();
  const treeGlbRef = useRef();
  const secondTreeGlbRef = useRef();
  const [loading, setLoading] = useState(true);
  const [originalMaterials] = useState(new Map());
  const { selectedOption } = useOptionsStore();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      "/Barn_Testing.glb",
      (gltf) => {
        gltf.scene.position.set(0, 0, 0);
        glbRef.current = gltf.scene;
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading GLB:", error);
        setLoading(false);
      }
    );

    loader.load(
      "/Tree.glb",
      (gltf) => {
        gltf.scene.position.set(4, 0, 0);
        treeGlbRef.current = gltf.scene;
        treeGlbRef.current.scale.set(0.1, 0.1, 0.1);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading GLB:", error);
        setLoading(false);
      }
    );

    loader.load(
      "/Tree.glb",
      (gltf) => {
        gltf.scene.position.set(-4, 0, 0);
        secondTreeGlbRef.current = gltf.scene;
        secondTreeGlbRef.current.scale.set(0.1, 0.1, 0.1);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading GLB:", error);
        setLoading(false);
      }
    );
    
  }, []);

  const colorSelectedMesh = (wallName, color = 0xff0000) => {
    if (!glbRef.current) return;
  
    glbRef.current.traverse((child) => {
      if (!child.isMesh) return;
  
      if (!originalMaterials.has(child)) {
        originalMaterials.set(child, child.material.clone());
      }
  
      const wallNumber = parseInt(wallName.substring(wallName.length - 1));
      const cameraPositions = [
        new THREE.Vector3(2, 4, -8), // Pared 1
        new THREE.Vector3(8, 4, 2),  // Pared 2
        new THREE.Vector3(2, 4, 8),  // Pared 3
        new THREE.Vector3(-8, 4, 0)  // Pared 4
      ];
  
      const cameraPosition = cameraPositions[wallNumber - 1];
      orbitControlsRef.current.object.position.copy(cameraPosition);
      orbitControlsRef.current.target.set(0, 0, 0);
  
      if (child.name === wallName) {
        child.material = new THREE.MeshStandardMaterial({ color });
      } else {
        child.material = originalMaterials.get(child);
      }
    });
  };

  useEffect(() => {
    if (selectedOption) {
      colorSelectedMesh(selectedOption);
    }
  }, [selectedOption]);

  return (
    <>
      {/* Camera and controls */}
      <PerspectiveCamera makeDefault position={[-2, 3, -10]} />
      <OrbitControls ref={orbitControlsRef} />

      {/* Render the GLB model if loaded */}
      {!loading && glbRef.current && (
        <>
          {/* Primitive with a point light */}
          <primitive object={glbRef.current} />
        </>
      )}

      {/* Show loading indicator while loading */}
      {loading && <LoadingIndicator />}

      {/* floor */}
      <mesh rotation={[-angleToRadians(90), 0, 0]}>
        <planeGeometry args={[10, 10]} />
        {/* verde claro */}
        <meshPhongMaterial color="#90EE90" />
      </mesh>

      {/* Render the GLB model for tree  */}
      {!loading && treeGlbRef.current && (
        <>
          {/* Primitive with a point light */}
          <primitive object={treeGlbRef.current} />
        </>
      )}
      {/* Render the GLB model for tree again */}
      {!loading && secondTreeGlbRef.current && (
        <>
          {/* Primitive with a point light */}
          <primitive object={secondTreeGlbRef.current} />
        </>
      )}

      <directionalLight intensity={0.5} position={[0, 3, 3]} />
      <directionalLight intensity={0.5} position={[3, 3, 0]} />
      <directionalLight intensity={0.5} position={[0, 3, -3]} />
      <directionalLight intensity={0.5} position={[-3, 3, 0]} />
    </>
  );
};

// LoadingIndicator component
const LoadingIndicator = () => {
  return (
    <>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
    </>
  );
};
