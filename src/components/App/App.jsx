import React from "react";
import { Main } from "../Main/Main";
import {
  Route,
  useLocation,
  useHistory,
  Switch,
  Redirect,
} from "react-router-dom";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { NotFound } from "../NotFound/NotFound";


function App() {
  const [isLogged, setIsLogged] = React.useState(false);
  const [filterSavedMoviesAll, setfilterSavedMoviesAll] =
    React.useState([]);
  const [filterTimeOfMoviesAll, setFilterTimeOfMoviesAll] =
    React.useState([]);
  const [filterTimeOfSavedMovies, setFilterTimeOfSavedMovies] =
    React.useState([]);
  const [loginError, setLoginError] = React.useState("");
  const [registerError, setRegisterError] = React.useState("");
  const [isFindMovies, setisFindMovies] = React.useState(false);
  const [isSavedMovies, setisSavedMovies] = React.useState(false);
  const [moviesAll, setMoviesAll] = React.useState([]);
  const [savedMoviesAll, setsavedMoviesAll] = React.useState([]);
  const [foundMoviesList, setFoundMoviesList] = React.useState([]);
  const [searchError, setsearchError] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [profileError, setProfileError] = React.useState("");
  const [isLoadingFilm, setisLoadingFilm] = React.useState(false);
  const [token, setToken] = React.useState("");
  const SHORT_DURATION = 40;

  const history = useHistory();
  const pathname = useLocation();
  const isLocationMovies = pathname.pathname === "/movies";
  const isLocationUsersMovies = pathname.pathname === "/saved-movies";

  function changeFilter() {
    isLocationMovies
      ? setisFindMovies(!isFindMovies)
      : setisSavedMovies(!isSavedMovies);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    const movies = localStorage.getItem("movies");
    const savedMovies = localStorage.getItem("savedMovies");
    if (jwt) {
      setToken(jwt);
      if (movies) {
        const result = JSON.parse(movies);
        setMoviesAll(result);
      }
      if (savedMovies) {
        const resultSave = JSON.parse(savedMovies);
        setsavedMoviesAll(resultSave);
        setfilterSavedMoviesAll(resultSave);
      }
      MainApi.getContent(jwt)
        .then((user) => {
          setCurrentUser(user);
          setIsLogged(true);
          history.push(pathname.pathname);
        })
        .catch((err) => {
          setServerError(true);
        });
    }
  }

  React.useEffect(() => {
    const searchData = localStorage.getItem("searchData");
    if (searchData) {
      setFoundMoviesList(JSON.parse(searchData));
    }
    const isChecked = localStorage.getItem("isChecked");
    if (isChecked) {
      setisFindMovies(JSON.parse(isChecked));
    }
    const shortResult = localStorage.getItem("shortResult");
    if (shortResult) {
      setFilterTimeOfMoviesAll(JSON.parse(shortResult));
    }
    const isCheckedMemory = localStorage.getItem("isCheckedMemory");
    if (isCheckedMemory) {
      setisSavedMovies(JSON.parse(isCheckedMemory));
    }
    const shortResultMemory = localStorage.getItem("shortResultMemory");
    if (shortResultMemory) {
      setFilterTimeOfSavedMovies(JSON.parse(shortResultMemory));
    }
  }, [isLogged]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function onRegister({ email, password, name }) {
    MainApi.register({ email, password, name })
      .then((data) => {
        if (data._id) {
          onLogin({ email, password });
        }
      })
      .catch((err) => {
        setRegisterError("Возникла проблема. Попробуйте ещё раз.");
        if (err === 400)
          return setRegisterError("Ошибка в одном из полей");
      });
  }

  function onLogin({ email, password }) {
    MainApi.authorize({ email, password })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("jwt", data.token);
          setIsLogged(true);
          history.push("/movies");
          MainApi.getSavedMovies(data.token)
            .then((movies) => {
              setsavedMoviesAll(movies);
              setfilterSavedMoviesAll(movies);
              localStorage.setItem("savedMovies", JSON.stringify(movies));
            })
            .catch((err) => console.log(err));
          MainApi.getContent(data.token)
            .then((user) => {
              setCurrentUser(user);
            })
            .catch((err) => {
              setServerError(true);
            });
        }
      })
      .catch((err) => {
        if (err === 400) return setLoginError("Не заполнено одно из полей");
        if (err === 401) return setLoginError("Пользователь с данным email не зарегистрирован");
        setLoginError("Попробуйте снова!");
        console.log(err);
      });
    if (isLogged) {
      MainApi.getContent()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => setProfileError("Проблема с загрузкой данных"));
    }
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("searchData");
    localStorage.removeItem("isChecked");
    localStorage.removeItem("isCheckedMemory");
    localStorage.removeItem("shortResult");
    localStorage.removeItem("shortResultMemory");
    setIsLogged(false);
    setMoviesAll([]);
    setsavedMoviesAll([]);
    setFilterTimeOfSavedMovies([]);
    setFilterTimeOfMoviesAll([]);
    setfilterSavedMoviesAll([]);
    setFoundMoviesList([]);
    clearAllErrors();
    history.push("/");
  }

  function clearAllErrors() {
    setLoginError("");
    setRegisterError("");
    setsearchError(false);
    setServerError(false);
    setProfileError("");
  }

  function searchMovies(searchText) {
    setServerError(false);
    setisLoadingFilm(true);
    if (moviesAll.length > 0) {
      const result = search(moviesAll, searchText);
      if (result.length > 0) {
        setsearchError(false);
      } else {
        setsearchError(true);
      }
      setFoundMoviesList(result);
      localStorage.setItem("searchData", JSON.stringify(result));
    } else {
      MoviesApi.getInitialMovies()
        .then((res) => {
          setMoviesAll(res);
          localStorage.setItem("movies", JSON.stringify(res));
          const result = search(res, searchText);
          if (result.length > 0) {
            setsearchError(false);
          } else {
            setsearchError(true);
          }
          setFoundMoviesList(result);
          if (isFindMovies) {
            const resultTimeFilter = searchFilterTime(result);
            if (resultTimeFilter.length > 0) {
              setsearchError(false);
            } else {
              setsearchError(true);
            }
            setFilterTimeOfMoviesAll(resultTimeFilter);
          }
        })
        .catch((err) => setServerError(true));
    }
    setTimeout(() => {
      setisLoadingFilm(false);
    }, 1000);
  }

  function searchSavedMovies(searchText) {
    setServerError(false);
    setisLoadingFilm(true);
    if (savedMoviesAll.length > 0) {
      const result = search(savedMoviesAll, searchText);
      if (result.length > 0) {
        setsearchError(false);
      } else {
        setsearchError(true);
      }
      setfilterSavedMoviesAll(result);
      setTimeout(() => {
        setisLoadingFilm(false);
      }, 1000);
    }
  }

  function search(collection, searchText) {
    let result = [];
    collection.forEach((movie) => {
      if (movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        result.push(movie);
      }
    });
    return result;
  }

  function searchFilterTime(collection) {
    let result = [];
    collection.forEach((movie) => {
      if (movie.duration <= SHORT_DURATION) {
        result.push(movie);
      }
    });
    return result;
  }

  React.useEffect(
    () => {
      setsearchError(false);
      localStorage.setItem("isChecked", isFindMovies);
      if (isLocationMovies) {
        if (isFindMovies) {
          if (moviesAll.length > 0) {
            const result = searchFilterTime(foundMoviesList);
            if (result.length > 0) {
              setsearchError(false);
            } else {
              setsearchError(true);
            }
            setFilterTimeOfMoviesAll(result);
            localStorage.setItem("shortResult", JSON.stringify(result));
          }
        }
      } else {
        localStorage.setItem("isCheckedMemory", isSavedMovies);
        if (isLocationUsersMovies) {
          if (isSavedMovies) {
            if (moviesAll.length > 0) {
              const result = searchFilterTime(filterSavedMoviesAll);
              if (result.length > 0) {
                setsearchError(false);
              } else {
                setsearchError(true);
              }
              setFilterTimeOfSavedMovies(result);
              localStorage.setItem("shortResultMemory", JSON.stringify(result));
            }
          }
        }
      }
    }, // eslint-disable-next-line
    [isFindMovies, isSavedMovies]
  );

  function movieSaveInSaved(movie) {
    MainApi.saveMovie({ token, movie })
      .then((res) => {
        const movies = [...savedMoviesAll, res];
        localStorage.setItem("savedMovies", JSON.stringify(movies));
        setsavedMoviesAll((prev) => [...prev, res]);
        if (isSavedMovies) {
          setFilterTimeOfSavedMovies((prev) => [...prev, res]);
          setfilterSavedMoviesAll((prev) => [...prev, res]);
        } else {
          setfilterSavedMoviesAll((prev) => [...prev, res]);
        }
      })
      .catch((err) => setServerError(true));
  }

  function movieDeleteFromSaved(id) {
    MainApi.deleteSavedMovie({ token, id })
      .then(() => {
        const result = filterMoviesById(savedMoviesAll, id);
        setsavedMoviesAll(result);
        localStorage.setItem("savedMovies", JSON.stringify(result));
        setfilterSavedMoviesAll(
          filterMoviesById(filterSavedMoviesAll, id)
        );
        setFilterTimeOfSavedMovies(
          filterMoviesById(filterTimeOfMoviesAll, id)
        );
      })
      .catch((err) => setServerError(true));
  }

  function filterMoviesById(collection, id) {
    return collection.filter((item) => {
      return item._id !== id;
    });
  }

  function changeProfile({ name, email }) {
    MainApi.editUserProfile({ token, name, email })
      .then((newUser) => {
        if (newUser._id) {
          setCurrentUser(newUser);
          setProfileError("Данные профиля успешно изменены");
        } else if (newUser.message) {
          setProfileError(newUser.message);
        }
      })
      .catch((err) =>
        setProfileError("Произошла ошибка при обновлении профиля")
      );
  }

  React.useEffect(() => {
    clearAllErrors();
    if (pathname === "/saved-movies") {
      setfilterSavedMoviesAll(savedMoviesAll);
    }
  }, [pathname]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/" isLogged={isLogged}>
          <Main isLogged={isLogged} />
        </Route>
        <ProtectedRoute exact path="/movies" isLogged={isLogged}>
          <Movies
            isLogged={isLogged}
            isFindMovies={isFindMovies}
            changeFilter={changeFilter}
            moviesAll={
              isFindMovies ? filterTimeOfMoviesAll : foundMoviesList
            }
            searchMovies={searchMovies}
            searchSavedMovies={searchSavedMovies}
            isLoadingFilm={isLoadingFilm}
            savedMovies={savedMoviesAll}
            movieDeleteFromSaved={movieDeleteFromSaved}
            movieSaveInSaved={movieSaveInSaved}
            searchError={searchError}
            serverError={serverError}
            clearAllErrors={clearAllErrors}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/saved-movies" isLogged={isLogged}>
          <SavedMovies
            isLogged={isLogged}
            isSavedMovies={isSavedMovies}
            changeFilter={changeFilter}
            moviesAll={
              isSavedMovies
                ? filterTimeOfSavedMovies
                : filterSavedMoviesAll
            }
            searchMovies={searchMovies}
            searchSavedMovies={searchSavedMovies}
            isLoadingFilm={isLoadingFilm}
            savedMovies={savedMoviesAll}
            movieDeleteFromSaved={movieDeleteFromSaved}
            movieSaveInSaved={movieSaveInSaved}
            searchError={searchError}
            serverError={serverError}
            clearAllErrors={clearAllErrors}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile" isLogged={isLogged}>
          <Profile
            isLogged={isLogged}
            onSignOut={onSignOut}
            changeProfile={changeProfile}
            profileError={profileError}
            setProfileError={setProfileError}
          />
        </ProtectedRoute>
        <Route exact path="/signin">
          {isLogged ? (
            <Redirect to="/" />
          ) : (
            <Login
              onLogin={onLogin}
              clearErrors={clearAllErrors}
              loginError={loginError}
              setLoginError={setLoginError}
            />
          )}
        </Route>
        <Route exact path="/signup">
          {isLogged ? (
            <Redirect to="/" />
          ) : (
            <Register
              onRegister={onRegister}
              clearErrors={clearAllErrors}
              registerError={registerError}
              setRegisterError={setRegisterError}
            />
          )}
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
