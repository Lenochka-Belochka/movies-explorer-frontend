import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderLogo.css';
import headerLogo from '../../images/logo.svg'

function HeaderLogo() {
    return (
        <Link to="/">
            <img className='header__logo' src={headerLogo} alt='Логотип' />
        </Link>

    )
}

export default HeaderLogo;
