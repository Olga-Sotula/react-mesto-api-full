import React, { useState, useEffect } from 'react';
import logoPath from '../images/header-logo.svg';
import { Link, useLocation } from 'react-router-dom'

function Header({loggedIn, email, onLogout}) {
  const location = useLocation();
  const [locationPath, setLocationPath] = useState('/');

  useEffect(() => {
    setLocationPath(location.pathname);
  }, [location]);

    return (
        <header className = "header" >
            <img className = "header__logo" src = {logoPath} alt = "Лого" / >
            <ul className="list navbar">
              {loggedIn && <li className="link">{email}</li>}
              {loggedIn && <li className="link  link-trans" onClick={onLogout}>Выйти</li>}
              {!loggedIn && locationPath === "/sign-in" && <li><Link className="link link-trans" to="/sign-up">Регистрация</Link></li>}
              {!loggedIn && locationPath === "/sign-up" && <li><Link className="link link-trans" to="/sign-in">Войти</Link></li>}
            </ul>
        </header>
    );
}

export default Header;
