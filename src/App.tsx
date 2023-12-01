import React, { useEffect, useState } from "react";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar";
import { getLocalData, setLocalData } from "./helpers/localStorage";

import "./App.css";

const App = () => {

  const [droppedItems, setDroppedItems] = useState<DraggedItem[]>([]);

  useEffect(() => {
    getLocalData() === null
      ? setDroppedItems([])
      : setDroppedItems(getLocalData());
  }, []);

  const handleDrop = (items: DraggedItem[]) => {
    setLocalData(items);
    setDroppedItems(items);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div id="container">
      <div id="canvas_container">
        <Canvas
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          droppedItems={droppedItems}
        />
      </div>

      <div id="sidebar_container">
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
