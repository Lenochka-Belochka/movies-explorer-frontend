import './Profile.css';
import { useEffect, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';

export default function Profile({ handleSignOut, handleUpdateProfile }) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateProfile(values);
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const requirementValidity = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  return (
    <main className="profile">
    <h1 className="profile__title">{`Привет, ${currentUser.name || ''}!`}</h1>
      <form className="profile__form" name="profile" noValidate onSubmit={handleSubmit}>
        <div className="profile__fields">
        <span className="profile__error">{errors.name || ''}</span>
        <div className="profile__field">
        <p className="profile__text">Имя</p>
            <input
              name="name"
              className="profile__input"
              onChange={handleChange}
              value={values.name || ''}
              type="text"
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            />
        </div>
        <span className="profile__error">{errors.email || ''}</span>
          <div className="profile__field">
            <p className="profile__text">E-mail</p>
            <input
              name="email"
              className="profile__input"
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
          <button type="submit" className="profile__button-logout" onClick={handleSignOut}>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}
