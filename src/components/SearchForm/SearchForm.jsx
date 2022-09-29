import React from 'react';
import './SearchForm.css';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';

export default function SearchForm({ handleSearchSubmit, handleShortFilms, shortMovies }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const { values, handleChange, isValid, setIsValid } = useFormWithValidation();

  const [errorQuery, setErrorQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    isValid ? handleSearchSubmit(values.search) : setErrorQuery('Нужно ввести ключевое слово.');
  };

  useEffect(() => {
    setErrorQuery('')
  }, [isValid]);

  //состояние инпута из локального хранилища
  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem(`${currentUser.email} - movieSearch`)) {
      const searchValue = localStorage.getItem(`${currentUser.email} - movieSearch`);
      values.search = searchValue;
      setIsValid(true);
    }
  }, [currentUser]);
  return (
<section className="search">
      <form name="search-movie" className="search__form" noValidate onSubmit={handleSubmit}>
        <div className="search__container">
          <input type="text"  id="movie-title-input" className="search__input" name="search-input" placeholder="Фильм"           autoComplete="off"
 required    value={values.search || ''} onChange={handleChange} minLength="1" maxLength="50"/>
         <span className="search__error">{errorQuery}</span>
          <button type="submit" className="search__find"></button>
        </div>
      </form>
      <FilterCheckbox shortMovies={shortMovies} handleShortFilms={handleShortFilms}
      />
    </section>
  );
}


