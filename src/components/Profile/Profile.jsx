import "./Profile.css";
import Header from "../Header/Header";
import { useEffect, useContext } from 'react';
import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';



export default function Profile({ handleSignOut, handleProfile }) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext); // подписка на контекст

  function handleSubmit(e) {
    e.preventDefault();
    handleProfile(values);
  }

  // после загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const requirementValidity = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));


  return (
    <section className="profle">
      <h1 className="profile__title">{`Привет, ${currentUser.name || ''}!`}</h1>
      <form className="profile__form" noValidate onSubmit={handleSubmit}>
        <div className="profile__fields">
          <div className="profile__field">
            <p className="profile__text" htmlFor='name'>Имя</p>
            <input
               name="name"
              className={`profile__input ${errors.name && 'profile__input_error'}`}
              onChange={handleChange}
              value={values.name || ''}
              type="text"
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            />
          </div>
          <div className="profile__field">
            <p className="profile__text" htmlFor='email'>E-mail</p>
            <input
              className={`profile__input ${errors.email && 'profile__input_error'}`}
              name="email"
              onChange={handleChange}
              value={values.email || ''}
              type="email"
              required
            />
          </div>
        </div>
        <div className="profile__buttons">
          <button
            type="submit"
            className={`profile__button-submit ${requirementValidity ? 'profile__button_invalid' : ''}`}
            disabled={requirementValidity ? true : false}
          >
            Редактировать
          </button>
          <button
            className="profile__button-logout"
            type="button"
            onClick={handleSignOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
};

