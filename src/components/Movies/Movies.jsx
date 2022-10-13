import './Movies.css';
import { useState, useContext, useEffect } from 'react';
import {transformMovies, filterMovies,filterShortMovies } from '../../utils/utils.js';
import moviesApi from '../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function Movies({ setIsLoader, setIsInfoTooltip, savedMoviesContent, onLikeClick, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const [shortMovies, setShortMovies] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showAllMovies, setShowAllMovies] = useState([]);
  const [NotFound, setNotFound] = useState(false);


  function handleSetFilteredMovies(movies, userQuery, shortMoviesFilterCheckbox) {
    const moviesList = filterMovies(movies, userQuery, shortMoviesFilterCheckbox);
    if (moviesList.length === 0) {
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: 'По Вашему запросу ничего не найдено!',
      });
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesFilterCheckbox ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem(
      `${currentUser.email} - movies`,
      JSON.stringify(moviesList)
    );
  }

  function handleSearchSubmit(inputValue) {
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - shortMovies`, shortMovies);

    if (showAllMovies.length === 0) {
      setIsLoader(true);
      moviesApi
        .getMovies()
        .then(movies => {
          setShowAllMovies(movies);
          handleSetFilteredMovies(
            transformMovies(movies),
            inputValue,
            shortMovies
          );
        })
        .catch(() =>
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: 'При выполнении запроса возникла ошибка',
          })
        )
        .finally(() => setIsLoader(false));
    } else {
      handleSetFilteredMovies(showAllMovies, inputValue, shortMovies);
    }
  }

  function handleShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(filterShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem(`${currentUser.email} - shortMovies`, !shortMovies);
  }

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true'
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />
      {!NotFound && (
        <MoviesCardList
          moviesList={filteredMovies}
          savedMoviesContent={savedMoviesContent}
          onLikeClick={onLikeClick}
          onDeleteClick={onDeleteClick}
        />
      )}
    </main>
  );
}
