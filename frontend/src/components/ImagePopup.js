import React from "react";
import Popup from "./Popup";

function ImagePopup({card, isOpen, onClose, onOverlayClick}) {

  return(
    <Popup name = "" title = "" isOpen = {isOpen} onOverlayClick = {onOverlayClick} onClose={onClose}>
      <figure className="popup__figure">
        <img src={card.link} className="popup__image" alt={card.name}/>
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
