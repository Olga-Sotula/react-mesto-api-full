import React from "react";
import { Link } from 'react-router-dom';
import AuthSection from "./AuthSection";

function Register({onSubmit, isProcessing}) {

  return (
    <main className="auth">
      <AuthSection onSubmit={onSubmit} isProcessing={isProcessing} title="Регистрация" buttonText="Зарегистрироваться" buttonSavingText="Регистрация">
      </AuthSection>
      <Link to='/sign-in' className='link link-trans'>Уже зарегистрированы? Войти</Link>
    </main>
  );
}

export default Register;
