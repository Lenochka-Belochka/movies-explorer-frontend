import { MoviesCard } from "../MoviesCard/MoviesCard";
import { Preloader } from "../Preloader/Preloader";
import "./MovieCardList.css";
export const MovieCardList = ({
  moviesAll,
  isSaved,
  isLoadingFilm,
  savedMovies,
  movieDeleteFromSaved,
  movieSaveInSaved,
  searchError,
  serverError,
}) => {
  return (
    <section className="movie-card-list">
      <Preloader isLoadingFilm={isLoadingFilm} />
      <span className="search-form__error">
        {searchError ? "Ничего не найдено" : ""}
      </span>
      <span className="server__error">
        {serverError
          ? "Проблема с данными,  невозможно добавить фильм в сохраненные"
          : ""}
      </span>
      <ul className="movies__films">
        {moviesAll.map((movies) => (
          <MoviesCard
            key={isSaved ? movies._id : movies.id}
            movies={movies}
            isSaved={isSaved}
            savedMovies={savedMovies}
            movieDeleteFromSaved={movieDeleteFromSaved}
            movieSaveInSaved={movieSaveInSaved}
          />
        ))}
      </ul>
    </section>
  );
};
