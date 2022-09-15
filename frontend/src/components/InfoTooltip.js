import React from "react";
import Popup from "./Popup";
import successImg from '../images/register-success.svg';
import errorImg from '../images/register-error.svg';

function InfoTooltip({isOpen, isSuccess, onClose, onOverlayClick}) {
  const title = isSuccess ?  "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";
  const src = isSuccess ? successImg : errorImg;
  const alt = isSuccess ? "Успешная регистрация" : "Ошибка регистрации";

  return(
    <Popup name = "" title = "" isOpen = {isOpen} onOverlayClick = {onOverlayClick} onClose={onClose}>
      <figure className="popup__form popup__form_type_infotooltip">
        <img src={src} className="popup__image popup__image_type_infotooltip" alt={alt}/>
        <h2 className="popup__title popup__title_type_infotooltip">{title}</h2>
      </figure>
    </Popup>
  );
}

export default InfoTooltip;
