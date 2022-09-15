import React, {useState, useEffect} from "react";

import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onOverlayClick, onUpdateUser, isSaving}) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [formValues, setFormValues] = useState({name: '', description:''});

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if(isOpen) {
      setFormValues({name: currentUser.name, description: currentUser.about});
    }
  }, [isOpen, currentUser]);

  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: formValues.name,
      about: formValues.description,
    });
  }



  return(
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      buttonSavingText="Сохранение ..."
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      isSaving={isSaving}
      >
      <label className="popup__field">
        <input
          name="name"
          type="text"
          className="popup__input popup__input_type_fullname"
          value={formValues.name}
          required
          minLength="2" maxLength="40"
          onChange={handleChange}/>
        <span className="popup__error popup__error_type_fullName"></span>
      </label>
      <label className="popup__field">
        <input
          name="description"
          type="text"
          className="popup__input popup__input_type_description"
          value={formValues.description}
          required
          minLength="2" maxLength="200"
          onChange={handleChange}/>
        <span className="popup__error popup__error_type_description"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
