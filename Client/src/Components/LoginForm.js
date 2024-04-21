// LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:60001/login",
        formData
      );
      navigate("/profile");
      localStorage.setItem("accessToken", response.data.accessToken);
      alert("Login successful");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container main-content">
      <h3>First you have to login page</h3>
      <form
        onSubmit={handleSubmit}
        className="container text-center align-items-center justify-content-center"
      >
        <div className="row">
          <div className="col-md-6 col-lg-12 col-sm-12">
            <input
              type="email"
              name="email"
              placeholder="Enter Email..."
              value={formData.email}
              onChange={handleChange}
              className="form-control mb-3"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password..."
              value={formData.password}
              onChange={handleChange}
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
