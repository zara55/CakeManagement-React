import React, { useState, useRef } from "react";
import { registerAPI } from "../service/commonService";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const shouldNavigate = useRef(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Popup function
  const showPopup = (message, navigateAfter = false) => {
    document.getElementById("popup-message").textContent = message;
    document.getElementById("popup").classList.add("show");
    shouldNavigate.current = navigateAfter;
  };

  const closePopup = () => {
    document.getElementById("popup").classList.remove("show");

    if (shouldNavigate.current) {
      navigate("/login");
    }
  };

  const handleSignup = async () => {
    if (!form.firstName || !form.username || !form.email || !form.password) {
      showPopup("Please fill all required fields");
      return;
    }

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      username: form.username,
      email: form.email,
      password: form.password,
    };

    try {
      const res = await registerAPI(payload);
      console.log(res.data);
      showPopup("Registration successful!", true);

    } catch (err) {
      console.log(err);
      showPopup("Registration failed!");
    }
  };

  return (
    <div className="signup-container">

      {/* Popup Modal */}
      <div id="popup" className="popup-overlay">
        <div className="popup-box">
          <h4 id="popup-message">Message</h4>
          <button className="popup-btn" onClick={closePopup}>OK</button>
        </div>
      </div>

      {/* Floating cakes */}
      <div className="floating-cake cake1"></div>
      <div className="floating-cake cake2"></div>
      <div className="floating-cake cake3"></div>
      <div className="floating-cake cake4"></div>
      <div className="floating-cake cake5"></div>
      <div className="floating-cake cake6"></div>

      <div className="card signup-card shadow-lg">
        <div className="text-center mb-4">
          <img src="/assets/logo.jpg" alt="Logo" className="rounded-circle mb-3 logo" />
          <h2 className="fw-bold signup-title">Create Account</h2>
          <p className="text-muted mb-3">Join Cake Aura today</p>
        </div>

        {/* Inputs */}
        <div className="position-relative">
          <i className="bi bi-person-fill input-icon"></i>
          <input type="text" name="firstName" placeholder="First Name" className="form-control ps-5 signup-input" onChange={handleChange} />
        </div>

        <div className="position-relative">
          <i className="bi bi-person-fill input-icon"></i>
          <input type="text" name="lastName" placeholder="Last Name" className="form-control ps-5 signup-input" onChange={handleChange} />
        </div>

        <div className="position-relative">
          <i className="bi bi-person-circle input-icon"></i>
          <input type="text" name="username" placeholder="Username" className="form-control ps-5 signup-input" onChange={handleChange} />
        </div>

        <div className="position-relative">
          <i className="bi bi-envelope-fill input-icon"></i>
          <input type="email" name="email" placeholder="Email Address" className="form-control ps-5 signup-input" onChange={handleChange} />
        </div>

        <div className="position-relative">
          <i className="bi bi-lock-fill input-icon"></i>
          <input type="password" name="password" placeholder="Create Password" className="form-control ps-5 signup-input" onChange={handleChange} />
        </div>

        <button className="btn signup-btn mb-3" onClick={handleSignup}>
          Sign Up
        </button>

        <p className="text-center mt-2">
          Already have an account?{" "}
          <span className="login-link" onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
