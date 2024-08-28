import React from "react";
import s from "./HomePage.module.css";
import { Outlet } from "react-router-dom";
import HomeLinks from "../../HomeLinks/HomeLinks";

const HomePage = () => {
  return <div className={s.container}>
    <HomeLinks />
    <Outlet />
  </div>;
};

export default HomePage;
