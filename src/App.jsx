import React from 'react';

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";  // For full-page styling
import Resume from "./components/Resume";


function Model({ url }) {
  const { scene, animations } = useGLTF(url); // Load animations along with the model
  const mixer = useRef(null);  // Animation mixer reference
  
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
   
  });


  // Position the model to stand at the bottom of the screen
  scene.position.y =-0.8;  // Adjust this value to move the object down

  return <primitive object={scene} dispose={null} />;
}
function Ring() {
  const ringGeometry = new THREE.TorusGeometry(1, 0.02, 10, 50); // Ring size and segments
  const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0x555555, roughness: 0.5 });
  const ringRef = useRef(null);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.005; // Rotate the ring horizontally

    }
  });

  return <mesh ref={ringRef} geometry={ringGeometry} material={ringMaterial} position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]} />;
}
// Card component
// Card component that moves along the ring
function Card({ index, color = "red",radius, label, modelUrl, avatarScale , positionavatar, rotationavatar}) {
  const cardRef = useRef(null);
    const avatarRef = useRef();

  useEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(color); // Apply the color to all mesh materials
        }
      });
    }
  }, [color]);
  // Create the rounded rectangle shape with THREE.Shape
  const cardShape = new THREE.Shape();
  const width = 0.8; // Width of the card (2:4 ratio)
  const height = 0.6; // Height of the card (2:4 ratio)
  const radiusCorner = 0.02; // Radius of the rounded corners

  cardShape.moveTo(-width / 2 + radiusCorner, -height / 2); // Start from the bottom-left corner
  cardShape.lineTo(width / 2 - radiusCorner, -height / 2); // Bottom edge
  cardShape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radiusCorner); // Bottom-right corner
  cardShape.lineTo(width / 2, height / 2 - radiusCorner); // Right edge
  cardShape.quadraticCurveTo(width / 2, height / 2, width / 2 - radiusCorner, height / 2); // Top-right corner
  cardShape.lineTo(-width / 2 + radiusCorner, height / 2); // Top edge
  cardShape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radiusCorner); // Top-left corner
  cardShape.lineTo(-width / 2, -height / 2 + radiusCorner); // Left edge
  cardShape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radiusCorner, -height / 2); // Bottom-left corner

  const cardGeometry = new THREE.ShapeGeometry(cardShape);

  // Material with transparency and glass-like effect
  const cardMaterial = new THREE.MeshStandardMaterial({
    color: 0xabcdef,  // Light glass-like color
    roughness: 0.2,   // Slight roughness to mimic a glass surface
    metalness: 0.5,   // Slightly metallic look for the glass
    opacity: 0.2,     // Set the transparency
    transparent: true, // Enable transparency
    emissive: 0x444444, // Dim glow effect
  });

  // Create a canvas texture with the text
  const createTextTexture = (text) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set the font size and style for a techie, professional look
    const fontSize = 30;
    ctx.font = `${fontSize}px 'Consolas', 'Courier New', monospace`; // Using a monospaced font for a techie look

    // Measure text width to create canvas size
    const textWidth = ctx.measureText(text).width;
    const canvasWidth = textWidth + 70; // Add padding
    const canvasHeight = fontSize + 20; // Adjust canvas height to match font size

    // Set the canvas size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Clear the canvas and set properties
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';  // Text color is set to white
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Set subtle text shadow for a 3D effect
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'; // Lighter shadow for a subtle effect
    ctx.shadowBlur = 8; // Blur effect for soft shadow
    ctx.shadowOffsetX = 2; // Horizontal offset for shadow
    ctx.shadowOffsetY = 2; // Vertical offset for shadow

    // Fill the text without stroke for a clean look
    ctx.fillText(text, canvas.width / 2, canvas.height / 2); // Fill the text with white color

    // Create a texture from the canvas and return it
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  const textTexture = createTextTexture(label); // Create a texture for the text

  // Create a plane to display the text
  const textMaterial = new THREE.MeshBasicMaterial({
    map: textTexture,
    transparent: true,
    opacity: 1,
  });

  const textGeometry = new THREE.PlaneGeometry(0.8, 0.4); // Plane size to fit the text
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.set(0, 0, 0.05); // Position text slightly above the card

  // Load the GLB model using useGLTF hook
  const { scene: avatarScene } = useGLTF(modelUrl); // Load the model (avatar.glb in this case)

  useFrame(({ clock }) => {
    const angle = (index / 5) * Math.PI * 2 + clock.elapsedTime * 0.1;  // Rotation based on time and card index
    const x = radius * Math.cos(angle);  // X position of card
    const z = radius * Math.sin(angle);  // Z position of card
    if (cardRef.current) {
      cardRef.current.position.set(x, -0.3, z);  // Update card's position
    }
  });
  return (
    <mesh ref={cardRef} geometry={cardGeometry} material={cardMaterial}>
      {/* Avatar with a smaller scale than the card */}
      {avatarScene && (
        <primitive object={avatarScene} scale={avatarScale} position={positionavatar}     rotation={rotationavatar} // Rotate 90 degrees around the y-axis
/>
      )}
    </mesh>
  );
}

// Create the 5 cards at equal distances in front of the ring
// Create the 5 cards moving along the ring
function Cards() {
  const numCards = 6;  // Now 6 cards
  const radius = 1; // Radius of the circle for the cards
  const labels = ["PROJECTS", "AWARDS", "SKILLS", "EXPERIENCE", "ACTIVITIES"];
  const modelUrls = ["./trophy.glb","./trophy2.glb","./trophy3.glb","./trophy4.glb","./trophy5.glb","./trophy6.glb"];

  // Define the scales for the avatars for each card
  const avatarScales = [
    [0.0009, 0.0009, 0.0009], // Avatar scale for the second card
    [0.0009, 0.0009, 0.0009], // Avatar scale for the second card
    [0.0009, 0.0009, 0.0009], // Avatar scale for the second card
    [0.0009, 0.0009, 0.0009], // Avatar scale for the second card
    [0.0009, 0.0009, 0.0009], // Avatar scale for the second card
    [0.0009, 0.0009, 0.0009], // Avatar scale for the second card
  ];

  const positionavatar=[
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const rotationavatar=[
    [0, Math.PI / 2, 0],    
    [0, Math.PI / 2, 0],    
    [0, Math.PI / 2, 0],    
    [0, Math.PI / 2, 0],    
    [0, Math.PI / 2, 0],    
    [0, Math.PI / 2, 0],    
  ];
  const cards = labels.map((label, index) => (
    <Card key={index} index={index} color={"red"} radius={radius} label={label} modelUrl={modelUrls[index]}       
    avatarScale={avatarScales[index]} positionavatar={positionavatar[index]}      rotationavatar={rotationavatar[index]}
    />
  ));

  return <>{cards}</>;
}
function App() {
  return (
    <div className="App">
      <div className="Logoload">
        <div className="heading1">
        <span className="letter">F</span>
        <span className="name">ORHEEN AHMED</span>
        </div>
      </div>
       <div className="container">

        <div className="avatar">
          
          <Canvas
            camera={{ position: [0, 3, 10], fov: 13}} 
            style={{ height: "100%", width: "100%" }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <Model url="./model.glb" /> 
            {/* <Ring />  Add the ring around the avatar */}
            <Cards /> 
            <OrbitControls />
          </Canvas>
        </div>
      </div> 



    </div>
  );
}

export default App;
