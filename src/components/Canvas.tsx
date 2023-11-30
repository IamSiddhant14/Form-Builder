import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../styles/canvas.css';
import Modal from './Modal';

const Canvas = ({ onDrop, onDragOver, droppedItems }) => {
  const itemsRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null)


  const handleClickOutside = useCallback((event) => {
    if (itemsRef.current && !itemsRef.current.contains(event.target)) {
      const updatedItems = droppedItems.map((dropedItem) => {
        if (dropedItem.isClicked) {
          return {
            ...dropedItem,
            isClicked: false
          }
        } else {
          return dropedItem;
        }
      })
      console.log("Updated Items", updatedItems)
      onDrop(updatedItems)
    }
  }, [droppedItems, onDrop])


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener("keyup", handlekeyPress)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener("keyup", handlekeyPress)

    };
  }, [handleClickOutside]);


  const handleDrop = (e) => {
    e.preventDefault();
    console.log("window", e)

    const text = e.dataTransfer.getData('text/plain'); // Get the data being dropped
    console.log("data", text)
    const isExist = droppedItems.filter((itemdata) => itemdata.text === text);

    if (isExist.length > 0) {
      const updatedItems = droppedItems.map((dropedItem) => {
        if (dropedItem.text === text) {
          return {
            ...dropedItem,
            screenX: e.pageX,
            screenY: e.pageY
          }
        } else {
          return dropedItem;
        }
      })

      onDrop(updatedItems)
    } else {
      const draggedItem = {
        id: droppedItems.length + 1,
        screenX: e.pageX,
        screenY: e.pageY,
        text: text,
        isClicked: false,
        fontWeight: 300,
        fontSize: 12,
      }
      setSelectedItem(draggedItem)
      onDrop([...droppedItems, draggedItem]);
      setIsOpen(true);
    }

  };
  const handleDragStart = (e: any, item) => {
    e.dataTransfer.setData('text/plain', item.text); // Set the data being dragged
    console.log("Drag start")
  }
  const handleClick = (e, item: any) => {
    const updatedItems = droppedItems.map((dropedItem) => {
      if (dropedItem.text === item.text) {
        return {
          ...dropedItem,
          isClicked: true
        }
      } else {
        return {
          ...dropedItem,
          isClicked: false
        };
      }
    })
    onDrop(updatedItems)
  }

  const handlekeyPress = (e) => {
    console.log("e", e);
    if (e.key === "Delete") {
      const updatedItems = droppedItems.filter((dropedItem) => !dropedItem.isClicked)
      onDrop(updatedItems)
    } else if (e.key === "Enter") {
      // open model
      const updatedItems = droppedItems.filter((dropedItem) => dropedItem.isClicked)
      setSelectedItem(updatedItems[0]);
      setIsOpen(true)
    }
  }

  return (
    <>
      <div id="canvas"
        style={{
          width: "100%",
          height: "100%",
          position: "relative"
        }}
        onDrop={handleDrop}
        onDragOver={onDragOver}
      >
        Canvas
        {droppedItems.map((item, index) => (
          <>
            <p key={index} style={{
              position: "absolute",
              marginLeft: item.screenX,
              marginTop: item.screenY,
              border: item.isClicked && "2px solid red",
              padding: "1rem"
            }} id={item.id} ref={itemsRef} draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onClick={(e) => handleClick(e, item)}
            >
              This is a {item.text.substring(0, item.text.length - 3)}
            </p>
          </>
        ))}
      </div>
      {isOpen && <Modal x={selectedItem?.screenX} y={selectedItem?.screenY} isOpen={isOpen} onClose={() => setIsOpen(false)} name={'label'} />}
    </>
  )
}

export default Canvas