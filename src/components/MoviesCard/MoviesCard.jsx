  import './MoviesCard.css';
  import { useLocation } from 'react-router-dom';
  import { transformDuration } from '../../utils/utils.js';

  export default function MoviesCard({ movie, saved, onLikeClick, onDeleteClick }) {
    const location = useLocation();

    // сохранение фильма
    function handleLikeClick() {
      onLikeClick(movie);
    }

    // удаление фильма
    function handleDeleteClick() {
      onDeleteClick(movie);
    }

  return (
    <li className="card">
    <div className="card__head">
      <div className="card__name">
        <p className="card__title">{movie.nameRU}</p>
      </div>
      <div className="card__name">
        <p className="card__time"> {transformDuration(movie.duration)}
</p>
      </div>
    </div>
    <a target="_blank" rel="noreferrer" href={movie.trailerLink}>
      <img
        src={movie.image}
          alt={movie.nameRU}
          title={`Описание: ${movie.description} \n\nСнято: ${movie.country} ${movie.year}г.`}
          className="card__image"
      />
      </a>
   <div className="card__button">
        <button
          type="button"
          onClick={saved ? handleDeleteClick : handleLikeClick}
          aria-label={`${
            saved ? 'Удалить фильм из сохранённых' : 'Сохранить фильм'
          }`}
          title={`${
            saved ? 'Удалить фильм из сохранённых' : 'Сохранить фильм'
          }`}
          className={`card__like_active card__like_${
            saved ? 'saved' : 'save'
          }`}        ></button>
    </div>

  </li>
);
}
