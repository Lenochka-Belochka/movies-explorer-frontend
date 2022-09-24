import "./Portfolio.css";
export const Portfolio = () => {
  return (
    <section className="portfolio">
      <h5 className="portfolio__title">Портфолио</h5>
      <div className="portfolio__projects">
        <p className="portfolio__projects_name">Статичный сайт</p>
        <a
          className="portfolio__projects_link"
          href="https://github.com/Lenochka-Belochka/how-to-learn"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
        </a>
      </div>
      <div className="portfolio__projects">
        <p className="portfolio__projects_name">Адаптивный сайт</p>
        <a
          className="portfolio__projects_link"
          href="https://github.com/Lenochka-Belochka/russian-travel"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
        </a>
      </div>
      <div className="portfolio__projects">
        <p className="portfolio__projects_name">Одностраничное приложение</p>
        <a
          className="portfolio__projects_link"
          href="https://github.com/Lenochka-Belochka/react-mesto-api-full"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
        </a>
      </div>
    </section>
  );
};
