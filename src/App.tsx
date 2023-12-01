import React, { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar";
import { getLocalData, setLocalData } from "./helpers/localStorage";


const App = () => {
  const [droppedItems, setDroppedItems] = useState<DraggedItem[]>([]);

  useEffect(() => {
    if(getLocalData() === null){
      setDroppedItems([]);
    }else {
      setDroppedItems(getLocalData())
    }
  }, [])
  
  const handleDrop = (items : DraggedItem[]) => {
    setLocalData(items);
    setDroppedItems(items);
  };

  const handleDragOver = (e : React.DragEvent) => {
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
