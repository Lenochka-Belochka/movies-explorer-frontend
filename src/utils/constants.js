const BASE_URL = 'https://api.movies.lunatic.luntic.nomoredomains.sbs';
const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const MOVIES_DURATION = 40;
const SCREEN_PARAMS = {
  desktop: {
    width: 917,
    cards: {
      total: 12,
      more: 3,
    },
  },
  tablet: {
    width: 583,
    cards: {
      total: 8,
      more: 2,
    },
  },
  mobile: {
    width: 583,
    cards: {
      total: 5,
      more: 2,
    },
  },
};

export { BASE_URL, MOVIES_URL, MOVIES_DURATION, SCREEN_PARAMS };
