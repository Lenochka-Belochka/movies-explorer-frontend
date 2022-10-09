import { SHORT_MOVIE } from './constants.js';

function ShortFilmsFilter(movies, request, checkboxStatus) {
    let ShortFilmsFilter = movies;
    let result;

    if (checkboxStatus) {
        ShortFilmsFilter = ShortFilmsFilter.filter((movie) => movie.duration <= SHORT_MOVIE);
    }

    result = ShortFilmsFilter.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(request.toLowerCase());
    })
    return result;
}

export default ShortFilmsFilter;

