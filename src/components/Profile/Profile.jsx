import React from "react";
import "./Profile.css";
import Header from "../Header/Header";

function Profile() {
return (
    <section className="profle">
      <Header />
      <h1 className="profile__title">Привет, Ann!</h1>
      <form className="profile__form">
        <div className="profile__fields">
          <div className="profile__field">
            <p className="profile__text" htmlFor='name'>Имя</p>
            <input
               className='profile__input'
               type='text'
               placeholder='name'
               id='name'
            />
          </div>
          <div className="profile__field">
            <p className="profile__text" htmlFor='email'>E-mail</p>
            <input
             className='profile__input'
             type='email'
             placeholder='email'
             id='email'
            />
          </div>
        </div>
        <div className="profile__buttons">
          <button
            className="profile__button-submit" type="submit"
          >
            Редактировать
          </button>
          <button
            className="profile__button-logout"
            type="button"
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
