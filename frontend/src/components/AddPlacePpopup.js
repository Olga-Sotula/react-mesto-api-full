import React, {useState, useEffect} from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onOverlayClick, onAddPlace, isSaving}) {
  const [formValues, setFormValues] = useState({ name: "", link: "" });

  useEffect(() => {
    if (!isOpen){
      setFormValues({name: '', link: ''});
    }
  }, [isOpen]);

  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace(formValues);
  }

  return(
    <PopupWithForm
      name="cards"
      title="Новое место"
      buttonText="Создать"
      buttonSavingText="Сохранение ..."
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      isSaving={isSaving}>
      <label className="popup__field">
        <input
          name="name"
          type="text"
          className="popup__input popup__input_type_photo-name"
          value={formValues.name}
          placeholder="Название"
          required
          minLength="2" maxLength="30"
          onChange={handleChange}/>
        <span className="popup__error popup__error_type_photoName"></span>
      </label>
      <label className="popup__field">
        <input
          name="link"
          type="url"
          className="popup__input popup__input_type_photo-url"
          value={formValues.link}
          placeholder="Ссылка на картинку"
          required
          onChange={handleChange}/>
        <span className="popup__error popup__error_type_photoUrl"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
