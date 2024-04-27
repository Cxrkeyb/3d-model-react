import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Three } from "./components/Three";
import { Suspense } from "react";
import Dropdown from "./components/Dropdown";

function App() {
  return (
    <div className="overflow-hidden">
      <Dropdown />
      <Canvas id="three-canvas-container">
        <Suspense fallback={null}>
          <Three />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
