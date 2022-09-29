import React from "react";
import Header from "../Header/Header";
import { NavTab } from "../NavTab/NavTab";
import "./Promo.css";

function Promo() {
  return (
    <>
      <section className="promo">
        <h1 className="promo__title">
          Учебный проект студентки факультета Веб-разработки.
        </h1>
        <NavTab />
      </section>
    </>
  );
};

export default Promo;
