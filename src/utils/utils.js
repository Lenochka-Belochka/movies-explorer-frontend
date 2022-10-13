import { MOVIES_DURATION } from './constants.js';

function transformMovies(movies) {
  movies.forEach(movie => {
    if (!movie.image) {
      movie.image = '';
      movie.thumbnail = '';
    } else {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
      movie.image = `https://api.nomoreparties.co${movie.image.url}`
    }
    if(!movie.country) {
      movie.country = 'Russia';
    }
    if(!movie.nameEN) {
      movie.nameEN = movie.nameRU;
    }
  });
  return movies
}



function filterMovies(movies, userQuery, shortMoviesFilterCheckbox) {
  const moviesByUserQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userMovie = userQuery.toLowerCase().trim();
    return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
  });

  if (shortMoviesFilterCheckbox) {
    return filterShortMovies(moviesByUserQuery);
  } else {
    return moviesByUserQuery;
  }
}

function filterShortMovies(movies) {
  return movies.filter(movie => movie.duration < MOVIES_DURATION);
}

function changeDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  if(hours === 0) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

function getSavedMovieCard(arr, movie) {
  return arr.find((item) => {
    return item.movieId === (movie.id || movie.movieId);
  });
}

export {
  transformMovies,
  filterMovies,
  filterShortMovies,
  changeDuration,
  getSavedMovieCard,
};
