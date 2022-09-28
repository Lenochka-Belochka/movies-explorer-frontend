import React from 'react';
import { Footer } from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MovieCardList/MovieCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
	return (
		<>
      <Header />
			<SearchForm />
			<MoviesCardList />
      <Footer />
		</>
	);
}

export default SavedMovies;
