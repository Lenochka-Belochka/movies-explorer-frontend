import './Login.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';

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
    <main className="login">
       <Link to='/' className='login__logo'>
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
      <form
        className="login__form"
        name="login"
        noValidate
        onSubmit={handleSubmit}
      >
        <fieldset className="login__fieldset">
          <div className="login__field">
            <span className="login__text">E-mail</span>
            <input
              name="email"
              className="login__input"
              onChange={handleChange}
              value={values.email || ''}
              type="email"
              required
            />
            <span className="login__error">{errors.email || ''}</span>
          </div>
          <div className="login__field">
            <span className="login__text">Пароль</span>
            <input
              name="password"
              className="login__input"
              onChange={handleChange}
              value={values.password || ''}
              type="password"
              required
            />
            <span className="login__error">{errors.password || ''}</span>
          </div>
        </fieldset>
        <button
          type="submit"
          className={`login__button ${!isValid && 'login__button_invalid'}`}
          disabled={!isValid}
        >
          Войти
        </button>
        <div className="login__links">
        <p className="login__question">Ещё не зарегистрированы?</p>
          <Link to='/signup' className="login__link">
            Регистрация
          </Link>
        </div>
      </form>
    </main>
  );
}
