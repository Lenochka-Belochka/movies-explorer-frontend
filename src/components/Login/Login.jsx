import React from 'react';
import './Login.css';

import { Link } from 'react-router-dom';
// import logo from '../../images/logo.svg';

function Login() {
  return (
    <section className="login">
      <Link to="/" className="login__logo"></Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">
        <fieldset className="login__fieldset">
          <div className="login__field">
            <p className="login__text" htmlFor='email'>E-mail</p>
            <input
              className='login__input'
              type='email'
              placeholder='Введите E-mail'
              id='email'
            />
          </div>
          <div className="login__field">
            <p className="login__text" htmlFor='password'>Пароль</p>
            <input
               className='login__input'
               type='password'
               placeholder='Введите пароль'
               id='password'
            />
          </div>
        </fieldset>
        <div className="login__bottom">
          <span className="login__error"></span>
          <button
            className="login__button" type="submit"
          >
            Войти
          </button>
          <div className="login__links">
            <p className="login__question">Ещё не зарегистрированы?</p>
            <Link
              className="login__link"
              to="/signup"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
