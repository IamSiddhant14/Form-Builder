import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";

import "../styles/canvas.css";

const Canvas = ({ onDrop, onDragOver, droppedItems }: CanvasProps) => {
  
  const itemsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DraggedItem | null>(null);

  function handleDownload() {
    const droppedItemsData = localStorage.getItem("DroppedItems");

    if (droppedItemsData) {
      const blob = new Blob([droppedItemsData], { type: "application/json" });
      const a = document.createElement("a");

      a.download = "data.json";
      a.href = window.URL.createObjectURL(blob);

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      alert("No data found in local storage.");
    }
  }
  
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        itemsRef.current &&
        !itemsRef.current.contains(event.target as Node)
      ) {
        const updatedItems = droppedItems.map((dropedItem) => {
          if (dropedItem.isClicked) {
            return {
              ...dropedItem,
              isClicked: false,
            };
          } else {
            return dropedItem;
          }
        });
        onDrop(updatedItems);
      }
    },
    [droppedItems, onDrop]
  );

  const handlekeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        const updatedItems = droppedItems.filter(
          (dropedItem) => !dropedItem.isClicked
        );
        onDrop(updatedItems);
      } else if (e.key === "Enter") {
        // open model
        const updatedItems = droppedItems.filter(
          (dropedItem) => dropedItem.isClicked
        );
        setSelectedItem(updatedItems[0]);
        setIsOpen(true);
      }
    },
    [droppedItems, onDrop]
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {

    e.preventDefault();
    const text = e.dataTransfer.getData("text/plain"); // Get the data being dropped
    const isExist = droppedItems.filter((itemdata) => itemdata.text === text);

    if (isExist.length > 0) {
      const updatedItems = droppedItems.map((dropedItem) => {
        if (dropedItem.text === text) {
          return {
            ...dropedItem,
            screenX: e.pageX,
            screenY: e.pageY,
          };
        } else {
          return dropedItem;
        }
      });

      onDrop(updatedItems);
    } else {
      const draggedItem = {
        id: droppedItems.length + 1,
        screenX: e.pageX,
        screenY: e.pageY,
        text: text,
        isClicked: false,
        fontWeight: 300,
        fontSize: 12,
      };
      setSelectedItem(draggedItem);
      onDrop([...droppedItems, draggedItem]);
      setIsOpen(true);
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLParagraphElement>,
    item: DraggedItem
  ) => {
    e.dataTransfer.setData("text/plain", item.text); // Set the data being dragged
  };

  const handleClick = (
    e: React.MouseEvent<HTMLParagraphElement>,
    item: DraggedItem
  ) => {
    const updatedItems = droppedItems.map((dropedItem) => {
      if (dropedItem.text === item.text) {
        return {
          ...dropedItem,
          isClicked: true,
        };
      } else {
        return {
          ...dropedItem,
          isClicked: false,
        };
      }
    });
    onDrop(updatedItems);
  };

  const handleSubmitCallback = (updatedItem: DraggedItem) => {
    const updatedItems = droppedItems.map((dropItem) => {
      if (dropItem.id === updatedItem.id) {
        return updatedItem;
      } else {
        return dropItem;
      }
    });
    onDrop(updatedItems);
  };

  useEffect(() => {
    if (!isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keyup", handlekeyPress);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keyup", handlekeyPress);
      };
    }
  }, [handleClickOutside, handlekeyPress, isOpen]);

  return (
    <>
      <div
        id="canvas"
        onDrop={handleDrop}
        onDragOver={onDragOver}
      >
        <Button onClick={handleDownload}>{"Download Configration"}</Button>
        {droppedItems.map((item, index) => (
          <>
            <p
              key={index}
              style={{
                position: "absolute",
                marginLeft: item.screenX,
                marginTop: item.screenY,
                border: item.isClicked ? "2px solid red" : undefined,
                padding: "1rem",
                fontWeight: `${item.fontWeight}`,
                fontSize: `${item.fontSize}px`,
              }}
              id={item.id.toString()}
              ref={itemsRef}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onClick={(e) => handleClick(e, item)}
            >
              This is a {item.text.substring(0, item.text.length - 3)}
            </p>
          </>
        ))}
      </div>
      {isOpen && (
        <Modal
          selectedItem={selectedItem}
          isOpen={isOpen}
          onSubmitCallback={handleSubmitCallback}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Canvas;
