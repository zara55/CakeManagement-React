import React, { useState, useRef } from "react";
import { forgotPasswordService } from "../service/commonService";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const shouldNavigate = useRef(false);

  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const showPopup = (message, navigateAfter = false) => {
    document.getElementById("popup-message").textContent = message;
    document.getElementById("popup").classList.add("show");
    shouldNavigate.current = navigateAfter;
  };

  const closePopup = () => {
    document.getElementById("popup").classList.remove("show");
    if (shouldNavigate.current) navigate("/login");
  };

  const handleReset = async () => {
    if (!username || !newPassword || !confirmPassword) {
      showPopup("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      showPopup("Passwords do not match");
      return;
    }

    try {
      const payload = { username, newPassword };
      const response = await forgotPasswordService(payload);

      if (response.status === 200) {
        showPopup("Password updated successfully!", true);
      }
    } catch (error) {
      console.error(error);
      showPopup("Failed to update password. Please check username.");
    }
  };

  return (
    <div className="forgot-container">
      {/* Popup */}
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

      <div className="card forgot-card shadow-lg">
        <div className="text-center">
          <h2 className="fw-bold forgot-title">Reset Password</h2>
          <p className="text-muted mb-3">Enter your username and new password</p>
        </div>

        {/* Username field with icon */}
        <div className="position-relative mb-3">
          <i className="bi bi-person-fill input-icon"></i>
          <input
            type="text"
            placeholder="Username"
            className="form-control ps-5 forgot-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* New Password field with icon */}
        <div className="position-relative mb-3">
          <i className="bi bi-lock-fill input-icon"></i>
          <input
            type="password"
            placeholder="New Password"
            className="form-control ps-5 forgot-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password field with icon */}
        <div className="position-relative mb-3">
          <i className="bi bi-lock-fill input-icon"></i>
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control ps-5 forgot-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="btn forgot-btn" onClick={handleReset}>
          Reset Password
        </button>

        <p className="text-center mt-2">
          <span className="login-link" onClick={() => navigate("/login")}>
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
