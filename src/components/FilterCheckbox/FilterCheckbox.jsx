import { useLocation } from "react-router-dom";
import "./FilterCheckbox.css";
export const FilterCheckbox = ({
  isFindMovies,
  changeFilter,
  isSavedMovies,
}) => {
  const location = useLocation();
  const locationMovies = location.pathname === "/movies";

  let checkboxClassName = `filter-checkbox__button ${
    locationMovies && isFindMovies
      ? "filter-checkbox__button_inactive"
      : "filter-checkbox__button"
  } ${
    !locationMovies && isSavedMovies
      ? "filter-checkbox__button_inactive"
      : "filter-checkbox__button"
  }`;

  function handleChangeFilter() {
    changeFilter();
  }

  return (
    <div className="search__all-movies-finder">
      <button
        onClick={handleChangeFilter}
        type="button"
        className={checkboxClassName}
      ></button>
      <p className="filter-checkbox__text">Короткометражки</p>
      </div>
  );
};
