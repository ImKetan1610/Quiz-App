import React from "react";
import { Outlet } from "react-router-dom";
import AuthLinks from "../../Auth/AuthLinks";
import s from "./AuthPage.module.css";

const AuthPage = () => {
  return (
    <div className={s.outerContainer}>
      <div className={s.container}>
        <AuthLinks />
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
