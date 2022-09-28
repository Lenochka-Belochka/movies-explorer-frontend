import React from 'react';
import {
	Redirect, Route, Switch,
} from 'react-router-dom';
// import Footer from '../Footer/Footer';
//import Header  from '../Header/Header';
import  Login  from '../Login/Login';
import  Main  from '../Main/Main';
import  Movies  from '../Movies/Movies';
import { NotFound } from '../NotFound/NotFound';
import  Profile from '../Profile/Profile';
import  Register  from '../Register/Register';
//import { Navigation } from '../Navigation/Navigation';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
	return (
		<div className="app">
			<Switch>
				<Route exact path="/">
					<Main />
				</Route>
				<Route path="/movies">
					<Movies />
				</Route>
        <Route exact path="/saved-movies">
          <SavedMovies />
        </Route>
				<Route path="/signin">
					<Login />
				</Route>
				<Route path="/signup">
					<Register />
				</Route>
				<Route path="/profile">
					<Profile />
				</Route>
        <Route path="*">
          <NotFound />
        </Route>
				<Redirect to="/404" />
			</Switch>
		</div>
	);
}
export default App;
