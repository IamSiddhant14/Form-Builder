import { ChangeEvent, useState } from "react";
import Button from "./Button";

import "../styles/modal.css";

const Modal = ({
  isOpen,
  onClose,
  selectedItem,
  onSubmitCallback,
}: ModalProps) => {
  const [formData, setFormData] = useState<FormState>({
    text: selectedItem?.text.substring(0, selectedItem.text.length - 3) ?? "",
    x: selectedItem?.screenX ?? 0,
    y: selectedItem?.screenY ?? 0,
    fontsize: selectedItem?.fontSize ?? 12,
    fontweight: selectedItem?.fontWeight ?? 300,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedItem !== null) {
      const updatedItem: DraggedItem = {
        id: selectedItem?.id,
        text:
          formData.text +
          selectedItem?.text.substring(selectedItem.text.length - 3),
        screenX: Number(formData.x),
        screenY: Number(formData.y),
        fontWeight: Number(formData.fontweight),
        fontSize: Number(formData.fontsize),
        isClicked: selectedItem?.isClicked,
      };
      onSubmitCallback(updatedItem);
    }
    onClose();
  };


  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-overlay">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="heading-container">
            <h1 id="heading" style={{ color: "black", marginLeft: "-2px" }}>
              Edit
            </h1>
            <img src="./times.svg" alt="close-icon" onClick={onClose} />
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
          <Button>{"Save Changes"}</Button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
