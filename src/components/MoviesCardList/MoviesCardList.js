import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';


function MoviesCardList({
    movies,
    savedMovies,
    onSaveMovie,
    onDeleteSaveMovie,
    loading,
    isSearchDone,
    onFilteredMovies,
    moreLoadingButton,
}) {

    const moreLoadingButtonClass = moreLoadingButton ? `movies__button` : `movies__button_hide`;

    return (
        <section className='movie-card-list'>
            <div className='movies__films'>
                {movies.map((movie) => (
                    <MoviesCard
                        movie={movie}
                        key={movie._id || movie.id}
                        savedMovies={savedMovies}
                        onSaveMovie={onSaveMovie}
                        onDeleteSaveMovie={onDeleteSaveMovie}
                    />
                ))}
            </div>
            {!loading ? isSearchDone
                ? <>
                    <button
                        onClick={onFilteredMovies}
                        className={moreLoadingButtonClass}
                        aria-label='Загрузить ещё'
                        type='button'>Ещё</button>
                </>
                : ("")
                : ("")
            }
        </section>
    );
};

export default MoviesCardList;
