import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `button photo__rm ${isOwn ? 'photo__rm_visible' : 'photo__rm_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.includes(currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `button photo__like-button ${isLiked ? 'photo__like-button_active' : ''}`
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="photo">
      <img className="button photo__img" src={card.link} alt={card.name}
        onClick={handleCardClick}/>
      <div className="photo__footer">
        <h2 className="title photo__title">{card.name}</h2>
        <div className="photo__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Отметить"
            onClick={handleCardLike}>
          </button>
          <span className="photo__like-count">{card.likes.length}</span>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Удалить"
        onClick={handleCardDelete}>
      </button>
    </li>
  );
}

export default Card;
