import React from "react";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
export const SearchForm = ({
  isSaved,
  searchMovies,
  searchSavedMovies,
  isFindMovies,
  changeFilter,
  isSavedMovies,
}) => {
  const [validForm, setValidForm] = React.useState(true);
  const [textInput, setTextInput] = React.useState("");
  function handleChangeInput(e) {
    setTextInput(e.target.value);
    setValidForm(e.target.checkValidity());
  }
  function handleSearchMovies(e) {
    e.preventDefault();
    searchMovies(textInput);
  }
  function handleSearchSavedMovies(e) {
    e.preventDefault();
    searchSavedMovies(textInput);
  }

  return (
<section className="search">
      <form name="search-movie" className="search__form" noValidate  onSubmit={isSaved ? handleSearchSavedMovies : handleSearchMovies}>
        <div className="search__container">
          <input
          className="search__input"
          onChange={handleChangeInput}
          value={textInput}
          type="text"
          placeholder="Фильм"
          required
          minLength="2"
          />
      <button className="search__find"
            disabled={!validForm}
            type="submit"></button>

        </div>

            </form>
            <FilterCheckbox
       isFindMovies={isFindMovies}
       changeFilter={changeFilter}
       isSavedMovies={isSavedMovies}
      />
    </section>
  );
}
