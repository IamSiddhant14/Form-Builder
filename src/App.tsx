import { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";


const App = () => {
  const [droppedItems, setDroppedItems] = useState([]);


  const handleDrop = (items) => {
    setDroppedItems(items);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div id="container">
      <div id="canvas_container" >
        <Canvas onDrop={handleDrop} onDragOver={handleDragOver} droppedItems={droppedItems} />
      </div>

      <div id="sidebar_container">
        <Sidebar />
      </div>

      {/* <Modal isOpen=true onClose={} /> */}

    </div>
  );
};

export default App;
