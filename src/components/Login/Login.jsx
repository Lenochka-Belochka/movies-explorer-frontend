import React from 'react';
import './Login.css';
import { useEffect } from 'react';
import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';

import { Link } from 'react-router-dom';
// import logo from '../../images/logo.svg';

export default function Login({ handleLogin }) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);
    return (
    <section className="login">
      <Link to="/" className="login__logo"></Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" name="login"
        noValidate
        onSubmit={handleSubmit}>
        <fieldset className="login__fieldset">
          <div className="login__field">
            <p className="login__text" htmlFor='email'>E-mail</p>
            <input
              type='email'
              placeholder='Введите E-mail'
              name="email"
              className={`login__input ${errors.email && 'login__input_error'}`}
              onChange={handleChange}
              value={values.email || ''}
              required
            />
    <span className="login__error">{errors.email || ''}</span>
          </div>
          <div className="login__field">
            <p className="login__text" htmlFor='password'>Пароль</p>
            <input
               type='password'
               placeholder='Введите пароль'
               name="password"
              className={`login__input ${
                errors.password && 'login__input_error'
              }`}
              onChange={handleChange}
              value={values.password || ''}
              required
            />
   <span className="login__error">{errors.password || ''}</span>
          </div>
        </fieldset>
        <div className="login__bottom">
          <span className="login__error"></span>
          <button
            type="submit"
            className={`login__button ${!isValid && 'login__button_disabled'}`}
            disabled={!isValid}
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

