import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { changeDuration } from '../../utils/utils';

export default function MoviesCard({ movie, saved, onLikeClick, onDeleteClick }) {
  const location = useLocation();
  const cardLikeButtonClassName = `card__like ${
    saved ? "card__like_active" : " "
  }`;

  function handleLikeClick() {
    onLikeClick(movie);
  }


  function handleDeleteClick() {
    onDeleteClick(movie);
  }

  return (
    <div className="card">
      <div className="card__head">
        <div className="card__name">
          <p className="card__title">{movie.nameRU}</p>
        </div>
        <div className="card__name">
        <p className="card__time">{changeDuration(movie.duration)}</p>
        </div>
        </div>

        <a target="_blank" rel="noreferrer" href={movie.trailerLink} className="card__link_trailer">
          <img
            src={movie.image}
            alt={movie.nameRU}
            title={`Описание: ${movie.description} \n\nСнято: ${movie.country} ${movie.year}г.`}
            className="card__image"
          />
        </a>

      {location.pathname === '/movies' && (
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={saved ? handleDeleteClick : handleLikeClick}
            ></button>
          )}
          {location.pathname === '/saved-movies' && (
            <button
              type="button"
              className="card__delete"
              onClick={handleDeleteClick}
            ></button>
          )}
    </div>
  );
}
