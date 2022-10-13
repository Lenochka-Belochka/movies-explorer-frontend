import React from 'react';
import { Link, NavLink } from "react-router-dom";

import accountLogo from '../../images/icon__COLOR_icon-main.svg';

import './BurgerMenu.css'

function BurgerMenu({ onClick, isOpen, onClose }) {
    const burgerButton = `burger-menu__visible ${isOpen ? 'burger-menu__hidden' : 'burger-menu__visible'}`;
    const burgerActive = `burger-menu ${isOpen ? 'burger-menu__active' : ' '}`;
    return (
        <>
            <button className={burgerButton}
                onClick={onClick}
            />
            <div className={burgerActive}>
                <button className="burger-menu__close" onClick={onClose} />
                <nav className="burger-menu__links">

                    <NavLink className={({ isActive }) =>
                        isActive ? "burger-menu__link_active" : "burger-menu__link"
                    } exact to='/'>Главная</NavLink>

                    <NavLink className={({ isActive }) =>
                        isActive ? "burger-menu__link_active" : "burger-menu__link"
                    } to="/movies">Фильмы</NavLink>

                    <NavLink className={({ isActive }) =>
                        isActive ? "burger-menu__link_active" : "burger-menu__link"
                    } to="/saved-movies">Сохранённые фильмы</NavLink>
                </nav>
                <nav className='burger-menu__footer'>
                    <NavLink className={({ isActive }) =>
                        isActive ? "burger-menu__login-active" : "burger-menu__login"
                    } to="/profile">Аккаунт</NavLink>

                    <Link className="burger-menu__account" to="/profile" src={accountLogo} alt='картинка'></Link>
                </nav>
            </div>

        </>
    )
}

export default BurgerMenu;
