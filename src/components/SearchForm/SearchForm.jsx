import React from 'react';
import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
<section className="search">
      <form name="search-movie" className="search__form">
        <div className="search__container">
          <input type="text"  id="movie-title-input" className="search__input" name="search-input" placeholder="Фильм" minLength="1" maxLength="50"/>
          <button type="submit" className="search__find"></button>
        </div>
      </form>
      <FilterCheckbox
      />
    </section>
  );
}

export default SearchForm;
