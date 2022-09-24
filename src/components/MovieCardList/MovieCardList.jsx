import React from 'react';
import './MovieCardList.css';

import  MoviesCard from '../MoviesCard/MoviesCard';
import { Preloader } from '../Preloader/Preloader';

function MoviesCardList( ) {
  return (
<section className="movie-card-list">
<Preloader />

<ul className="movies__gallery">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
					<button className="movies__button" type="more" label="Ещё"> Ещё </button>
    </section>
  );
}

export default MoviesCardList;

