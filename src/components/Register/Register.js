import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Error from '../Error/Error.js';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Register({ registerError, onRegister }) {

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
    useEffect(() => {
        resetForm({}, {}, false);
    }, [resetForm]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister(values)
    }

    return (
        <section className='register'>
                <Link to="/" className="register__logo"></Link>
                <h1 className="register__title">Добро пожаловать!</h1>
                <form className="register__form"
                    name="register-form"
                    onSubmit={handleSubmit}
                >

                    <div className="register__field">
                        <label>
                            <span className="register__text">Имя</span>
                            <input className="register__input"
                                type="text"
                                name="name"
                                placeholder="Имя"
                                minLength="2"
                                value={values.name || ''}
                                onChange={handleChange}
                                required />
                            <Error
                                errorMessage={errors.name}
                            />
                        </label>

                        <label>
                            <span className="register__text">E-mail</span>
                            <input className="register__input"
                                type="email"
                                name='email'
                                value={values.email || ''}
                                placeholder="E-mail"
                                pattern="^\S+@\S+\.\S+$"
                                onChange={handleChange}
                                required />
                            <Error
                                errorMessage={errors.email}
                            />
                        </label>

                        <label>
                            <span className="register__text">Пароль</span>
                            <input className="register__input"
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                value={values.password || ''}
                                minLength="4"
                                onChange={handleChange}
                                required />
                            <Error
                                errorMessage={errors.password}
                            />
                        </label>
                    </div>

                    <div className="register__nav">
                        <Error
                            errorMessage={registerError} />
                        <button className="register__button"
                            type="submit"
                            disabled={!isValid}
                            style={!isValid ?
                                { backgroundColor: '#4285F4', opacity: '.8' } : null}>Зарегистрироваться</button>
                    <div className="register__links">
                    <p className="register__question">Уже зарегистрированы?</p>
                        <Link className="register__link" to="/signin">
                    Войти
                        </Link>
                        </div>
                        </div>

                </form>
        </section>
    )
}

export default Register;
