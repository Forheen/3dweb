import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";  // For full-page styling
import Resume from "./components/Resume";

function Model({ url }) {
  const { scene, animations } = useGLTF(url); // Load animations along with the model
  const mixer = useRef(null);  // Animation mixer reference
  const [smileAmount, setSmileAmount] = useState(0);  // Track smile amount
  
  // Play animations when the model is loaded
  useEffect(() => {
    if (animations && animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);  // Create the mixer
      animations.forEach((clip) => mixer.current.clipAction(clip).play());  // Play all animations
    }
  }, [animations, scene]);

  // Update the mixer every frame
  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);  // Update the mixer with the delta time
    }
    // Update smile morph target if present
    const morphTarget = scene.morphTargetDictionary?.smile;
    if (morphTarget !== undefined) {
      scene.morphTargetInfluences[morphTarget] = smileAmount;  // Apply the smile influence
    }
  });

  // Smoothly increase the smile amount
  useEffect(() => {
    const interval = setInterval(() => {
      setSmileAmount((prev) => (prev < 1 ? prev + 0.02 : 1));  // Increase smile gradually
    }, 100);  // Update every 100ms for a smooth effect

    return () => clearInterval(interval);  // Cleanup interval on unmount
  }, []);

  // Position the model to stand at the bottom of the screen
  scene.position.y = -1.3;  // Adjust this value to move the object down

  return <primitive object={scene} dispose={null} />;
}

function App() {
  return (
    <div className="App">
      <div className="container">
      <div className="right-side" ><Resume/></div> {/* Right side can have any content */}

        <div className="left-side">
          
          <Canvas
            camera={{ position: [8, 3, 15], fov: 6 }} // Adjust camera position
            style={{ height: "100%", width: "100%" }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <Model url="/model.glb" /> {/* Ensure the correct path to your model */}
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
