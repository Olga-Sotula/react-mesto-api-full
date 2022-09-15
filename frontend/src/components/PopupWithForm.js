import React, {useEffect} from "react";
import Popup from "./Popup";

function PopupWithForm({name, title, buttonText, buttonSavingText, isOpen, onOverlayClick, onClose, onSubmit, isSaving,  ...props}) {
  const submitButtonText = !isSaving ? buttonText : buttonSavingText;

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
    <Popup name = {name} title = {title} isOpen = {isOpen} onOverlayClick = {onOverlayClick} onClose={onClose}>
      <form
        className={`popup__form popup__form_validated popup__form_type_${name}`}
        name={`edit${name}Form`}
        onSubmit={onSubmit}
        noValidate>
        <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
          {props.children}
        <button
          type="submit"
          className={`button popup__submit popup__submit_type_${name}`}
          aria-label={buttonText}>
          {submitButtonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
