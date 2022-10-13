import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import accountLogo from '../../images/icon__COLOR_icon-main.svg';
import './Navigation.css'

function Navigation({ loggedIn }) {

    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    const openBurgerMenu = () => {
        setIsBurgerMenuOpen(true);
    }

    const closeBurgerMenu = () => {
        setIsBurgerMenuOpen(false);
    }

    React.useEffect(() => {
        const closeByEsc = (evt) => {
            if (evt.key === 'Escape') {
                closeBurgerMenu();
            }
        }
        document.addEventListener('keydown', closeByEsc)
        return () => document.removeEventListener('keydown', closeByEsc)
    }, [])

    return (
        <section className='navigation'>
            {!loggedIn ? (
               <div className='navigation__menu'>
                <div className='navigation__films'>
                <HeaderLogo />
                    <div className='navigation__links'>
                    <NavLink className={({ isActive }) =>
                            isActive ? "navigation__link_active" : "navgiation__link"
                        } to="/movies">Фильмы</NavLink>

                        <NavLink className={({ isActive }) =>
                            isActive ? "navigation__link_active" : "navgiation__link"
                        } to="/saved-movies">Сохранённые фильмы</NavLink>
                    </div>
                    </div>
                    <div className='navigation__burger'>
                        <BurgerMenu
                            isOpen={isBurgerMenuOpen}
                            onClick={openBurgerMenu}
                            onClose={closeBurgerMenu}
                        />
                       <nav className='navigation__account-data'>
                            <NavLink className={({ isActive }) =>
                                isActive ? "navigation__login-active" : "navigation__login"
                            } to="/profile">Аккаунт</NavLink>

                            <Link className="navigation__account" to="/profile" src={accountLogo} alt='изображение логотипа'></Link>
                        </nav>

                    </div>
                </div>
            ) : ("")}
        </section>)

}

export default Navigation;
