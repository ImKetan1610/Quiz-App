import React, { useState, useContext } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { BACKEND_URL } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { context } from "../../Context/UserContext";

const LoginForm = () => {
  const { setUser } = useContext(context);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let validationErrors = {};

    // Email validation
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Please add a valid email ID";
    }

    // Password validation
    if (!formData.password || formData.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // console.log(formData);
      try {
        let res = await axios.post(BACKEND_URL + "/api/auth/login", formData);
        if (res.status === 200) {
          let token = res.data.token;
          setUser({
            email: formData.email,
            isAuthorize: true,
            username: res.data.username,
          });
          localStorage.setItem("quiz_builder", token);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Login error:", error);
        // Handle error responses here
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.loginFormGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? styles.inputError : ""}
          />
        </div>
        {errors.email && <div className={styles.errorText}>{errors.email}</div>}

        <div className={styles.loginFormGroup}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? styles.inputError : ""}
          />
        </div>
        {errors.password && (
          <div className={styles.errorText}>{errors.password}</div>
        )}

        <button type="submit" className={styles.loginSubmitButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
