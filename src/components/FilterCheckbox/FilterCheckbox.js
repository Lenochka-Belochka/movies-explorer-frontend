import React from 'react';

import './FilterCheckbox.css'

function FilterCheckbox({ checkboxStatus, onChangeCheckbox }) {
    return (
        <div className='search__all-movies-finder'>
            <label className="filter-checkbox__container">
                <input
                    type="checkbox"
                    name="checkbox"
                    value={checkboxStatus}
                    onChange={onChangeCheckbox} />
                <span className="filter-checkbox__slider"></span>
            </label>
            <span className='filter-checkbox__text'>Короткометражки</span>
        </div>
    )
}

export default FilterCheckbox;
