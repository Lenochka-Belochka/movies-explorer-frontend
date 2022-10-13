import './Register.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';

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
    <main className="register">
        <Link to="/" className="register__logo">
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" name="register" noValidate onSubmit={handleSubmit}>
        <fieldset className="register__fieldset">
          <div className="register__field">
            <span className="register__text">Имя</span>
            <input
              name="name"
              className="register__input"
              onChange={handleChange}
              value={values.name || ''}
              type="text"
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            />
            <span className="register__error">{errors.name || ''}</span>
          </div>
          <div className="register__field">
            <span className="register__text">E-mail</span>
            <input
              name="email"
              className="register__input"
              onChange={handleChange}
              value={values.email || ''}
              type="email"
              required
            />
            <span className="register__error">{errors.email || ''}</span>
          </div>
          <div className="register__field">
            <span className="register__text">Пароль</span>
            <input
              name="password"
              className="register__input"
              onChange={handleChange}
              value={values.password || ''}
              type="password"
              required
            />
            <span className="register__error">{errors.password || ''}</span>
          </div>
        </fieldset>
        <button
          type="submit"
          className={`register__button ${!isValid && 'register__button_invalid'}`}
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <div className="register__links">
            <p className="register__question">Уже зарегистрированы?</p>
          <Link to="signin" className="register__link">
            Войти
          </Link>
        </div>
      </form>
    </main>
  )
}
