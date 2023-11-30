import { ChangeEvent, useState } from "react";
import Button from "./Button";
import close from "../assets/times.svg";

import "../styles/modal.css";

const Modal = ({ isOpen, onClose, name, x, y }: Iprops) => {
  const [formData, setFormData] = useState({
    text: "",
    x: x,
    y: y,
    fontsize: "",
    fontweight: "",
  });

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
};
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-overlay" >
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="heading-container">
            <h1 id="heading" style={{ color: "black", marginLeft: "-2px" }}>
              Edit {name}
            </h1>
            <img src={close} alt="close-icon" onClick={onClose} />
          </div>
          <label htmlFor="Text">Text:</label>
          <input
            type="text"
            className="label"
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            required
          />
          <label htmlFor="x">X:</label>
          <input
            type="number"
            className="label"
            id="x"
            name="x"
            value={formData.x}
            onChange={handleChange}
            required
          />
          <label htmlFor="y">Y:</label>
          <input
            type="number"
            className="label"
            id="y"
            name="y"
            value={formData.y}
            onChange={handleChange}
            required
          />
          <label htmlFor="fontsize">Font Size:</label>
          <input
            type="number"
            id="fontsize"
            className="label"
            name="fontsize"
            value={formData.fontsize}
            onChange={handleChange}
            required
          />{" "}
          <label htmlFor="fontweight">Font Weight:</label>
          <input
            type="number"
            id="fontweight"
            className="label"
            name="fontweight"
            value={formData.fontweight}
            onChange={handleChange}
            required
          />
          <Button onClick={onClose}>{"Save Changes"}</Button>
        </form>
      </div>
    </div >
  );
};

export default Modal;