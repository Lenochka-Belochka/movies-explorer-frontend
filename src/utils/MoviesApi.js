import { MOVIE_URL } from './constants';

class MoviesApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _checkServerResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(this._checkServerResponse)
    }
}

const moviesApi = new MoviesApi({
    baseUrl: `${MOVIE_URL}`,
});

export default moviesApi;
