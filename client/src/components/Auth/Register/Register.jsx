import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import s from "./Register.module.css";
import { context } from "../../Context/UserContext";
import { BACKEND_URL } from "../../../utils/constant.js";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const { setUser } = useContext(context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name || formData.name.length < 8) {
      newErrors.name = "Name must be at least 8 characters long";
    }

    // Email validation
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please add a valid email ID";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password should be at least 8 characters long and include at least one special character, one number, one lowercase letter, and one uppercase letter.";
    }

    // Confirm password validation
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await axios.post(
          `${BACKEND_URL}/api/auth/register`,
          formData
        );
        if (res.status === 201) {
          const token = res.data.token;
          localStorage.setItem("quiz_builder", token);
          localStorage.setItem("user-Name", res.data.user.name);
          setUser({
            email: formData.email,
            isAuthorize: true,
            name: res.data.user.name,
          });
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Registration error:", error);
        throw new Error(error.response.data.message);
      }
    }
  };

  return (
    <form className={s.signUpForm} onSubmit={handleSubmit}>
      <div className={s.formSection}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? s.errorInput : ""}
          required
        />
        {errors.name && <span className={s.errorText}>{errors.name}</span>}
      </div>
      <div className={s.formSection}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? s.errorInput : ""}
          required
        />
        {errors.email && <span className={s.errorText}>{errors.email}</span>}
      </div>
      <div className={s.formSection}>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? s.errorInput : ""}
          required
        />
        {errors.password && (
          <span className={s.errorText}>{errors.password}</span>
        )}
      </div>
      <div className={s.formSection}>
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? s.errorInput : ""}
          required
        />
        {errors.confirmPassword && (
          <span className={s.errorText}>{errors.confirmPassword}</span>
        )}
      </div>
      <button type="submit" className={s.signUpBtn}>
        Sign-Up
      </button>
    </form>
  );
};

export default Register;
