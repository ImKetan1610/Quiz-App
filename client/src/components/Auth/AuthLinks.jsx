import React from "react";
import { NavLink } from "react-router-dom";
import s from "./AuthLinks.module.css";

const AuthLinks = () => {
  return (
    <header className={s.container}>
      <h1 className={s.header}>Quizzie</h1>
      <div className={s.btnDiv}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.btn} ${s.active}` : `${s.btn}`
          }
          end
          to={"register"}
        >
          Sign Up
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.btn} ${s.active}` : `${s.btn}`
          }
          to={"login"}
        >
          Log In
        </NavLink>
      </div>
    </header>
  );
};

export default AuthLinks;
