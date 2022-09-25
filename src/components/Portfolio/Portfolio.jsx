import "./Portfolio.css";
export const Portfolio = () => {
  return (
    <section className="portfolio">
      <h5 className="portfolio__title">Портфолио</h5>
      <ul className="portfolio__projects">
        <li className="portfolio__projects_name">
        <a
          className="portfolio__projects_link"
          href="https://github.com/Lenochka-Belochka/how-to-learn"
          target="_blank"
          rel="noreferrer"
        >
Статичный сайт
        </a>
        </li>
        <li className="portfolio__projects_name">
        <a
          className="portfolio__projects_link"
          href="https://github.com/Lenochka-Belochka/russian-travel"
          target="_blank"
          rel="noreferrer"
        >
Адаптивный сайт
</a>
        </li>
        <li className="portfolio__projects_name">
        <a
          className="portfolio__projects_link"
          href="https://github.com/Lenochka-Belochka/react-mesto-api-full"
          target="_blank"
          rel="noreferrer"
        >
Одностраничное приложение
</a>
        </li>
        </ul>
    </section>
  );
};
