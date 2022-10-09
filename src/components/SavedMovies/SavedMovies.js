import React, { useEffect, useState } from 'react'

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'

import ShortFilmsFilter from '../../utils/ShortFilmsFilter'

function SavedMovies({ savedMovies, onDeleteSaveMovie }) {

    const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
    const [request, setRequest] = useState('');
    const [checkboxStatus, setCheckboxStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSearchDone, setIsSearchDone] = useState(false);

    function handleSearchSavedMovie(request, checkboxStatus) {
        startLoading();

        const searchResult = ShortFilmsFilter(savedMovies, request, checkboxStatus);
        setFilteredSavedMovies(searchResult);
        setRequest(request);
        setCheckboxStatus(checkboxStatus);
        setIsSearchDone(true);
    }

    function startLoading() {
        setLoading(true);
        setTimeout(() => setLoading(false), 700);
    }

    useEffect(() => {
        if (filteredSavedMovies.length > 0) {
            const searchResult = ShortFilmsFilter(savedMovies, request, checkboxStatus);
            setFilteredSavedMovies(searchResult);
        }
    }, [savedMovies]);

    return (
        <main className='savedMovies'>
            <SearchForm
                onSearch={handleSearchSavedMovie}
            />
            {loading ?
                <div className="savedMovies__preloader">
                    <Preloader />
                </div>
                : isSearchDone
                    ? filteredSavedMovies.length > 0
                        ?
                        <MoviesCardList
                            movies={filteredSavedMovies}
                            savedMovies={savedMovies}
                            onDeleteSaveMovie={onDeleteSaveMovie}
                        />
                        : (
                            <div className="savedMovies__container">
                                <span className="savedMovies__text">Ничего не найдено</span>
                            </div>
                        )
                    : (
                        <MoviesCardList
                            movies={savedMovies}
                            savedMovies={savedMovies}
                            onDeleteSaveMovie={onDeleteSaveMovie}
                        />
                    )
            }

        </main>
    )
}

export default SavedMovies;
