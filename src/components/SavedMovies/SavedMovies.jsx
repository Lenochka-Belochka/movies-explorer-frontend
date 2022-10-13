import './SavedMovies.css';
import { useState, useContext, useEffect } from 'react';
import {
  filterMovies,
  filterShortMovies,
} from '../../utils/utils.js';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function SavedMovies({ onDeleteClick, savedMoviesContent, setIsInfoTooltip }) {
  const currentUser = useContext(CurrentUserContext);

  const [shortMovies, setShortMovies] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMoviesContent);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);
  const [NotFound, setNotFound] = useState(false);


  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMoviesContent, inputValue, shortMovies);
    if (moviesList.length === 0) {
      setNotFound(true);
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: 'Ничего не найдено.',
      });
    } else {
      setNotFound(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  function handleShortFilms() {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0 ? setNotFound(true) : setNotFound(false);
    } else {
      setShortMovies(false);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
      filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
      setShowedMovies(filteredMovies);
    }
  }

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === 'true') {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(savedMoviesContent));
    } else {
      setShortMovies(false);
      setShowedMovies(savedMoviesContent);
    }
  }, [savedMoviesContent, currentUser]);

  useEffect(() => {
    setFilteredMovies(savedMoviesContent);
    savedMoviesContent.length !== 0 ? setNotFound(false) : setNotFound(true);
  }, [savedMoviesContent]);

  return (
    <main className="saved-movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />
      {!NotFound && (
        <MoviesCardList
          moviesList={showedMovies}
          savedMoviesContent={savedMoviesContent}
          onDeleteClick={onDeleteClick}
        />
      )}
    </main>
  );
}
