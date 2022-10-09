import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import Error from '../Error/Error';

function Login({ onLogin, loginError }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    useEffect(() => {
        resetForm('', '', false);
    }, [resetForm]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin(values)
    }

    return (
      <section className="login">
      <Link to="/" className="login__logo"></Link>
      <h1 className="login__title">Рады видеть!</h1>

                <form className="login__form" name="login-form" onSubmit={handleSubmit}>

                    <div className="login__field">
                        <label>
                            <span className="login__text">E-mail</span>
                            <input className="login__input"
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                pattern="^\S+@\S+\.\S+$"
                                value={values.email || ''}
                                onChange={handleChange}
                                required />
                            <Error
                                errorMessage={errors.email}
                            />
                        </label>

                        <label>
                            <span className="login__text">Пароль</span>
                            <input className="login__input"
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                onChange={handleChange}
                                value={values.password || ''}
                                minLength="4"
                                required />
                            <Error
                                errorMessage={errors.password}
                            />
                        </label>
                    </div>

                    <div className="login__nav">
                        <Error
                            errorMessage={loginError} />
                        <button className="login__button"
                            type="submit"
                            disabled={!isValid}
                            style={!isValid ?
                                { backgroundColor: '#4285F4', opacity: '.5' } : null}
                        >Войти</button>
                        <div className="login__links">
            <p className="login__question">Ещё не зарегистрированы?</p>
            <Link className="login__link" to="/signup">
              Регистрация
            </Link>
                  </div>
                  </div>
                </form>
        </section>
    )
}

export default Login;
