import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './App.css';


import Header from '../Header/Header';
import Main from '../Main/Main';
import { Footer } from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ShortFilmsFilter from '../../utils/ShortFilmsFilter';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { NotFound } from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useCurrentWidth from '../../hooks/useCurrentWidth';
import {
  ELEMENTS_SIZE_MOBILE,
  START_FILMS_MOBILE,
  LOADING_MORE_BUTTON_MOBILE,
  ELEMENTS_SIZE_TABLET,
  START_FILMS_TABLET,
  ELEMENTS_SIZE_DESKTOP,
  START_FILMS_DESKTOP,
  LOADING_MORE_BUTTON_DESKTOP
} from '../../utils/constants'
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function App() {
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filterTimeOfMovies, setFilterTimeOfMovies] = useState([]);
  const [firstMovies, setFirstMovies] = useState(0)
  const [moviesMore, setMoviesMore] = useState(0)
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [searchStatus, setSearchStatus] = useState('');
  const [isSearchDone, setIsSearchDone] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [request, setRequest] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moreLoadingButton, setMoreLoadingButton] = useState(false);
  const [profileText, setProfileText] = useState('');

  const width = useCurrentWidth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn])

  useEffect(() => {
    if (localStorage.getItem('moviesStorage')) {
      const initialSearch = JSON.parse(localStorage.getItem('moviesStorage'));
      const searchResult = ShortFilmsFilter(initialSearch, request, checkboxStatus);
      setFilterTimeOfMovies(searchResult);
      setIsSearchDone(true);
    }
  }, [currentUser])

  useEffect(() => {
    if (loggedIn) {
      mainApi.getSavedMovies()
        .then((res) => {
          const findSavedMovies = res.filter((m) => m.owner._id === currentUser._id)
          localStorage.setItem("savedMovies", JSON.stringify(findSavedMovies));
          setSavedMovies(findSavedMovies);
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn])

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getUserInfo(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setCurrentUser(res)
            navigate(location)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  function handleRegister(user) {
    mainApi.register(user)
      .then(() => {
        handleLogin({
          email: user.email,
          password: user.password
        });
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setRegisterError('Пользователь уже зарегистрирован');
        }
        if (err === 'Ошибка: 500') {
          setRegisterError('Ошибка сервера');
        }
        else {
          setRegisterError('Возникла проблема. Попробуйте ещё раз.');
        }
      });
  }

  function handleLogin(user) {
    return mainApi
      .authorize(user)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          setLoginError('Пользователь с данным email не зарегистрирован');
        }
        if (err === 'Ошибка: 500') {
          setLoginError('Попробуйте снова!');
        }
        else {
          setLoginError('Ошибка при авторизации');
        }
      })
  }

  //  изменить данные профияля
  function changeProfile(user) {
    const token = localStorage.getItem('jwt');
    mainApi
      .editProfile(user, token)
      .then((updateUser) => {
        setLoggedIn(true);
        setCurrentUser(updateUser);
        localStorage.setItem('name', updateUser.name);
        localStorage.setItem('email', updateUser.email);
        setProfileText('Данные профиля успешно изменены!');
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setProfileText('Пользователь с таким email уже существует');
        } else {
          setProfileText('Произошла ошибка при обновлении профиля');
        }
      })
  }

  const handleLogout = () => {
    localStorage.clear();

    navigate('/');
    console.log(localStorage, 'localstorage')
  };

  function startLoading() {
    setLoading(true);
    setTimeout(() => setLoading(false), 700);
  }

  function handleSearchMovie(request, checkboxStatus) {
    startLoading();
    setRenderedMovies([]);
    setRequest(request);
    setCheckboxStatus(checkboxStatus);

    const initialMoviesInLocalStorage = JSON.parse(localStorage.getItem('initialMovies'));

    if (!initialMoviesInLocalStorage) {
      setLoading(true);
      moviesApi
        .getInitialMovies()
        .then((movies) => {
          setInitialMovies(movies);
          localStorage.setItem('initialMovies', JSON.stringify(movies));
        })
        .catch(() => {
          setSearchStatus('При выполнении запроса произошла ошибка.')
        })
        .finally(() => {
          setLoading(false);
        })
    } else {
      setInitialMovies(initialMoviesInLocalStorage);
    }
  }

  useEffect(() => {
    if (initialMovies.length > 0) {
      const moviesStorage = ShortFilmsFilter(initialMovies, request, checkboxStatus);

      localStorage.setItem('moviesStorage', JSON.stringify(moviesStorage));
      localStorage.setItem('request', request);
      localStorage.setItem('checkboxStatus', checkboxStatus);

      setFilterTimeOfMovies(moviesStorage);
      setIsSearchDone(true);
    }
  }, [initialMovies, request, checkboxStatus]);

  useEffect(() => {
    if (renderedMovies.length === filterTimeOfMovies.length) {
      setMoreLoadingButton(false);
    }
  }, [renderedMovies, filterTimeOfMovies]);


  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((res) => {
        const updatedSavedMovies = [...savedMovies, { ...res, id: res.movieId }];
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      })
      .catch(err => console.log(err));
  };

  function handleDeleteSaveMovie(movie) {
    mainApi
      .deleteSaveMovie(movie._id)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter(m => m._id !== movie._id)
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    if (width <= ELEMENTS_SIZE_MOBILE) {
      setFirstMovies(START_FILMS_MOBILE)
      setMoviesMore(LOADING_MORE_BUTTON_MOBILE)
    } else if (width <= ELEMENTS_SIZE_TABLET) {
      setFirstMovies(START_FILMS_TABLET)
      setMoviesMore(LOADING_MORE_BUTTON_MOBILE)
    } else if (width > ELEMENTS_SIZE_DESKTOP) {
      setFirstMovies(START_FILMS_DESKTOP)
      setMoviesMore(LOADING_MORE_BUTTON_DESKTOP)
    }
  }, [width])

  useEffect(() => {
    if (filterTimeOfMovies.length > 0) {
      if (filterTimeOfMovies.length > firstMovies) {
        setRenderedMovies(filterTimeOfMovies.slice(0, firstMovies));
        setMoreLoadingButton(true);
      } else {
        setRenderedMovies(filterTimeOfMovies);
      }
    }
  }, [filterTimeOfMovies, firstMovies]);

  function filteredMovies() {
    setRenderedMovies((previousCount) => filterTimeOfMovies.slice(0, previousCount.length + moviesMore));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">

        <Routes>

          <Route path={'/'} element={
            <>
              <Header
                loggedIn={loggedIn}
              />
              <Main />
              <Footer />
            </>}>
          </Route>


          <Route exact path='/signup' element={
            <>
              <Register
                onRegister={handleRegister}
                registerError={registerError} />
            </>
          } />

          <Route exact path='/signin' element={
            <>
              <Login onLogin={handleLogin}
                loginError={loginError} />
            </>
          } />

          <Route path={'/movies'} element={
            <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Header
                  loggedIn={loggedIn} />
                <Movies
                  loggedIn={loggedIn}
                  onSearch={handleSearchMovie}
                  loading={loading}
                  isSearchDone={isSearchDone}
                  searchStatus={searchStatus}
                  renderedMovies={renderedMovies}
                  savedMovies={savedMovies}
                  onSaveMovie={handleSaveMovie}
                  onDeleteSaveMovie={handleDeleteSaveMovie}
                  moreLoadingButton={moreLoadingButton}
                  onFilteredMovies={filteredMovies}
                />
                <Footer />
              </>
            </ProtectedRoute>}>
          </Route>

          <Route path={'/saved-movies'} element={
            <ProtectedRoute loggedIn={loggedIn} >
              <>
                <Header
                  loggedIn={loggedIn} />
                <SavedMovies
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  onDeleteSaveMovie={handleDeleteSaveMovie}
                />
                <Footer />
              </>
            </ProtectedRoute>}>
          </Route>

          <Route path={'/profile'} element={
            <ProtectedRoute
              loggedIn={loggedIn}>
              <>
                <Header
                  loggedIn={loggedIn} />
                <Profile
                  loggedIn={loggedIn}
                  onUpdateUser={changeProfile}
                  profileText={profileText}
                  onSignOut={handleLogout}
                />
              </>
            </ProtectedRoute>}>
          </Route>

          <Route path={'*'} element={
            <>
              < NotFound />
            </>}>
          </Route>

        </Routes>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
