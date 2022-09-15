import React, {useEffect} from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onOverlayClick, onUpdateAvatar,isSaving}) {
  const ref = React.useRef();

  useEffect(() => {
    ref.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar(ref.current.value);
  }

  return(
    <PopupWithForm
      name="popup popup_type_avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      buttonSavingText="Сохранение ..."
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      isSaving={isSaving}>
      <label className="popup__field">
        <input
          ref={ref}
          name="avatarUrl"
          type="url"
          className="popup__input popup__input_type_avatar-url"
          placeholder="Ссылка на картинку аватара"
          required
          />
        <span className="popup__error popup__error_type_avatarUrl"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
