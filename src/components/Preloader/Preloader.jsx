import React from "react";
import "./Preloader.css";

export const Preloader = ({ isLoadingFilm }) => {
  return (
    <div className={isLoadingFilm ? "preloader" : "preloader_hide"}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};
