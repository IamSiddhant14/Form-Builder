import '../styles/formElement.css';
import dragAndDrop from '../assets/grip-vertical.svg';
import { generateUniqueId } from '../helpers/getUniqueId';
import React from 'react';

const FormElement = ({ name } : {
  name : string
}) => {

  const handleDragStart = (e ) => {
    const uniqueId = generateUniqueId();
    e.dataTransfer.setData('text/plain', name + uniqueId); // Set the data being dragged
    console.log("Drag start")
  }
  
  return (
    <div id="form_element_container" draggable onDragStart={handleDragStart} >
 
      <img src={dragAndDrop} alt="drag&drop_icon" />

      <span id="text" >{name}</span>
      
    </div>
  );
};

export default FormElement;
