import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignupForm.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Signupform = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:60001/signup", formData);
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-lg-10 col-sm-6 p-0 cover-image">
          <img
            src="https://plus.unsplash.com/premium_photo-1669686966146-da8d2400de46?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="img-fluid"
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-6 col-md-6 col-xm-12 form-container">
          <form onSubmit={handleCreateAccount}>
            <h3>Sign Up to Dribble</h3>

            <div className="d-flex ">
              <div className="form-group" style={{ marginRight: "10px" }}>
                <strong>Name:</strong>
                <input
                  className="form-control col"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <strong>Username:</strong>
                <input
                  className="form-control"
                  id="username"
                  type="text"
                  name="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <strong>Email:</strong>
              <input
                className="form-control"
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <strong>Password:</strong>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
              />
              <label>
                Creating an account means you're ok with our{" "}
                <Link to="/" className="blue-link">
                  Terms of Service,
                </Link>{" "}
                <Link to="/" className="blue-link">
                  Privacy policy,
                </Link>{" "}
                and our default{" "}
                <Link to="/" className="blue-link">
                  Notification Settings
                </Link>
              </label>
            </div>
            <button type="submit" className="create-btn mt-3">
              Create Account
            </button>
            <p className="mt-3">
              This site is protected by reCAPTCHA and the Google{" "}
              <Link to="/" className="blue-link">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/" className="blue-link">
                Terms of Services
              </Link>{" "}
              apply.
            </p>
          </form>
        </div>
      </div>

      <div className="row">
        <div className=" col-md-6 col-sm-12 login-link">
          <div>
            <h6>
              Already have an account?
              <Link to="/login" className="blue-link">
                Sign In
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signupform;
