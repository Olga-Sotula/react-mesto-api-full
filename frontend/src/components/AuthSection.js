import React, { useState } from "react";
import auth from '../utils/auth';

function AuthSection({onSubmit, isProcessing, title, buttonText, buttonSavingText}) {
  const [formValues, setFormValues] = useState({email: '', password: ''});

  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(e){
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    //Очищаем поля формы
    setFormValues({email: '', password: ''});

    // Передаём значения управляемых компонентов во внешний обработчик
    onSubmit(formValues.email, formValues.password);
  }

  const submitButtonText = !isProcessing ? buttonText : buttonSavingText;
  return (
    <section className="auth">
      <form
        className="auth__form"
        onSubmit={handleSubmit}
        noValidate>
        <h2 className="auth__title">{title}</h2>
        <label className="auth__field">
          <input
            name="email"
            type="email"
            className="auth__input"
            value={formValues.email}
            placeholder="Email"
            required
            onChange={handleChange}/>
          <span className="auth__error auth__error_type_email"></span>
        </label>
        <label className="auth__field">
          <input
            name="password"
            type="password"
            className="auth__input"
            value={formValues.password}
            placeholder="Пароль"
            required
            onChange={handleChange}/>
          <span className="auth__error auth__error_type_password"></span>
        </label>
        <button
          type="submit"
          className="button auth__submit"
          aria-label={buttonText}>
          {submitButtonText}
        </button>
      </form>
    </section>
  );
}

export default AuthSection;
