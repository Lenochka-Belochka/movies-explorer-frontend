import React from 'react';
import './Register.css';
import { useEffect } from 'react';
import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';
import { Link } from 'react-router-dom';

export default function Register({ handleRegister }) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();


  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className="register">
      <Link to="/" className="register__logo"></Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" name="register" noValidate onSubmit={handleSubmit}>
        <fieldset className="register__fieldset">
          <div className="register__field">
            <p className="register__text" htmlFor='name'>Имя</p>
            <input
                className={`register__input ${errors.name && 'register__input_error'}`}
                type='text'
                placeholder='Введите имя'
                name="name"
                onChange={handleChange}
                value={values.name || ''}
                required
                minLength="2"
                maxLength="30"
                pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            />
          <span className="register__error">{errors.name || ''}</span>
          </div>
          <div className="register__field">
            <p className="register__text" htmlFor='email'>E-mail</p>
            <input
           type='email'
           placeholder='Введите E-mail'
           name="email"
           className={`register__input ${errors.email && 'register__input_error'}`}
           onChange={handleChange}
           value={values.email || ''}
           required
            />
         <span className="register__error">{errors.email || ''}</span>
          </div>
          <div className="register__field">
            <p className="register__text" htmlFor='password'>Пароль</p>
            <input
              className={`register__input ${errors.password && 'register__input_error'}`}
              type='password'
           placeholder='Введите пароль'
           name="password"
            onChange={handleChange}
            value={values.password || ''}
            required
            />
          <span className="register__error">{errors.password || ''}</span>
          </div>
        </fieldset>
        <div className="register__bottom">
          <button
            type="submit"
            className={`register__button ${!isValid && 'register__button_disabled'}`}
            disabled={!isValid}>
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

