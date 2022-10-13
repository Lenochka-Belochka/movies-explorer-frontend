import "./Footer.css";
export const Footer = () => {
  return (
    <>
      <footer className="footer">
      <div className="footer__container">
        <h6 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h6>
        <div className="footer__underline">
          <p className="footer__year">&#169; 2022</p>
          <div className="footer__links">
            <a
              className="footer__link"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
            <a
              className="footer__link"
              href="https://github.com/Lenochka-Belochka"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
        </div>
      </footer>
    </>
  );
};
