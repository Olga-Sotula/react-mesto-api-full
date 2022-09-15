import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation({card, isOpen, onClose, onOverlayClick, onCardDelete, isDeleting}) {
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onCardDelete(card);
  }

  return(
    <PopupWithForm
      name="submit"
      title="Вы уверены?"
      buttonText="Да"
      buttonSavingText="Удаление ..."
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      isSaving={isDeleting}/>
  );
}

export default PopupWithConfirmation;
