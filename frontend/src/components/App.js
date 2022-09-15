import React, {useState, useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRouter.js';
import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePpopup.js';
import ImagePopup from './ImagePopup.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';
import api from '../utils/api.js';
import auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';



function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserData, setCurrentUserData] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [deletedCard, setDeletedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const token = localStorage.getItem('jwt');

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card){
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handlePopupOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function handleUpdateUser(data) {
    setIsProcessing(true);
    api.updateUserProfile(data, token)
    .then((newUser) => {
      setCurrentUser(newUser.data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsProcessing(false);
    });
  }

  function handleUpdateAvatar(data) {
    setIsProcessing(true);
    api.setUserAvatar(data, token)
    .then((newUser) => {
      setCurrentUser(newUser.data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsProcessing(false);
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setDeletedCard({});
  }

  function handleCardLike(card) {
    //проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.includes(currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch((err) => {
        console.log(err);
    });
  }

  /**
   * Функция обработки события удаления карточки пользователем - нажатие на корзину
   * Вывод попапа подтверждения удаления
   * @param {} card
   */
  function handleCardDelete(card) {
    setDeletedCard(card)
    setIsConfirmDeletePopupOpen(true)
  }

  function handleDeleteCardSubmit(card) {
    setIsProcessing(true);
    api.deleteCard(card._id, token)
      .then(
        () => {
          const newCards = cards.filter((elem) => elem !== card);
          setCards(newCards);
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        })
        .finally(() => {
          setIsProcessing(false);
        });
  }

  function handleAddPlaceSubmit(card) {
    setIsProcessing(true);
    api.addCard(card, token)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  function handleRegisterSubmit (email, password) {
    if (password && email){
      setIsProcessing(true);
      auth.sign(password, email, "signup").then((res) => {
        setRegistered(true);
        setIsInfoTooltipPopupOpen(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setRegistered(false);
        setIsInfoTooltipPopupOpen(true);
      })
      .finally(() => {
        setIsProcessing(false);
      });
    }
  }

  function handleLoginSubmit (email, password) {
    if (password && email){
      setIsProcessing(true);
      auth.sign(password, email, "signin").then((res) => {
        setToken(res.token);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      })
      .finally(() => {
        setIsProcessing(false);
      });
    }
  }

  function handleLogout() {
    setLoggedIn(false);
    setCurrentUserData({});
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  function setToken(token){
    setIsProcessing(true);
    auth.checkToken(token).then((res) => {
      localStorage.setItem('jwt', token);
      setCurrentUserData({
        id: res.data._id,
        email: res.data.email
      });
      setLoggedIn(true);
      history.push('/');
    })
    .catch((err) => {
      console.log(err);
      setLoggedIn(false);
    })
    .finally(() => {
      setIsProcessing(false);
    });
  }

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(token),api.getCards(token)])
        .then((res) => {
          const [initialUser,initialCards] = res;
          setCurrentUser(initialUser.data);
          setCards(initialCards.data.reverse())
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={currentUserData.email} onLogout={handleLogout}/>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-in">
            <Login
              onSubmit={handleLoginSubmit}
              isProcessing={isProcessing}/>
          </Route>
          <Route path="/sign-up">
            <Register
              onSubmit={handleRegisterSubmit}
              isProcessing={isProcessing}/>
          </Route>
        </Switch>
        <Footer/>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handlePopupOverlayClick}
          onUpdateUser={handleUpdateUser}
          isSaving={isProcessing}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handlePopupOverlayClick}
          onUpdateAvatar = {handleUpdateAvatar}
          isSaving={isProcessing}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handlePopupOverlayClick}
          onAddPlace={handleAddPlaceSubmit}
          isSaving={isProcessing}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handlePopupOverlayClick}
        >
        </ImagePopup>

        <PopupWithConfirmation
          card={deletedCard}
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handlePopupOverlayClick}
          onCardDelete={handleDeleteCardSubmit}
          isDeleting={isProcessing}>
        </PopupWithConfirmation>

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          isSuccess={registered}
          onClose={closeAllPopups}
          onOverlayClick={handlePopupOverlayClick}>
        </InfoTooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
