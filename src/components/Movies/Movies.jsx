//import React, { useEffect, useState } from "react";
//import { useLocation } from "react-router";

import Header from "../Header/Header";
import { Footer } from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MovieCardList/MovieCardList";


function Movies({ isLogin }) {

  return (
    <div>
      <Header />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  );
}


export default Movies;
