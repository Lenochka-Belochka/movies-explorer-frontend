import React from "react";
import { Header } from "../Header/Header";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { Footer } from "../Footer/Footer";
import "./Movies.css";

export const Movies = ({
  isLogged,
  changeFilter,
  isFindMovies,
  moviesAll,
  searchSavedMovies,
  searchMovies,
  isLoadingFilm,
  savedMovies,
  movieDeleteFromSaved,
  movieSaveInSaved,
  searchError,
  serverError,
  clearAllErrors,
}) => {
  React.useEffect(() => {
    clearAllErrors();
  }, []);

  const [numberMoviesOnScreen, setNumberMoviesOnScreen] = React.useState(
    () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 1279) {
        return 16;
      } else if (windowWidth >= 990) {
        return 12;
      } else if (windowWidth >= 500) {
        return 8;
      } else return 5;
    }
  );

  const [numberMoviesAdd, setNumberMoviesAdd] = React.useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1279) {
      return 4;
    } else if (windowWidth >= 990) {
      return 3;
    } else if (windowWidth >= 500) {
      return 2;
    } else return 2;
  });
  function onChangeScreenWidth() {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1279) {
      setNumberMoviesOnScreen(16);
      setNumberMoviesAdd(4);
    } else if (windowWidth >= 990) {
      setNumberMoviesOnScreen(12);
      setNumberMoviesAdd(3);
    } else if (windowWidth >= 500) {
      setNumberMoviesOnScreen(8);
      setNumberMoviesAdd(2);
    } else {
      setNumberMoviesOnScreen(5);
      setNumberMoviesAdd(2);
    }
  }
  React.useEffect(() => {
    window.addEventListener("resize", onChangeScreenWidth);
  }, []);

  const moviesAllVisible = moviesAll.slice(
    0,
    numberMoviesOnScreen
  );
  function addMoviesInCollectionVisible() {
    setNumberMoviesOnScreen((prevState) => prevState + numberMoviesAdd);
  }
  return (
    <section className="movies">
      <Header
        isLogged={isLogged}
        isMain={false}
        isMovies={true}
        isSavedMovies={false}
        isProfile={false}
      />
      <SearchForm
        isSaved={false}
        searchMovies={searchMovies}
        searchSavedMovies={searchSavedMovies}
        isFindMovies={isFindMovies}
        changeFilter={changeFilter}
      />
      <MovieCardList
        moviesAll={moviesAllVisible}
        isSaved={false}
        isLoadingFilm={isLoadingFilm}
        savedMovies={savedMovies}
        movieDeleteFromSaved={movieDeleteFromSaved}
        movieSaveInSaved={movieSaveInSaved}
        searchError={searchError}
        serverError={serverError}
      />
      <div className="movie__more_container">
      <button
        type="button"
        onClick={addMoviesInCollectionVisible}
        className={
          moviesAllVisible.length === moviesAll.length
            ? "movies__button_hide"
            : "movies__button"
        }
      >
        Еще
      </button>
      </div>
      <Footer />
    </section>
  );
};
