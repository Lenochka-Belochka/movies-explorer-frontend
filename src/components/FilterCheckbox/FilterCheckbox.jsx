import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <div className="search__all-movies-finder">
    <label className="switch">
      <input type="checkbox" className="switch__checkbox" />
      <span className="switch__slider"></span>
    </label>
    <span className="search__caption">Короткометражки</span>
  </div>
  );
}
