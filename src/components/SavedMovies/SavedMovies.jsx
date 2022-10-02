import React from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { SearchForm } from "../SearchForm/SearchForm";
export const SavedMovies = ({
  isLogged,
  moviesAll,
  searchMovies,
  searchSavedMovies,
  isLoadingFilm,
  savedMovies,
  movieDeleteFromSaved,
  movieSaveInSaved,
  clearAllErrors,
  setSearchShortMovies,
  isSavedMovies,
  changeFilter,
  searchError,
  serverError,
}) => {
  React.useEffect(() => {
    clearAllErrors();
  }, []);

  return (
    <section className="saved-movies">
      <Header
        isLogged={isLogged}
        isMain={false}
        isProfile={false}
        isMovies={false}
        isSavedMovies={true}
      />
      <SearchForm
        isSaved={true}
        searchMovies={searchMovies}
        searchSavedMovies={searchSavedMovies}
        isSavedMovies={isSavedMovies}
        changeFilter={changeFilter}
        setSearchShortMovies={setSearchShortMovies}
      />
      <MovieCardList
        moviesAll={moviesAll}
        isSaved={true}
        isLoadingFilm={isLoadingFilm}
        savedMovies={savedMovies}
        movieDeleteFromSaved={movieDeleteFromSaved}
        movieSaveInSaved={movieSaveInSaved}
        searchError={searchError}
        serverError={serverError}
      />
      <Footer />
    </section>
  );
};
