import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main({cards, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-group">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
          <button type="button" className="profile__avatar-button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="title profile__title">{currentUser.name}</h1>
          <p className="title profile__subtitle">{currentUser.about}</p>
          <button type="button" className="button profile__edit-button" aria-label="Редактировать" onClick={onEditProfile}></button>
        </div>
        <button type="button" className="button profile__add-button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>
      <section className="photos" aria-label="Блок. Фотографии">
        <ul className="list photos__grid">
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
