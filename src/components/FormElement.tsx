import React from 'react';
import { generateUniqueId } from '../helpers/getUniqueId';
// import dragAndDropImage from '../assets/grip-vertical.svg';

import '../styles/formElement.css';
interface Iprops{
  name : string
}

const FormElement = ({ name } : Iprops ) => {

  const handleDragStart = (e : React.DragEvent<HTMLDivElement> ) => {
    
    // Set the data being dragged
    const uniqueId = generateUniqueId();
    e.dataTransfer.setData('text/plain', name + uniqueId); 
  }
  
  return (
    <div id="form_element_container" draggable onDragStart={handleDragStart} >
 
      <img src='./grip-vertical.svg' alt="drag&drop_icon" />
      <span id="text" >{name}</span>
      
    </div>
  );
};

export default FormElement;
