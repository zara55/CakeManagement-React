import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const shouldNavigate = useRef(false); // <- NEW FLAG

  // Popup function
  const showPopup = (message, navigateAfter = false) => {
    document.getElementById("popup-message").textContent = message;
    document.getElementById("popup").classList.add("show");

    shouldNavigate.current = navigateAfter; // store whether we navigate on OK
  };

  const closePopup = () => {
    document.getElementById("popup").classList.remove("show");

    if (shouldNavigate.current) {
      navigate("/"); // navigate ONLY after OK
    }
  };

  const handlelogin = async () => {
    if (!username || !password) {
      showPopup("Please enter username & password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/cm/login", {
        username,
        password,
      });

      const token = response.data.data.accessToken;
      const userId = response.data.data.userId;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      // Popup + navigation happens after OK
      showPopup("Login Successful!", true);

    } catch (error) {
      console.error("Login failed:", error);
      showPopup("Invalid username or password");
    }
  };

  return (
    <div className="login-container">

      {/* Popup Modal */}
      <div id="popup" className="popup-overlay">
        <div className="popup-box">
          <h4 id="popup-message">Message</h4>

          <button className="popup-btn" onClick={closePopup}>
            OK
          </button>
        </div>
      </div>

      {/* Floating cakes */}
      <div className="floating-cake cake1"></div>
      <div className="floating-cake cake2"></div>
      <div className="floating-cake cake3"></div>
      <div className="floating-cake cake4"></div>
      <div className="floating-cake cake5"></div>
      <div className="floating-cake cake6"></div>

      <div className="card login-card shadow-lg">
        <div className="text-center mb-4">
          <img src="/assets/logo.jpg" alt="Logo" className="rounded-circle mb-3 logo" />
          <h2 className="fw-bold login-title">Cake Aura</h2>
        </div>

        <div className="position-relative">
          <i className="bi bi-person-fill input-icon"></i>
          <input
            type="text"
            placeholder="Enter username/email"
            className="form-control ps-5 mb-3 login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <i className="bi bi-lock-fill input-icon lock-icon"></i>
          <input
            type="password"
            placeholder="Enter password"
            className="form-control ps-5 mb-3 login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn login-btn mb-3" onClick={handlelogin}>
          Login
        </button>

        <button className="btn signup-btn mb-3" onClick={() => navigate("/signup")}>
          Sign Up
        </button>

        <div className="text-center mt-2">
          <a href="/forgot-password" className="forgot-link">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
