import "./AboutMe.css";
export const AboutMe = () => {
  return (
    <section className="about" id="about">
      <h3 className="about__title">Студент</h3>
      <div className="about__content">
        <div>
          <h4 className="about__content_name">Елена</h4>
          <p className="about__content_occupation">
            Фронтенд-разработчик, 27 лет
          </p>
          <p className="about__content_information">
            Я родилась в Великом Новгороде, сейчас живу в Санкт-Петербурге.
            Закончила баклавриат по направлению "История" и магистратуру по
            направлению "Политика и управление" в НИУ ВШЭ СПб. Я люблю слушать
            музыку и петь. Работаю в IT компании в команде внедрения. Решила
            начать кодить, чтобы лучше понимать своих коллег.
          </p>
          <div className="about__content_links">
            <a
              className="about__content_link"
              href="https://github.com/Lenochka-Belochka"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
        <div className="about__content_image"></div>
      </div>
    </section>
  );
};
