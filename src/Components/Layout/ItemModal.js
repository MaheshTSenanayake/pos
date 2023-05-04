import React from "react";
import { Modal } from "@mui/material";

function ItemModal(props) {
  const { open, onClose, item } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div>
        <h2 id="modal-title">{props.item.title}</h2>
        <img src={props.item.image} alt={item.title} />
        <p id="modal-description">{props.item.description}</p>
      </div>
    </Modal>
  );
}

export default ItemModal;
