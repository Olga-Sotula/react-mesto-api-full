import React, { useState } from "react";
import AuthSection from "./AuthSection";

function Login({onSubmit, isProcessing}) {

  return (
    <main className="content">
      <AuthSection onSubmit={onSubmit} isProcessing={isProcessing} title="Вход" buttonText="Войти" buttonSavingText="Вход"/>
    </main>
  );
}

export default Login;
