import { NavLink, useNavigate } from "react-router-dom";
import s from "./HomeLinks.module.css";
import { useContext, useEffect } from "react";
import { context } from "../Context/UserContext";

function HomeLinks() {
  let navigate = useNavigate();
  const { user, setUser } = useContext(context);

  function handleLogOut() {
    setUser((prev) => {
      return {
        ...prev,
        isAuthorize: false,
        email: "",
        username: "",
      };
    });
    localStorage.removeItem("quiz_builder");
    localStorage.removeItem("name");
    navigate('/auth/login');
  }

  useEffect(() => {
    if (user && user.isAuthorize === false) {
      navigate("/auth/login");
    }
  }, [user?.isAuthorize, navigate]);

  return (
    <div className={s.container}>
      <h1>QUIZZIE</h1>
      <div className={s.linkGroup}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.link} ${s.active}` : s.link
          }
          end
          to={"dashboard"}
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.link} ${s.active}` : s.link
          }
          end
          to={"analysis"}
        >
          Analytics
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.link} ${s.active}` : s.link
          }
          end
          to={"createquiz"}
        >
          Create Quiz
        </NavLink>
      </div>
      <div>
        <hr />
        <h2 onClick={handleLogOut} className={s.logout}>
          LOGOUT
        </h2>
      </div>
    </div>
  );
}

export default HomeLinks;
