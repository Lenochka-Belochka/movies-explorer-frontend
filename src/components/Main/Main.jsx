import { AboutMe } from "../AboutMe/AboutMe";
import { Portfolio } from "../Portfolio/Portfolio";
import { Promo } from "../Promo/Promo";
import { Footer } from "../Footer/Footer";
import { Techs } from "../Techs/Techs";
import { AboutProject } from "../AboutProject/AboutProject";


export const Main = ({ isLogged }) => {
  return (
    <>
      <Promo
        isLogged={isLogged}
        isMain={true}
        isMovies={false}
        isSavedMovies={false}
        isProfile={false}
      />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </>
  );
};
