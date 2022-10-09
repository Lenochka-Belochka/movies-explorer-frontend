import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

import { MOVIE_URL } from '../../utils/constants';

const MoviesCard = ({ movie, savedMovies, onSaveMovie, onDeleteSaveMovie }) => {
    const location = useLocation();
    const savedMovie = savedMovies.find((m) => m.movieId === movie.id);
    const isSaved = movie.id ? savedMovie : location.pathname === '/saved-movies'
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    function onClickLink(url) {
        return () => window.open(url, '_blank', 'noopener noreferrer')
    }
    function handleDeleteSaveMovie() {
        onDeleteSaveMovie(movie);
    }

    function handleSaveMovie() {
        if (!savedMovie) {
            onSaveMovie({
                country: String(movie.country),
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `${MOVIE_URL}${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `${MOVIE_URL}${movie.image.formats.thumbnail.url}`,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
            });
        } else {
            onDeleteSaveMovie(savedMovies.filter((m) => m.movieId === movie.id)[0]);
        }
    }

    return (
        <div className='card'>
        <div className="card__head">
        <div className="card__name">
          <p className="card__title">{movie.nameRU}</p>
        </div>
        <div className="card__name">
        <p className="card__time">{hours !== 0 ? `${hours}ч` : ""} {minutes !== 0 ? `${minutes}м` : ""}</p>
        </div>
      </div>
            <a className='card__link_trailer'
                href={movie.trailerLink}
                onClick={onClickLink}
            >
                <img className='card__image'
                    src={(typeof movie.image === 'string') ? movie.image : `${MOVIE_URL}${movie.image.url}`}
                    alt={`Постер фильма ${movie.nameRU}`}
                />
            </a>
                {location.pathname === '/saved-movies' &&
                    <button type='button'
                        aria-label='удалить фильм'
                        className={isSaved ? 'card__delete' : 'none'}
                        onClick={handleDeleteSaveMovie}
                    >
                    </button>}

                {location.pathname === '/movies' &&
                    <button type='button'
                        aria-label='сохранить'
                        className={isSaved ? 'card__like_active' : 'card__like'}
                        onClick={handleSaveMovie}
                    >
                       </button>}

        </div>
    );
};

export default MoviesCard;
