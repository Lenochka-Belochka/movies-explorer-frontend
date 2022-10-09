import "./AboutProject.css";

export const AboutProject = () => {
  return (
    <section className="project" id="project">
      <h3 className="project__title">О проекте</h3>
      <div className="project__about">
        <div className="project__about_container">
          <p className="project__about_subtitle">
            Дипломный проект включал 5 этапов
          </p>
          <p className="project__about_text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="project__about_container">
          <p className="project__about_subtitle">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="project__about_text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="project__timeline">
        <div className="project__timeline-backend">1 неделя</div>
        <div className="project__timeline-frontend">4 недели</div>
      </div>
      <div className="project__part">
        <p className="project__part_backend">Back-end</p>
        <p className="project__part_frontend">Front-end</p>
      </div>
    </section>
  );
};
