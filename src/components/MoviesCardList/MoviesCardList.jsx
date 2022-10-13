import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useScreenWidth from '../../hooks/useScreenWidth';
import { SCREEN_PARAMS } from '../../utils/constants';
import { getSavedMovieCard } from '../../utils/utils';
import MoviesCard from '../MoviesCard/MoviesCard';


export default function MoviesCardList({ moviesList, savedMoviesContent, onLikeClick, onDeleteClick }) {
  const screenWidth = useScreenWidth();

  const { desktop, tablet, mobile } = SCREEN_PARAMS;
  const [isMount, setIsMount] = useState(true);
  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsShowDetails, setCardsSсreenDetails] = useState({ total: 12, more: 3 });

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (screenWidth > desktop.width) {
        setCardsSсreenDetails(desktop.cards);
      } else if (screenWidth <= desktop.width && screenWidth > mobile.width) {
        setCardsSсreenDetails(tablet.cards);
      } else {
        setCardsSсreenDetails(mobile.cards);
      }
      return () => setIsMount(false);
    }
  }, [screenWidth, isMount, desktop, tablet, mobile, location.pathname]);

  useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter((item, i) => i < cardsShowDetails.total);
      setShowMovieList(res);
    }
  }, [moviesList, cardsShowDetails.total]);

  function handleClickMoreButton() {
    const start = showMovieList.length;
    const end = start + cardsShowDetails.more;
    const additional = moviesList.length - start;

    if (additional > 0) {
      const newCards = moviesList.slice(start, end);
      setShowMovieList([...showMovieList, ...newCards]);
    }
  }

  return (
    <section className="movie-card-list">
      <div className="movies__films">
        {showMovieList.map(movie => (
          <MoviesCard
            key={movie.id || movie._id}
            saved={getSavedMovieCard(savedMoviesContent, movie)}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
            movie={movie}
          />
        ))}
      </div>
      {location.pathname === '/movies' && showMovieList.length >= 5 && showMovieList.length < moviesList.length && (
        <button
          className="movies__button"
          onClick={handleClickMoreButton}
        >
          Ещё
        </button>
      )}
    </section>
  );
}