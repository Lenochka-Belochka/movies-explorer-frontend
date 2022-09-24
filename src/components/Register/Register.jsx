import React from 'react';
import './Register.css';

import { Link } from 'react-router-dom';

function Register() {
  return (
    <section className="register">
      <Link to="/" className="register__logo"></Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <fieldset className="register__fieldset">
          <div className="register__field">
            <p className="register__text" htmlFor='name'>Имя</p>
            <input
                className='register__input'
                type='text'
                placeholder='Введите имя'
                id='name'
            />
          </div>
          <div className="register__field">
            <p className="register__text" htmlFor='email'>E-mail</p>
            <input
           className='register__input'
           type='email'
           placeholder='Введите E-mail'
           id='email'
            />
          </div>
          <div className="register__field">
            <p className="register__text" htmlFor='password'>Пароль</p>
            <input
           className='register__input'
           type='password'
           placeholder='Введите пароль'
           id='password'
            />
          </div>
        </fieldset>
        <div className="register__bottom">
          <button
            className="register__button" type="submit">
            Зарегистрироваться
          </button>
          <div className="register__links">
            <p className="register__question">Уже зарегистрированы?</p>
            <Link
              className="register__link"
              to="/signin"
               >
              Войти
            </Link>
          </div>
        </div>
      </form>
    </section>
  )
  }

export default Register;
