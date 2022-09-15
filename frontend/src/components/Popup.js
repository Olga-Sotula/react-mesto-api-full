import React, {useEffect} from "react";

function Popup({name, title, isOpen, onOverlayClick, onClose, ...props}) {

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape'){
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);



  return(
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened': ''}`}
      onClick={onOverlayClick}>
      <div className="popup__container">
        <button
          type="button"
          className="button popup__close"
          aria-label="Закрыть"
          onClick={onClose}>
        </button>
        {props.children}
      </div>
    </div>
  );
}

export default Popup;
