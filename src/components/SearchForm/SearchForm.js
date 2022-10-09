import React, { useEffect, useState } from 'react';
import FilterCheckbox  from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import './SearchForm.css'

function SearchForm({ onSearch }) {
    const { handleChange } = useFormWithValidation();
    const location = useLocation();
    const [request, setRequest] = useState('');
    const [checkboxStatus, setCheckboxStatus] = useState(false);
    const [noSearchResult, setNoSearchResult] = useState(null);
    useEffect(() => {
        if (location.pathname === '/movies') {
            const checkbox = localStorage.getItem('checkboxStatus');
            const search = localStorage.getItem('request');
            if (search) {
                setRequest(search);
            }
            if (JSON.parse(checkbox) === true) {
                setCheckboxStatus(true);
            } else {
                setCheckboxStatus(false);
            }
        }
    }, [location.pathname]);

    function toggleCheckbox(checkboxStatus) {
        setCheckboxStatus(checkboxStatus);
        onSearch(request, checkboxStatus);
    }

    function handleChangeCheckbox(evt) {
        toggleCheckbox(evt.target.checked);
    }

    function handleRequestChange(evt) {
        handleChange(evt);
        setRequest(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!request) {
            setNoSearchResult('Необходимо ввести ключевое слово');
            console.log('Необходимо ввести ключевое слово')
        }
        onSearch(request, checkboxStatus);
    }

    return (
        <section className="search">

                <form className="search-movie"
                    onSubmit={handleSubmit}
                    noValidate>
                    <div className="search__container">
                    <input className="search__input"
                        type="text"
                        name="request"
                        placeholder="Фильм"
                        value={request || ''}
                        onChange={handleRequestChange}
                        required />
                    <button
                        className="search__find"
                        type="submit"
                        aria-label="найти"
                    ></button>
                    </div>
                </form>

                <FilterCheckbox
                    checkboxStatus={checkboxStatus}
                    onChangeCheckbox={handleChangeCheckbox}
                />


        </section>
    )
}

export default SearchForm;


