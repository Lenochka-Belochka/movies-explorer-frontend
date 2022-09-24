import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import card from "../../images/card.png";

function MoviesCard() {
  const { pathname } = useLocation();

  const [favoriteMovie, setFavoriteMovie] = useState(false);
  const likeIcon = favoriteMovie
    ? "card__like_active"
    : "card__like";

  const cardIcon = pathname === "/movies" ? likeIcon : "card__delete";

  return (
    <li className="card">
    <div className="card__head">
      <div className="card__name">
        <p className="card__title">Какой-то фильм</p>
      </div>
      <div className="card__name">
        <p className="card__time">1 час 10 мин</p>
      </div>
    </div>
      <img
        className="card__image"
        src={card}
        alt="карточка фильма"
      />
          <button
          type="button"
          onClick={setFavoriteMovie}
          className={(cardIcon)}
        ></button>
  </li>
);
}

export default MoviesCard;
