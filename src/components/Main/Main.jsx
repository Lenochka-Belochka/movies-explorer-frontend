import { AboutMe } from "../AboutMe/AboutMe";
import { AboutProject } from "../AboutProject/AboutProject";
import { Footer } from "../Footer/Footer";
import { Portfolio } from "../Portfolio/Portfolio";
import  Promo  from "../Promo/Promo";
import { Techs } from "../Techs/Techs";

function Main() {
  return (
   <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>
  );
};

export default Main;
